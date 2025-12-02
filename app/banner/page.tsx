// /* eslint-disable @next/next/no-img-element */
// "use client"

// import type React from "react"

// import { useState } from "react"
// import { X, Edit2, Trash2, Plus, ArrowLeft } from "lucide-react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
// import { useRouter } from "next/navigation"
// import { useAllBannersQuery, useCreateBannerMutation } from "@/redux/feature/bannerSlice"

// interface Cover {
//   id: number
//   name: string
//   image: string
//   urlLink: string
// }

// export default function BannerSection() {
//   const router = useRouter();


//   const { data } = useAllBannersQuery(undefined);

//   const [createBanner] = useCreateBannerMutation();

//   const [isOpen, setIsOpen] = useState(false)
//   const [editingId, setEditingId] = useState<number | null>(null)
//   const [formData, setFormData] = useState({
//     image: "",
//   })

//   const handleAddClick = () => {
//     setEditingId(null)
//     setFormData({ name: "", image: "", urlLink: "" })
//     setIsOpen(true)
//   }

//   const handleEditClick = (cover: Cover) => {
//     setEditingId(cover.id)
//     setFormData({
//       name: cover.name,
//       image: cover.image,
//       urlLink: cover.urlLink,
//     })
//     setIsOpen(true)
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//       const fromData = new FromData()

//       fromData.append("image", formData.image);

//       const res = createBanner(fromData).unwrap();

//     } catch (error) {

//     }

//     setIsOpen(false)
//   }

//   const handleDelete = (id: number) => {
//     setCover(covers.filter((c) => c.id !== id))
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setFormData({ ...formData, image: reader.result as string })
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL

//   return (
//     <div className="p-8">
//       <div className="p-4 bg-[#fafafa] rounded min-h-screen">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
//               <ArrowLeft size={20} className="text-gray-700" />
//             </button>
//             <h1 className="text-[16px] font-medium text-gray-900">Banners</h1>
//           </div>
//           {/* Add Cover Button */}
//           <div className="mb-6 flex justify-end">
//             <button
//               onClick={handleAddClick}
//               className="flex items-center gap-2 bg-[#7CC84E]/90 hover:bg-[#7CC84E]/90 text-white px-6 py-2 rounded font-medium "
//             >
//               Add Cover
//               <Plus className="w-5 h-5" />
//             </button>
//           </div>
//         </div>



//         {/* Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-4 text-left text-lg font-normal text-[#6B6B6B]">S.No</th>
//                 <th className="px-6 py-4 text-left text-lg font-normal text-[#6B6B6B]">Image</th>
//                 {/* <th className="px-6 py-4 text-left text-lg font-normal text-[#6B6B6B]">Name</th> */}
//                 <th className="px-6 py-4 text-left text-lg font-normal text-[#6B6B6B]">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {data?.data?.map((cover: Cover, index: number) => (
//                 <tr key={cover.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
//                   <td className="px-6 py-4">
//                     <img
//                       src={IMAGE + cover.image || "/placeholder.svg"}
//                       alt={cover.name}
//                       className="w-16 h-12 object-cover rounded"
//                     />
//                   </td>
//                   {/* <td className="px-6 py-4 text-sm text-gray-900">{cover.name}</td> */}
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={() => handleEditClick(cover)}
//                         className="text-blue-600 hover:text-blue-700 transition-colors"
//                       >
//                         <Edit2 className="w-5 h-5" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(cover.id)}
//                         className="text-red-600 hover:text-red-700 transition-colors"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Add/Edit Modal */}
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//           <DialogContent className="max-w-md p-0 gap-0">
//             <DialogHeader className="px-6 py-4 border-b border-gray-200 flex flex-row items-center justify-between">
//               <DialogTitle className="text-xl font-medium text-[#555656]">
//                 {editingId ? "Edit Cover" : "Add Cover"}
//               </DialogTitle>
//               <DialogClose className="text-gray-400 hover:text-gray-600">
//                 {/* <X className="w-5 h-5" /> */}
//               </DialogClose>
//             </DialogHeader>

//             <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">


