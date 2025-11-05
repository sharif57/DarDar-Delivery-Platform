// "use client"

// import { Shield, AlertTriangle, CheckCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Switch } from "@/components/ui/switch"

// export default function TrustAndSafety() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-3">
//         <Shield className="w-6 h-6 text-blue-600" />
//         <h2 className="text-xl font-semibold text-gray-900">Trust and Safety</h2>
//       </div>

//       <div className="space-y-6">
//         {/* Two-Factor Authentication */}
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <div className="flex items-start justify-between">
//             <div className="space-y-2">
//               <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
//               <p className="text-sm text-gray-600">
//                 Add an extra layer of security to your account by enabling two-factor authentication.
//               </p>
//             </div>
//             <Switch />
//           </div>
//         </div>

//         {/* Login Alerts */}
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <div className="flex items-start justify-between">
//             <div className="space-y-2">
//               <h3 className="font-medium text-gray-900">Login Alerts</h3>
//               <p className="text-sm text-gray-600">
//                 Get notified when someone logs into your account from a new device.
//               </p>
//             </div>
//             <Switch defaultChecked />
//           </div>
//         </div>

//         {/* Account Recovery */}
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <div className="space-y-3">
//             <div className="flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-green-500" />
//               <h3 className="font-medium text-gray-900">Account Recovery</h3>
//             </div>
//             <p className="text-sm text-gray-600">
//               Your recovery email is set and verified. You can use it to recover your account if needed.
//             </p>
//             <Button variant="outline" size="sm">
//               Update Recovery Email
//             </Button>
//           </div>
//         </div>

//         {/* Security Checkup */}
//         <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
//           <div className="space-y-3">
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="w-5 h-5 text-yellow-600" />
//               <h3 className="font-medium text-gray-900">Security Checkup</h3>
//             </div>
//             <p className="text-sm text-gray-600">
//               We recommend running a security checkup to ensure your account is properly protected.
//             </p>
//             <Button className="bg-yellow-600 hover:bg-yellow-700 text-white" size="sm">
//               Run Security Checkup
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { Shield } from "lucide-react"
import { Button } from "./ui/button"
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css'
import { useState } from "react"
import dynamic from "next/dynamic"
import { toast } from "sonner"
import { useAboutUsGetQuery, useUpdateAboutUsMutation } from "@/redux/feature/settingSlice"

export default function TrustAndSafety() {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState('')

  const { data, isLoading, error } = useAboutUsGetQuery(undefined)
  const [editTermsAndConditions] = useUpdateAboutUsMutation()

  const termsDescription = data?.data[0]?.content || ""

  const handleEditClick = () => {
    setValue(termsDescription)
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      await editTermsAndConditions({
        id: data?.data[0]?.id, 
        content: value,
      }).unwrap()
      setIsEditing(false) 
      toast.success('about us updated successfully')
    } catch (err) {
      console.error("Failed to save terms:", err)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setValue('') 
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">About Us</h2>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading terms and conditions.</p>
        ) : !isEditing ? (
          <p dangerouslySetInnerHTML={{ __html: termsDescription }}></p>
        ) : (
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        )}
      </div>

      <div className="flex justify-end pt-4 gap-4">
        {!isEditing ? (
          <Button onClick={handleEditClick} className="bg-[#D69D21] hover:bg-[#D69D21]/90 text-black">Edit Terms</Button>
        ) : (
          <>
            <Button variant="outline" className=" text-black" onClick={handleCancel}>Cancel</Button>
            <Button className="bg-[#D69D21] hover:bg-[#D69D21]/90 text-black" onClick={handleSave}>Save</Button>
          </>
        )}
      </div>
    </div>
  )
}