"use client";

import baseApi from "../Api/baseApi";


export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // product list related api
    allProductList: builder.query({
      query: () => ({
        url: "/products/products/",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),


    // Category related api
    // /products/categories/
    allCategoryList: builder.query({
      query: () => ({
        url: "/products/categories/",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products/products/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),



  }),
});

export const { useAllProductListQuery , useCreateProductMutation } = productApi;
