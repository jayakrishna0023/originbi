"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ProgramRow = {
  id?: number;
  program_id?: number;

  // new fields
  code?: string;
  name?: string;
  description?: string;
  assessment_title?: string;
  report_title?: string;
  is_demo?: boolean | number | string;
  is_active?: boolean | number | string;

  // legacy fields (fallbacks)
  program_name?: string;
  status?: number | string;
};

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<ProgramRow[]>([]);

  useEffect(() => {
    fetch("http://localhost:4001/programs")
      .then((res) => res.json())
      .then((data) => setPrograms(data));
  }, []);

  const deleteProgram = async (id: number) => {
    const ok = confirm("Are you sure you want to delete this program?");
    if (!ok) return;

    await fetch(`http://localhost:4001/programs/${id}`, {
      method: "DELETE",
    });

    setPrograms((prev) => prev.filter((p) => (p.id ?? p.program_id) !== id));
  };

  // ---------- Helpers to normalize data ----------

  const getId = (p: ProgramRow) => p.id ?? p.program_id;

  const getName = (p: ProgramRow) => p.name ?? p.program_name ?? "--";

  const getCode = (p: ProgramRow) => {
    if (p.code && p.code.trim() !== "") {
        return p.code;
    } else{
        return "--";
    }
  };

  const getDescription = (p: ProgramRow) => {
    if (p.description && p.description.trim() !== "") return p.description;
    // fall back to other meaningful text so it doesn't look empty
    if (p.assessment_title && p.assessment_title.trim() !== "")
      return p.assessment_title;
    if (p.report_title && p.report_title.trim() !== "")
      return p.report_title;

    return "--";
  };

  const getIsActive = (p: ProgramRow) => {
    if (p.is_active !== undefined && p.is_active !== null) {
      if (typeof p.is_active === "boolean") return p.is_active;
      if (typeof p.is_active === "number") return p.is_active === 1;
      if (typeof p.is_active === "string")
        return p.is_active === "1" || p.is_active === "true";
    }
    // fallback to old status field (0/1)
    if (p.status !== undefined && p.status !== null) {
      if (typeof p.status === "number") return p.status === 1;
      if (typeof p.status === "string") return p.status === "1";
    }
    return false;
  };

  const getIsDemo = (p: ProgramRow) => {
    if (p.is_demo === undefined || p.is_demo === null) return false;
    if (typeof p.is_demo === "boolean") return p.is_demo;
    if (typeof p.is_demo === "number") return p.is_demo === 1;
    if (typeof p.is_demo === "string")
      return p.is_demo === "1" || p.is_demo === "true";
    return false;
  };

  // ---------- UI ----------

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">List of Programs</h1>

        <Link
          href="/admin/programs/create"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-lg shadow"
        >
          + Add New Program
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow border p-5 overflow-x-auto">
        <table className="w-full border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-green-600 text-white text-left">
              <th className="p-3">Action</th>
              <th className="p-3">Status</th>
              <th className="p-3">Code</th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Demo?</th>
              <th className="p-3">Assessment Title</th>
              <th className="p-3">Report Title</th>
            </tr>
          </thead>

          <tbody>
            {programs.map((p, index) => {
              const id = getId(p);
              const isActive = getIsActive(p);
              const isDemo = getIsDemo(p);

              return (
                <tr
                  key={id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  {/* ACTION BUTTONS */}
                  <td className="p-3 flex gap-4 text-xl text-black">
                    <Link
                      href={`/admin/programs/${id}`}
                      className="text-green-700 hover:text-green-900"
                      title="View"
                    >
                      👁
                    </Link>

                    <Link
                      href={`/admin/programs/${id}/edit`}
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Edit"
                    >
                      ✏️
                    </Link>

                    <button
                      onClick={() => deleteProgram(Number(id))}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </td>

                  {/* STATUS SWITCH (is_active) */}
                  <td className="p-3 text-black">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isActive}
                        className="hidden peer"
                        readOnly
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-600 relative transition">
                        <div
                          className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5 
                          peer-checked:translate-x-5 transition"
                        ></div>
                      </div>
                    </label>
                  </td>

                  {/* CODE */}
                  <td className="p-3 text-black">{getCode(p)}</td>

                  {/* NAME */}
                  <td className="p-3 text-black">{getName(p)}</td>

                  {/* DESCRIPTION */}
                  <td className="p-3 text-black">{getDescription(p)}</td>

                  {/* DEMO FLAG */}
                  <td className="p-3 text-black">
                    {isDemo ? "Yes" : "No"}
                  </td>

                  {/* ASSESSMENT TITLE */}
                  <td className="p-3 text-black">
                    {p.assessment_title || "--"}
                  </td>

                  {/* REPORT TITLE */}
                  <td className="p-3 text-black">
                    {p.report_title || "--"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer (entries count) */}
        <div className="mt-4 text-gray-600 text-sm">
          Showing {programs.length} entries
        </div>
      </div>
    </div>
  );
}
