"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const chartData = [
  { name: "Jan", Grocery: 550, Restaurant: 950 },
  { name: "Feb", Grocery: 420, Restaurant: 750 },
  { name: "Mar", Grocery: 320, Restaurant: 580 },
  { name: "Apr", Grocery: 420, Restaurant: 750 },
  { name: "May", Grocery: 350, Restaurant: 600 },
  { name: "Jun", Grocery: 400, Restaurant: 680 },
  { name: "Jul", Grocery: 480, Restaurant: 800 },
  { name: "Aug", Grocery: 380, Restaurant: 680 },
  { name: "Sep", Grocery: 380, Restaurant: 700 },
  { name: "Oct", Grocery: 380, Restaurant: 700 },
  { name: "Nov", Grocery: 380, Restaurant: 680 },
  { name: "Dec", Grocery: 380, Restaurant: 680 },
]

export default function AnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false)

  return (
    <div className=" bg-[#F4F5F7] rounded-lg p-6">
      <div className="">
        {/* Header Section */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <h1 className="text-[16px] font-medium text-[#333333]">Restaurant & Grocery Overview</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-700">Grocery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm font-medium text-gray-700">Restaurant</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600">Overly Growth</p>
                <p className="mt-1 text-sm font-medium text-gray-[#333333]">78.18%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly</p>
                <p className="mt-1 text-sm font-medium text-gray-[#333333]">48.00%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Day</p>
                <p className="mt-1 text-sm font-medium text-gray-[#333333]">89.80%</p>
              </div>
            </div>
          </div>

          {/* Year Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {selectedYear}
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* Dropdown Menu */}
            {isYearDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 rounded-lg border border-gray-200 bg-white shadow-lg">
                {["2024", "2023", "2022", "2021"].map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year)
                      setIsYearDropdownOpen(false)
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm ${
                      selectedYear === year ? "bg-blue-50 font-medium text-blue-700" : "text-gray-700 hover:bg-gray-50"
                    } ${year === "2024" ? "border-b border-gray-200" : ""}`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: "12px", fontWeight: "500" }} />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} ticks={[0, 200, 400, 600, 800, 1000]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                }}
              />
              {/* <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" /> */}
              <Bar dataKey="Grocery" fill="#89B12C" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Restaurant" fill="#DD5621" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
