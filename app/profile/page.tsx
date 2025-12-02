// /* eslint-disable @next/next/no-img-element */
// "use client"

// import type React from "react"
// import { useState } from "react"
// import { ArrowLeft, Camera, Edit2 } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import { useUpdateProfileMutation, useUserProfileQuery } from "@/redux/feature/userSlice"

// export default function Profile() {
//   const router = useRouter()
//   const [activeTab, setActiveTab] = useState("profile")
//   const [profileImage, setProfileImage] = useState("/image/logo.png")
//   const [isEditingImage, setIsEditingImage] = useState(false)

//   const {data} = useUserProfileQuery(undefined);
//   console.log(data?.data,'=============ddddddddd!!')

//   const [updateProfile] = useUpdateProfileMutation();

//   const [profile, setProfile] = useState({
//     shopName: "Giring Furgon",
//     email: "alma.lawson@example.com",
//     phoneNumber: "(+337) 00 55 57 60",
//     dateOfBirth: "Strawberry Land",
//     location: "3/2 3rd St. Albany, New York 12206, USA",
//     bankAccountName: "bank name",
//     bankAccountNumber: "bank account number",
//     bankName: "bank name",
//     paymentMethods: "Bank Transfer, Mobile Banking, bKash, Nagad",
//   })

//   const [editedProfile, setEditedProfile] = useState(profile)
//   const [isEditing, setIsEditing] = useState(false)
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   })

//   const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setEditedProfile((prev) => ({ ...prev, [name]: value }))
//   }

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setPasswordData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setProfileImage(reader.result as string)
//         setIsEditingImage(false)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSaveProfile = () => {
//     setProfile(editedProfile)
//     setIsEditing(false)
//   }

//   const handleCancelEdit = () => {
//     setEditedProfile(profile)
//     setIsEditing(false)
//   }

//   const handleChangePassword = () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert("Passwords do not match")
//       return
//     }
//     alert("Password changed successfully")
//     setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
//   }

//   return (
//     <div className="p-8">
//       <div className="min-h-screen bg-[#FAFAFA] rounded p-4">
//         <div className="">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center gap-4">
//               <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
//                 <ArrowLeft size={24} />
//               </button>
//               <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
//             </div>
//             {/* {!isEditing && (
//               <button onClick={() => setIsEditing(true)} className="text-gray-600 hover:text-gray-900">
//                 <Edit2 size={24} />
//               </button>
//             )} */}
//           </div>

//           {/* Profile Card */}
//           <div className="p-8 max-w-5xl mx-auto">
//             {/* Profile Image Section */}
//             <div className="relative flex flex-col items-center bg-[#F4F5F7] mb-8 p-6 rounded pb-8 border-b border-gray-200">

//               {/* Edit button — positioned top-right */}
//               {!isEditing && (
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
//                 >
//                   <Edit2 size={24} />
//                 </button>
//               )}

//               <div className="relative mb-4">
//                 <img
//                   src={profileImage || "/image/logo.png"}
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
//                 />
//                 {isEditingImage ? (
//                   <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow hover:bg-gray-50">
//                     <Camera size={20} className="text-gray-600" />
//                     <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//                   </label>
//                 ) : (
//                   <button
//                     onClick={() => setIsEditingImage(true)}
//                     className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow hover:bg-gray-50"
//                   >
//                     <Camera size={20} className="text-gray-600" />
//                   </button>
//                 )}
//               </div>

//               <h2 className="text-3xl font-medium  text-[#929394]">{profile.shopName}</h2>
//             </div>


//             {/* Tabs */}
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList className="grid w-full grid-cols-2 mb-8 border-b border-gray-200 bg-transparent p-0">
//                 <TabsTrigger
//                   value="profile"
//                   className="pb-3 px-0 border-b-2  data-[state=active]:border-b-orange-500 data-[state=active]:text-orange-500 rounded-none bg-transparent text-gray-600 hover:text-gray-900"
//                 >
//                   Profile
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="password"
//                   className="pb-3 px-0 border-b-2  data-[state=active]:border-b-orange-500 data-[state=active]:text-orange-500 rounded-none bg-transparent text-gray-600 hover:text-gray-900"
//                 >
//                   Change Password
//                 </TabsTrigger>
//               </TabsList>

//               {/* Profile Tab */}
//               <TabsContent value="profile" className="space-y-6">
//                 {isEditing ? (
//                   <>
//                     {/* Shop Name and Email */}
//                     <div className="grid grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-[16px] font-normal text-[#333333] mb-2">Shop Name</label>
//                         <input
//                           type="text"
//                           name="shopName"
//                           value={editedProfile.shopName}
//                           onChange={handleProfileChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-[16px] font-normal text-[#333333] mb-2">Email</label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={editedProfile.email}
//                           onChange={handleProfileChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         />
//                       </div>
//                     </div>

