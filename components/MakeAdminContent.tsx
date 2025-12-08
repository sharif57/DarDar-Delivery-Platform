

"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAcceptVendorRequestMutation, useAllVendorRequestQuery, useCancelVendorRequestMutation } from "@/redux/feature/vendorSlice";
import { toast } from "sonner";

export default function AllVendorsTable() {
  const router = useRouter();
  const { data, refetch, isLoading } = useAllVendorRequestQuery(undefined);

  const [acceptVendorRequest] = useAcceptVendorRequestMutation();
  const [cancelVendorRequest] = useCancelVendorRequestMutation();

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


  const ApprovedVendorRequest = async (id: number) => {
    try {
      const res = await acceptVendorRequest(id).unwrap();
      toast.success(res?.message || "Vendor approved!");
      refetch();
      window.location.reload();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve vendor");
    }
  };

  const CancelVendorRequest = async (id: number) => {
    try {
      const res = await cancelVendorRequest(id).unwrap();
      toast.success(res?.message || "Vendor approved!");
      refetch();
      window.location.reload();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve vendor");
    }
  };

  if (isLoading) {
    return <p className="text-center text-2xl font-semibold h-screen flex justify-center items-center"  >Loading...</p>
  }



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
            <table className="w-full min-w-[900px] text-center">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-center">
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
                      className="px-6 py-4 text-center text-[16px] font-medium text-[#333] capitalize"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {vendors.map((vendor: any, index: number) => (
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

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => ApprovedVendorRequest(vendor?.id)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#479502] hover:bg- text-white text-sm font-medium rounded-full shadow-sm transition-all hover:shadow-md">
                          Approve
                        </button>
                        <button onClick={() => CancelVendorRequest(vendor?.id)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C61E1E] hover:bg-[#C61E1E]/90 text-white text-sm font-medium rounded-full shadow-sm transition-all hover:shadow-md">
                          Cancel
                        </button>
                      </div>
                      {/* <button
                        onClick={() => viewVendor(vendor)}
                        className="p-2 hover:bg-gray-200 rounded-full transition"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button> */}
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
