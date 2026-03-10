"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Info,
  Pencil,
  Ticket,
  Trash2,
  Plus,
  X,
} from "lucide-react";

type Trip = {
  id: number;
  date: string;
  tripNo: string;
  source: string;
  destination: string;
  status: string;
  interest: number;
  matches: number;
  material: string;
};

const DATA: Trip[] = [
  {
    id: 1,
    date: "2026-03-10",
    tripNo: "TRIP1001",
    source: "Ahmedabad",
    destination: "Mumbai",
    status: "Pending",
    interest: 4,
    matches: 2,
    material: "Steel",
  },
  {
    id: 2,
    date: "2026-03-09",
    tripNo: "TRIP1002",
    source: "Surat",
    destination: "Delhi",
    status: "Active",
    interest: 7,
    matches: 3,
    material: "Textile",
  },
];

export default function BookPage() {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Trip | null>(null);
  const [selected, setSelected] = useState<Trip | null>(null);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    status: "",
    interest: "",
    matches: "",
  });

  const filtered = DATA.filter((item) => {
    const text =
      item.tripNo +
      item.source +
      item.destination +
      item.status +
      item.material;

    const matchSearch = text.toLowerCase().includes(search.toLowerCase());

    const matchDate =
      (!filters.from || item.date >= filters.from) &&
      (!filters.to || item.date <= filters.to);

    const matchStatus = filters.status
      ? item.status === filters.status
      : true;

    const matchInterest = filters.interest
      ? item.interest >= Number(filters.interest)
      : true;

    const matchMatches = filters.matches
      ? item.matches >= Number(filters.matches)
      : true;

    return (
      matchSearch &&
      matchDate &&
      matchStatus &&
      matchInterest &&
      matchMatches
    );
  });

  return (
    <div className="p-6 space-y-6 text-gray-500">

      {/* TITLE */}
      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-black text-[#1a5d68]">
          Book Truck
        </h1>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-[#1a5d68] text-white px-4 py-2 rounded-xl text-sm"
        >
          <Plus size={16} /> Create
        </button>

      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-wrap gap-4 items-center">

        <div className="relative w-80">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search trip / source / destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 py-2 border rounded-xl text-sm"
          />

        </div>

        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm"
        >
          <Filter size={16} /> Filter
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
              <th className="p-4 text-left">Interest</th>
              <th className="p-4 text-left">Matches</th>
              <th className="p-4 text-left">Actions</th>
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

                <td className="p-4">{row.interest}</td>

                <td className="p-4">{row.matches}</td>

                <td className="p-4 flex gap-3">

                  <button
                    onClick={() => setSelected(row)}
                    className="text-[#1a5d68]"
                  >
                    <Info size={18} />
                  </button>

                  <button
                    onClick={() => setEditing(row)}
                    className="text-blue-600"
                  >
                    <Pencil size={18} />
                  </button>

                  <button className="text-orange-500">
                    <Ticket size={18} />
                  </button>

                  <button className="text-red-500">
                    <Trash2 size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* INFO POPUP */}

      {selected && (

        <Popup
          title="Trip Info"
          onClose={() => setSelected(null)}
        >

          <div className="space-y-2 text-sm">

            <p>Trip : {selected.tripNo}</p>

            <p>
              Route : {selected.source} → {selected.destination}
            </p>

            <p>Status : {selected.status}</p>

            <p>Interest : {selected.interest}</p>

            <p>Matches : {selected.matches}</p>

            <p>Material : {selected.material}</p>

          </div>

        </Popup>

      )}

      {/* CREATE POPUP */}

      {showCreate && (

        <TripForm
          title="Create Trip"
          onClose={() => setShowCreate(false)}
        />

      )}

      {/* EDIT POPUP */}

      {editing && (

        <TripForm
          title="Edit Trip"
          onClose={() => setEditing(null)}
        />

      )}

      {/* FILTER POPUP */}

      {showFilter && (

        <Popup
          title="Filter"
          onClose={() => setShowFilter(false)}
        >

          <div className="space-y-3">

            <div className="grid grid-cols-2 gap-3">

              <input
                type="date"
                className="border rounded-xl px-3 py-2 text-sm"
                onChange={(e) =>
                  setFilters({ ...filters, from: e.target.value })
                }
              />

              <input
                type="date"
                className="border rounded-xl px-3 py-2 text-sm"
                onChange={(e) =>
                  setFilters({ ...filters, to: e.target.value })
                }
              />

            </div>

            <select
              className="border rounded-xl px-3 py-2 text-sm w-full"
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All Status</option>
              <option>Pending</option>
              <option>Active</option>
              <option>Closed</option>
            </select>

            <input
              placeholder="Min Interest"
              type="number"
              className="border rounded-xl px-3 py-2 text-sm w-full"
              onChange={(e) =>
                setFilters({ ...filters, interest: e.target.value })
              }
            />

            <input
              placeholder="Min Matches"
              type="number"
              className="border rounded-xl px-3 py-2 text-sm w-full"
              onChange={(e) =>
                setFilters({ ...filters, matches: e.target.value })
              }
            />

          </div>

        </Popup>

      )}

    </div>
  );
}

/* ---------- POPUP ---------- */

function Popup({
  title,
  children,
  onClose,
}: {
  title: string;
  children: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-2xl p-6 w-[420px] relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3"
        >
          <X size={18} />
        </button>

        <h3 className="font-black text-lg mb-4">{title}</h3>

        {children}

      </div>

    </div>
  );
}

/* ---------- CREATE / EDIT FORM ---------- */

function TripForm({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <Popup title={title} onClose={onClose}>

      <div className="space-y-3">

        <input
          placeholder="Trip No"
          className="border rounded-xl px-3 py-2 text-sm w-full"
        />

        <input
          placeholder="Source"
          className="border rounded-xl px-3 py-2 text-sm w-full"
        />

        <input
          placeholder="Destination"
          className="border rounded-xl px-3 py-2 text-sm w-full"
        />

        <input
          placeholder="Material"
          className="border rounded-xl px-3 py-2 text-sm w-full"
        />

        <button className="w-full bg-[#1a5d68] text-white py-2 rounded-xl text-sm">
          Save
        </button>

      </div>

    </Popup>
  );
}