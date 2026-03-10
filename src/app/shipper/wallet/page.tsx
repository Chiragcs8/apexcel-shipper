"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  FileSpreadsheet,
  FileText,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Info,
  X,
} from "lucide-react";

type WalletRow = {
  id: number;
  date: string;
  time: string;
  tripNo: string;
  source: string;
  destination: string;
  material: string;
  status: string;
  advance: number;
  balance: number;
};

const DATA: WalletRow[] = [
  {
    id: 1,
    date: "2026-03-05",
    time: "10:30",
    tripNo: "TRP1021",
    source: "Ahmedabad",
    destination: "Mumbai",
    material: "Steel",
    status: "Completed",
    advance: 12000,
    balance: 3000,
  },
  {
    id: 2,
    date: "2026-03-04",
    time: "14:15",
    tripNo: "TRP1022",
    source: "Surat",
    destination: "Pune",
    material: "Textile",
    status: "Pending",
    advance: 8000,
    balance: 2000,
  },
  {
    id: 3,
    date: "2026-03-03",
    time: "09:00",
    tripNo: "TRP1023",
    source: "Vadodara",
    destination: "Delhi",
    material: "Machinery",
    status: "Completed",
    advance: 15000,
    balance: 5000,
  },
];

export default function WalletPage() {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedRow, setSelectedRow] = useState<WalletRow | null>(null);

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    time: "",
    status: "",
  });

  const filtered = DATA.filter((item) => {
    const matchSearch =
      item.tripNo.toLowerCase().includes(search.toLowerCase()) ||
      item.material.toLowerCase().includes(search.toLowerCase()) ||
      item.source.toLowerCase().includes(search.toLowerCase()) ||
      item.destination.toLowerCase().includes(search.toLowerCase()) ||
      item.advance.toString().includes(search);

    const itemDate = new Date(item.date);

    const matchFromDate = filters.fromDate
      ? itemDate >= new Date(filters.fromDate)
      : true;

    const matchToDate = filters.toDate
      ? itemDate <= new Date(filters.toDate)
      : true;

    const matchTime = filters.time ? item.time === filters.time : true;

    const matchStatus = filters.status
      ? item.status === filters.status
      : true;

    return matchSearch && matchFromDate && matchToDate && matchTime && matchStatus;
  });

  const downloadExcel = () => {
    const headers = [
      "Sr No",
      "Date",
      "Trip No",
      "Source",
      "Destination",
      "Status",
      "Advance",
      "Balance",
    ];

    const rows = filtered.map((item, index) => [
      index + 1,
      item.date,
      item.tripNo,
      item.source,
      item.destination,
      item.status,
      item.advance,
      item.balance,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "wallet_report.csv";
    link.click();
  };

  const downloadPDF = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-8 text-gray-500">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-black text-[#1a5d68]">Wallet</h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* COMPANY BANK CARD */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h3 className="text-xs font-black text-gray-400 uppercase mb-4">
            Company Bank Detail
          </h3>

          <div className="space-y-2 text-sm font-bold text-[#1a5d68]">
            <p>Bank Name : Demo Bank</p>
            <p>Holder Name : Apexcel Logistics</p>
            <p>Account No : 1234567890</p>
            <p>IFSC Code : DEMO00012</p>
          </div>
        </div>

        {/* WALLET CARD */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h3 className="text-xs font-black text-gray-400 uppercase mb-4">
            Wallet
          </h3>

          <div className="grid grid-cols-3 gap-6 text-center">

            <div>
              <Wallet className="mx-auto text-[#1a5d68]" size={26} />
              <p className="text-xs text-gray-400 mt-2">Wallet</p>
              <p className="font-black text-[#1a5d68]">₹50,000</p>
            </div>

            <div>
              <ArrowDownCircle className="mx-auto text-green-600" size={26} />
              <p className="text-xs text-gray-400 mt-2">Advance</p>
              <p className="font-black text-green-600">₹20,000</p>
            </div>

            <div>
              <ArrowUpCircle className="mx-auto text-orange-500" size={26} />
              <p className="text-xs text-gray-400 mt-2">Balance</p>
              <p className="font-black text-orange-500">₹30,000</p>
            </div>

          </div>
        </div>
      </div>

      {/* SEARCH + ACTIONS */}
      <div className="flex flex-wrap gap-4 justify-between items-center">

        <div className="relative w-96">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Search trip / amount / source / destination / material"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-bold"
          />
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 border px-4 py-3 rounded-xl text-sm font-bold"
          >
            <Filter size={16} /> Filter
          </button>

          <button
            onClick={downloadExcel}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl text-sm font-bold"
          >
            <FileSpreadsheet size={16} /> Excel
          </button>

          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-xl text-sm font-bold"
          >
            <FileText size={16} /> PDF
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-xs uppercase font-black text-gray-500">
            <tr>
              <th className="p-4 text-left">Sr</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Trip</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Advance</th>
              <th className="p-4 text-left">Balance</th>
              <th className="p-4 text-left">Info</th>
              <th className="p-4 text-left">Ticket</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((row, i) => (

              <tr key={row.id} className="border-t">

                <td className="p-4 font-bold">{i + 1}</td>

                <td className="p-4">
                  {row.date}
                  <p className="text-xs text-gray-400">{row.time}</p>
                </td>

                <td className="p-4">
                  <p className="font-black">{row.tripNo}</p>
                  <p className="text-xs text-gray-400">
                    {row.source} → {row.destination}
                  </p>
                </td>

                <td className="p-4 font-bold text-green-600">
                  {row.status}
                </td>

                <td className="p-4 font-bold text-gray-600">
                  ₹{row.advance}
                </td>

                <td className="p-4 font-bold text-orange-500">
                  ₹{row.balance}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => setSelectedRow(row)}
                    className="text-[#1a5d68]"
                  >
                    <Info size={18} />
                  </button>

                </td>

                <td className="p-4">
                  <button className="text-blue-600 font-bold text-sm">
                    Raise
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* INFO POPUP */}
      {selectedRow && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-2xl p-6 w-[400px] space-y-3">

            <div className="flex justify-between">
              <h3 className="font-black text-[#1a5d68]">Trip Info</h3>
              <button onClick={() => setSelectedRow(null)}>
                <X />
              </button>
            </div>

            <p>Trip : {selectedRow.tripNo}</p>
            <p>Material : {selectedRow.material}</p>
            <p>Source : {selectedRow.source}</p>
            <p>Destination : {selectedRow.destination}</p>
            <p>Advance : ₹{selectedRow.advance}</p>
            <p>Balance : ₹{selectedRow.balance}</p>

          </div>

        </div>
      )}

      {/* FILTER POPUP */}
      {showFilter && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-2xl p-6 w-[420px] space-y-4">

            <div className="flex justify-between">
              <h3 className="font-black text-[#1a5d68]">Filter</h3>
              <button onClick={() => setShowFilter(false)}>
                <X />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) =>
                  setFilters({ ...filters, fromDate: e.target.value })
                }
                className="border p-3 rounded-xl"
              />

              <input
                type="date"
                value={filters.toDate}
                onChange={(e) =>
                  setFilters({ ...filters, toDate: e.target.value })
                }
                className="border p-3 rounded-xl"
              />
            </div>

            <input
              type="time"
              value={filters.time}
              onChange={(e) =>
                setFilters({ ...filters, time: e.target.value })
              }
              className="border p-3 rounded-xl w-full"
            />

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="border p-3 rounded-xl w-full"
            >
              <option value="">All Status</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>

            <div className="flex justify-between">

              <button
                onClick={() =>
                  setFilters({
                    fromDate: "",
                    toDate: "",
                    time: "",
                    status: "",
                  })
                }
                className="text-gray-500 font-bold"
              >
                Reset
              </button>

              <button
                onClick={() => setShowFilter(false)}
                className="bg-[#1a5d68] text-white px-4 py-2 rounded-xl"
              >
                Apply
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}