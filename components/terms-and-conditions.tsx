// "use client"

// import { ScrollText, ExternalLink } from "lucide-react"
// import { Button } from "@/components/ui/button"

// export default function TermsAndConditions() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-3">
//         <ScrollText className="w-6 h-6 text-blue-600" />
//         <h2 className="text-xl font-semibold text-gray-900">Terms and Conditions</h2>
//       </div>

//       <div className="space-y-6">
//         {/* Current Terms */}
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <div className="space-y-3">
//             <h3 className="font-medium text-gray-900">Current Terms of Service</h3>
//             <p className="text-sm text-gray-600">Last updated: December 1, 2024</p>
//             <p className="text-sm text-gray-600">
//               By using our service, you agree to be bound by these terms and conditions.
//             </p>
//             <Button variant="outline" size="sm" className="flex items-center gap-2">
//               View Full Terms
//               <ExternalLink className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Privacy Policy */}
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <div className="space-y-3">
//             <h3 className="font-medium text-gray-900">Privacy Policy</h3>
//             <p className="text-sm text-gray-600">Last updated: December 1, 2024</p>
//             <p className="text-sm text-gray-600">Learn how we collect, use, and protect your personal information.</p>
//             <Button variant="outline" size="sm" className="flex items-center gap-2">
//               View Privacy Policy
//               <ExternalLink className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Cookie Policy */}
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <div className="space-y-3">
//             <h3 className="font-medium text-gray-900">Cookie Policy</h3>
//             <p className="text-sm text-gray-600">Last updated: December 1, 2024</p>
//             <p className="text-sm text-gray-600">Information about how we use cookies and similar technologies.</p>
//             <Button variant="outline" size="sm" className="flex items-center gap-2">
//               View Cookie Policy
//               <ExternalLink className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Agreement Status */}
//         <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
//           <div className="space-y-2">
//             <h3 className="font-medium text-gray-900">Agreement Status</h3>
//             <p className="text-sm text-gray-600">
//               ✓ You have accepted the current terms and conditions on December 1, 2024.
//             </p>
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
import {  useTermsQuery, useUpdataTeamsMutation } from "@/redux/feature/settingSlice"
import { toast } from "sonner"

export default function TrustAndSafety() {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState('')

  const { data, isLoading, error } = useTermsQuery(undefined)
  const [editTermsAndConditions] = useUpdataTeamsMutation()

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
      toast.success('terms and conditions updated successfully')
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
        <h2 className="text-xl font-semibold text-gray-900">Terms and Conditions</h2>
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