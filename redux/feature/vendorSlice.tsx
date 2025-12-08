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
        // /auth/vendor_request/37/
        acceptVendorRequest: builder.mutation({
            query: (id) => ({
                url: `/auth/vendor_request/${id}/`,
                method: "POST",
            }),
            invalidatesTags: ["Vendor"],
        }),

        cancelVendorRequest: builder.mutation({
            query: (id) => ({
                url: `/auth/vendor_request/${id}/`,
                method: "PATCH",
            }),
            invalidatesTags: ["Vendor"],
        }),

        // /auth/rider_request/
        allRiderRequest: builder.query({
            query: () => ({
                url: "/auth/rider_request/",
                method: "GET",
            }),
            providesTags: ["Rider"],
        }),

        // /auth/rider_request/39/
        acceptRiderRequest: builder.mutation({
            query: (id) => ({
                url: `/auth/rider_request/${id}/`,
                method: "POST",
            }),
            invalidatesTags: ["Rider"],
        }),

        cancelRiderRequest: builder.mutation({
            query: (id) => ({
                url: `/auth/rider_request/${id}/`,
                method: "PATCH",
            }),
            invalidatesTags: ["Rider"],
        }),

        totalOrders: builder.query({
            query: () => ({
                url: "/order/",
                method: "GET",
            }),
            providesTags: ["Order"],
        }),

    }),
});

export const { useAllVendorRequestQuery, useAllRiderRequestQuery, useAcceptVendorRequestMutation, useCancelVendorRequestMutation, useAcceptRiderRequestMutation, useCancelRiderRequestMutation , useTotalOrdersQuery } = vendorApi;
