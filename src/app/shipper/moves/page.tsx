"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  FileText,
  Info,
  File,
  DollarSign,
  Ticket,
  MapPin,
  X,
} from "lucide-react";

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

  const [filterOpen, setFilterOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredMoves = MOVES_DATA.filter((move) => {
    const searchMatch =
      move.trip.toLowerCase().includes(search.toLowerCase()) ||
      move.source.toLowerCase().includes(search.toLowerCase()) ||
      move.destination.toLowerCase().includes(search.toLowerCase()) ||
      move.material.toLowerCase().includes(search.toLowerCase());

    const tabMatch = move.status === activeTab;

    const statusMatch = statusFilter ? move.status === statusFilter : true;

    const dateMatch =
      (!fromDate || move.date >= fromDate) &&
      (!toDate || move.date <= toDate);

    return searchMatch && tabMatch && statusMatch && dateMatch;
  });

  /* Excel Download */

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

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const uri = encodeURI(csv);

    const link = document.createElement("a");
    link.href = uri;
    link.download = "moves_report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* PDF Download */

  const downloadPDF = () => {
    const win = window.open("", "", "width=900,height=700");

    if (!win) return;

    win.document.write(`
      <html>
      <head>
      <title>Moves Report</title>
      </head>
      <body>
      <h2>Moves Report</h2>
      <table border="1" cellspacing="0" cellpadding="8">
      <tr>
      <th>Trip</th>
      <th>Source</th>
      <th>Destination</th>
      <th>Material</th>
      <th>Truck</th>
      <th>Date</th>
      <th>Status</th>
      </tr>

      ${filteredMoves
        .map(
          (m) => `
      <tr>
      <td>${m.trip}</td>
      <td>${m.source}</td>
      <td>${m.destination}</td>
      <td>${m.material}</td>
      <td>${m.truck}</td>
      <td>${m.date}</td>
      <td>${m.status}</td>
      </tr>
      `
        )
        .join("")}

      </table>
      </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  return (
    <div className="p-6 space-y-6 text-gray-600">

      {/* HEADER */}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-[#1a5d68]">Moves</h1>
      </div>

      {/* SEARCH LEFT + BUTTONS RIGHT */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        {/* SEARCH */}
        <div className="relative w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search trip / source / destination"
            className="w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-bold"
          />
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex gap-3">

          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 border px-4 py-3 rounded-xl text-sm font-bold"
          >
            <Filter size={16} />
            Filter
          </button>

          <button
            onClick={downloadExcel}
            className="flex items-center gap-2 border px-4 py-3 rounded-xl text-sm font-bold text-green-700"
          >
            <Download size={16} />
            Excel
          </button>

          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 border px-4 py-3 rounded-xl text-sm font-bold text-red-600"
          >
            <FileText size={16} />
            PDF
          </button>

        </div>

      </div>

      {/* TABS */}

      <div className="flex gap-3 overflow-x-auto">

        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-bold capitalize ${
              activeTab === tab
                ? "bg-[#1a5d68] text-white"
                : "bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* TABLE */}

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-xs uppercase font-black">
            <tr>
              <th className="p-4 text-left">Sr No</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Trip</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Truck</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredMoves.map((move, i) => (

              <tr key={move.id} className="border-t">

                <td className="p-4 font-bold">{i + 1}</td>

                <td className="p-4">{move.date}</td>

                <td className="p-4 font-bold text-[#1a5d68]">
                  {move.trip}
                  <div className="text-xs text-gray-400">
                    {move.source} → {move.destination}
                  </div>
                </td>

                <td className="p-4 capitalize">{move.status}</td>

                <td className="p-4 space-y-1">

                  <div className="font-bold">{move.truck}</div>

                  <button className="text-xs flex items-center gap-1 text-blue-600">
                    <MapPin size={14} />
                    Track
                  </button>

                </td>

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() => setSelectedMove(move)}
                    className="p-2 border rounded-lg"
                  >
                    <Info size={16} />
                  </button>

                  <button className="p-2 border rounded-lg">
                    <File size={16} />
                  </button>

                  <button className="p-2 border rounded-lg">
                    <DollarSign size={16} />
                  </button>

                  <button className="p-2 border rounded-lg">
                    <Ticket size={16} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* INFO POPUP */}

      {selectedMove && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-96 space-y-4">

            <div className="flex justify-between items-center">
              <h2 className="font-black text-lg">Move Info</h2>

              <button onClick={() => setSelectedMove(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="text-sm space-y-1 font-bold">

              <p>Trip: {selectedMove.trip}</p>
              <p>Source: {selectedMove.source}</p>
              <p>Destination: {selectedMove.destination}</p>
              <p>Material: {selectedMove.material}</p>
              <p>Truck: {selectedMove.truck}</p>
              <p>Date: {selectedMove.date}</p>
              <p>Status: {selectedMove.status}</p>

            </div>

          </div>

        </div>
      )}

      {/* FILTER POPUP */}

      {filterOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-96 space-y-4">

            <div className="flex justify-between items-center">
              <h2 className="font-black">Filter</h2>

              <button onClick={() => setFilterOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">

              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />

              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border p-2 rounded-lg"
              >
                <option value="">All Status</option>
                {TABS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

            </div>

            <button
              onClick={() => setFilterOpen(false)}
              className="w-full bg-[#1a5d68] text-white py-2 rounded-xl"
            >
              Apply Filter
            </button>

          </div>

        </div>
      )}

    </div>
  );
}