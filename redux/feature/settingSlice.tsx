"use client";

import baseApi from "../Api/baseApi";

export const settingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        privacyGet: builder.query({
            query: () => ({
                url: "/settings/privacy_policies/",
                method: "GET",
            }),
            providesTags: ["Setting"],
        }),
        
        updatePrivacy: builder.mutation({
            query: (data) => ({
                url: "/settings/privacy_policies/",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Setting"],
        }),

        aboutUsGet: builder.query({
            query: () => ({
                url: "/settings/about_us/",
                method: "GET",
            }),
            providesTags: ["Setting"],
        }),

        updateAboutUs: builder.mutation({
            query: (data) => ({
                url: "/settings/about_us/",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Setting"],
        }),

        terms: builder.query({
            query: () => ({
                url: "/settings/terms_conditions/",
                method: "GET",
            }),
            providesTags: ["Setting"],
        }),

        updataTeams: builder.mutation({
            query: (data) => ({
                url: "/settings/terms_conditions/",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Setting"],
        }),

    }),
});

export const { usePrivacyGetQuery, useUpdatePrivacyMutation , useAboutUsGetQuery, useUpdateAboutUsMutation, useTermsQuery, useUpdataTeamsMutation } = settingApi;
