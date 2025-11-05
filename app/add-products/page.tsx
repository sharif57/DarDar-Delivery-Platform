'use client';

import AddProductsClient from "@/components/AddProduct";
import { Suspense } from "react";
// import AddProductsClient from "../../components/AddProduct";


export default function Table() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddProductsClient />
    </Suspense>
  )
}
