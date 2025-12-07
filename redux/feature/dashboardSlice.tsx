"use client";

import baseApi from "../Api/baseApi";


export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // product list related api
    dashboard: builder.query({
      query: () => ({
        url: "/order/admin/dashboard/",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),






  }),
});

export const { useDashboardQuery } = dashboardApi;
