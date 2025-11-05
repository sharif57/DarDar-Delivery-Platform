
"use client";
import FeedbackPage from "@/components/FeedbackContent";
import { Suspense } from "react";


export default function Feedback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedbackPage />
    </Suspense>
  )
}
