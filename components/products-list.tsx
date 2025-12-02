'use client';
import { useAllProductListQuery } from "@/redux/feature/productSlice"
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



export default function ProductsList() {
  const { data } = useAllProductListQuery(undefined);
  const products = data?.data
  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL
  return (
    <div className="bg-[#F4F5F7] rounded-lg  overflow-hidden p-4">
      <div className="">
        {/* <h2 className="text-lg font-bold text-gray-900">Products List</h2> */}
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-xl font-semibold text-[#2F2F2F]">Products List</h2>
          <a href="#" className="text-[#7CC84E] underline text-sm font-medium">
            Total : {data?.products_count}.
          </a>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-center">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-lg font-medium text-gray-700">Products ID</th>
              <th className="px-6 py-3 text-lg font-medium text-gray-700">Products Name</th>
              <th className="px-6 py-3 text-lg font-medium text-gray-700">Shop Name</th>
              <th className="px-6 py-3 text-lg font-medium text-gray-700">Category</th>
              <th className="px-6 py-3 text-lg font-medium text-gray-700">Price</th>
              <th className="px-6 py-3 text-lg font-medium text-gray-700">Quantity</th>
              <th className="px-6 py-3 text-lg font-medium text-gray-700">Status</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product: Product) => (
              <tr key={product.id} className="cursor-pointer hover:bg-gray-50">
                <td className="px-6 py-4 text-base text-gray-600">{product.id}</td>
                <td className="px-6 py-4 text-base font-medium text-gray-900 flex items-center justify-center gap-2">
                  <img src={IMAGE + product.image_1} alt={product.name} className="w-10 h-10 object-cover" />
                  {product.name}
                </td>
                <td className="px-6 py-4 text-base text-gray-600">{product.shop_name}</td>
                <td className="px-6 py-4 text-base text-gray-600">{product.category}</td>
                <td className="px-6 py-4 text-base text-gray-600">{product.price}</td>
                <td className="px-6 py-4 text-base text-gray-600">{product.quantity}</td>
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

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
