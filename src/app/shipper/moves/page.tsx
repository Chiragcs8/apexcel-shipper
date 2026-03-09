"use client";

import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";

type Move = {
  id: number;
  trip: string;
  source: string;
  destination: string;
  material: string;
  truck: string;
  date: string;
  status: string;
};

const MOVES_DATA: Move[] = [
  {
    id: 1,
    trip: "TRIP1001",
    source: "Ahmedabad",
    destination: "Mumbai",
    material: "Steel",
    truck: "GJ01AB1234",
    date: "2026-03-07",
    status: "pending",
  },
  {
    id: 2,
    trip: "TRIP1002",
    source: "Surat",
    destination: "Delhi",
    material: "Textile",
    truck: "GJ05XY8899",
    date: "2026-03-06",
    status: "active",
  },
  {
    id: 3,
    trip: "TRIP1003",
    source: "Vadodara",
    destination: "Pune",
    material: "Machinery",
    truck: "MH12AA4444",
    date: "2026-03-05",
    status: "transit",
  },
];

const TABS = [
  "pending",
  "active",
  "transit",
  "hold",
  "closed",
  "pod",
  "invoice",
];

export default function MovesPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [search, setSearch] = useState("");
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);

  const filteredMoves = MOVES_DATA.filter(
    (move) =>
      move.status === activeTab &&
      (move.trip.toLowerCase().includes(search.toLowerCase()) ||
        move.material.toLowerCase().includes(search.toLowerCase()))
  );

  // DOWNLOAD FUNCTION
  const downloadExcel = () => {
    const headers = [
      "Trip",
      "Source",
      "Destination",
      "Material",
      "Truck",
      "Date",
      "Status",
    ];

    const rows = filteredMoves.map((move) => [
      move.trip,
      move.source,
      move.destination,
      move.material,
      move.truck,
      move.date,
      move.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((e) => e.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "moves_report.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-[#1a5d68]">Moves</h1>

        <button
          onClick={downloadExcel}
          className="flex items-center gap-2 bg-[#1a5d68] text-white px-4 py-2 rounded-xl text-sm font-bold"
        >
          <Download size={16} /> Download Excel
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 flex-wrap">

        <div className="relative w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Search trip, material..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-bold text-gray-500"
          />
        </div>

        <button className="flex items-center gap-2 border px-4 py-3 rounded-xl text-sm font-bold text-gray-500">
          <Filter size={16} /> Filter
        </button>

      </div>

      {/* TABS */}
      <div className="flex gap-3 overflow-x-auto pb-2">

        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-bold capitalize ${
              activeTab === tab
                ? "bg-[#1a5d68] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm text-gray-500">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-black">
            <tr>
              <th className="p-4 text-left">Sr No</th>
              <th className="p-4 text-left">Trip</th>
              <th className="p-4 text-left">Source</th>
              <th className="p-4 text-left">Destination</th>
              <th className="p-4 text-left">Material</th>
              <th className="p-4 text-left">Truck</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredMoves.map((move, i) => (
              <tr key={move.id} className="border-t">

                <td className="p-4 font-bold">{i + 1}</td>

                <td className="p-4 font-bold text-[#1a5d68]">
                  {move.trip}
                </td>

                <td className="p-4 text-green-600 font-bold">
                  {move.source}
                </td>

                <td className="p-4 text-red-500 font-bold">
                  {move.destination}
                </td>

                <td className="p-4 font-bold">{move.material}</td>

                <td className="p-4">{move.truck}</td>

                <td className="p-4">{move.date}</td>

                <td className="p-4">
                  <button
                    onClick={() => setSelectedMove(move)}
                    className="px-3 py-1 bg-[#1a5d68] text-white rounded-lg text-xs"
                  >
                    View
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* POPUP */}
      {selectedMove && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center text-gray-500">

          <div className="bg-white p-6 rounded-2xl w-96 space-y-4">

            <h2 className="text-lg font-black text-[#1a5d68]">
              Move Details
            </h2>

            <div className="text-sm font-bold space-y-1">
              <p>Trip: {selectedMove.trip}</p>
              <p>Source: {selectedMove.source}</p>
              <p>Destination: {selectedMove.destination}</p>
              <p>Material: {selectedMove.material}</p>
              <p>Truck: {selectedMove.truck}</p>
              <p>Date: {selectedMove.date}</p>
            </div>

            <button
              onClick={() => setSelectedMove(null)}
              className="w-full py-2 bg-[#1a5d68] text-white rounded-xl"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}