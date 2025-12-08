"use client";

import { useState } from "react";
import { Eye, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAcceptRiderRequestMutation, useAllRiderRequestQuery, useCancelRiderRequestMutation } from "@/redux/feature/vendorSlice";
import { toast } from "sonner";

export default function AllVendorsTable() {
  const router = useRouter();
  const { data, refetch } = useAllRiderRequestQuery(undefined);
  const [acceptRiderRequest] = useAcceptRiderRequestMutation();
  const [cancelRiderRequest] = useCancelRiderRequestMutation();

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

  const handleAccept = async (id: number) => {
    try {
      const res = await acceptRiderRequest(id).unwrap();
      toast.success(res?.message || "Vendor approved!");
      refetch();
      window.location.reload();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve vendor");
    }
  };

  const handleCancel = async (id: number) => {
    try {
      const res = await cancelRiderRequest(id).unwrap();
      toast.success(res?.message || "Vendor Rejected!");
      refetch();
      window.location.reload();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve vendor");
    }
  };

  // If API updates → sync UI
  if (vendors.length === 0 && apiVendors.length > 0) {
    setVendors(apiVendors);
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
          <h1 className="text-xl font-medium text-gray-800">All Rider Request</h1>
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
                      className="px-6 py-4 text-center text-[16px] font-medium text-[#333] capitalize"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-center">
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

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleAccept(vendor.id)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#479502] hover:bg- text-white text-sm font-medium rounded-full shadow-sm transition-all hover:shadow-md">
                          Approve
                        </button>
                        <button onClick={() => handleCancel(vendor.id)}  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C61E1E] hover:bg-[#C61E1E]/90 text-white text-sm font-medium rounded-full shadow-sm transition-all hover:shadow-md">
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {vendors.length === 0 && (
              <p className="text-center text-gray-500 py-6">
                No Rider Found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
