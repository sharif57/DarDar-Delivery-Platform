// "use client"

// import { useState } from "react"
// import { ChevronLeft, RefreshCw } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useTotalOrdersQuery } from "@/redux/feature/vendorSlice"

// interface Order {
//   id: number
//   product: string
//   productImage: string
//   price: number
//   deliveryFee: number
//   quantity: number
//   shopName: string
//   date?: string
//   itemCount?: number
//   deliveryPerson: {
//     name: string
//     phone: string
//     avatar: string
//   }
//   status: "Processing" | "Completed" | "Cancelled"
// }

// const currentOrders: Order[] = [
//   {
//     id: 1,
//     product: "Hawaiian Pizza",
//     productImage: "/image/logo.png",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 21,
//     shopName: "Stanford",
//     deliveryPerson: {
//       name: "Foysol Rahman",
//       phone: "+1 (236) 555-0168",
//       avatar: "/male-avatar-1.jpg",
//     },
//     status: "Processing",
//   },
//   {
//     id: 2,
//     product: "Hawaiian Pizza",
//     productImage: "/hawaiian-pizza.jpg",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 12,
//     shopName: "Spring Foods",
//     deliveryPerson: {
//       name: "Jaswaad Hossain",
//       phone: "+1 (236) 555-0168",
//       avatar: "/male-avatar-2.jpg",
//     },
//     status: "Completed",
//   },
//   {
//     id: 3,
//     product: "Hawaiian Pizza",
//     productImage: "/hawaiian-pizza.jpg",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 21,
//     shopName: "Scroll Through",
//     deliveryPerson: {
//       name: "Al-Amin",
//       phone: "+1 (236) 555-0168",
//       avatar: "/male-avatar-3.jpg",
//     },
//     status: "Completed",
//   },
//   {
//     id: 4,
//     product: "Hawaiian Pizza",
//     productImage: "/hawaiian-pizza.jpg",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 21,
//     shopName: "Widehaven",
//     deliveryPerson: {
//       name: "Alomgir Kabir",
//       phone: "+1 (236) 555-0168",
//       avatar: "/male-avatar-4.jpg",
//     },
//     status: "Cancelled",
//   },
//   {
//     id: 5,
//     product: "Hawaiian Pizza",
//     productImage: "/hawaiian-pizza.jpg",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 21,
//     shopName: "Come To Market",
//     deliveryPerson: {
//       name: "Ashiqur Rahman",
//       phone: "+1 (236) 555-0168",
//       avatar: "/male-avatar-5.jpg",
//     },
//     status: "Processing",
//   },
//   {
//     id: 6,
//     product: "Hawaiian Pizza",
//     productImage: "/hawaiian-pizza.jpg",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 21,
//     shopName: "Spring Mart Grocery",
//     deliveryPerson: {
//       name: "Fahim Ahmed",
//       phone: "+1 (236) 555-0168",
//       avatar: "/male-avatar-6.jpg",
//     },
//     status: "Processing",
//   },
//   {
//     id: 7,
//     product: "Hawaiian Pizza",
//     productImage: "/hawaiian-pizza.jpg",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 21,
//     shopName: "Made with Love",
//     deliveryPerson: {
//       name: "Benedict Fling Bran",
//       phone: "+1 (236) 555-0168",
//       avatar: "https://github.com/evilrabbit.png",
//     },
//     status: "Processing",
//   },
// ]

