"use client";

import baseApi from "../Api/baseApi";


export const vendorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // product list related api
        allVendorRequest: builder.query({
            query: () => ({
                url: "/auth/vendor_request/",
                method: "GET",
            }),
            providesTags: ["Vendor"],
        }),

    }),
});

export const { useAllVendorRequestQuery } = vendorApi;
