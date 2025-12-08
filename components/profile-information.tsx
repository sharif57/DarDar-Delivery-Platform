
// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Camera, Edit2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import Image from "next/image"
// import { useForm } from "react-hook-form"
// import { toast } from "sonner"
// import { useUpdateProfileMutation, useUserProfileQuery } from "@/redux/feature/userSlice"

// export default function ProfileInformation() {
//   const { data, isLoading } = useUserProfileQuery(undefined)
//   console.log(data, 'profile')
//   const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
//   const [isEditing, setIsEditing] = useState({ name: false, email: false })
//   const [previewImage, setPreviewImage] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   type ProfileFormValues = {
//     name: string
//     email: string
//     profileImage: File | null
//   }

//   const { register, handleSubmit, setValue } = useForm<ProfileFormValues>({
//     defaultValues: {
//       name: "",
//       email: "",
//       profileImage: null,
//     },
//   })

//   // Set initial form values when data is loaded
//   useEffect(() => {
//     if (data?.data) {
//       setValue("name", data.data.name || "")
//       setValue("email", data.data.email || "")
//       // Use the API URL only for server-hosted images, fallback to placeholder
//       const imageUrl = data.data.image
//         ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${data.data.image}`
//         : "/placeholder.svg?height=96&width=96"
//       setPreviewImage(imageUrl)
//     }
//   }, [data, setValue])

