// 'use client';

// import { Suspense, useState } from 'react';
// import { Eye, ChevronLeft, ArrowLeft } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useAllVendorRequestQuery } from '@/redux/feature/vendorSlice';

// interface Vendor {
//     id: number;
//     name: string;
//     location: string;
//     phone: string;
//     date: string;
//     email: string;
//     status: 'active' | 'inactive';
//     avatar: string;
// }

// const initialVendors: Vendor[] = [
//     { id: 1, name: 'Hawaiian Pizza', location: 'Hawaiian Pizza', phone: '+1 (470) 918 8599', date: '05/12/2024', email: 'wiknerd@verizon.net', status: 'inactive', avatar: 'https://i.pravatar.cc/40?u=1' },
//     { id: 2, name: 'Hawaiian Pizza', location: 'Kent, Utah', phone: '+1 (239) 555-0109', date: '05/12/2024', email: 'blixem@aol.com', status: 'active', avatar: 'https://i.pravatar.cc/40?u=2' },
//     { id: 3, name: 'Hawaiian Pizza', location: 'Pasadena, Oklah...', phone: '+1 470 9181 8522', date: '05/12/2024', email: 'cgcra@yahoo.com', status: 'active', avatar: 'https://i.pravatar.cc/40?u=3' },
//     { id: 4, name: 'Hawaiian Pizza', location: 'Coppel, Virginia', phone: '+1 (907) 555-0101', date: '05/12/2024', email: 'hwestiii@sbcglobal.net', status: 'active', avatar: 'https://i.pravatar.cc/40?u=4' },
//     { id: 5, name: 'Hawaiian Pizza', location: 'Lafayette, Califo...', phone: '+1 470 9181 8566', date: '05/12/2024', email: 'mugwump@verizon.net', status: 'active', avatar: 'https://i.pravatar.cc/40?u=5' },
//     { id: 6, name: 'Hawaiian Pizza', location: 'Corona, Michigan', phone: '+1 (307) 555-0133', date: '05/12/2024', email: 'evans@me.com', status: 'active', avatar: 'https://i.pravatar.cc/40?u=6' },
//     { id: 7, name: 'Hawaiian Pizza', location: 'Stockton, New J...', phone: '+1 (207) 555-0119', date: '05/12/2024', email: 'aibrahim@verizon.net', status: 'active', avatar: 'https://i.pravatar.cc/40?u=7' },
// ];

// export default function AllVendorsTable() {
//     const router = useRouter();
//     const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
//     const { data } = useAllVendorRequestQuery(undefined);

//     const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL

//     const toggleStatus = (id: number) => {
//         setVendors(prev =>
//             prev.map(v =>
//                 v.id === id
//                     ? { ...v, status: v.status === 'active' ? 'inactive' : 'active' }
//                     : v
//             )
//         );
//     };

//     const viewVendor = (vendor: Vendor) => {
//         alert(`Viewing: ${vendor.name}\nEmail: ${vendor.email}\nPhone: ${vendor.phone}`);
//     };

//     return (
//         <div className=" py-8 px-4">
//             <div className="bg-white  rounded-lg shadow-sm  border border-gray-200 p-6">
//                 {/* Back Button + Title */}
//                 <div className="flex items-center gap-3 mb-6">
//                     <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-full transition">
//                         <ArrowLeft className="w-5 h-5" />
//                     </button>
//                     <h1 className="text-xl font-medium text-gray-800">All Vendors</h1>
//                 </div>

//                 {/* Table */}
//                 <div className=" overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="w-full min-w-[900px]">
//                             <thead>
//                                 <tr className="bg-gray-50 border-b border-gray-200">
//                                     {['S no.', 'Name', 'Contact Number', 'Date', 'Email', 'Action'].map((h) => (
//                                         <th
//                                             key={h}
//                                             className="px-6 py-4 text-left text-[16px] font-medium text-[#333333] capitalize tracking-wider"
//                                         >
//                                             {h}
//                                         </th>
//                                     ))}
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-100">
//                                 {vendors.map((vendor) => (
//                                     <tr key={vendor.id} className="hover:bg-gray-50 transition">
//                                         {/* S No. */}
//                                         <td className="px-6 py-4 text-sm text-gray-900 font-medium">
//                                             {vendor.id}.
//                                         </td>

