"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-white px-4 py-10 text-center selection:bg-orange-100">
      
      {/* 1. Main 404 Text */}
      <h1 className="font-black text-zinc-900 text-[8rem] leading-none tracking-tighter sm:text-[10rem] md:text-[12rem]">
        4<span className="text-orange-500">0</span>4
      </h1>

      {/* 2. Subheading & Context */}
      <div className="mt-2 space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-800 sm:text-3xl">
          Wrong Route, Driver!
        </h2>
        <p className="mx-auto max-w-[400px] text-zinc-500 md:text-lg">
          Looks like this shipment doesn't exist or has been moved to a different warehouse.
        </p>
      </div>

      {/* 3. The Animated Truck (Green/Orange Theme) */}
      <div className="my-12 scale-75 sm:scale-100">
        <div className="loader">
          <div className="truckWrapper">
            {/* Truck Body */}
            <div className="truckBody">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 100" className="trucksvg">
                {/* Green Cabin */}
                <path d="M10 75 L10 35 L40 35 L55 50 L55 75 L10 75Z" fill="#166534" stroke="#18181b" strokeWidth="3" strokeLinejoin="round"></path>
                <rect x="35" y="40" width="15" height="15" fill="#f4f4f5" stroke="#18181b" strokeWidth="2"></rect>
                
                {/* Orange Container */}
                <rect x="65" y="15" width="130" height="60" rx="3" fill="#f97316" stroke="#18181b" strokeWidth="3"></rect>
                
                {/* Container Details */}
                <line x1="95" y1="15" x2="95" y2="75" stroke="#c2410c" strokeWidth="2"></line>
                <line x1="130" y1="15" x2="130" y2="75" stroke="#c2410c" strokeWidth="2"></line>
                <line x1="165" y1="15" x2="165" y2="75" stroke="#c2410c" strokeWidth="2"></line>

                {/* Connector & Bumper */}
                <rect x="55" y="60" width="10" height="10" fill="#18181b"></rect>
                <rect x="5" y="70" width="5" height="8" fill="#18181b" rx="1"></rect>
              </svg>
            </div>

            {/* Tires */}
            <div className="truckTires">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
                <circle strokeWidth="3" stroke="#18181b" fill="#18181b" r="13.5" cy="15" cx="15"></circle>
                <circle fill="#d4d4d8" r="7" cy="15" cx="15"></circle>
              </svg>
              <div style={{ display: "flex", gap: "5px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
                  <circle strokeWidth="3" stroke="#18181b" fill="#18181b" r="13.5" cy="15" cx="15"></circle>
                  <circle fill="#d4d4d8" r="7" cy="15" cx="15"></circle>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
                  <circle strokeWidth="3" stroke="#18181b" fill="#18181b" r="13.5" cy="15" cx="15"></circle>
                  <circle fill="#d4d4d8" r="7" cy="15" cx="15"></circle>
                </svg>
              </div>
            </div>

            {/* Road */}
            <div className="road"></div>
          </div>
        </div>
      </div>

      {/* 4. Action Button (Green Theme) */}
      <Link
        href="/"
        className="
          group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-zinc-900 px-8 py-3 font-bold text-white transition-all duration-300
          hover:bg-green-700 hover:ring-4 hover:ring-green-200 hover:scale-105
        "
      >
        <span className="mr-2">Back to Dashboard</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:-translate-x-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </Link>

      {/* CSS for Animation (Embedded for easy copy-paste) */}
      <style jsx>{`
        .loader {
          width: fit-content;
          height: fit-content;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .truckWrapper {
          width: 220px;
          height: 100px;
          display: flex;
          flex-direction: column;
          position: relative;
          align-items: center;
          justify-content: flex-end;
          overflow-x: hidden;
        }
        .truckBody {
          width: 180px;
          height: fit-content;
          margin-bottom: 2px;
          animation: motion 1s linear infinite;
          z-index: 2;
        }
        @keyframes motion {
          0% { transform: translateY(0px); }
          50% { transform: translateY(3px); }
          100% { transform: translateY(0px); }
        }
        .truckTires {
          width: 180px;
          height: fit-content;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0px 15px 0px 25px;
          position: absolute;
          bottom: 0;
          z-index: 1;
        }
        .truckTires svg {
          width: 24px;
        }
        .road {
          width: 100%;
          height: 1.5px;
          background-color: #18181b;
          position: relative;
          bottom: 0;
          align-self: flex-end;
          border-radius: 3px;
        }
        .road::before {
          content: "";
          position: absolute;
          width: 20px;
          height: 100%;
          background-color: #18181b;
          right: -50%;
          border-radius: 3px;
          animation: roadAnimation 1.4s linear infinite;
          border-left: 10px solid white;
        }
        .road::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 100%;
          background-color: #18181b;
          right: -65%;
          border-radius: 3px;
          animation: roadAnimation 1.4s linear infinite;
          border-left: 4px solid white;
        }
        @keyframes roadAnimation {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-350px); }
        }
      `}</style>
    </div>
  );
}