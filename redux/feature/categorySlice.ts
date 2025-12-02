"use client";

import { create } from "domain";
import baseApi from "../Api/baseApi";


export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    allCategoryList: builder.query({
      query: () => ({
        url: "/products/categories/",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
// /products/categories/

createCategory: builder.mutation({
  query: (data) => ({
    url: "/products/categories/",
    method: "POST",
    body: data,
  }),
  invalidatesTags: ["Category"],
}),

updateCategory: builder.mutation({
  query: ({data , id}) => ({
    url: `/products/categories/${id}/`,
    method: "PATCH",
    body: data,
  }),
  invalidatesTags: ["Category"],
}),

deleteCategory: builder.mutation({
  query: (id) => ({
    url: `/products/categories/${id}/`,
    method: "DELETE",
  }),
  invalidatesTags: ["Category"],
}),


  }),
});

export const { useAllCategoryListQuery , useCreateCategoryMutation , useUpdateCategoryMutation , useDeleteCategoryMutation} = categoryApi;