//                                         {/* Name + Avatar */}
//                                         <td className="px-6 py-4">
//                                             <div className="flex items-center gap-3">
//                                                 <img
//                                                     src={vendor.avatar}
//                                                     alt={vendor.name}
//                                                     className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
//                                                 />
//                                                 <div className='space-y-2'>
//                                                     <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
//                                                     <p className="text-xs text-gray-500 truncate max-w-[140px]">
//                                                         {vendor.location}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </td>

//                                         {/* Phone */}
//                                         <td className="px-6 py-4 text-sm text-gray-900">{vendor.phone}</td>

//                                         {/* Date */}
//                                         <td className="px-6 py-4 text-sm text-gray-600">{vendor.date}</td>

//                                         {/* Email */}
//                                         <td className="px-6 py-4 text-sm text-gray-900">{vendor.email}</td>

//                                         {/* Actions */}
//                                         <td className="px-6 py-4">
//                                             <div className="flex items-center gap-3">
//                                                 {/* Toggle Button */}
//                                                 <button
//                                                     onClick={() => toggleStatus(vendor.id)}
//                                                     className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm ${vendor.status === 'active'
//                                                         ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                                                         : 'bg-red-100 text-red-700 hover:bg-red-200'
//                                                         }`}
//                                                 >
//                                                     {vendor.status === 'active' ? 'Activate' : 'deactivate'}
//                                                 </button>

//                                                 {/* Dropdown Arrow */}
//                                                 <div className="relative">
//                                                     <button className="p-1 hover:bg-gray-200 rounded transition">
//                                                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                                                             <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
//                                                         </svg>
//                                                     </button>
//                                                 </div>

//                                                 {/* Eye Icon */}
//                                                 <button
//                                                     onClick={() => viewVendor(vendor)}
//                                                     className="p-2 hover:bg-gray-200 rounded-full transition"
//                                                 >
//                                                     <Eye className="w-4 h-4 text-gray-600" />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import { Eye, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAllVendorRequestQuery } from "@/redux/feature/vendorSlice";

export default function AllVendorsTable() {
  const router = useRouter();
  const { data } = useAllVendorRequestQuery(undefined);

  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

  // Convert API data
  const apiVendors =
    data?.data?.map((v: any, i: number) => ({
      id: v.id,
      name: v.full_name,
      location: v.shop_address,
      phone: v.phone_number,
      date: new Date().toLocaleDateString(), // You can adjust this!
      email: v.email,
      status: v.is_approved ? "active" : "inactive",
      avatar: v.image ? `${IMAGE}${v.image}` : "https://i.pravatar.cc/40",
    })) || [];

  const [vendors, setVendors] = useState(apiVendors);

  // If API updates → sync UI
  if (vendors.length === 0 && apiVendors.length > 0) {
    setVendors(apiVendors);
  }

  const toggleStatus = (id: number) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              status: v.status === "active" ? "inactive" : "active",
            }
          : v
      )
    );
  };

  const viewVendor = (vendor: any) => {
    alert(
      `Name: ${vendor.name}\nEmail: ${vendor.email}\nPhone: ${vendor.phone}\nShop: ${vendor.location}`
    );
  };

  return (
    <div className="py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Back Button + Title */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-medium text-gray-800">All Vendors</h1>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {[
                    "S no.",
                    "Name",
                    "Contact Number",
                    "Date",
                    "Email",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-[16px] font-medium text-[#333] capitalize"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {vendors.map((vendor, index) => (
                  <tr
                    key={vendor.id}
                    className="hover:bg-gray-50 transition"
                  >
                    {/* S No. */}
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {index + 1}.
                    </td>

                    {/* Name + Avatar */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={vendor.avatar}
                          alt={vendor.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                        />
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900">
                            {vendor.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate max-w-[140px]">
                            {vendor.location}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {vendor.phone}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {vendor.date}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {vendor.email}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Toggle Button */}
                        <button
                          onClick={() => toggleStatus(vendor.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm ${
                            vendor.status === "active"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          {vendor.status === "active"
                            ? "Active"
                            : "Inactive"}
                        </button>

                        {/* Arrow Icon */}
                        <button className="p-1 hover:bg-gray-200 rounded transition">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M6 8l4 4 4-4"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                            />
                          </svg>
                        </button>

                        {/* View Vendor */}
                        <button
                          onClick={() => viewVendor(vendor)}
                          className="p-2 hover:bg-gray-200 rounded-full transition"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {vendors.length === 0 && (
              <p className="text-center text-gray-500 py-6">
                No Vendors Found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
