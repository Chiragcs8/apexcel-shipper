"use client";

import React from "react";
import Button from "../ui/button/Button";

export default function UserDetails() {
  // fake static data
  const tdsNumber = "TDS-IND-784512";
  const tdsFileUrl = "/dummy-files/tds-certificate.pdf"; // fake upload path
  const tdsFileName = "TDS_Certificate_2024.pdf";

  return (
    <div
      className="
        rounded-2xl border p-6
        border-orange-200 bg-white
        dark:border-orange-500/40 dark:bg-[#0f172a]
      "
    >
      {/* HEADER */}
      <h4 className="mb-6 text-lg font-semibold text-orange-600 dark:text-orange-400">
        TDS Details
      </h4>

      {/* DETAILS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* TDS NUMBER */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            TDS Number
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {tdsNumber}
          </p>
        </div>

        {/* FILE VIEW / DOWNLOAD */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Uploaded TDS File
          </p>

          <div
            className="
              flex items-center justify-between gap-3
              rounded-lg border px-4 py-3
              border-gray-300 bg-gray-50
              dark:border-gray-700 dark:bg-[#020617]
            "
          >
            <span className="truncate text-sm text-gray-700 dark:text-gray-300">
              {tdsFileName}
            </span>

            <a
              href={tdsFileUrl}
              download
              className="
                text-sm font-medium text-orange-600
                hover:underline
                dark:text-orange-400
              "
            >
              View / Download
            </a>
          </div>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            File format: PDF (uploaded)
          </p>
        </div>
      </div>
    </div>
  );
}