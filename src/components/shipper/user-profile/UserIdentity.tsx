"use client";

import React from "react";

export default function UserIdentity() {
  const tdsNumber = "TDS-IND-784512";

  return (
    <div
      className="
        rounded-2xl border border-orange-200 p-6
        bg-white
        dark:bg-[#111827] dark:border-orange-500/40
      "
    >
      <h4 className="mb-6 text-lg font-semibold text-orange-600 dark:text-orange-400">
        Identity & Compliance
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Aadhaar Number */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Aadhaar Card Number
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            1234 5678 9012
          </p>
        </div>

        {/* Aadhaar Front */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Aadhaar Card (Front Image)
          </p>
          <div className="flex gap-3 text-sm font-medium">
            <a
              href="/images/logo/logo.png"
              target="_blank"
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              View
            </a>
            <a
              href="/images/logo/logo.png"
              download
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              Download
            </a>
          </div>
        </div>

        {/* Aadhaar Back */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Aadhaar Card (Back Image)
          </p>
          <div className="flex gap-3 text-sm font-medium">
            <a
              href="/dummy-files/aadhaar-back.jpg"
              target="_blank"
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              View
            </a>
            <a
              href="/dummy-files/aadhaar-back.jpg"
              download
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              Download
            </a>
          </div>
        </div>

        {/* PAN Number */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            PAN Card Number
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            ABCDE1234F
          </p>
        </div>

        {/* PAN Front */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            PAN Card (Front Image)
          </p>
          <div className="flex gap-3 text-sm font-medium">
            <a
              href="/dummy-files/pan-front.jpg"
              target="_blank"
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              View
            </a>
            <a
              href="/dummy-files/pan-front.jpg"
              download
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              Download
            </a>
          </div>
        </div>
        <br />

        {/* GST Number */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            GST Number
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            24ABCDE1234F1Z5
          </p>
        </div>

        {/* GST Certificate */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            GST Certificate
          </p>
          <div className="flex gap-3 text-sm font-medium">
            <a
              href="/dummy-files/gst-certificate.pdf"
              target="_blank"
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              View
            </a>
            <a
              href="/dummy-files/gst-certificate.pdf"
              download
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              Download
            </a>
          </div>
        </div>
        <br />

        {/* TDS Number */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            TDS Number
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {tdsNumber}
          </p>
        </div>

        {/* TDS File */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            TDS File
          </p>
          <div className="flex gap-3 text-sm font-medium">
            <a
              href="/dummy-files/tds-certificate.pdf"
              target="_blank"
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              View
            </a>
            <a
              href="/dummy-files/tds-certificate.pdf"
              download
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}