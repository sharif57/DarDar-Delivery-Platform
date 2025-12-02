"use client"

import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, RotateCw, Search, ChevronDown, Plus, Edit2, Trash2, RefreshCw } from "lucide-react"
import { useAllProductListQuery } from "@/redux/feature/productSlice"
import Link from "next/link"



export interface Product {
  id: number;
  name: string;
  description: string;
  shop_name: string;
  shop_image: string;
  category: number;
  subcategory: number;
  image_1: string;
  image_2: string;
  image_3: string;
  currency: string;
  price: string;
  quantity: string;
  delivery_fee: string;
  created_at: string;
  updated_at: string;
  vendor: number;
  shop_info: ShopInfo;
  vendor_subcategories: VendorSubcategory[];
  is_active: boolean;
}

export interface ShopInfo {
  id: number;
  shop_name: string;
  shop_image: string;
  shop_license: string;
  shop_type: string;
  shop_address: string;
  phone_number: string;
  rating: number;
  total_rating_count: number;
}

export interface VendorSubcategory {
  id: number;
  name: string;
  image: string;
  vendor: number;
  category: number;
  category_name: string;
}



export default function Manage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { data, refetch } = useAllProductListQuery(undefined);
  const productss = data?.data
  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL


  const [rotate, setRotate] = useState(false);

  const handleRefresh = () => {
    setRotate(true);     
    refetch();            

    setTimeout(() => setRotate(false), 600); 
  };



  const handleDelete = (id: string, index: number) => {
  }

  const handleEdit = (product: Product) => {
    console.log("Edit product:", product)
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
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 bg-[#F4F5F7] p-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span className="text-[16px] font-normal">Data Refresh</span>
              <RefreshCw
                size={18}
                className={`text-[#5B52A3] transition-transform duration-500 ${rotate ? "rotate-[360deg]" : ""
                  }`}
              />
            </button>

            {/* <span className="text-[16px] font-normal bg-white p-2 rounded text-gray-600">March 25,2024 10:43 Am</span> */}
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
          <Link href="/add-products" className="flex items-center gap-2 px-6 py-2 bg-[#7CC84E] text-white rounded hover:bg-[#7CC84E]/90 transition-colors font-medium">
            <span>Add Products</span>
            <Plus size={18} />
          </Link>
        </div>

        {/* Stats Section */}
        <div className="flex items-center gap-6 mb-6 text-sm">
          <span className="text-gray-700">
            <span className="font-medium text-[#5B52A3]">Total Products:</span> <span className="text-gray-600">All ({data?.products_count})</span>
          </span>
          {/* <span className="text-gray-700">
            <span className="font-medium text-[#5B52A3]">Publish:</span> <span className="text-gray-600">(18)</span>
          </span> */}
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead className="bg-gray-50 border-b border-gray-200 text-center">
                <tr>
                  <th className="px-6 py-4 text- text-lg font-medium text-[#6B6B6B]">S.no</th>
                  <th className="px-6 py-4 text- text-lg font-medium text-[#6B6B6B]">Products Name</th>
                  <th className="px-6 py-4 text- text-lg font-medium text-[#6B6B6B]">Shop Name</th>
                  <th className="px-6 py-4 text- text-lg font-medium text-[#6B6B6B]">Category</th>
                  <th className="px-6 py-4 text- text-lg font-medium text-[#6B6B6B]">Price</th>
                  <th className="px-6 py-4 text- text-lg font-medium text-[#6B6B6B]">Date</th>
                  <th className="px-6 py-4 text- text-lg font-medium text-[#6B6B6B]">Store</th>
                  <th className="px-6 py-4 text- text-lg font-medium text-[#6B6B6B]">Status</th>
                  <th className="px-6 py-4 text- text-lg font-medium text-[#6B6B6B]">Action</th>
                </tr>
              </thead>
              <tbody>
                {productss?.map((product: Product, index: number) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-[16px] text-[#919191]">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medi[16px] text-[#919191] flex items-center gap-3">
                      <img src={IMAGE + product.image_1} alt={product.name} className="w-10 h-10 object-cover rounded-full" />
                      <span>{product.name}</span>
                    </td>
                    <td className="px-6 py-4 text-[16px] text-[#919191]">{product.shop_name}</td>
                    <td className="px-6 py-4 text-[16px] text-[#919191]">{product.category}</td>
                    <td className="px-6 py-4 text-[16px] text-[#919191]">{product.price}</td>
                    <td className="px-6 py-4 text-[16px] text-[#919191]">{new Date(product.created_at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                    </td>
                    <td className="px-6 py-4 text-[16px] text-[#919191]">{product.quantity}</td>
                    <td className="px-6 py-4 text-base">
                      <span
                        className={`px-3 py-1 rounded text-xs font-medium ${product.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {product.is_active ? "Available" : "Unavailable"}
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
                        // onClick={() => handleDelete(product.id)}
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
