// "use client";

// import { useState, type FormEvent } from "react";
// import { Lock, Eye, EyeOff } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useResetPasswordMutation } from "@/redux/feature/authSlice";

// export default function ResetPassword() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({
//     password: "",
//     confirmPassword: "",
//   });
//   const [resetPassword] = useResetPasswordMutation();




//   const handleInputChange = (
//     field: "password" | "confirmPassword",
//     value: string
//   ) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));

//     // Clear errors when user starts typing
//     setErrors((prev) => ({ ...prev, [field]: "" }));


//     if (
//       field === "confirmPassword" ||
//       (field === "password" && formData.confirmPassword)
//     ) {
//       const passwordToCheck = field === "password" ? value : formData.password;
//       const confirmPasswordToCheck =
//         field === "confirmPassword" ? value : formData.confirmPassword;

//       if (
//         confirmPasswordToCheck &&
//         passwordToCheck !== confirmPasswordToCheck
//       ) {
//         setErrors((prev) => ({
//           ...prev,
//           confirmPassword: "Passwords do not match",
//         }));
//       } else {
//         setErrors((prev) => ({ ...prev, confirmPassword: "" }));
//       }
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     // Validate password and confirm password
//     if (!password || !confirmPassword) {
//       setError('Please enter both password and confirm password');
//       return;
//     }
//     if (password.length < 8) {
//       setError('Password must be at least 8 characters');
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const res = await resetPassword({ new_password: password, confirm_password: confirmPassword }).unwrap();
//       console.log(res, 'res')
//       toast.success(res?.message || 'Email sent successfully');
//       localStorage.removeItem('verifyToken');
//       router.push('/auth/signin');
//       setLoading(false);
//     } catch (error: any) {
//       const errorMessage = error?.data?.message || 'Email verification failed. Please try again.';
//       toast.error(errorMessage);
//       setError(errorMessage);
//       setLoading(false);
//     }

//     // Simulate password creation (replace with actual API call)
//     console.log('Password submitted:', { selectedService, email, password });

//     // Redirect to dashboard or login page (modify as needed)

//     // Reset form
//     setPassword('');
//     setConfirmPassword('');
//   };

//   const isFormValid =
//     formData.password &&
//     formData.confirmPassword &&
//     !errors.password &&
//     !errors.confirmPassword;

//   return (
//     <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <h1 className="text-2xl font-medium text-gray-900 text-center mb-8">
//           Reset Password
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Password Field */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={(e) => handleInputChange("password", e.target.value)}
//                 placeholder="Enter password"
//                 className={`w-full pl-10 pr-10 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${errors.password ? "ring-2 ring-red-500" : ""
//                   }`}
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 )}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-sm text-red-600">{errors.password}</p>
//             )}
//           </div>

//           {/* Confirm Password Field */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Confirm password
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={formData.confirmPassword}
//                 onChange={(e) =>
//                   handleInputChange("confirmPassword", e.target.value)
//                 }
//                 placeholder="Confirm password"
//                 className={`w-full pl-10 pr-10 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${errors.confirmPassword ? "ring-2 ring-red-500" : ""
//                   }`}
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 )}
//               </button>
//             </div>
//             {errors.confirmPassword && (
//               <p className="text-sm text-red-600">{errors.confirmPassword}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={!isFormValid || isLoading}
//             className="w-full bg-slate-800 hover:bg-slate-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
//           >
//             {isLoading ? (
//               <div className="flex items-center justify-center">
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                 Confirming...
//               </div>
//             ) : (
//               "Confirm"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, type FormEvent } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/feature/authSlice";
import { toast } from "sonner";

export default function ResetPassword() {
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (
    field: "password" | "confirmPassword",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear specific field error
    setErrors((prev) => ({ ...prev, [field]: "" }));

    // Check password match when relevant
    if (field === "confirmPassword" || (field === "password" && formData.confirmPassword)) {
      const passwordToCheck = field === "password" ? value : formData.password;
      const confirmPasswordToCheck = field === "confirmPassword" ? value : formData.confirmPassword;

      if (confirmPasswordToCheck && passwordToCheck !== confirmPasswordToCheck) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const validatePassword = (password: string): string => {
    if (password.length < 6) {
      return "Password must be at least 8 characters";
    }
    return "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate password strength
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrors((prev) => ({ ...prev, password: passwordError }));
      toast.error(passwordError);
      return;
    }

    // Final match check
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setErrors({ password: "", confirmPassword: "" });

    try {
      const response = await resetPassword({
        new_password: formData.password,
        confirm_password: formData.confirmPassword,
      }).unwrap();

      toast.success(response?.message || "Password reset successfully!");

      // Clean up verification token
      localStorage.removeItem('verifyToken');
      
      // Redirect to login
      router.push('/auth/login');

    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to reset password. Please try again.";
      toast.error(errorMessage);
      setErrors({ password: "", confirmPassword: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = 
    formData.password &&
    formData.confirmPassword &&
    !errors.password &&
    !errors.confirmPassword &&
    formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-[#D69D21]/10 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#D69D21]" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Reset Password
          </CardTitle>
          <p className="text-sm text-gray-600">
            Create a new password for your account
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                New Password
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Enter new password"
                  className={`pl-10 pr-10 ${
                    errors.password ? "ring-2 ring-red-500 border-red-500" : "focus:ring-[#D69D21]"
                  }`}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
             
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium">
                Confirm New Password
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm new password"
                  className={`pl-10 pr-10 ${
                    errors.confirmPassword ? "ring-2 ring-red-500 border-red-500" : "focus:ring-[#D69D21]"
                  }`}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-[#D69D21] hover:bg-[#c08a1d] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-6 text-lg"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                  Resetting Password...
                </span>
              ) : (
                "Reset Password"
              )}
            </Button>


          </form>
        </CardContent>
      </Card>
    </div>
  );
}