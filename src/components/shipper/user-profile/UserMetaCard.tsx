"use client";

import React from "react";
import Image from "next/image";

export default function UserMetaCard() {
  return (
    <div
      className="
        rounded-2xl border border-orange-200 p-6
        bg-white
        dark:bg-[#111827] dark:border-orange-500/40
      "
    >
      <div className="flex items-center gap-6">
        <div className="h-20 w-20 rounded-full overflow-hidden border border-orange-400/50">
          <Image
            src="/images/user/owner.jpg"
            alt="User"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">
            Chirag Chavda
          </h3>
          
            <p className="text-sm text-gray-600 dark:text-gray-400">APML XXXX</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Website Developer · Ahmedabad, Gujarat, India
          </p>
          
        </div>
      </div>
    </div>
  );
}