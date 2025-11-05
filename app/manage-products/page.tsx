'use client';

import Manage from "@/components/Manage";
import { Suspense } from "react";

export default function ManageProducts() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Manage />
    </Suspense>
  )
}