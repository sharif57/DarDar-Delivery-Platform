"use client";

import baseApi from "../Api/baseApi";

export const driverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // /order/delivery/accept/930993/
        acceptDeliveryRequest: builder.mutation({
            query: (orderId) => ({
                url: `/order/delivery/accept/${orderId}/`,
                method: "POST",
            }),
            invalidatesTags: ["Driver"],
        }),

        // /order/delivery/driver/
        getDriverOrders: builder.query({
            query: () => ({
                url: "/order/delivery/driver/",
                method: "GET",
            }),
            providesTags: ["Driver"],
        }),

        // /order/delivery/pending_order/

        getPendingOrders: builder.query({
            query: () => ({
                url: "/order/delivery/pending_order/",
                method: "GET",
            }),
            providesTags: ["Driver"],
        }),

        updataOrderStatus: builder.mutation({
            query: ({ id, data }) => ({
                // /order/delivery/update/112354/
                url: `/order/delivery/update/${id}/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Driver"],
        }),

        earningHistory: builder.query({
            query: () => ({
                url: "/driver/earning_history/",
                method: "GET",
            }),
            providesTags: ["Driver"],
        }),

    }),
});

export const { useAcceptDeliveryRequestMutation, useGetDriverOrdersQuery, useGetPendingOrdersQuery, useUpdataOrderStatusMutation , useEarningHistoryQuery } = driverApi;
