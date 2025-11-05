"use client"

import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, RotateCw, Search, ChevronDown, Plus, Edit2, Trash2, RefreshCw } from "lucide-react"

interface Product {
  id: string
  name: string
  image: string
  weight: string
  category: string
  price: string
  date: string
  store: number
  status: "Available" | "unavailable" | "Short Stock"
}

export default function Manage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [products, setProducts] = useState<Product[]>([
    {
      id: "#12333",
      name: "Cucumber",
      image: "🥒",
      weight: "500-600gm",
      category: "Foods",
      price: "$15",
      date: "05/12/2024",
      store: 500,
      status: "Available",
    },
    {
      id: "#12333",
      name: "Egg",
      image: "🥚",
      weight: "500-600gm",
      category: "Foods",
      price: "$15",
      date: "05/1/2024",
      store: 50,
      status: "unavailable",
    },
    {
      id: "#12333",
      name: "Cake",
      image: "🍰",
      weight: "500-600gm",
      category: "Foods",
      price: "$15",
      date: "05/12/2024",
      store: 300,
      status: "Available",
    },
    {
      id: "#12333",
      name: "Papaya",
      image: "🧡",
      weight: "500-600gm",
      category: "Foods",
      price: "$15",
      date: "05/12/2024",
      store: 2,
      status: "Short Stock",
    },
    {
      id: "#12333",
      name: "Pineapple",
      image: "🍍",
      weight: "500-600gm",
      category: "Foods",
      price: "$15",
      date: "05/12/2024",
      store: 500,
      status: "Available",
    },
    {
      id: "#12333",
      name: "Pineapple",
      image: "🍌",
      weight: "1kg-1.2kg",
      category: "Foods",
      price: "$10",
      date: "05/12/2024",
      store: 700,
      status: "Available",
    },
    {
      id: "#12333",
      name: "Ice-cream",
      image: "🍦",
      weight: "500-600gm",
      category: "Foods",
      price: "$12",
      date: "05/12/2024",
      store: 800,
      status: "Available",
    },
    {
      id: "#12333",
      name: "Mango",
      image: "🥭",
      weight: "1kg",
      category: "Foods",
      price: "$25",
      date: "05/12/2024",
      store: 900,
      status: "Available",
    },
    {
      id: "#12333",
      name: "Orange",
      image: "🍊",
      weight: "1kg",
      category: "Foods",
      price: "$20",
      date: "05/12/2024",
      store: 100,
      status: "Available",
    },
  ])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id: string, index: number) => {
    setProducts(products.filter((_, i) => i !== index))
  }

  const handleEdit = (product: Product) => {
    console.log("Edit product:", product)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700"
      case "unavailable":
        return "bg-red-100 text-red-700"
      case "Short Stock":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-8 ">
      <div className="p-4 bg-[#fafafa] rounded min-h-screen">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-[16px] font-medium text-[#333333]">Manage Products</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-[#F4F5F7] p-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
              <span className="text-[16px] font-normal">Data Refresh</span>
              <RefreshCw className="text-[#5B52A3]"  size={18} />
            </button>
            <span className="text-[16px] font-normal bg-white p-2 rounded text-gray-600">March 25,2024 10:43 Am</span>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-md relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-16 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#7CC84E] focus:border-transparent"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <button className="flex items-center gap-2 px-16 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors">
                <span className="text-gray-700">{selectedCategory}</span>
                <ChevronDown size={18} className="text-gray-600" />
              </button>
              {/* Dropdown menu would go here */}
            </div>
          </div>

          {/* Add Products Button */}
          <button className="flex items-center gap-2 px-6 py-2 bg-[#7CC84E] text-white rounded hover:bg-[#7CC84E]/90 transition-colors font-medium">
            <span>Add Products</span>
            <Plus size={18} />
          </button>
        </div>

        {/* Stats Section */}
        <div className="flex items-center gap-6 mb-6 text-sm">
          <span className="text-gray-700">
            <span className="font-medium text-[#5B52A3]">Total Products:</span> <span className="text-gray-600">All (160)</span>
          </span>
          <span className="text-gray-700">
            <span className="font-medium text-[#5B52A3]">Publish:</span> <span className="text-gray-600">(18)</span>
          </span>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-[#6B6B6B]">S.no</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-[#6B6B6B]">Products Name</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-[#6B6B6B]">weight</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-[#6B6B6B]">Category</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-[#6B6B6B]">Price</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-[#6B6B6B]">Date</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-[#6B6B6B]">Store</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-[#6B6B6B]">Status</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-[#6B6B6B]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-[16px] text-[#919191]">{idx + 1}</td>
                    <td className="px-6 py-4 text-sm font-medi[16px] text-[#919191] flex items-center gap-3">
                      <span className="text-2xl">{product.image}</span>
                      <span>{product.name}</span>
                    </td>
                    <td className="px-6 py-4 text-[16px] text-[#919191]">{product.weight}</td>
                    <td className="px-6 py-4 text-[16px] text-[#919191]">{product.category}</td>
                    <td className="px-6 py-4 text-[16px] text-[#919191]">{product.price}</td>
                    <td className="px-6 py-4 text-[16px] text-[#919191]">{product.date}</td>
                    <td className="px-6 py-4 text-[16px] text-[#919191]">{product.store}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, idx)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