//               {/* Cover Image */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer relative">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
//                   {formData.image ? (
//                     <img
//                       src={formData.image || "/placeholder.svg"}
//                       alt="Preview"
//                       className="w-full h-32 object-cover rounded"
//                     />
//                   ) : (
//                     <>
//                       <svg
//                         className="w-12 h-12 mx-auto text-gray-400 mb-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                         />
//                       </svg>
//                       <p className="text-green-500 font-medium text-sm">Browse Image</p>
//                     </>
//                   )}
//                 </div>
//               </div>



//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-[#7CC84E] hover:bg-[#7CC84E]/90 text-white py-2 rounded-lg font-medium transition-colors mt-8"
//               >
//                 Submit
//               </button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   )
// }
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef } from "react";
import { X, Edit2, Trash2, Plus, ArrowLeft, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import {
  useAllBannersQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useEditBannerMutation,
} from "@/redux/feature/bannerSlice";
import { toast } from "sonner";

interface Banner {
  id: number;
  name?: string;
  image: string;
  url_link?: string;
}

export default function BannerSection() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, refetch } = useAllBannersQuery(undefined);
  const banners: Banner[] = data?.data || [];

  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [editBanner, { isLoading: isUpdating }] = useEditBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Store actual File + preview URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const openAddModal = () => {
    setEditingId(null);
    setSelectedFile(null);
    setPreviewUrl("");
    setIsOpen(true);
  };

  const openEditModal = (banner: Banner) => {
    setEditingId(banner.id);
    setSelectedFile(null);
    setPreviewUrl(IMAGE_URL + banner.image);
    setIsOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile && !editingId) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();

    // Only append file if it's a new file (create or update with new image)
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      if (editingId) {
        // Update existing banner
        const res = await editBanner({ id: editingId, data: formData }).unwrap();
        toast.success(res?.message || "Banner updated successfully!");
      } else {
        // Create new banner
        await createBanner(formData).unwrap();
        toast.success("Banner added successfully!");
      }

      refetch(); // Refresh list
      setIsOpen(false);
      resetForm();
    } catch (error: any) {
      console.error("Banner operation failed:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: number) => {
    // if (!confirm("Are you sure you want to delete this banner?")) return;

    try {
    const res =  await deleteBanner(id).unwrap();
      toast.success(res?.message || "Banner deleted successfully");
      refetch();
    } catch (error : any) {
      toast.error(error?.data?.message || "Failed to delete banner");
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setEditingId(null);
  };

  return (
    <div className="p-8">
      <div className="p-6 bg-[#fafafa] rounded-lg min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Banners</h1>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#7CC84E] hover:bg-[#6ab33e] text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add Banner
          </button>
        </div>

        {/* Banners Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">S.No</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Image</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {banners.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                    No banners found. Click "Add Banner" to create one.
                  </td>
                </tr>
              ) : (
                banners.map((banner, index) => (
                  <tr key={banner.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4">
                      <img
                        src={IMAGE_URL + banner.image}
                        alt="Banner"
                        className="w-32 h-20 object-cover rounded-lg shadow-sm"
                        onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => openEditModal(banner)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(banner.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {editingId ? "Edit Banner" : "Add New Banner"}
              </DialogTitle>
              <DialogClose />
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Banner Image <span className="text-red-500">*</span>
                </label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#7CC84E] transition-all cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mx-auto max-h-64 rounded-lg shadow-md object-contain"
                      />
                      <p className="text-sm text-gray-600">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="mx-auto w-12 h-12 text-gray-400" />
                      <div>
                        <p className="text-lg font-medium text-[#7CC84E]">Click to upload</p>
                        <p className="text-sm text-gray-500 mt-1">
                          PNG, JPG up to 5MB (Recommended: 1920x600)
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  // disabled={isCreating || isUpdating || (!selectedFile && !editingId)}
                  className="px-8 py-2 bg-[#7CC84E] hover:bg-[#6ab33e] disabled:opacity-60 text-white rounded-lg font-medium transition shadow-md flex items-center gap-2"
                >
                  {/* {(isCreating || isUpdating) ? "Saving..." : editingId ? "Update" : "Add Banner"} */}
                  {editingId ? "Update" : "Add Banner"}
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}