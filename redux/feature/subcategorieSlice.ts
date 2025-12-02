"use client";

import baseApi from "../Api/baseApi";


export const subcategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    allSubcategories: builder.query({
      query: () => ({
        url: "/products/subcategories/",
        method: "GET",
      }),
      providesTags: ["Subcategory"],
    })



  }),
});

export const { useAllSubcategoriesQuery  } = subcategoriesApi;