//                     {/* Phone and Date of Birth */}
//                     <div className="grid grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-[16px] font-normal text-[#333333] mb-2">Phone Number</label>
//                         <input
//                           type="tel"
//                           name="phoneNumber"
//                           value={editedProfile.phoneNumber}
//                           onChange={handleProfileChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-[16px] font-normal text-[#333333] mb-2">Date of birth</label>
//                         <input
//                           type="text"
//                           name="dateOfBirth"
//                           value={editedProfile.dateOfBirth}
//                           onChange={handleProfileChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         />
//                       </div>
//                     </div>

//                     {/* Location */}
//                     <div>
//                       <label className="block text-[16px] font-normal text-[#333333] mb-2">Location</label>
//                       <input
//                         type="text"
//                         name="location"
//                         value={editedProfile.location}
//                         onChange={handleProfileChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                       />
//                     </div>

//                     {/* Bank Account Info */}
//                     <div className="pt-4 border-t border-gray-200">
//                       <h3 className="text-sm font-medium text-primary mb-4">Bank Account Info</h3>
//                       <div className="grid grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-[16px] font-normal text-[#333333] mb-2">Bank Account Name</label>
//                           <input
//                             type="text"
//                             name="bankAccountName"
//                             value={editedProfile.bankAccountName}
//                             onChange={handleProfileChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-[16px] font-normal text-[#333333] mb-2">Bank Account Number</label>
//                           <input
//                             type="text"
//                             name="bankAccountNumber"
//                             value={editedProfile.bankAccountNumber}
//                             onChange={handleProfileChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           />
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-2 gap-6 mt-4">
//                         <div>
//                           <label className="block text-[16px] font-normal text-[#333333] mb-2">Bank Name</label>
//                           <input
//                             type="text"
//                             name="bankName"
//                             value={editedProfile.bankName}
//                             onChange={handleProfileChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-[16px] font-normal text-[#333333] mb-2">
//                             Payment Method Preferences
//                           </label>
//                           <input
//                             type="text"
//                             name="paymentMethods"
//                             value={editedProfile.paymentMethods}
//                             onChange={handleProfileChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex justify-center gap-4 pt-6">
//                       <button
//                         onClick={handleSaveProfile}
//                         className="px-8 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors font-medium"
//                       >
//                         Update
//                       </button>
//                       <button
//                         onClick={handleCancelEdit}
//                         className="px-8 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors font-medium"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     {/* Shop Name and Email */}
//                     <div className="grid grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">Shop Name</label>
//                         <p className="text-gray-900 font-medium">{profile.shopName}</p>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
//                         <p className="text-gray-900 font-medium">{profile.email}</p>
//                       </div>
//                     </div>

//                     {/* Phone and Date of Birth */}
//                     <div className="grid grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
//                         <p className="text-gray-900 font-medium">{profile.phoneNumber}</p>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">Date of birth</label>
//                         <p className="text-gray-900 font-medium">{profile.dateOfBirth}</p>
//                       </div>
//                     </div>

//                     {/* Location */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
//                       <p className="text-gray-900 font-medium">{profile.location}</p>
//                     </div>

//                     {/* Bank Account Info */}
//                     <div className="pt-4 border-t border-gray-200">
//                       <h3 className="text-sm font-semibold text-green-600 mb-4">Bank Account Info</h3>
//                       <div className="grid grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-600 mb-1">Bank Account Name</label>
//                           <p className="text-gray-900 font-medium">{profile.bankAccountName}</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-600 mb-1">Bank Account Number</label>
//                           <p className="text-gray-900 font-medium">{profile.bankAccountNumber}</p>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-2 gap-6 mt-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-600 mb-1">Bank Name</label>
//                           <p className="text-gray-900 font-medium">{profile.bankName}</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-600 mb-1">
//                             Payment Method Preferences
//                           </label>
//                           <p className="text-gray-900 font-medium">{profile.paymentMethods}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </TabsContent>

//               {/* Change Password Tab */}
//               <TabsContent value="password" className="space-y-6">
//                 <div>
//                   <label className="block text-[16px] font-normal text-[#333333] mb-2">Current Password</label>
//                   <input
//                     type="password"
//                     name="currentPassword"
//                     value={passwordData.currentPassword}
//                     onChange={handlePasswordChange}
//                     placeholder="Enter current password"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[16px] font-normal text-[#333333] mb-2">New Password</label>
//                   <input
//                     type="password"
//                     name="newPassword"
//                     value={passwordData.newPassword}
//                     onChange={handlePasswordChange}
//                     placeholder="Enter new password"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[16px] font-normal text-[#333333] mb-2">Confirm Password</label>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     value={passwordData.confirmPassword}
//                     onChange={handlePasswordChange}
//                     placeholder="Confirm new password"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div className="flex justify-center pt-4">
//                   <button
//                     onClick={handleChangePassword}
//                     className="px-8 py-2 bg-[#F35E24] text-white rounded hover:bg-[#F35E24]/90 transition-colors font-medium"
//                   >
//                     Update Password
//                   </button>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useUserProfileQuery, useUpdateProfileMutation } from "@/redux/feature/userSlice";
import { toast } from "sonner";

