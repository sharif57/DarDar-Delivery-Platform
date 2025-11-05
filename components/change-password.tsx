// "use client"

// import { useState } from "react"
// import { Eye, EyeOff } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useChangePasswordMutation } from "@/redux/feature/authSlice"

// export default function ChangePassword() {
//   const [changePassword] = useChangePasswordMutation();
//   const [passwords, setPasswords] = useState({
//     current: "",
//     new: "",
//     confirm: "",
//   })
//   const [showPasswords, setShowPasswords] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   })

//   const handlePasswordChange = (field: string, value: string) => {
//     setPasswords((prev) => ({ ...prev, [field]: value }))
//   }

//   const togglePasswordVisibility = (field: string) => {
//     setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
//   }

//   const handleSave = () => {
//     // Handle password change logic here
//     console.log("Changing password")
//   }

//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>

//       <div className="space-y-4">
//         {/* Current Password */}
//         <div className="space-y-2">
//           <Label htmlFor="current-password" className="text-sm font-medium text-gray-700">
//             Current Password
//           </Label>
//           <div className="relative">
//             <Input
//               id="current-password"
//               type={showPasswords.current ? "text" : "password"}
//               value={passwords.current}
//               onChange={(e) => handlePasswordChange("current", e.target.value)}
//               className="pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => togglePasswordVisibility("current")}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>

//         {/* New Password */}
//         <div className="space-y-2">
//           <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
//             New Password
//           </Label>
//           <div className="relative">
//             <Input
//               id="new-password"
//               type={showPasswords.new ? "text" : "password"}
//               value={passwords.new}
//               onChange={(e) => handlePasswordChange("new", e.target.value)}
//               className="pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => togglePasswordVisibility("new")}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>

//         {/* Confirm Password */}
//         <div className="space-y-2">
//           <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
//             Confirm New Password
//           </Label>
//           <div className="relative">
//             <Input
//               id="confirm-password"
//               type={showPasswords.confirm ? "text" : "password"}
//               value={passwords.confirm}
//               onChange={(e) => handlePasswordChange("confirm", e.target.value)}
//               className="pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => togglePasswordVisibility("confirm")}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-center pt-4">
//         <Button
//           onClick={handleSave}
//           className="px-8 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium"
//         >
//           Update Password
//         </Button>
//       </div>
//     </div>
//   )
// }
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePasswordMutation } from "@/redux/feature/authSlice";
import { toast } from "sonner";

export default function ChangePassword() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (field: "current" | "new" | "confirm", value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    const { current, new: newPass, confirm } = passwords;

    // Validation
    if (!current || !newPass || !confirm) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPass !== confirm) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPass.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    try {
      await changePassword({
        old_password: current,
        new_password: newPass,
        confirm_password: confirm,
      }).unwrap();

      toast.success("Password changed successfully!");
      
      // Reset form
      setPasswords({ current: "", new: "", confirm: "" });
      
    } catch (error: any) {
      const message = error?.data?.message || "Failed to change password";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6 max-w- mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        Change Password
      </h2>

      <div className="space-y-5 bg-white p-6 rounded-lg shadow-sm border">
        {/* Current Password */}
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <div className="relative">
            <Input
              id="current-password"
              type={showPasswords.current ? "text" : "password"}
              value={passwords.current}
              onChange={(e) => handlePasswordChange("current", e.target.value)}
              placeholder="Enter current password"
              className="pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <div className="relative">
            <Input
              id="new-password"
              type={showPasswords.new ? "text" : "password"}
              value={passwords.new}
              onChange={(e) => handlePasswordChange("new", e.target.value)}
              placeholder="Enter new password"
              className="pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showPasswords.confirm ? "text" : "password"}
              value={passwords.confirm}
              onChange={(e) => handlePasswordChange("confirm", e.target.value)}
              placeholder="Confirm new password"
              className="pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 w-1/2 mx-auto">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full bg-[#D69D21] hover:bg-[#D69D21]/90 text-white font-medium py-6 text-lg"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>
    </div>
  );
}