"use client";

import { useDashboardQuery } from "@/redux/feature/dashboardSlice";

export default function History() {
  const { data } = useDashboardQuery(undefined);
  console.log(data?.data, 'dashboard')
  const stats = [
    { title: "Total Orders", value: data?.total_orders || 0 },
    { title: "Total Grocery", value: data?.total_grocery || 0 },
    { title: "Total Restaurant", value: data?.total_restaurent || 0 },
    { title: "Total Complete Order", value: data?.total_delivered_orders || 0 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
        >
          <h3 className="text-gray-600 text-xl font-medium">{item.title}</h3>
          <p className="text-[40px] font-medium text-gray-900 mt-2">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