interface ProfileData {
  shop_name: string;
  email: string;
  phone_number: string;
  shop_address: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  shop_image?: string;
  image?: string;
}

export default function Profile() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading: loadingProfile, refetch } = useUserProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const user = data?.data;

  // State for profile image (preview + actual file)
  const [profileImagePreview, setProfileImagePreview] = useState<string>("/image/logo.png");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  // Form state
  const [formData, setFormData] = useState<ProfileData>({
    shop_name: "",
    email: "",
    phone_number: "",
    shop_address: "",
    bank_name: "",
    account_name: "",
    account_number: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Populate form when data loads
  useEffect(() => {
    if (user) {
      setFormData({
        shop_name: user.shop_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        shop_address: user.shop_address || user.shop_address || "",
        bank_name: user.bank_name || "",
        account_name: user.account_name || "",
        account_number: user.account_number || "",
      });

      // Set shop image (priority: shop_image → image → default)
      const imageUrl = user.shop_image
        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user.shop_image}`
        : user.image
          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user.image}`
          : "/image/logo.png";

      setProfileImagePreview(imageUrl);
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Save Profile (with real file upload)
  const handleSaveProfile = async () => {
    if (!formData.shop_name || !formData.email) {
      toast.error("Shop name and email are required");
      return;
    }

    const submitData = new FormData();

    // Append text fields
    submitData.append("shop_name", formData.shop_name);
    submitData.append("email", formData.email);
    submitData.append("phone_number", formData.phone_number);
    submitData.append("shop_address", formData.shop_address);
    submitData.append("bank_name", formData.bank_name);
    submitData.append("account_name", formData.account_name);
    submitData.append("account_number", formData.account_number);

    // Append image only if a new one is selected
    if (selectedImageFile) {
      submitData.append("shop_image", selectedImageFile);
    }

    try {
      const response = await updateProfile(submitData).unwrap();
      toast.success(response?.message || "Profile updated successfully!");
      setIsEditing(false);
      setSelectedImageFile(null); // Reset file
      refetch(); // Refresh data
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedImageFile(null);
    if (user) {
      setProfileImagePreview(
        user.shop_image
          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user.shop_image}`
          : user.image
            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user.image}`
            : "/image/logo.png"
      );
    }
  };

  if (loadingProfile) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="p-8">
      <div className="min-h-screen bg-[#FAFAFA] rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft size={28} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSaveProfile}
                disabled={isUpdating}
                className="px-8 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-70 transition font-medium"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 text-center">
            <div className="relative inline-block">
              <img
                src={profileImagePreview}
                alt="Shop"
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow-lg"
              />
              {isEditing && (
                <button
                  onClick={handleImageClick}
                  className="absolute bottom-2 right-2 bg-white rounded-full p-3 shadow-xl hover:bg-gray-100 transition border"
                >
                  <Camera size={24} className="text-gray-700" />
                </button>
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-6">{formData.shop_name || "Your Shop"}</h2>
            <p className="text-gray-600 mt-2">{formData.email}</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="password">Change Password</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="shop_name"
                        value={formData.shop_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    ) : (
                      <p className="text-lg font-medium text-gray-900">{formData.shop_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    ) : (
                      <p className="text-lg font-medium text-gray-900">{formData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    ) : (
                      <p className="text-lg font-medium text-gray-900">{formData.phone_number}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shop Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="shop_address"
                        value={formData.shop_address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    ) : (
                      <p className="text-lg font-medium text-gray-900">{formData.shop_address}</p>
                    )}
                  </div>
                </div>

                {/* Bank Details */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Bank Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="bank_name"
                          value={formData.bank_name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                      ) : (
                        <p className="text-lg font-medium text-gray-900">{formData.bank_name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="account_name"
                          value={formData.account_name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                      ) : (
                        <p className="text-lg font-medium text-gray-900">{formData.account_name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="account_number"
                          value={formData.account_number}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                      ) : (
                        <p className="text-lg font-medium text-gray-900">{formData.account_number}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Change Password Tab */}
            <TabsContent value="password" className="bg-white rounded-xl shadow-sm p-8">
              <div className="max-w-md mx-auto space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <button className="w-full bg-[#F35E24] hover:bg-[#d94e1f] text-white py-3 rounded-lg font-medium transition">
                  Update Password
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}