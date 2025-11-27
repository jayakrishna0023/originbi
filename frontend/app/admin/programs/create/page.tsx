"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateProgram() {
  const router = useRouter();

  const [form, setForm] = useState({
    code: "",
    name: "",
    description: "",
    assessment_title: "",
    report_title: "",
    is_demo: false,
    is_active: true,
  });

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target as any;

    setForm((prev) => {
      // Handle boolean checkbox fields
      if (type === "checkbox") {
        return { ...prev, [name]: checked };
      }

      // Default: string fields
      return { ...prev, [name]: value };
    });
  };

  const submit = async () => {
    try {
      const res = await fetch("http://localhost:4001/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API error:", errorText);
        alert("Failed to save program. Please try again.");
        return;
      }

      router.push("/admin/programs");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check the console.");
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-green-700 text-white px-8 py-10 rounded-t-2xl shadow-md">
        <h1 className="text-3xl font-semibold">Add Programs</h1>
        <p className="text-sm mt-2 opacity-90">
          Dashboard / Programs / Add Programs
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white shadow-lg rounded-b-2xl p-8 -mt-6 border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Program Code */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">
              Program Code <span className="text-red-500">*</span>
            </label>
            <input
              name="code"
              placeholder="e.g. SCHOOL_STUDENT, COLLEGE_STUDENT"
              value={form.code}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          {/* Program Name */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">
              Program Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="Enter the Program Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          {/* Status (is_active boolean) */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center h-full">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-800">
                  Active (uncheck to make Inactive)
                </span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-3">
            <label className="font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter a short description for this program"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-600 resize-y"
            />
          </div>

          {/* Assessment Title */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-medium mb-1 text-gray-700">
              Assessment Title
            </label>
            <input
              name="assessment_title"
              placeholder="Enter the Assessment Title"
              value={form.assessment_title}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Report Title */}
          <div className="flex flex-col md:col-span-1">
            <label className="font-medium mb-1 text-gray-700">
              Report Title
            </label>
            <input
              name="report_title"
              placeholder="Enter the Report Title"
              value={form.report_title}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Is Demo (is_demo boolean) */}
          <div className="flex flex-col md:col-span-1">
            <label className="font-medium mb-1 text-gray-700">
              Demo Program?
            </label>
            <div className="flex items-center h-full">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_demo"
                  checked={form.is_demo}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-800">
                  Mark as Demo (for trial use)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-10">
          <Link
            href="/admin/programs"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </Link>

          <button
            onClick={submit}
            className="px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 shadow-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
