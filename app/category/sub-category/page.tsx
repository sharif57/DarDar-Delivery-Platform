
// /* eslint-disable @next/next/no-img-element */
// "use client"

// import type React from "react"

// import { Suspense, useState } from "react"
// import { Edit2, Trash2, Plus, ArrowLeft, RefreshCw } from "lucide-react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
// import { useRouter } from "next/navigation"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useAllCategoryListQuery } from "@/redux/feature/categorySlice"
// import { useAllSubcategoriesQuery, useCreateSubcategoryMutation, useUpdateSubCategoryMutation } from "@/redux/feature/subcategorieSlice"


// interface Cover {
//     id: number
//     name: string
//     image: string
//     urlLink: string
// }

// function Category() {
//     const router = useRouter();
//     const [covers, setCover] = useState<Cover[]>([
//         {
//             id: 1,
//             name: "Christmas",
//             image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lrmDtnbqq7rEKxosGvEOfO8AtdqOD8.png",
//             urlLink: "https://example.com",

//         },
//         {
//             id: 2,
//             name: "Vegetable",
//             image: "https://via.placeholder.com/200x150?text=Vegetable",
//             urlLink: "https://example.com",
//         },
//     ])

//     const { data } = useAllSubcategoriesQuery(undefined);
//     // console.log(data?.data)
//     const { data: categoryData } = useAllCategoryListQuery(undefined);
//     // console.log(categoryData?.data)  
//     const [createSubcategory] = useCreateSubcategoryMutation();

//     const [updateSubCategory] = useUpdateSubCategoryMutation();

//     const [isOpen, setIsOpen] = useState(false)
//     const [editingId, setEditingId] = useState<number | null>(null)
//     const [formData, setFormData] = useState({
//         name: "",
//         image: "",
//         urlLink: "",
//     })

//     const handleAddClick = () => {
//         setEditingId(null)
//         setFormData({ name: "", image: "", urlLink: "" })
//         setIsOpen(true)
//     }

