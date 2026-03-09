"use client";

import { useState, useMemo } from "react";

type Trip = {
  id: number;
  state: string;
  city: string;
  pincode: string;
  truckType: string;
  material: string;
  language: string;
  source: string;
  destination: string;
  amount: number;
  date: string;
};

const tripsData: Trip[] = [
  {
    id: 101,
    state: "Gujarat",
    city: "Surat",
    pincode: "395001",
    truckType: "Open Truck",
    material: "Steel",
    language: "Hindi",
    source: "Surat",
    destination: "Ahmedabad",
    amount: 15000,
    date: "2026-03-10",
  },
  {
    id: 102,
    state: "Gujarat",
    city: "Vadodara",
    pincode: "390001",
    truckType: "Container",
    material: "Textile",
    language: "English",
    source: "Vadodara",
    destination: "Mumbai",
    amount: 22000,
    date: "2026-03-12",
  },
  {
    id: 103,
    state: "Maharashtra",
    city: "Pune",
    pincode: "411001",
    truckType: "Open Truck",
    material: "Cement",
    language: "Hindi",
    source: "Pune",
    destination: "Rajkot",
    amount: 18000,
    date: "2026-03-15",
  },
];

export default function BookPage() {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [truckType, setTruckType] = useState("");
  const [material, setMaterial] = useState("");
  const [language, setLanguage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredTrips = useMemo(() => {
    return tripsData.filter((trip) => {
      const matchSearch =
        search === "" ||
        trip.id.toString().includes(search) ||
        trip.source.toLowerCase().includes(search.toLowerCase()) ||
        trip.destination.toLowerCase().includes(search.toLowerCase());

      const matchState = state === "" || trip.state === state;
      const matchCity = city === "" || trip.city === city;
      const matchPin = pincode === "" || trip.pincode.includes(pincode);
      const matchTruck = truckType === "" || trip.truckType === truckType;
      const matchMaterial = material === "" || trip.material === material;
      const matchLanguage = language === "" || trip.language === language;

      const matchDate =
        (!startDate || trip.date >= startDate) &&
        (!endDate || trip.date <= endDate);

      return (
        matchSearch &&
        matchState &&
        matchCity &&
        matchPin &&
        matchTruck &&
        matchMaterial &&
        matchLanguage &&
        matchDate
      );
    });
  }, [
    search,
    state,
    city,
    pincode,
    truckType,
    material,
    language,
    startDate,
    endDate,
  ]);

  return (
    <div className="p-6 space-y-6 text-gray-500">

      <h1 className="text-2xl font-bold">Moves / Book Trip</h1>

      {/* FILTER CARD */}
      <div className="bg-white p-5 rounded-xl shadow">

        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search Trip"
            className="border p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">State</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>

          <select
            className="border p-2 rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">City</option>
            <option value="Surat">Surat</option>
            <option value="Vadodara">Vadodara</option>
            <option value="Pune">Pune</option>
          </select>

          <input
            type="text"
            placeholder="Pin Code"
            className="border p-2 rounded"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={truckType}
            onChange={(e) => setTruckType(e.target.value)}
          >
            <option value="">Truck Type</option>
            <option value="Open Truck">Open Truck</option>
            <option value="Container">Container</option>
          </select>

          <select
            className="border p-2 rounded"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="">Material</option>
            <option value="Steel">Steel</option>
            <option value="Textile">Textile</option>
            <option value="Cement">Cement</option>
          </select>

          <select
            className="border p-2 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>

          {/* DATE RANGE FIX */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

            <input
              type="date"
              className="border p-2 rounded w-full min-w-0"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <input
              type="date"
              className="border p-2 rounded w-full min-w-0"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

          </div>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-5 overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="p-3">Trip</th>
              <th className="p-3">City</th>
              <th className="p-3">Truck</th>
              <th className="p-3">Material</th>
              <th className="p-3">Route</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>

            {filteredTrips.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-5">
                  No trips found
                </td>
              </tr>
            ) : (
              filteredTrips.map((trip) => (
                <tr key={trip.id} className="border-b hover:bg-gray-50">

                  <td className="p-3 font-medium">
                    #{trip.id}
                  </td>

                  <td className="p-3">
                    {trip.city} ({trip.state})
                  </td>

                  <td className="p-3">
                    {trip.truckType}
                  </td>

                  <td className="p-3">
                    {trip.material}
                  </td>

                  <td className="p-3">
                    <span className="text-green-600">{trip.source}</span>
                    {" → "}
                    <span className="text-red-600">{trip.destination}</span>
                  </td>

                  <td className="p-3 font-semibold">
                    ₹{trip.amount}
                  </td>

                  <td className="p-3">
                    {trip.date}
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}