"use client";

import baseApi from "../Api/baseApi";

export const feedbackApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        allFeedbackList: builder.query({
            query: () => ({
                url: "/settings/feedback/",
                method: "GET",
            }),
            providesTags: ["Feedback"],
        }),
        
        deleteFeedback: builder.mutation({
            query: (id) => ({
                // /settings/feedback/1/
                url: `/settings/feedback/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Feedback"],
        }),

    }),
});

export const { useAllFeedbackListQuery , useDeleteFeedbackMutation } = feedbackApi;
