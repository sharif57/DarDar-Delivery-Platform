import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://10.10.12.111:8001/api",
    baseUrl: process.env.NEXT_PUBLIC_API_URL ,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      // console.log("token", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Customer",
    "Driver",
    "Order",
    "Delivery",
    "Dashboard",
    "Notification",
    "Chat",
    "Setting",
    "Product",
    "Category",
    "Subcategory",
    "Banner",
    "Feedback",
    "Dashboard",
    "Vendor",
    "Rider"

  ],
  endpoints: () => ({}),
});

export default baseApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_API_URL,
//   credentials: "include",
//   prepareHeaders: (headers) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithRedirect = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result.error && result.error.status === 401) {
//     localStorage.removeItem("accessToken");
//     // Use window.location for redirect to handle both Pages and App Router in Next.js
//     if (typeof window !== "undefined") {
//       window.location.href = "/auth/login";
//     }
//   }
//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithRedirect,
//   tagTypes: [
//     "User",
//     "Customer",
//     "Driver",
//     "Order",
//     "Delivery",
//     "Dashboard",
//     "Notification",
//     "Chat",
//     "Setting",
//     "Product",
//     "Category",
//     "Subcategory",
//     "Banner",
//     "Feedback",
//     "Dashboard",
//     "Vendor",
//     "Rider",
//   ],
//   endpoints: () => ({}),
// });

// export default baseApi;


