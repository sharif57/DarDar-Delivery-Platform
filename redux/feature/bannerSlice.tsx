"use client";

import baseApi from "../Api/baseApi";


export const bannerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        allBanners: builder.query({
            query: () => ({
                url: "/auth/banners/",
                method: "GET",
            }),
            providesTags: ["Banner"],
        }),

        createBanner: builder.mutation({
            query: (data) => ({
                url: "/auth/banners/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Banner"],
        }),

        editBanner: builder.mutation({
            query: ({ id, data }) => ({
                // /auth/banners/4/
                url: `/auth/banners/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Banner"],
        }),

        deleteBanner: builder.mutation({
            query: (id) => ({
                // /auth/banners/4/
                url: `/auth/banners/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Banner"],
        }),



    }),
});

export const { useAllBannersQuery, useCreateBannerMutation, useEditBannerMutation , useDeleteBannerMutation} = bannerApi;
