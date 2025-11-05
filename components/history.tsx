"use client";

export default function History() {
  const stats = [
    { title: "Total Orders", value: 125 },
    { title: "Total Grocery", value: 500 },
    { title: "Total Restaurant", value: 300 },
    { title: "Total Complete Order", value: 200 },
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
