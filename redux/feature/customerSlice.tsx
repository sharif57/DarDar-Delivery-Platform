"use client";

import baseApi from "../Api/baseApi";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/delivery/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),

    // order/delivery/customer/
    getCustomerOrders: builder.query({
      query: () => ({
        url: "/order/delivery/customer/",
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),

    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/delivery/cancel/${orderId}/`,
        method: "POST",
      }),
      invalidatesTags: ["Customer"],
    }),

    confirmDelivery: builder.mutation({
      query: (orderId) => ({
        url: `/order/delivery/confirm/${orderId}/`,
        method: "POST",
      }),    
      invalidatesTags: ["Customer"],
    }),

    // order/delivery/22/
    getCustomerOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/order/delivery/${orderId}/`,
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),

    // /order/delivery/customer/


  }),
});

export const { useCreateOrderMutation, useGetCustomerOrdersQuery, useCancelOrderMutation, useConfirmDeliveryMutation , useGetCustomerOrderDetailsQuery } = customerApi;
