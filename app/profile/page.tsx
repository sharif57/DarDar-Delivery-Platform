/* eslint-disable @next/next/no-img-element */
"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Camera, Edit2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Profile() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [profileImage, setProfileImage] = useState("/image/logo.png")
  const [isEditingImage, setIsEditingImage] = useState(false)

  const [profile, setProfile] = useState({
    shopName: "Giring Furgon",
    email: "alma.lawson@example.com",
    phoneNumber: "(+337) 00 55 57 60",
    dateOfBirth: "Strawberry Land",
    location: "3/2 3rd St. Albany, New York 12206, USA",
    bankAccountName: "bank name",
    bankAccountNumber: "bank account number",
    bankName: "bank name",
    paymentMethods: "Bank Transfer, Mobile Banking, bKash, Nagad",
  })

  const [editedProfile, setEditedProfile] = useState(profile)
  const [isEditing, setIsEditing] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
        setIsEditingImage(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    alert("Password changed successfully")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  return (
    <div className="p-8">
      <div className="min-h-screen bg-[#FAFAFA] rounded p-4">
        <div className="">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
            </div>
            {/* {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="text-gray-600 hover:text-gray-900">
                <Edit2 size={24} />
              </button>
            )} */}
          </div>

          {/* Profile Card */}
          <div className="p-8 max-w-5xl mx-auto">
            {/* Profile Image Section */}
            <div className="relative flex flex-col items-center bg-[#F4F5F7] mb-8 p-6 rounded pb-8 border-b border-gray-200">

              {/* Edit button — positioned top-right */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  <Edit2 size={24} />
                </button>
              )}

              <div className="relative mb-4">
                <img
                  src={profileImage || "/image/logo.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
                {isEditingImage ? (
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow hover:bg-gray-50">
                    <Camera size={20} className="text-gray-600" />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                ) : (
                  <button
                    onClick={() => setIsEditingImage(true)}
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow hover:bg-gray-50"
                  >
                    <Camera size={20} className="text-gray-600" />
                  </button>
                )}
              </div>

              <h2 className="text-3xl font-medium  text-[#929394]">{profile.shopName}</h2>
            </div>


            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 border-b border-gray-200 bg-transparent p-0">
                <TabsTrigger
                  value="profile"
                  className="pb-3 px-0 border-b-2  data-[state=active]:border-b-orange-500 data-[state=active]:text-orange-500 rounded-none bg-transparent text-gray-600 hover:text-gray-900"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="pb-3 px-0 border-b-2  data-[state=active]:border-b-orange-500 data-[state=active]:text-orange-500 rounded-none bg-transparent text-gray-600 hover:text-gray-900"
                >
                  Change Password
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                {isEditing ? (
                  <>
                    {/* Shop Name and Email */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[16px] font-normal text-[#333333] mb-2">Shop Name</label>
                        <input
                          type="text"
                          name="shopName"
                          value={editedProfile.shopName}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-[16px] font-normal text-[#333333] mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editedProfile.email}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Phone and Date of Birth */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[16px] font-normal text-[#333333] mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={editedProfile.phoneNumber}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-[16px] font-normal text-[#333333] mb-2">Date of birth</label>
                        <input
                          type="text"
                          name="dateOfBirth"
                          value={editedProfile.dateOfBirth}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-[16px] font-normal text-[#333333] mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={editedProfile.location}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    {/* Bank Account Info */}
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-primary mb-4">Bank Account Info</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[16px] font-normal text-[#333333] mb-2">Bank Account Name</label>
                          <input
                            type="text"
                            name="bankAccountName"
                            value={editedProfile.bankAccountName}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-[16px] font-normal text-[#333333] mb-2">Bank Account Number</label>
                          <input
                            type="text"
                            name="bankAccountNumber"
                            value={editedProfile.bankAccountNumber}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 mt-4">
                        <div>
                          <label className="block text-[16px] font-normal text-[#333333] mb-2">Bank Name</label>
                          <input
                            type="text"
                            name="bankName"
                            value={editedProfile.bankName}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-[16px] font-normal text-[#333333] mb-2">
                            Payment Method Preferences
                          </label>
                          <input
                            type="text"
                            name="paymentMethods"
                            value={editedProfile.paymentMethods}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4 pt-6">
                      <button
                        onClick={handleSaveProfile}
                        className="px-8 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors font-medium"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-8 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Shop Name and Email */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Shop Name</label>
                        <p className="text-gray-900 font-medium">{profile.shopName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <p className="text-gray-900 font-medium">{profile.email}</p>
                      </div>
                    </div>

                    {/* Phone and Date of Birth */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                        <p className="text-gray-900 font-medium">{profile.phoneNumber}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Date of birth</label>
                        <p className="text-gray-900 font-medium">{profile.dateOfBirth}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                      <p className="text-gray-900 font-medium">{profile.location}</p>
                    </div>

                    {/* Bank Account Info */}
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-green-600 mb-4">Bank Account Info</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Bank Account Name</label>
                          <p className="text-gray-900 font-medium">{profile.bankAccountName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Bank Account Number</label>
                          <p className="text-gray-900 font-medium">{profile.bankAccountNumber}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Bank Name</label>
                          <p className="text-gray-900 font-medium">{profile.bankName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Payment Method Preferences
                          </label>
                          <p className="text-gray-900 font-medium">{profile.paymentMethods}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* Change Password Tab */}
              <TabsContent value="password" className="space-y-6">
                <div>
                  <label className="block text-[16px] font-normal text-[#333333] mb-2">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-normal text-[#333333] mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-normal text-[#333333] mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleChangePassword}
                    className="px-8 py-2 bg-[#F35E24] text-white rounded hover:bg-[#F35E24]/90 transition-colors font-medium"
                  >
                    Update Password
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
