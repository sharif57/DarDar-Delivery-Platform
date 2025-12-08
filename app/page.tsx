/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import TopProducts from "@/components/top-products"
import ProductsList from "@/components/products-list"
import AnalyticsPage from "@/components/AnalyticsPage"
import StartCard from "@/components/starts-card"
import History from "@/components/history"
import VendorRequestTable from "@/components/vendor-request"
import { useUserProfileQuery } from "@/redux/feature/userSlice"
import { useDashboardQuery } from "@/redux/feature/dashboardSlice"



export default function Dashboard() {

  const { data: dashboard, isFetching } = useDashboardQuery(undefined);

  const { data } = useUserProfileQuery(undefined);
  const role = data?.data?.role
  // const [role, setRole] = useState("");
  // useEffect(() => {
  //   const storedRole = localStorage.getItem("userRole");
  //   if (storedRole) {
  //     setRole(storedRole);
  //   }
  // }, [])

  // Prepare chart data
  const groupedData = dashboard?.data?.reduce((acc: any, item: any) => {
    const date = new Date(item.final_delivery_time);
    const month = date.toLocaleString("en-US", { month: "short", year: "numeric" });

    const fee = Number(item.admin_fee);

    // If this month already exists → add
    if (acc[month]) {
      acc[month] += fee;
    } else {
      acc[month] = fee;
    }

    return acc;
  }, {});


  const chartData = Object.entries(groupedData || {})
    .map(([month, totalFee]: any) => ({
      month,
      admin_fee: totalFee,
      date: new Date(month),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (isFetching) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="p-8  min-h-screen">
      <div className="bg-white p-4 rounded-lg">

        <div className="mb-8">
          {
            role === 'VENDOR' ? <StartCard /> : <History />
          }
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2  gap-6 mb-8">
          {/* Sales Overview */}
          <div className="bg-[#F4F5F7] rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h2>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
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
                  dataKey="admin_fee"
                  stroke="#30B200"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>

          </div>


          {/* Top Products */}
          {
            role === "VENDOR" ? (
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
          role === "VENDOR" ? <ProductsList /> : <VendorRequestTable />
        }
        {/* <ProductsList />
        <VendorRequestTable /> */}
      </div>
    </div>
  )
}
