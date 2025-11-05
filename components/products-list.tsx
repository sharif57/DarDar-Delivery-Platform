export default function ProductsList() {
  const products = [
    {
      id: "#12333",
      name: "Papaya",
      category: "Foods",
      price: "$15",
      quantity: "500-600gm",
      stock: 120,
      status: "Available",
    },
    {
      id: "#12333",
      name: "Pineapple",
      category: "Foods",
      price: "$10",
      quantity: "500-600gm",
      stock: 120,
      status: "unavailable",
    },
    {
      id: "#12333",
      name: "Ice-cream",
      category: "Foods",
      price: "$12",
      quantity: "500-600gm",
      stock: 120,
      status: "Available",
    },
    { id: "#12333", name: "Mango", category: "Foods", price: "$25", quantity: "kg", stock: 120, status: "Available" },
    {
      id: "#12333",
      name: "Orange",
      category: "Cleaning",
      price: "$20",
      quantity: "kg",
      stock: 120,
      status: "Available",
    },
  ]

  return (
    <div className="bg-[#F4F5F7] rounded-lg  overflow-hidden p-4">
      <div className="">
        {/* <h2 className="text-lg font-bold text-gray-900">Products List</h2> */}
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-xl font-semibold text-[#2F2F2F]">Products List</h2>
          <a href="#" className="text-[#7CC84E] underline text-sm font-medium">
            View All
          </a>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 ">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Products ID</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Products Name</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Quantity</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Stock</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx} className=" cursor-pointer hover:bg-gray-50">
                <td className="px-6 py-4 text-base text-gray-600">{product.id}</td>
                <td className="px-6 py-4 text-base font-medium text-gray-900 flex items-center gap-2">
                  <span className="text-lg">🍎</span>
                  {product.name}
                </td>
                <td className="px-6 py-4 text-base text-gray-600">{product.category}</td>
                <td className="px-6 py-4 text-base text-gray-600">{product.price}</td>
                <td className="px-6 py-4 text-base text-gray-600">{product.quantity}</td>
                <td className="px-6 py-4 text-base text-gray-600">{product.stock}</td>
                <td className="px-6 py-4 text-base">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${product.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
