"use client";

import baseApi from "../Api/baseApi";

export const commonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        dashboard: builder.query({
            query: () => ({
                url: "/common/dashboard/",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),

        // /order/delivery/rate/878594/
        ratting: builder.mutation({
            query: ({ id, data }) => ({
                url: `/order/delivery/rate/${id}/`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Dashboard"],
        })

    }),
});

export const { useDashboardQuery , useRattingMutation } = commonApi;
