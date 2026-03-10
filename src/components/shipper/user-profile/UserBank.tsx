"use client";

import React from "react";

export default function UserBank() {
  return (
    <div
      className="
        rounded-2xl border border-orange-200 p-6
        bg-white
        dark:bg-[#111827] dark:border-orange-500/40
      "
    >
      <h4 className="mb-6 text-lg font-semibold text-orange-600 dark:text-orange-400">
        Bank Details
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Account Holder Name */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Account Holder Name
          </p>
          <p className="text-sm font-medium uppercase text-gray-800 dark:text-gray-100">
            Chirag Chavda
          </p>
        </div>

        {/* Bank Name */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Bank Name
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            HDFC Bank Ltd.
          </p>
        </div>
        <br />

        {/* Bank Account Number */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Bank Account Number
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            123456789012
          </p>
        </div>

        {/* Re-enter Bank Account Number */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Re-enter Bank Account Number
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            123456789012
          </p>
        </div>

        {/* IFSC Code */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            IFSC Code
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            HDFC0001234
          </p>
        </div>
      </div>
    </div>
  );
}