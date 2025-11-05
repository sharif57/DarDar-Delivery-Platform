"use client";

import baseApi from "../Api/baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getAllNotification: builder.query({
      query: () => ({
        url: "/notifications/list/",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    singleReadNotification: builder.mutation({
      query: (id) => ({
        // /notifications/mark_read/1/
        url: `/notifications/mark_read/${id}/`,
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),

    allReadNotification: builder.mutation({
      query: () => ({
        // /notifications/mark_all_read/
        url: `/notifications/mark_all_as_read/`,
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),

  }),
});

export const { useGetAllNotificationQuery , useSingleReadNotificationMutation, useAllReadNotificationMutation  } = notificationApi;
