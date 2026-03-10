"use client";

import { useState } from "react";
import {
  Wallet,
  IndianRupee,
  Download,
  FileText,
  Search,
  Filter,
  Info,
  Copy,
} from "lucide-react";

type WalletRow = {
  id: number;
  date: string;
  tripNo: string;
  source: string;
  destination: string;
  material: string;
  advance: number;
  balance: number;
  status: string;
};

const DATA: WalletRow[] = [
  {
    id: 1,
    date: "2026-03-05",
    tripNo: "TRIP1021",
    source: "Ahmedabad",
    destination: "Mumbai",
    material: "Steel",
    advance: 12000,
    balance: 3000,
    status: "Completed",
  },
  {
    id: 2,
    date: "2026-03-04",
    tripNo: "TRIP1022",
    source: "Surat",
    destination: "Pune",
    material: "Textile",
    advance: 8000,
    balance: 2000,
    status: "Running",
  },
  {
    id: 3,
    date: "2026-03-03",
    tripNo: "TRIP1023",
    source: "Vadodara",
    destination: "Delhi",
    material: "Machinery",
    advance: 15000,
    balance: 5000,
    status: "Completed",
  },
];

export default function WalletPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selected, setSelected] = useState<WalletRow | null>(null);

  const filtered = DATA.filter((item) => {
    const text =
      item.tripNo +
      item.source +
      item.destination +
      item.material +
      item.advance;

    const matchSearch = text.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status ? item.status === status : true;

    const matchDate =
      (!startDate || item.date >= startDate) &&
      (!endDate || item.date <= endDate);

    return matchSearch && matchStatus && matchDate;
  });

  const totalAdvance = DATA.reduce((a, b) => a + b.advance, 0);
  const totalBalance = DATA.reduce((a, b) => a + b.balance, 0);

  return (
    <div className="p-6 space-y-6">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-black text-[#1a5d68]">Wallet</h1>

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* COMPANY BANK DETAIL */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h3 className="text-xs font-black text-gray-400 uppercase mb-4">
            Company Bank Detail
          </h3>

          <div className="space-y-2 text-sm font-bold text-[#1a5d68]">
            <p>Bank Name : Demo Bank</p>
            <p>Holder Name : Apexcel Logistics</p>
            <p>Account No : 12345678900</p>
            <p>IFSC Code : DEMO000123</p>
          </div>
        </div>

        {/* WALLET CARD */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h3 className="text-xs font-black text-gray-400 uppercase mb-4">
            Wallet
          </h3>

          <div className="grid grid-cols-3 gap-4">

            <WalletStat
              icon={<Wallet />}
              label="Wallet"
              value={totalAdvance + totalBalance}
            />

            <WalletStat
              icon={<IndianRupee />}
              label="Advance"
              value={totalAdvance}
            />

            <WalletStat
              icon={<IndianRupee />}
              label="Balance"
              value={totalBalance}
            />

          </div>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-wrap gap-4 items-end">

        <div className="relative w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search trip / amount / route..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 py-2 border rounded-xl text-sm"
          />
        </div>

        <input
          type="date"
          className="border rounded-xl px-3 py-2 text-sm"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="border rounded-xl px-3 py-2 text-sm"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <select
          className="border rounded-xl px-3 py-2 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option>Completed</option>
          <option>Running</option>
        </select>

        <button className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm">
          <Filter size={16} /> Apply
        </button>

        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm">
          <Download size={16} /> Excel
        </button>

        <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl text-sm">
          <FileText size={16} /> PDF
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-black">
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

                <td className="p-4">{i + 1}</td>

                <td className="p-4">{row.date}</td>

                <td className="p-4">
                  <p className="font-bold">{row.tripNo}</p>
                  <p className="text-xs text-gray-400">
                    {row.source} → {row.destination}
                  </p>
                </td>

                <td className="p-4">{row.status}</td>

                <td className="p-4">₹ {row.advance}</td>

                <td className="p-4">₹ {row.balance}</td>

                <td className="p-4">
                  <button
                    onClick={() => setSelected(row)}
                    className="text-[#1a5d68]"
                  >
                    <Info size={18} />
                  </button>
                </td>

                <td className="p-4 text-blue-600 font-bold cursor-pointer">
                  Ticket
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* INFO POPUP */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-[400px] relative">

            <button
              onClick={() => navigator.clipboard.writeText(JSON.stringify(selected))}
              className="absolute top-3 right-3"
            >
              <Copy size={16} />
            </button>

            <h3 className="font-black text-lg mb-4">Trip Info</h3>

            <div className="space-y-2 text-sm">
              <p>Trip : {selected.tripNo}</p>
              <p>Route : {selected.source} → {selected.destination}</p>
              <p>Material : {selected.material}</p>
              <p>Advance : ₹ {selected.advance}</p>
              <p>Balance : ₹ {selected.balance}</p>
              <p>Status : {selected.status}</p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-5 bg-[#1a5d68] text-white px-4 py-2 rounded-lg text-sm"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

function WalletStat({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
      <div className="text-[#1a5d68]">{icon}</div>

      <div>
        <p className="text-xs font-bold text-gray-400 uppercase">{label}</p>
        <p className="text-lg font-black text-[#1a5d68]">₹ {value}</p>
      </div>
    </div>
  );
}