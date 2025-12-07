/* eslint-disable @next/next/no-img-element */
'use client';

import { useAllVendorRequestQuery } from "@/redux/feature/vendorSlice";



export default function VendorRequestTable() {

  const { data } = useAllVendorRequestQuery(undefined);

  const IMAGE =process.env.NEXT_PUBLIC_IMAGE_URL

  return (
    <>
      <div className=" py-8 ">
        <div className=" bg-white rounded-lg shadow-sm border border-gray-200 p-6  ">
          <h2 className="text-[16px] font-medium text-[#333333] mb-6">Vendor Request</h2>

          <div className=" overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-center text-[14px] font-semibold text-[#333333] uppercase tracking-wider">
                    Serial no.
                  </th>
                  <th className="px-6 py-4 text-center text-[14px] font-semibold text-[#333333] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-center text-[14px] font-semibold text-[#333333] uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-center text-[14px] font-semibold text-[#333333] uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-center text-[14px] font-semibold text-[#333333] uppercase tracking-wider">
                    User Types
                  </th>
                  <th className="px-6 py-4 text-center text-[14px] font-semibold text-[#333333] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.data?.map((vendor: any, index: number) => (
                  <tr key={vendor?.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 text-center whitespace-nowrap">
                      <span className="text-sm text-gray-900 font-medium">{index + 1}.</span>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <img
                          src={ IMAGE + vendor?.image}
                          alt={vendor?.full_name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                        />
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-900">{vendor?.full_name}</p>
                          <p className="text-xs text-gray-500">{vendor?.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <p className="text-sm text-gray-900 font-medium">{vendor?.phone_number}</p>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <p className="text-sm text-[#333333] max-w-xs truncate">{vendor?.shop_address}</p>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium`}
                      >
                        {vendor?.role}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#479502] hover:bg- text-white text-sm font-medium rounded-full shadow-sm transition-all hover:shadow-md">
                          Approve
                        </button>
                        <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C61E1E] hover:bg-[#C61E1E]/90 text-white text-sm font-medium rounded-full shadow-sm transition-all hover:shadow-md">
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}