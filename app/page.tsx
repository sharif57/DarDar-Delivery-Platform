/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import {  useEffect, useState } from "react"
import TopProducts from "@/components/top-products"
import ProductsList from "@/components/products-list"
import AnalyticsPage from "@/components/AnalyticsPage"
import StartCard from "@/components/starts-card"
import History from "@/components/history"
import VendorRequestTable from "@/components/vendor-request"

const salesData = [
  { month: "Jan", sales: 40 },
  { month: "Feb", sales: 60 },
  { month: "Mar", sales: 50 },
  { month: "Apr", sales: 80 },
  { month: "May", sales: 70 },
  { month: "Jun", sales: 90 },
  { month: "Jul", sales: 70 },
  { month: "Aug", sales: 85 },
  { month: "Sep", sales: 75 },
  { month: "Oct", sales: 95 },
  { month: "Nov", sales: 110 },
  { month: "Dec", sales: 60 },
];


export default function Dashboard() {
  const [role, setRole] = useState("");
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, [])

  return (
    <div className="p-8  min-h-screen">
      <div className="bg-white p-4 rounded-lg">

        <div className="mb-8">
          {
            role === 'vendor' ? <StartCard /> : <History />
          }
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2  gap-6 mb-8">
          {/* Sales Overview */}
          <div className="bg-[#F4F5F7] rounded-lg  p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#30B200CF" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#58FF8500" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#30B200"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>

          </div>

          {/* Top Products */}
          {
            role === "vendor" ? (
              <div className="bg-[#F4F5F7] rounded-lg  p-6">
                <TopProducts />
              </div>
            ) : (
              <div className="">
                <AnalyticsPage />
              </div>
            )
          }
        </div>

        {/* Products List */}
        {
          role === "vendor" ? <ProductsList /> : <VendorRequestTable />
        }
        {/* <ProductsList />
        <VendorRequestTable /> */}
      </div>
    </div>
  )
}
