import Link from "next/link"

export default function TopProducts() {
  const products = [
    { id: 1, name: "Crweate wh...", items: "100 items", code: "D286588", discount: "5%", price: "$20" },
    { id: 2, name: "Crweate wh...", items: "100 items", code: "D286588", discount: "5%", price: "$30" },
    { id: 3, name: "Crweate wh...", items: "100 items", code: "D286588", discount: "5%", price: "$30" },
    { id: 3, name: "Crweate wh...", items: "100 items", code: "D286588", discount: "5%", price: "$30" },
  ]

  return (
    <div className="bg-[#F4F5F7] rounded-lg  p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
        <Link href="/all-products" className="text-[#7CC84E] underline text-sm font-medium">
          View All
        </Link>
      </div>
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between py-2   hover:bg-[#EFEEF6] p-4 rounded-lg cursor-pointer last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-lg">📦</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <p className="text-xs text-[#C3C4C6]">{product.items}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#C3C4C6]">Bar Code </p>
              <p className="text-sm font-medium text-gray-900">{product.code}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#C3C4C6]">Discount</p>
              <p className="text-sm font-medium text-gray-900">{product.discount}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#C3C4C6]">Price</p>
              <p className="text-sm font-medium text-gray-900">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
