/* eslint-disable @next/next/no-img-element */
"use client"

import type React from "react"

import { useState } from "react"
import { X, Edit2, Trash2, Plus, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface Cover {
  id: number
  name: string
  image: string
  urlLink: string
}

export default function BannerSection() {
  const router = useRouter();
  const [covers, setCover] = useState<Cover[]>([
    {
      id: 1,
      name: "Christmas",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lrmDtnbqq7rEKxosGvEOfO8AtdqOD8.png",
      urlLink: "https://example.com",
    },
    {
      id: 2,
      name: "Vegetable",
      image: "https://via.placeholder.com/200x150?text=Vegetable",
      urlLink: "https://example.com",
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    urlLink: "",
  })

  const handleAddClick = () => {
    setEditingId(null)
    setFormData({ name: "", image: "", urlLink: "" })
    setIsOpen(true)
  }

  const handleEditClick = (cover: Cover) => {
    setEditingId(cover.id)
    setFormData({
      name: cover.name,
      image: cover.image,
      urlLink: cover.urlLink,
    })
    setIsOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setCover(
        covers.map((c) =>
          c.id === editingId ? { ...c, name: formData.name, image: formData.image, urlLink: formData.urlLink } : c,
        ),
      )
    } else {
      setCover([
        ...covers,
        {
          id: Math.max(...covers.map((c) => c.id), 0) + 1,
          name: formData.name,
          image: formData.image,
          urlLink: formData.urlLink,
        },
      ])
    }
    setIsOpen(false)
  }

  const handleDelete = (id: number) => {
    setCover(covers.filter((c) => c.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-8">
      <div className="p-4 bg-[#fafafa] rounded min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-[16px] font-medium text-gray-900">Total Order</h1>
          </div>
          {/* Add Cover Button */}
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-[#7CC84E]/90 hover:bg-[#7CC84E]/90 text-white px-6 py-2 rounded font-medium "
            >
              Add Cover
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>



        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-lg font-normal text-[#6B6B6B]">S.No</th>
                <th className="px-6 py-4 text-left text-lg font-normal text-[#6B6B6B]">Image</th>
                <th className="px-6 py-4 text-left text-lg font-normal text-[#6B6B6B]">Name</th>
                <th className="px-6 py-4 text-left text-lg font-normal text-[#6B6B6B]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {covers.map((cover, index) => (
                <tr key={cover.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={cover.image || "/placeholder.svg"}
                      alt={cover.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{cover.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEditClick(cover)}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cover.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
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

        {/* Add/Edit Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-md p-0 gap-0">
            <DialogHeader className="px-6 py-4 border-b border-gray-200 flex flex-row items-center justify-between">
              <DialogTitle className="text-xl font-medium text-[#555656]">
                {editingId ? "Edit Cover" : "Add Cover"}
              </DialogTitle>
              <DialogClose className="text-gray-400 hover:text-gray-600">
                {/* <X className="w-5 h-5" /> */}
              </DialogClose>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
              {/* Cover Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Christmas"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {formData.image ? (
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-12 h-12 mx-auto text-gray-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-green-500 font-medium text-sm">Browse Image</p>
                    </>
                  )}
                </div>
              </div>

              {/* URL Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL Link</label>
                <div className="flex items-center gap-2">
                  <select className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600 bg-white">
                    <option>Select an option</option>
                  </select>
                  <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#7CC84E] hover:bg-[#7CC84E]/90 text-white py-2 rounded-lg font-medium transition-colors mt-8"
              >
                Submit
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
