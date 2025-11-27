"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function EditProgram({ params }: any) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    code: "",
    name: "",
    description: "",
    assessment_title: "",
    report_title: "",
    is_demo: false,
    is_active: true,
  });

  useEffect(() => {
    fetch(`http://localhost:4001/programs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          code: data.code ?? "",
          name: data.name ?? "",
          description: data.description ?? "",
          assessment_title: data.assessment_title ?? "",
          report_title: data.report_title ?? "",
          is_demo: !!data.is_demo,
          is_active: data.is_active !== undefined ? !!data.is_active : true,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load program:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setForm((prev) => {
      if (type === "checkbox") {
        return { ...prev, [name]: checked };
      }
      return { ...prev, [name]: value };
    });
  };

  const update = async () => {
    try {
      const res = await fetch(`http://localhost:4001/programs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Update error:", errText);
        alert("Failed to update program. Please try again.");
        return;
      }

      router.push("/admin/programs");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check the console.");
    }
  };

  if (loading) return <p className="text-black p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#f5f6fa] p-6 text-black">
      {/* MAIN WHITE CONTAINER */}
      <div
        className="bg-white rounded-xl shadow-lg mx-auto"
        style={{ maxWidth: "95%" }}
      >
        {/* HEADER GREEN BANNER */}
        <div className="bg-green-700 text-white p-6 rounded-t-xl">
          <h1 className="text-3xl font-bold">Edit Program</h1>
          <p className="text-sm mt-2">Dashboard / Programs / Edit Program</p>
        </div>

        {/* FORM CONTENT */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Program Code */}
            <div>
              <label className="block font-semibold mb-1">
                Program Code *
              </label>
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-black"
                placeholder="e.g. SCHOOL_STUDENT"
              />
            </div>

            {/* Program Name */}
            <div>
              <label className="block font-semibold mb-1">
                Program Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-black"
                placeholder="Enter Program Name"
              />
            </div>

            {/* Status (is_active) */}
            <div>
              <label className="block font-semibold mb-1">Status *</label>
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
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 mt-6">
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded px-3 py-2 text-black resize-y"
                placeholder="Enter a short description for this program"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Assessment Title */}
            <div>
              <label className="block font-semibold mb-1">
                Assessment Title
              </label>
              <input
                type="text"
                name="assessment_title"
                value={form.assessment_title}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-black"
                placeholder="Enter Assessment Title"
              />
            </div>

            {/* Report Title */}
            <div>
              <label className="block font-semibold mb-1">Report Title</label>
              <input
                type="text"
                name="report_title"
                value={form.report_title}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-black"
                placeholder="Enter Report Title"
              />
            </div>
          </div>

          {/* Is Demo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block font-semibold mb-1">Demo Program?</label>
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
                    Mark as Demo (trial / sample)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => router.push("/admin/programs")}
              className="px-6 py-3 rounded bg-gray-200 text-black"
            >
              Cancel
            </button>

            <button
              onClick={update}
              className="px-8 py-3 rounded bg-green-700 text-white hover:bg-green-800"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
