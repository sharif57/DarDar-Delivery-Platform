// "use client"

// import { FileText, Eye, EyeOff } from "lucide-react"
// import { Switch } from "@/components/ui/switch"
// import { Button } from "@/components/ui/button"

// export default function PrivacyAndPolicy() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-3">
//         <FileText className="w-6 h-6 text-blue-600" />
//         <h2 className="text-xl font-semibold text-gray-900">Privacy and Policy</h2>
//       </div>

//       <div className="space-y-6">
//         {/* Profile Visibility */}
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <div className="flex items-start justify-between">
//             <div className="space-y-2">
//               <h3 className="font-medium text-gray-900">Profile Visibility</h3>
//               <p className="text-sm text-gray-600">Control who can see your profile information and activity.</p>
//             </div>
//             <Switch defaultChecked />
//           </div>
//         </div>

//         {/* Data Collection */}
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <div className="flex items-start justify-between">
//             <div className="space-y-2">
//               <h3 className="font-medium text-gray-900">Analytics and Data Collection</h3>
//               <p className="text-sm text-gray-600">Allow us to collect anonymous usage data to improve our services.</p>
//             </div>
//             <Switch />
//           </div>
//         </div>

//         {/* Marketing Communications */}
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <div className="flex items-start justify-between">
//             <div className="space-y-2">
//               <h3 className="font-medium text-gray-900">Marketing Communications</h3>
//               <p className="text-sm text-gray-600">
//                 Receive emails about new features, updates, and promotional offers.
//               </p>
//             </div>
//             <Switch />
//           </div>
//         </div>

//         {/* Data Export */}
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <div className="space-y-3">
//             <div className="flex items-center gap-2">
//               <Eye className="w-5 h-5 text-gray-600" />
//               <h3 className="font-medium text-gray-900">Data Export</h3>
//             </div>
//             <p className="text-sm text-gray-600">
//               Download a copy of your data including profile information, settings, and activity.
//             </p>
//             <Button variant="outline" size="sm">
//               Request Data Export
//             </Button>
//           </div>
//         </div>

//         {/* Account Deletion */}
//         <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
//           <div className="space-y-3">
//             <div className="flex items-center gap-2">
//               <EyeOff className="w-5 h-5 text-red-600" />
//               <h3 className="font-medium text-gray-900">Delete Account</h3>
//             </div>
//             <p className="text-sm text-gray-600">
//               Permanently delete your account and all associated data. This action cannot be undone.
//             </p>
//             <Button variant="destructive" size="sm">
//               Delete Account
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import 'react-quill-new/dist/quill.snow.css'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import { useState } from "react"
import dynamic from "next/dynamic"
import { usePrivacyGetQuery, useUpdatePrivacyMutation } from "@/redux/feature/settingSlice"
import { toast } from "sonner"

export default function PrivacyAndPolicy() {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState('')

  const { data, isLoading, error } = usePrivacyGetQuery(undefined)
  const [updatePrivacyPolice] = useUpdatePrivacyMutation()

  const policyDescription = data?.data[0]?.content || ""

  const handleEditClick = () => {
    setValue(policyDescription) 

    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      await updatePrivacyPolice({
        id: data?.data[0]?.id, 
        content: value,
      }).unwrap()
      setIsEditing(false) 
      toast.success('privacy policy updated successfully')
    } catch (err) {
      console.error("Failed to save privacy policy:", err)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setValue('') 
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Privacy and Policy</h2>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading privacy policy.</p>
        ) : !isEditing ? (
          <p dangerouslySetInnerHTML={{ __html: policyDescription }}></p>
        ) : (
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        )}
      </div>

      <div className="flex justify-end pt-4 gap-4">
        {!isEditing ? (
          <Button onClick={handleEditClick} className="bg-[#D69D21] hover:bg-[#D69D21]/90 text-black">Edit Policy</Button>
        ) : (
          <>
            <Button variant="outline" className=" text-black" onClick={handleCancel}>Cancel</Button>
            <Button className="bg-[#D69D21] hover:bg-[#D69D21]/90" onClick={handleSave}>Save</Button>
          </>
        )}
      </div>
    </div>
  )
}