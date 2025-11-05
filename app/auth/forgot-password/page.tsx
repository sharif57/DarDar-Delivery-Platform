
"use client";

import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/feature/authSlice";
import { toast } from "sonner";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset
    setIsLoading(true);

    // Validate email
    if (!email) {
      toast.error("Please enter your email");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      setIsLoading(false);
      return;
    }

    try {
      const response = await forgotPassword({ email }).unwrap();

      toast.success(response?.message || "OTP sent to your email!");

      // Redirect to verify OTP page
      router.push(`/auth/verfiy_email?email=${encodeURIComponent(email)}`);

    } catch (error: any) {
      const msg = error?.data?.message || "Failed to send OTP. Try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="mx-auto w-16 h-16 bg-[#D69D21]/10 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-[#D69D21]" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Forgot Password
          </CardTitle>
          <p className="text-sm text-gray-600">
            Enter your email to receive an OTP
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-300 focus:border-[#D69D21] focus:ring-[#D69D21]"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D69D21] hover:bg-[#c08a1d] text-white font-semibold py-6 text-lg transition-all duration-200 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                "Send OTP"
              )}
            </Button>

           
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// export default function Password() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <ForgotPassword />
//     </Suspense>
//   )
// }