// const totalOrders: Order[] = [
//   {
//     id: 1,
//     product: "Hawaiian Pizza",
//     productImage: "/image/logo.png",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 21,
//     shopName: "Stanford",
//     date: "05/12/2024",
//     itemCount: 3,
//     deliveryPerson: {
//       name: "Foysol Rahman",
//       phone: "+1 (236) 555-0168",
//       avatar: "https://github.com/evilrabbit.png",
//     },
//     status: "Completed",
//   },
//   {
//     id: 2,
//     product: "Hawaiian Pizza",
//     productImage: "/hawaiian-pizza.jpg",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 12,
//     shopName: "Spring Foods",
//     date: "05/12/2024",
//     itemCount: 4,
//     deliveryPerson: {
//       name: "Jaswaad Hossain",
//       phone: "+1 (236) 555-0168",
//       avatar: "/male-avatar-2.jpg",
//     },
//     status: "Completed",
//   },
//   {
//     id: 3,
//     product: "Hawaiian Pizza",
//     productImage: "/hawaiian-pizza.jpg",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 21,
//     shopName: "Scroll Through",
//     date: "05/12/2024",
//     itemCount: 3,
//     deliveryPerson: {
//       name: "Al-Amin",
//       phone: "+1 (236) 555-0168",
//       avatar: "/male-avatar-3.jpg",
//     },
//     status: "Completed",
//   },
//   {
//     id: 4,
//     product: "Hawaiian Pizza",
//     productImage: "/hawaiian-pizza.jpg",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 21,
//     shopName: "Widehaven",
//     date: "05/12/2024",
//     itemCount: 3,
//     deliveryPerson: {
//       name: "Alomgir Kabir",
//       phone: "+1 (236) 555-0168",
//       avatar: "/male-avatar-4.jpg",
//     },
//     status: "Cancelled",
//   },
//   {
//     id: 5,
//     product: "Hawaiian Pizza",
//     productImage: "/hawaiian-pizza.jpg",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 21,
//     shopName: "Come To Market",
//     date: "05/12/2024",
//     itemCount: 3,
//     deliveryPerson: {
//       name: "Ashiqur Rahman",
//       phone: "+1 (236) 555-0168",
//       avatar: "/male-avatar-5.jpg",
//     },
//     status: "Completed",
//   },
//   {
//     id: 6,
//     product: "Hawaiian Pizza",
//     productImage: "/hawaiian-pizza.jpg",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 21,
//     shopName: "Spring Mart Grocery",
//     date: "05/12/2024",
//     itemCount: 3,
//     deliveryPerson: {
//       name: "Fahim Ahmed",
//       phone: "+1 (236) 555-0168",
//       avatar: "/male-avatar-6.jpg",
//     },
//     status: "Completed",
//   },
//   {
//     id: 7,
//     product: "Hawaiian Pizza",
//     productImage: "/hawaiian-pizza.jpg",
//     price: 121,
//     deliveryFee: 121,
//     quantity: 21,
//     shopName: "Made with Love",
//     date: "05/12/2024",
//     itemCount: 3,
//     deliveryPerson: {
//       name: "Benedict Fling Bran",
//       phone: "+1 (236) 555-0168",
//       avatar: "/male-avatar-7.jpg",
//     },
//     status: "Completed",
//   },
// ]

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "Processing":
//       return "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
//     case "Completed":
//       return "bg-green-500 text-white hover:bg-green-500"
//     case "Cancelled":
//       return "bg-red-500 text-white hover:bg-red-500"
//     default:
//       return "bg-[#686868] text-gray-700"
//   }
// }

// export default function OrderPage() {
//   const [activeTab, setActiveTab] = useState<"total" | "current">("total")
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const { data } = useTotalOrdersQuery(undefined);
//   console.log(data?.data , '============!!')

//   const handleRefresh = () => {
//     setIsRefreshing(true)
//     setTimeout(() => setIsRefreshing(false), 1000)
//   }

//   const orders = activeTab === "total" ? totalOrders : currentOrders

//   return (
//     <div className="min-h-screen  p-8">
//       <div className="p-4 bg-white rounded-lg">
//         {/* Header with Tabs and Refresh Button */}
//         <div className="mb-6">
//           {/* Back button and tab navigation */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <button className="rounded-md p-2 hover:bg-white">
//                 <ChevronLeft className="h-5 w-5 text-gray-700" />
//               </button>
//               <div className="flex items-center gap-6">
//                 <button
//                   onClick={() => setActiveTab("total")}
//                   className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === "total"
//                     ? "text-gray-900 border-gray-900"
//                     : "text-gray-500 border-transparent hover:text-gray-700"
//                     }`}
//                 >
//                   Total Order
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("current")}
//                   className={`text-sm font-medium pb-2 border-b-2 transition-colors flex items-center gap-1 ${activeTab === "current"
//                     ? "text-gray-900 border-gray-900"
//                     : "text-gray-500 border-transparent hover:text-gray-700"
//                     }`}
//                 >
//                   Current Order
//                   <ChevronLeft className="h-4 w-4 rotate-180" />
//                 </button>
//               </div>
//             </div>

