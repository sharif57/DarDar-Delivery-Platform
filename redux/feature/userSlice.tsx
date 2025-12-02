"use client";

import baseApi from "../Api/baseApi";


export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => ({
        url: "/auth/user_profile/",
        method: "GET",
      }),

      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: ({ data, id }) => ({
        // /auth/profile/1/update/
        url: `/auth/profile/${id}/update/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    locationProfile: builder.mutation({
      query: (data) => ({
        // /auth/profile/1/update/
        // /auth/profile/update/
        url: `/auth/profile/update/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    allUsers: builder.query({
      query: () => ({
        url: "/auth/profiles/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // /auth/dashboard/
    dashboard: builder.query({
      query: () => ({
        url: "/auth/dashboard/",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    userDetails: builder.query({
      query: (id) => ({
        // /auth/profile/2/
        url: `/auth/profile/${id}/`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),



  }),
});

export const { useUserProfileQuery, useUpdateProfileMutation, useLocationProfileMutation , useAllUsersQuery , useDashboardQuery, useUserDetailsQuery } = userApi;