//     const handleEditClick = (cover: Cover) => {
//         setEditingId(cover.id)
//         setFormData({
//             name: cover.name,
//             image: cover.image,
//             urlLink: cover.urlLink,
//         })
//         setIsOpen(true)
//     }

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         if (editingId) {
//             setCover(
//                 covers.map((c) =>
//                     c.id === editingId ? { ...c, name: formData.name, image: formData.image, urlLink: formData.urlLink } : c,
//                 ),
//             )
//         } else {
//             setCover([
//                 ...covers,
//                 {
//                     id: Math.max(...covers.map((c) => c.id), 0) + 1,
//                     name: formData.name,
//                     image: formData.image,
//                     urlLink: formData.urlLink,
//                 },
//             ])
//         }
//         setIsOpen(false)
//     }

//     const handleDelete = (id: number) => {
//         setCover(covers.filter((c) => c.id !== id))
//     }

//     const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0]
//         if (file) {
//             const reader = new FileReader()
//             reader.onloadend = () => {
//                 setFormData({ ...formData, image: reader.result as string })
//             }
//             reader.readAsDataURL(file)
//         }
//     }

//     const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL

//     return (
//         <div className="p-8">
//             <div className="p-4 bg-[#fafafa] rounded min-h-screen">

//                 <div className="flex items-center justify-between mb-8">
//                     <div className="flex items-center gap-4">
//                         <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
//                             <ArrowLeft size={20} className="text-gray-700" />
//                         </button>
//                         <h1 className="text-[16px] font-medium text-[#333333]">Category</h1>
//                     </div>
//                     <div className="flex items-center gap-4">
//                         <button className="flex items-center gap-2 bg-[#F4F5F7] p-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
//                             <span className="text-[16px] font-normal">Data Refresh</span>
//                             <RefreshCw className="text-[#5B52A3]" size={18} />
//                         </button>
//                         <span className="text-[16px] font-normal bg-white p-2 rounded text-gray-600">March 25,2024 10:43 Am</span>
//                     </div>
//                 </div>
//                 {/* Header */}
//                 <div className="flex items-center justify-end mb-8">


//                     {/* Add Cover Button */}
//                     <div className="mb-6 flex justify-end">
//                         <button
//                             onClick={handleAddClick}
//                             className="flex items-center gap-2 bg-[#7CC84E]/90 hover:bg-[#7CC84E]/90 text-white px-6 py-2 rounded font-medium "
//                         >
//                             Add Category
//                             <Plus className="w-5 h-5" />
//                         </button>
//                     </div>
//                 </div>



//                 {/* Table */}
//                 {/* Table */}
//                 <div className="bg-white rounded-lg  overflow-hidden">
//                     <table className="w-full table-auto">
//                         <thead className="bg-gray-50 border-b border-gray-200">
//                             <tr className="text-left text-lg font-medium text-[#6B6B6B]">
//                                 <th className="px-6 py-4 text-lg font-medium  text-center">S.No</th>
//                                 <th className="px-6 py-4 text-lg font-medium  text-center">Category Image</th>
//                                 <th className="px-6 py-4 text-lg font-medium  text-center">Category Name</th>
//                                 <th className="px-6 py-4 text-lg font-medium  text-center">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {data?.data?.map((cover: Cover, index: number) => (
//                                 <tr key={cover.id} className="hover:bg-gray-50 transition-colors">
//                                     <td className="px-6 py-4 text-sm text-gray-900 text-center">{index + 1}</td>
//                                     <td className="px-6 py-4 text-center">
//                                         <img
//                                             src={IMAGE + cover.image || "/placeholder.svg"}
//                                             alt={cover.name}
//                                             className="w-16 h-12 object-cover rounded mx-auto"
//                                         />
//                                     </td>
//                                     <td className="px-6 py-4 text-sm text-gray-900 text-center">{cover.name}</td>
//                                     <td className="px-6 py-4 text-center">
//                                         <div className="flex items-center justify-center gap-3">
//                                             <button
//                                                 onClick={() => handleEditClick(cover)}
//                                                 className="text-blue-600 hover:text-blue-700 transition-colors"
//                                             >
//                                                 <Edit2 className="w-5 h-5" />
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDelete(cover.id)}
//                                                 className="text-red-600 hover:text-red-700 transition-colors"
//                                             >
//                                                 <Trash2 className="w-5 h-5" />
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>


//                 {/* Add/Edit Modal */}
//                 <Dialog open={isOpen} onOpenChange={setIsOpen}>
//                     <DialogContent className="max-w-md p-0 gap-0">
//                         <DialogHeader className="px-6 py-4 border-b border-gray-200 flex flex-row items-center justify-between">
//                             <DialogTitle className="text-xl font-medium text-[#555656]">
//                                 {editingId ? "Edit Category" : "Add Category"}
//                             </DialogTitle>
//                             <DialogClose className="text-gray-400 hover:text-gray-600">
//                                 {/* <X className="w-5 h-5" /> */}
//                             </DialogClose>
//                         </DialogHeader>

//                         <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">


//                             <div>
//                                 <label className="block text-[16px] font-normal text-[#333333] mb-2">Category Image</label>
//                                 <div className="border-2 border-dashed border-gray-300 rounded-lg  text-center hover:border-green-500 transition-colors cursor-pointer relative">
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleImageUpload}
//                                         className="absolute  inset-0 w-full h-full opacity-0 cursor-pointer"
//                                     />
//                                     {formData.image ? (
//                                         <img
//                                             src={formData.image || "/placeholder.svg"}
//                                             alt="Preview"
//                                             className="w-full h-32 object-cover rounded"
//                                         />
//                                     ) : (
//                                         <div className="bg-[#DCDDDE] p-6">
//                                             <svg
//                                                 className="w-12 h-12 mx-auto text-gray-400 mb-2"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                             >
//                                                 <path
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     strokeWidth={2}
//                                                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                                                 />
//                                             </svg>
//                                             <p className="text-primary font-medium text-sm">Browse Image</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-[16px] font-normal text-[#333333] mb-2">Category Name</label>
//                                 <input
//                                     type="text"
//                                     value={formData.name}
//                                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                                     placeholder="Christmas"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
//                                 />
//                             </div>
//                             <Select>
//                                 <SelectTrigger >
//                                     <SelectValue placeholder="Select Category" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     {
//                                         categoryData?.data?.map((category: any) => (
//                                             <SelectItem key={category.id} value={category.name}>
//                                                 {category.name}
//                                             </SelectItem>
//                                         ))
//                                     }

