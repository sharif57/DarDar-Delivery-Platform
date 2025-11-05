"use client";

import AllVendorsTable from "@/components/MakeAdminContent";
import { Suspense } from "react";
// import AllVendorsTable from "../../components/MakeAdminContent";


export default function Table() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllVendorsTable />
    </Suspense>
  )
}
