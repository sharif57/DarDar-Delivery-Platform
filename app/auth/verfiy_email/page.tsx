// "use client"

// import { useVerifyEmailMutation } from "@/redux/feature/authSlice"
// import { useRouter } from "next/navigation"
// import type React from "react"

// import { useState, useRef, useEffect, type KeyboardEvent, type ChangeEvent } from "react"

// export default function VerifyEmail() {
//   const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
//   const [isLoading, setIsLoading] = useState(false)
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([])
//   const router = useRouter()
//   const [verifyEmail] = useVerifyEmailMutation();


//   // Focus first input on mount
//   useEffect(() => {
//     inputRefs.current[0]?.focus()
//   }, [])

//   const handleInputChange = (index: number, value: string) => {
//     // Only allow single digit
//     if (value.length > 1) return

//     // Only allow numbers
//     if (value && !/^\d$/.test(value)) return

//     const newOtp = [...otp]
//     newOtp[index] = value
//     setOtp(newOtp)

//     // Auto-focus next input if value is entered
//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus()
//     }
//   }

//   const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
//     // Handle backspace
//     if (e.key === "Backspace") {
//       if (!otp[index] && index > 0) {
//         // If current field is empty, go to previous field
//         inputRefs.current[index - 1]?.focus()
//       } else {
//         // Clear current field
//         const newOtp = [...otp]
//         newOtp[index] = ""
//         setOtp(newOtp)
//       }
//     }

//     // Handle arrow keys
//     if (e.key === "ArrowLeft" && index > 0) {
//       inputRefs.current[index - 1]?.focus()
//     }
//     if (e.key === "ArrowRight" && index < 5) {
//       inputRefs.current[index + 1]?.focus()
//     }

//     // Handle Enter key
//     if (e.key === "Enter") {
//       handleVerify()
//     }
//   }

//   const handlePaste = (e: React.ClipboardEvent) => {
//     e.preventDefault()
//     const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)

//     if (pastedData.length > 0) {
//       const newOtp = [...otp]
//       for (let i = 0; i < 6; i++) {
//         newOtp[i] = pastedData[i] || ""
//       }
//       setOtp(newOtp)

//       // Focus the next empty field or the last field
//       const nextEmptyIndex = newOtp.findIndex((digit) => digit === "")
//       const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
//       inputRefs.current[focusIndex]?.focus()
//     }
//   }


//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);

//     // Validate OTP
//     if (!otp || otp.length !== 6) {
//       setError('Please enter a valid 6-digit OTP');
//       return;
//     }

//     try {
//       const payload: VerifyEmailPayload = { email, otp };
//       const res = await verifyEmail(payload).unwrap() as VerifyEmailResponse;
//       console.log(res, '===========')
//       toast.success(res.message || 'Email verified successfully');
//       localStorage.setItem('accessToken', res.access_token);
//       await saveTokens(res.access_token);
//       router.push('/');
//     } catch (error: any) {
//       const errorMessage = error?.data?.message || 'Email verification failed. Please try again.';
//       toast.error(errorMessage);
//       setError(errorMessage);
//     }
//   };

//   const handleVerify = async () => {
//     const otpString = otp.join("")

//     if (otpString.length !== 6) {
//       alert("Please enter all 6 digits")
//       return
//     }

//     setIsLoading(true)

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       console.log("Verifying OTP:", otpString)
//       router.push("/auth/reset-password")

//       // Here you would typically send the OTP to your backend
//       // const response = await fetch('/api/verify-email', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ otp: otpString })
//       // })

//       //   alert("Email verified successfully!")
//     } catch (error) {
//       console.error("Verification failed:", error)
//       alert("Verification failed. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const isComplete = otp.every((digit) => digit !== "")

//   return (
//     <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <h1 className="text-2xl font-medium text-gray-900 text-center mb-8">Verify Email</h1>

//         <div className="flex justify-center gap-3 mb-8">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               ref={(el) => (inputRefs.current[index] = el)}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               onPaste={index === 0 ? handlePaste : undefined}
//               className="w-12 h-12 text-center text-lg font-medium bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
//               disabled={isLoading}
//             />
//           ))}
//         </div>

//         <button
//           onClick={handleVerify}
//           disabled={!isComplete || isLoading}
//           className="w-full bg-slate-800 hover:bg-slate-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
//         >
//           {isLoading ? (
//             <div className="flex items-center justify-center">
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//               Verifying...
//             </div>
//           ) : (
//             "Verify"
//           )}
//         </button>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Didn't receive the code?{" "}
//             <button
//               className="text-blue-600 hover:text-blue-700 font-medium"
//               onClick={() => {
//                 console.log("Resending verification code...")
//                 alert("Verification code sent!")
//               }}
//             >
//               Resend
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client';

import { useVerifyEmailMutation } from "@/redux/feature/authSlice";
import {  useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, Suspense } from "react";
import { toast } from "sonner";

 function VerifyEmail() {
  const params = useSearchParams();
  const email = params.get("email");
  console.log(email)
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const [verifyEmail] = useVerifyEmailMutation();

 
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1 || (value && !/^\d$/.test(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5) inputRefs.current[index + 1]?.focus();
    if (e.key === "Enter") handleVerify();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);

    const focusIndex = pasted.length < 6 ? pasted.length : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      toast.error("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = { email, otp: otpString };
      const res = await verifyEmail(payload).unwrap();

      toast.success(res.message || "Email verified successfully!");
      
   
        localStorage.setItem("verifyToken", res?.access_token);
  
      // Redirect
      router.push("/auth/reset-password");
    } catch (err: any) {
      const msg = err?.data?.message || "Invalid or expired OTP";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };


  const isComplete = otp.every(d => d !== "");

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="text-gray-600 mt-2 text-sm">
            We sent a 6-digit code to <span className="font-medium">{email}</span>
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => inputRefs.current[i] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleInputChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
              disabled={isLoading}
              className={`w-14 h-14 text-2xl font-bold text-center rounded-2xl border-2 transition-all
                ${digit ? 'border' : 'border-gray-300 bg-gray-50'}
                focus:border-[#D69D21] 
                disabled:opacity-70`}
            />
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleVerify}
          disabled={!isComplete || isLoading}
          className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all transform
            ${isComplete && !isLoading
              ? 'bg-[#D69D21] hover:bg-[#D69D21]/90 hover:shadow-xl active:scale-95'
              : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
              Verifying...
            </div>
          ) : (
            "Verify Email"
          )}
        </button>

      

    
      </div>
    </div>
  );
}

export default function Verify(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  )
}