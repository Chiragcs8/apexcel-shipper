"use client";

import { useEffect, useState } from "react";

type Shipment = {
  id: string;
  origin: string;
  destination: string;
  status: string;
  price: string;
  date: string;
};

export default function ShipperDashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  const dashboardStats = [
    { title: "Total Shipments", value: 124 },
    { title: "Active Shipments", value: 18 },
    { title: "Completed Shipments", value: 96 },
    { title: "Pending Requests", value: 10 },
  ];

  useEffect(() => {
    const dummyShipments: Shipment[] = [
      {
        id: "SH001",
        origin: "Ahmedabad",
        destination: "Mumbai",
        status: "In Transit",
        price: "₹12,500",
        date: "10 Mar 2026",
      },
      {
        id: "SH002",
        origin: "Delhi",
        destination: "Surat",
        status: "Delivered",
        price: "₹18,200",
        date: "08 Mar 2026",
      },
      {
        id: "SH003",
        origin: "Vadodara",
        destination: "Pune",
        status: "Pending",
        price: "₹9,800",
        date: "07 Mar 2026",
      },
      {
        id: "SH004",
        origin: "Rajkot",
        destination: "Jaipur",
        status: "In Transit",
        price: "₹14,300",
        date: "06 Mar 2026",
      },
    ];

    setShipments(dummyShipments);
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-800">
          Shipper Dashboard
        </h1>
        <p className="text-sm text-zinc-500">
          Overview of your shipment activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm"
          >
            <p className="text-sm text-zinc-500">{stat.title}</p>
            <h2 className="text-2xl font-bold text-[#268999] mt-2">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Shipment Table */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-zinc-200">
          <h2 className="text-lg font-semibold text-zinc-800">
            Recent Shipments
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50">
              <tr className="text-left text-zinc-500">
                <th className="p-4">Shipment ID</th>
                <th className="p-4">Origin</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Date</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {shipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="border-t border-zinc-100"
                >
                  <td className="p-4 font-medium text-zinc-700">
                    {shipment.id}
                  </td>
                  <td className="p- text-zinc-700">{shipment.origin}</td>
                  <td className="p- text-zinc-700">{shipment.destination}</td>
                  <td className="p- text-zinc-700">{shipment.date}</td>
                  <td className="p- text-zinc-700">{shipment.price}</td>
                  <td className="p- text-zinc-700">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      {shipment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}