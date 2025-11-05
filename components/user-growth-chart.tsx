// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useDashboardQuery } from "@/redux/feature/userSlice";

// import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

// const data = [
//   { month: "Jan", value: 250 },
//   { month: "Feb", value: 300 },
//   { month: "Mar", value: 500 },
//   { month: "Apr", value: 450 },
//   { month: "May", value: 650 },
//   { month: "Jun", value: 600 },
//   { month: "Jul", value: 400 },
//   { month: "Aug", value: 550 },
//   { month: "Sep", value: 500 },
//   { month: "Oct", value: 300 },
//   { month: "Nov", value: 450 },
//   { month: "Dec", value: 400 },
// ];

// export function UserGrowthChart() {
//   const { data } = useDashboardQuery(undefined);

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <div>
//             <CardTitle>User Growth</CardTitle>
//             <p className="text-sm text-gray-600">1 Jan 24 - 5 Jan 25</p>
//           </div>

//         </div>
//         <div className="text-center">
//           <p className="text-2xl font-bold">Total 4065</p>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={500}>
//           <BarChart data={data}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Bar dataKey="value" fill="#D69D21" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardQuery } from "@/redux/feature/userSlice";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton"; // Optional: for loading state

// Helper: Convert "2025-10" → { month: "Oct", value: 1 }
const formatUserGrowthData = (userGrowth: Record<string, number> = {}) => {
  const monthMap: { [key: string]: string } = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
    "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
    "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
  };

  return Object.entries(userGrowth)
    .map(([key, value]) => {
      const [year, month] = key.split("-");
      return {
        month: monthMap[month] || month,
        value,
        fullMonth: `${monthMap[month] || month} ${year}`
      };
    })
    .sort((a, b) => {
      // Sort chronologically
      const dateA = new Date(a.fullMonth + " 1");
      const dateB = new Date(b.fullMonth + " 1");
      return dateA.getTime() - dateB.getTime();
    });
};

export function UserGrowthChart() {
  const { data, isLoading, isError } = useDashboardQuery(undefined);

  // Extract API data
  const apiData = data?.data;
  const chartData = apiData ? formatUserGrowthData(apiData.user_growth) : [];
  const totalUsers = apiData?.total_users ?? 0;

  // Date range
  const months = chartData.map(d => d.month);
  const dateRange = months.length > 0
    ? `${months[0]} - ${months[months.length - 1]} 2025`
    : "No data";

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !apiData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Failed to load data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">User Growth</CardTitle>
            <p className="text-sm text-gray-600">{dateRange}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#D69D21]">{totalUsers}</p>
            <p className="text-xs text-gray-500">Total Users</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-96 flex items-center justify-center text-gray-500">
            No user growth data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e0e0e0",
                  borderRadius: 8
                }}
                cursor={{ fill: "rgba(214, 157, 33, 0.1)" }}
              />
              <Bar 
                dataKey="value" 
                fill="#D69D21" 
                radius={[8, 8, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}