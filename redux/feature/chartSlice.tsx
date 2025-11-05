"use client";

import baseApi from "../Api/baseApi";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createRoom: builder.mutation({
      query: (data) => ({
        url: "/chat/rooms/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    sendMessage: builder.mutation({
      query: ({data, id}) => ({
        url: `/chat/messages/${id}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    allMessages: builder.query({
      query: (id) => ({
        // /chat/messages/1/
        url: `/chat/messages/${id}/`,
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
  

  }),
});

export const { useCreateRoomMutation, useSendMessageMutation, useAllMessagesQuery  } = chatApi;
