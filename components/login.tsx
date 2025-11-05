// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Eye, EyeOff } from "lucide-react"

// export default function LoginForm() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [rememberPassword, setRememberPassword] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     console.log("Login attempt:", { email, password, rememberPassword })
//     setIsLoading(false)
//   }

//   const handleForgotPassword = () => {
//     console.log("Forgot password clicked")
//     // Handle forgot password logic
//   }

//   return (
//     <div className="w-full max-w-md">
//       <div className="bg-white rounded-2xl shadow-lg p-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-medium text-[#6A6D7C] mb-2">Login to Account</h1>
//           <p className="text-gray-500 text-sm">Please enter your email and password to continue</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-[#6A6D7C] mb-2">
//               Email address:
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="esteban_schiller@gmail.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-[#6A6D7C] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b8d946] focus:bg-white transition"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-[#6A6D7C] mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-[#6A6D7C] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b8d946] focus:bg-white transition"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>

//           {/* Remember Password & Forgot Password */}
//           <div className="flex items-center justify-between">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={rememberPassword}
//                 onChange={(e) => setRememberPassword(e.target.checked)}
//                 className="w-4 h-4 rounded border-gray-300 text-[#b8d946] focus:ring-[#b8d946]"
//               />
//               <span className="text-sm text-gray-600">Remember Password</span>
//             </label>
//             <button
//               type="button"
//               onClick={handleForgotPassword}
//               className="text-sm text-gray-600 hover:text-gray-800 transition"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           {/* Sign In Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-[#DD5621] hover:bg-[#DD5621] disabled:bg-[#DD5621]/90 text-white font-semibold py-3 rounded-lg transition duration-200"
//           >
//             {isLoading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }
"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberPassword, setRememberPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState("super-admin") // default role

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Save selected role in localStorage
    localStorage.setItem("userRole", role)

    console.log("Login attempt:", { email, password, rememberPassword, role })
    router.push("/")
    setIsLoading(false)
  }

  const handleForgotPassword = () => {
    console.log("Forgot password clicked")
    // Handle forgot password logic
    router.push("/auth/forgot-password")
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-[#6A6D7C] mb-2">Login to Account</h1>
          <p className="text-gray-500 text-sm">Please enter your details to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selector */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-[#6A6D7C] mb-2">
              Select Role:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-[#6A6D7C] focus:outline-none focus:ring-2 focus:ring-[#b8d946] focus:bg-white transition"
            >
              <option value="super-admin">Super Admin</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#6A6D7C] mb-2">
              Email address:
            </label>
            <input
              id="email"
              type="email"
              placeholder="esteban_schiller@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-[#6A6D7C] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b8d946] focus:bg-white transition"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#6A6D7C] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-[#6A6D7C] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b8d946] focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Password & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#b8d946] focus:ring-[#b8d946]"
              />
              <span className="text-sm text-gray-600">Remember Password</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-gray-600 hover:text-gray-800 transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#DD5621] hover:bg-[#DD5621] disabled:bg-[#DD5621]/90 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}
