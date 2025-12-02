
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, Suspense } from "react";
import { Edit2, Trash2, Plus, ArrowLeft, RefreshCw, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import {
  useAllCategoryListQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/feature/categorySlice";
import { toast } from "sonner";

interface CategoryType {
  id: number;
  name: string;
  image: string;
}

function Category() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, refetch } = useAllCategoryListQuery(undefined);
  const categories: CategoryType[] = data?.data || [];

  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [rotate, setRotate] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const openAddModal = () => {
    setEditingId(null);
    setCategoryName("");
    setSelectedFile(null);
    setPreviewUrl("");
    setIsOpen(true);
  };

  const openEditModal = (cat: CategoryType) => {
    setEditingId(cat.id);
    setCategoryName(cat.name);
    setSelectedFile(null);
    setPreviewUrl(IMAGE_URL + cat.image);
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

    if (!categoryName.trim()) {
      toast.error("Category name is required!");
      return;
    }

    if (!selectedFile && !editingId) {
      toast.error("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName.trim());
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      if (editingId) {
        await updateCategory({ id: editingId, data: formData }).unwrap();
        toast.success("Category updated successfully!");
      } else {
        await createCategory(formData).unwrap();
        toast.success("Category created successfully!");
      }

      setIsOpen(false);
      resetForm();
      refetch();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Failed to save category");
    }
  };

  const handleDelete = async (id: number) => {
    // if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await deleteCategory(id).unwrap();
      toast.success(res?.message || "Category deleted!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  const resetForm = () => {
    setCategoryName("");
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
              <h1 className="text-2xl font-semibold text-[#333333]">Category</h1>
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
              Add Category
            </button>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="text-center py-20 text-gray-500">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-white rounded-lg">
              No categories found. Click "Add Category" to create one.
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">S.No</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Image</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Name</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categories.map((cat, index) => (
                    <tr key={cat.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-center text-sm">{index + 1}</td>
                      <td className="px-6 py-4 text-center">
                        <img
                          src={IMAGE_URL + cat.image}
                          alt={cat.name}
                          className="w-20 h-16 object-cover rounded-lg mx-auto shadow-sm"
                          onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                        />
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium">{cat.name}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => openEditModal(cat)}
                            className="text-blue-600 hover:text-blue-800 transition"
                            title="Edit"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id)}
                            className="text-red-600 hover:text-red-800 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add/Edit Modal */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  {editingId ? "Edit Category" : "Add New Category"}
                </DialogTitle>
                <DialogClose />
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Category Image <span className="text-red-500">*</span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#7CC84E] transition-all cursor-pointer bg-gray-50"
                  >
                    {previewUrl ? (
                      <div className="space-y-4">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mx-auto max-h-64 rounded-lg shadow-md object-contain"
                        />
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

                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="e.g. Fruits, Electronics"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CC84E] outline-none"
                    required
                  />
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

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <Category />
    </Suspense>
  );
}