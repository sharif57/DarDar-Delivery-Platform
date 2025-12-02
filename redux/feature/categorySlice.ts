"use client";

import baseApi from "../Api/baseApi";


export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    allCategoryList: builder.query({
      query: () => ({
        url: "/products/categories/",
        method: "GET",
      }),
      providesTags: ["Category"],
    })



  }),
});

export const { useAllCategoryListQuery  } = categoryApi;