//             <button
//               onClick={handleRefresh}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
//             >
//               Data Refresh
//               <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
//             </button>
//           </div>
//         </div>

//         {/* Table Container */}
//         <div className="overflow-hidden rounded-lg bg-white shadow">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               {/* Table Header */}
//               <thead>
//                 <tr className="border-b border-gray-200 bg-gray-50">
//                   <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">S no.</th>
//                   <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">
//                     {activeTab === "total" ? "Products Item" : "Products"}
//                   </th>
//                   <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Price</th>
//                   <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Delivery Fee</th>
//                   <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Quantity</th>
//                   <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Shop Name</th>
//                   {activeTab === "total" && (
//                     <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Date</th>
//                   )}
//                   <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Delivery Received By</th>
//                   <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Action</th>
//                 </tr>
//               </thead>

//               {/* Table Body */}
//               <tbody>
//                 {orders.map((order, index) => (
//                   <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                     {/* Serial Number */}
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>

//                     {/* Product */}
//                     <td className="px-6 py-4 flex items-center gap-2">
//                       <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
//                         <Avatar>
//                           <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//                           <AvatarFallback>CN</AvatarFallback>
//                         </Avatar>
//                         <Avatar>
//                           <AvatarImage
//                             src="https://github.com/maxleiter.png"
//                             alt="@maxleiter"
//                           />
//                           <AvatarFallback>LR</AvatarFallback>
//                         </Avatar>
//                         <Avatar>
//                           <AvatarImage
//                             src="https://github.com/evilrabbit.png"
//                             alt="@evilrabbit"
//                           />
//                           <AvatarFallback>ER</AvatarFallback>
//                         </Avatar>
//                       </div>
//                       <span className="text-xs text-gray-500 block">{order.itemCount} items</span>

//                     </td>

//                     {/* Price */}
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.price}</td>

//                     {/* Delivery Fee */}
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.deliveryFee}</td>

//                     {/* Quantity */}
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.quantity}</td>

//                     {/* Shop Name */}
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.shopName}</td>

//                     {activeTab === "total" && (
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.date}</td>
//                     )}

//                     {/* Delivery Person */}
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
//                           <Avatar>
//                             <AvatarImage
//                               src="https://github.com/evilrabbit.png"
//                               alt="@evilrabbit"
//                             />
//                             <AvatarFallback>ER</AvatarFallback>
//                           </Avatar>
//                         </div>
//                         <div className="flex flex-col space-y-2">
//                           <span className="text-xs font-semibold text-gray-900">{order.deliveryPerson.name}</span>
//                           <span className="text-xs text-gray-500">{order.deliveryPerson.phone}</span>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Action Status */}
//                     <td className="px-6 py-4">
//                       <Badge
//                         className={`inline-flex bg-[#2F9E06] items-center rounded-md px-4 py-3 text-xs font-normal transition-colors cursor-default ${getStatusColor(order.status)}`}
//                       >
//                         {order.status}
//                       </Badge>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"
import { useState } from "react"
import { ChevronLeft, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTotalOrdersQuery } from "@/redux/feature/vendorSlice"

interface Order {
  id: number
  product: string
  productImages: string[]
  price: number
  deliveryFee: number
  quantity: number
  shopName: string
  date?: string
  itemCount?: number
  deliveryPerson: {
    name: string
    phone: string
    avatar: string
  }
  status: "Processing" | "Completed" | "Cancelled"
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Processing":
      return "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
    case "Completed":
      return "bg-green-500 text-white hover:bg-green-500"
    case "Cancelled":
      return "bg-red-500 text-white hover:bg-red-500"
    default:
      return "bg-[#686868] text-gray-700"
  }
}

