"use client";

import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";

type WalletRow = {
  id: number;
  tripNumber: string;
  source: string;
  destination: string;
  material: string;
  advance: number;
  balanceFee: number;
  date: string;
};

const WALLET_DATA: WalletRow[] = [
  {
    id: 1,
    tripNumber: "TRIP1021",
    source: "Ahmedabad",
    destination: "Mumbai",
    material: "Steel",
    advance: 12000,
    balanceFee: 3000,
    date: "2026-03-05",
  },
  {
    id: 2,
    tripNumber: "TRIP1022",
    source: "Surat",
    destination: "Pune",
    material: "Textile",
    advance: 8000,
    balanceFee: 2000,
    date: "2026-03-04",
  },
  {
    id: 3,
    tripNumber: "TRIP1023",
    source: "Vadodara",
    destination: "Delhi",
    material: "Machinery",
    advance: 15000,
    balanceFee: 5000,
    date: "2026-03-03",
  },
];

export default function WalletPage() {
  const [search, setSearch] = useState("");

  const filtered = WALLET_DATA.filter(
    (item) =>
      item.tripNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.material.toLowerCase().includes(search.toLowerCase()) ||
      item.advance.toString().includes(search)
  );

  const downloadExcel = () => {
    const headers = [
      "Sr No",
      "Trip Number",
      "Source",
      "Destination",
      "Material",
      "Advance",
      "Balance Fee",
      "Date",
    ];

    const rows = filtered.map((item, index) => [
      index + 1,
      item.tripNumber,
      item.source,
      item.destination,
      item.material,
      item.advance,
      item.balanceFee,
      item.date,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "wallet_report.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-8">

      {/* PAGE TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-[#1a5d68]">Wallet</h1>

        <button
          onClick={downloadExcel}
          className="flex items-center gap-2 bg-[#1a5d68] text-white px-4 py-2 rounded-xl text-sm font-bold"
        >
          <Download size={16} /> Excel Report
        </button>
      </div>

      {/* WALLET SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">
            Wallet Advance Balance
          </p>
          <h2 className="text-3xl font-black text-[#1a5d68] mt-2">
            ₹ 48,000
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase mb-3">
            Apexcel Details
          </p>
          <div className="space-y-1 text-sm font-bold text-[#1a5d68]">
            <p>Company: Apexcel Logistics</p>
            <p>Support: support@apexcel.com</p>
            <p>Phone: +91 90000 00000</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase mb-3">
            Your Details
          </p>
          <div className="space-y-1 text-sm font-bold text-[#1a5d68]">
            <p>Name: Rahul Sharma</p>
            <p>Company: Sharma Traders</p>
            <p>Wallet ID: SHIP1022</p>
          </div>
        </div>

      </div>

      {/* SEARCH */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Search trip number, amount, material..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-bold text-gray-500"
          />
        </div>

        <button className="flex items-center gap-2 border px-4 py-3 rounded-xl text-sm font-bold text-gray-500">
          <Filter size={16} /> Filter
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-black">
            <tr>
              <th className="p-4 text-left">Sr No</th>
              <th className="p-4 text-left">Trip Number</th>
              <th className="p-4 text-left">Source</th>
              <th className="p-4 text-left">Destination</th>
              <th className="p-4 text-left">Material</th>
              <th className="p-4 text-left">Advance</th>
              <th className="p-4 text-left">Balance Fee</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.id} className="border-t">

                <td className="p-4 font-bold text-gray-500">{i + 1}</td>

                <td className="p-4 font-bold text-black">
                  {row.tripNumber}
                </td>

                <td className="p-4 font-bold text-gray-500">
                  {row.source}
                </td>

                <td className="p-4 font-bold text-gray-500">
                  {row.destination}
                </td>

                <td className="p-4 font-bold text-gray-500">
                  {row.material}
                </td>

                <td className="p-4 font-bold text-gray-500">
                  ₹ {row.advance}
                </td>

                <td className="p-4 font-bold text-gray-500">
                  ₹ {row.balanceFee}
                </td>

                <td className="p-4 font-bold text-gray-500">
                  {row.date}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}