//                                 </SelectContent>
//                             </Select>


//                             {/* Submit Button */}
//                             <button
//                                 type="submit"
//                                 className="w-full bg-[#7CC84E] hover:bg-[#7CC84E]/90 text-white py-2 rounded-lg font-medium transition-colors mt-8"
//                             >
//                                 Submit
//                             </button>
//                         </form>
//                     </DialogContent>
//                 </Dialog>
//             </div>
//         </div>
//     )
// }
// export default function Categorys() {
//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <Category />
//         </Suspense>
//     )
// }
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, Suspense } from "react";
import { Edit2, Trash2, Plus, ArrowLeft, RefreshCw, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
    useAllCategoryListQuery,
} from "@/redux/feature/categorySlice";
import {
    useAllSubcategoriesQuery,
    useCreateSubcategoryMutation,
    useDeleteSubCategoryMutation,
    useUpdateSubCategoryMutation,
    //   useDeleteSubCategoryMutation,
} from "@/redux/feature/subcategorieSlice";
import { toast } from "sonner";

interface Category {
    id: number;
    name: string;
    image: string;
}

interface Subcategory {
    id: number;
    name: string;
    image: string;
    category: number;
    category_name?: string;
}

function SubcategoryPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: subcategoriesData, isLoading: loadingSubs, refetch } = useAllSubcategoriesQuery(undefined);
    const { data: categoriesData, isLoading: loadingCats } = useAllCategoryListQuery(undefined);

    const subcategories: Subcategory[] = subcategoriesData?.data || [];
    const categories: Category[] = categoriesData?.data || [];

    const [createSubcategory, { isLoading: creating }] = useCreateSubcategoryMutation();
    const [updateSubCategory, { isLoading: updating }] = useUpdateSubCategoryMutation();
    const [deleteSubCategory] = useDeleteSubCategoryMutation();

    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [rotate, setRotate] = useState(false);

    const [subcategoryName, setSubcategoryName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";

    const openAddModal = () => {
        setEditingId(null);
        setSubcategoryName("");
        setSelectedCategoryId("");
        setSelectedFile(null);
        setPreviewUrl("");
        setIsOpen(true);
    };

    const openEditModal = (sub: Subcategory) => {
        setEditingId(sub.id);
        setSubcategoryName(sub.name);
        setSelectedCategoryId(String(sub.category));
        setSelectedFile(null);
        setPreviewUrl(IMAGE_URL + sub.image);
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

        if (!subcategoryName.trim()) {
            toast.error("Subcategory name is required!");
            return;
        }
        if (!selectedCategoryId) {
            toast.error("Please select a category!");
            return;
        }
        if (!selectedFile && !editingId) {
            toast.error("Please upload an image!");
            return;
        }

        const formData = new FormData();
        formData.append("name", subcategoryName.trim());
        formData.append("category", selectedCategoryId);
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        try {
            if (editingId) {
                await updateSubCategory({ id: editingId, data: formData }).unwrap();
                toast.success("Subcategory updated successfully!");
            } else {
                await createSubcategory(formData).unwrap();
                toast.success("Subcategory created successfully!");
            }

            setIsOpen(false);
            resetForm();
            refetch();
        } catch (error: any) {
            console.error("Error:", error);
            toast.error(error?.data?.message || "Failed to save subcategory");
        }
    };

    const handleDelete = async (id: number) => {
        // if (!confirm("Are you sure you want to delete this subcategory?")) return;

        try {
            const res = await deleteSubCategory(id).unwrap();
            toast.success( res?.message || "Subcategory deleted!");
            refetch();
        } catch (error) {
            toast.error("Failed to delete subcategory");
        }
    };

    const resetForm = () => {
        setSubcategoryName("");
        setSelectedCategoryId("");
        setSelectedFile(null);
        setPreviewUrl("");
        setEditingId(null);
    };

    const handleRefresh = () => {
        setRotate(true);
        refetch();
        toast.success("Data refreshed!");
        setTimeout(() => setRotate(false), 600);
    };

    return (
        <>
            <div className="p-8">
                <div className="bg-[#fafafa] rounded-lg min-h-screen p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} className="text-gray-700" />
                            </button>
                            <h1 className="text-2xl font-semibold text-[#333333]">Subcategories</h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleRefresh}
                                className="flex items-center gap-2 bg-[#F4F5F7] px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <span className="text-sm">Data Refresh</span>
                                <RefreshCw
                                    size={18}
                                    className={`text-[#5B52A3] transition-transform duration-500 ${rotate ? "rotate-360" : ""}`}
                                />
                            </button>
                            <span className="text-sm bg-white px-4 py-2 rounded border text-gray-600">
                                {new Date().toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Add Button */}
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 bg-[#7CC84E] hover:bg-[#6ab33e] text-white px-6 py-3 rounded-lg font-medium transition shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            Add Subcategory
                        </button>
                    </div>

                    {/* Loading */}
                    {loadingSubs || loadingCats ? (
                        <div className="text-center py-20 text-gray-500 bg-white rounded-lg">Loading...</div>
                    ) : subcategories.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 bg-white rounded-lg">
                            No subcategories found. Click "Add Subcategory" to create one.
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">S.No</th>
                                        <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Image</th>
                                        <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Name</th>
                                        <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Category</th>
                                        <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {subcategories.map((sub, index) => {
                                        const parentCat = categories.find(c => c.id === sub.category);
                                        return (
                                            <tr key={sub.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 text-center text-sm">{index + 1}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <img
                                                        src={IMAGE_URL + sub.image}
                                                        alt={sub.name}
                                                        className="w-20 h-16 object-cover rounded-lg mx-auto shadow-sm"
                                                        onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 text-center text-sm font-medium">{sub.name}</td>
                                                <td className="px-6 py-4 text-center text-sm text-gray-600">
                                                    {parentCat?.name || "Unknown"}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-4">
                                                        <button
                                                            onClick={() => openEditModal(sub)}
                                                            className="text-blue-600 hover:text-blue-800 transition"
                                                        >
                                                            <Edit2 className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(sub.id)}
                                                            className="text-red-600 hover:text-red-800 transition"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Add/Edit Modal */}
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold">
                                    {editingId ? "Edit Subcategory" : "Add New Subcategory"}
                                </DialogTitle>
                                <DialogClose />
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Subcategory Image <span className="text-red-500">*</span>
                                    </label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#7CC84E] transition-all cursor-pointer bg-gray-50"
                                    >
                                        {previewUrl ? (
                                            <div className="space-y-4">
                                                <img src={previewUrl} alt="Preview" className="mx-auto max-h-64 rounded-lg shadow-md object-contain" />
                                                <p className="text-sm text-gray-600">Click to change</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <Upload className="mx-auto w-12 h-12 text-gray-400" />
                                                <p className="text-lg font-medium text-[#7CC84E]">Click to upload</p>
                                                <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
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

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subcategory Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={subcategoryName}
                                        onChange={(e) => setSubcategoryName(e.target.value)}
                                        placeholder="e.g. Apple, Electronics"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CC84E] outline-none"
                                        required
                                    />
                                </div>

                                {/* Category Select */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Parent Category <span className="text-red-500">*</span>
                                    </label>
                                    <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={String(cat.id)}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={creating || updating}
                                        className="px-8 py-2 bg-[#7CC84E] hover:bg-[#6ab33e] disabled:opacity-70 text-white rounded-lg font-medium transition flex items-center gap-2"
                                    >
                                        {creating || updating ? "Saving..." : editingId ? "Update" : "Create"}
                                    </button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    );
}

export default function Subcategories() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <SubcategoryPage />
        </Suspense>
    );
}