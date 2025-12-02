"use client";

import baseApi from "../Api/baseApi";


export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProductList: builder.query({
      query: () => ({
        url: "/products/products/",
        method: "GET",
      }),
      providesTags: ["Product"],
    })
  }),
});

export const { useAllProductListQuery  } = productApi;