//   const handleImageChange = (e : React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files
//     if (!files || files.length === 0) {
//       return
//     }
//     const file = files[0]
//     if (file) {
//       // Validate file type
//       const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
//       if (!validImageTypes.includes(file.type)) {
//         toast.error("Please upload a valid image file (JPEG, PNG, GIF, or WebP)")
//         return
//       }
//       // Validate file size (e.g., max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("Image size must be less than 5MB")
//         return
//       }
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         if (typeof reader.result === "string" || reader.result === null) {
//           setPreviewImage(reader.result) 
//         }
//       }
//       reader.readAsDataURL(file)
//       setValue("profileImage", file)
//     }
//   }

//   const onSubmit = async (formData: any) => {
//     try {
//       const formDataToSend = new FormData()
//       formDataToSend.append("name", formData.name)
//       if (formData.profileImage) {
//         formDataToSend.append("image", formData.profileImage)
//       }

//       const response = await updateProfile({id: data?.data.id, data: formDataToSend}).unwrap()
//       toast.success("Profile updated successfully!")
//       setIsEditing({ name: false, email: false })
//     } catch (error) {
//       toast.error(
//         "Failed to update profile: " +
//           (error && typeof error === "object" && "message" in error
//             ? (error as { message: string }).message
//             : "Unknown error")
//       )
//     }
//   }

//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//       {/* Profile Picture */}
//       <div className="flex justify-center">
//         <div className="relative">
//           <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100">
//             <Image
//               src={previewImage || "/placeholder.svg?height=96&width=96"}
//               alt="Profile picture"
//               width={96}
//               height={96}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={() => fileInputRef.current && fileInputRef.current.click()}
//             className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
//           >
//             <Camera className="w-4 h-4 text-white" />
//           </button>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleImageChange}
//             accept="image/jpeg,image/png,image/gif,image/webp"
//             className="hidden"
//           />
//         </div>
//       </div>

//       {/* Form Fields */}
//       <div className="space-y-6">
//         {/* Name Field */}
//         <div className="space-y-2">
//           <Label htmlFor="name" className="text-sm font-medium text-gray-700">
//             Name
//           </Label>
//           <div className="relative">
//             <Input
//               id="name"
//               {...register("name")}
//               disabled={!isEditing.name}
//               className="pr-10 bg-gray-50 border-gray-200"
//             />
//             <button
//               type="button"
//               onClick={() => setIsEditing((prev) => ({ ...prev, name: !prev.name }))}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               <Edit2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* Email Field */}
//         <div className="space-y-2">
//           <Label htmlFor="email" className="text-sm font-medium text-gray-700">
//             Email
//           </Label>
//           <div className="relative">
//             <Input
//               id="email"
//               type="email"
//               {...register("email")}
//               disabled={!isEditing.email}
//               className="pr-10 bg-gray-50 border-gray-200"
//             />

//           </div>
//         </div>
//       </div>

//       {/* Save Button */}
//       <div className="flex justify-center pt-4">
//         <Button
//           type="submit"
//           disabled={isUpdating}
//            className="px-8 py-2 bg-[#D69D21] hover:bg-[#D69D21]/90  text-white rounded-lg font-medium"
//         >
//           {isUpdating ? "Saving..." : "Save Change"}
//         </Button>
//       </div>
//     </form>
//   )
// }

"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useUpdateProfileMutation, useUserProfileQuery } from "@/redux/feature/userSlice"

export default function ProfileInformation() {
  const { data, isLoading } = useUserProfileQuery(undefined)
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()

  const [isEditing, setIsEditing] = useState({
    full_name: false, phone_number: false,
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  type ProfileFormValues = {
    full_name: string
    profileImage: File | null
    phone_number: string
  }

  const { register, handleSubmit, setValue } = useForm<ProfileFormValues>({
    defaultValues: {
      full_name: "",
      phone_number: "",
      profileImage: null,
    },
  })

  // Load initial values
  useEffect(() => {
    if (data?.data) {
      setValue("full_name", data.data.full_name || "")

      const img = data.data.image
        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${data.data.image}`
        : "/placeholder.svg?height=96&width=96"

      setPreviewImage(img)
    }
  }, [data, setValue])

  useEffect(() => {
    if (data?.data) {
      setValue("phone_number", data.data.phone_number || "")
    }
  }, [data, setValue])


  // Image Change Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!validImageTypes.includes(file.type)) {
      toast.error("Invalid image type")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be below 5MB")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => setPreviewImage(reader.result as string)
    reader.readAsDataURL(file)

    setValue("profileImage", file)
  }

  // Submit Handler
  const onSubmit = async (formData: any) => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("full_name", formData.full_name)
      formDataToSend.append("phone_number", formData.phone_number || "")

      if (formData.profileImage) {
        formDataToSend.append("image", formData.profileImage)
      }

      await updateProfile(formDataToSend).unwrap()

      toast.success("Profile updated successfully!")
      setIsEditing({ full_name: false, phone_number: false })
    } catch (error: any) {
      toast.error(
        "Update failed: " + (error?.message || "Unknown error")
      )
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Profile Photo */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100">
            <Image
              src={previewImage || "/placeholder.svg?height=96&width=96"}
              alt="Profile picture"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center"
          >
            <Camera className="w-4 h-4 text-white" />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label className="text-sm text-gray-700">Full Name</Label>
        <div className="relative">
          <Input
            {...register("full_name")}
            disabled={!isEditing.full_name}
            className="pr-10 bg-gray-50 border-gray-200"
          />
          <button
            type="button"
            onClick={() => setIsEditing((prev) => ({ ...prev, full_name: !prev.full_name }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </div>


      <div className="space-y-2">
        <Label className="text-sm text-gray-700">Phone Number</Label>

        <div className="relative">
          <Input
            {...register("phone_number")}
            disabled={!isEditing.phone_number}
            className="pr-10 bg-gray-50 border-gray-200"
          />

          <button
            type="button"
            onClick={() =>
              setIsEditing((prev) => ({ ...prev, phone_number: !prev.phone_number }))
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </div>


      {/* Email (cannot edit) */}
      <div className="space-y-2">
        <Label className="text-sm text-gray-700">Email</Label>
        <Input value={data?.data.email} disabled className="bg-gray-100" />
      </div>



      {/* Save Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={isUpdating}
          className="px-8 py-2 bg-[#D69D21] text-white rounded-lg"
        >
          {isUpdating ? "Saving..." : "Save Change"}
        </Button>
      </div>
    </form>
  )
}
