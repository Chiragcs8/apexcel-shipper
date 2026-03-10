"use client";

import React from "react";

export default function UserAddressCard() {
  return (
    <div
      className="
        rounded-2xl border border-orange-200 p-6
        bg-white
        dark:bg-[#111827] dark:border-orange-500/40
      "
    >
      <h4 className="mb-6 text-lg font-semibold text-orange-600 dark:text-orange-400">
        Address Details
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Building / Apartment Number */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Building / Apartment Number
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            A-504, Green Heights
          </p>
        </div>

        {/* Area Name */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Area Name
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            Vastrapur
          </p>
        </div>

        {/* Landmark */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Landmark
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            Near Alpha Mall
          </p>
        </div>

        {/* City */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            City
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            Ahmedabad
          </p>
        </div>

        {/* State */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            State
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            Gujarat
          </p>
        </div>

        {/* Country */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Country
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            India
          </p>
        </div>

        {/* PIN Code */}
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            PIN Code
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            380015
          </p>
        </div>
      </div>
    </div>
  );
}