const mapToOrder = (apiOrder: any): Order => ({
  id: apiOrder.id,
  product: apiOrder.order_items.map((item: any) => item.product.name).join(', '),
  productImages: apiOrder.order_items.map((item: any) => item.product.image_1),
  price: parseFloat(apiOrder.total_price),
  deliveryFee: parseFloat(apiOrder.admin_fee),
  quantity: apiOrder.order_items.reduce((sum: number, item: any) => sum + item.quantity, 0),
  shopName: apiOrder.shop_info.shop_name,
  date: new Date(apiOrder.created_at).toLocaleDateString('en-GB'),
  itemCount: apiOrder.total_order_items,
  deliveryPerson: {
    name: apiOrder.rider_info ? apiOrder.rider_info.full_name : 'N/A',
    phone: apiOrder.rider_info ? apiOrder.rider_info.phone_number : '',
    avatar: apiOrder.rider_info ? apiOrder.rider_info.image : '',
  },
  status: apiOrder.status === 'CANCELLED' ? 'Cancelled' :
    (apiOrder.status === 'DELIVERED' || apiOrder.status === 'Delivered') ? 'Completed' : 'Processing',
})

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState<"total" | "current">("total")
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data, refetch } = useTotalOrdersQuery(undefined);

  const mappedTotalOrders = (data?.data || []).map(mapToOrder);
  const mappedCurrentOrders = mappedTotalOrders.filter((order: { status: string })  => order.status === 'Processing');

  const handleRefresh = () => {
    setIsRefreshing(true);
    refetch().finally(() => setIsRefreshing(false));
  }

  const orders = activeTab === "total" ? mappedTotalOrders : mappedCurrentOrders

  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL

  return (
    <div className="min-h-screen p-8">
      <div className="p-4 bg-white rounded-lg">
        {/* Header with Tabs and Refresh Button */}
        <div className="mb-6">
          {/* Back button and tab navigation */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button className="rounded-md p-2 hover:bg-white">
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setActiveTab("total")}
                  className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === "total"
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                >
                  Total Order
                </button>
                <button
                  onClick={() => setActiveTab("current")}
                  className={`text-sm font-medium pb-2 border-b-2 transition-colors flex items-center gap-1 ${activeTab === "current"
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                >
                  Current Order
                  <ChevronLeft className="h-4 w-4 rotate-180" />
                </button>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
            >
              Data Refresh
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
        {/* Table Container */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">S no.</th>
                  <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">
                    {activeTab === "total" ? "Products Item" : "Products"}
                  </th>
                  <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Price</th>
                  <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Delivery Fee</th>
                  <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Quantity</th>
                  <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Shop Name</th>
                  {activeTab === "total" && (
                    <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Date</th>
                  )}
                  <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Delivery Received By</th>
                  <th className="px-6 py-4 text-left text-[16px] font-medium text-[#333333]">Action</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {orders.map((order: any, index: number) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    {/* Serial Number */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
                    {/* Product */}
                    <td className="px-6 py-4 flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {order.productImages.slice(0, 3).map((img : string, idx : number) => (
                          <Avatar key={idx} className="">
                            <AvatarImage src={IMAGE + img} alt="" />
                            <AvatarFallback>IMG</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 block">{order.itemCount} items</span>
                    </td>
                    {/* Price */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.price.toFixed(2)}</td>
                    {/* Delivery Fee */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.deliveryFee.toFixed(2)}</td>
                    {/* Quantity */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.quantity}</td>
                    {/* Shop Name */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.shopName}</td>
                    {activeTab === "total" && (
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.date}</td>
                    )}
                    {/* Delivery Person */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                          <Avatar>
                            <AvatarImage src={IMAGE + order.deliveryPerson.avatar} alt="" />
                            <AvatarFallback>{order.deliveryPerson.name[0] || 'N'}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <span className="text-xs font-semibold text-gray-900">{order.deliveryPerson.name}</span>
                          <span className="text-xs text-gray-500">{order.deliveryPerson.phone}</span>
                        </div>
                      </div>
                    </td>
                    {/* Action Status */}
                    <td className="px-6 py-4">
                      <Badge
                        className={`inline-flex bg-[#2F9E06] items-center rounded-md px-4 py-3 text-xs font-normal transition-colors cursor-default ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </Badge>
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