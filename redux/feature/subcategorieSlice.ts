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
    }),

    createSubcategory: builder.mutation({
      query: (data) => ({
        url: "/products/subcategories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subcategory"],
    }),

    updateSubCategory: builder.mutation({
      query: ({data , id}) => ({
        url: `/products/subcategories/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Subcategory"],
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/products/subcategories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subcategory"],
    }),



  }),
});

export const { useAllSubcategoriesQuery , useCreateSubcategoryMutation , useUpdateSubCategoryMutation , useDeleteSubCategoryMutation } = subcategoriesApi;
