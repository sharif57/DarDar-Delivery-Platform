
"use client";

import { useState } from "react";
import { ArrowLeft, FileImage, RefreshCw, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddProductsClient() {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<(string | null)[]>([null, null, null]);
  const [formData, setFormData] = useState({
    productName: "Fresh Strawberry",
    price: "$100",
    currency: "$90",
    deliveryFee: "$8",
    category: "Foods",
    subCategory: "Fruits",
    quantity: "500-600gm",
    description: "",
  });

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImages = [...uploadedImages];
        newImages[index] = event.target?.result as string;
        setUploadedImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages[index] = null;
    setUploadedImages(newImages);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product submitted:", { ...formData, images: uploadedImages });
    alert("Product published successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-[#fafafa] rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-[16px] font-medium text-[#333333]">Add Product</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-[#F4F5F7] px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
              <RefreshCw className="text-[#5B52A3]" size={18} />
              <span className="text-[14px]">Data Refresh</span>
            </button>
            <span className="text-[14px] bg-white px-4 py-2 rounded border border-gray-200 text-gray-600">
              {new Date().toLocaleString()}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Upload Product Image
            </label>
            <div className="grid grid-cols-3 gap-6">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  {image ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileImage className="w-10 h-10 text-gray-400 mb-3" />
                        <span className="text-sm font-medium text-[#7CC84E]">
                          Browse Image
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-normal text-[#929394] mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Fresh Strawberry"
              />
            </div>
            <div>
              <label className="block text-sm font-normal text-[#929394] mb-2">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="$100"
              />
            </div>
            <div>
              <label className="block text-sm font-normal text-[#929394] mb-2">
                Select Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option>$90</option>
                <option>$100</option>
                <option>$150</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-normal text-[#929394] mb-2">
                Delivery Fee
              </label>
              <input
                type="text"
                name="deliveryFee"
                value={formData.deliveryFee}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="$8"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-normal text-[#929394] mb-2">
                Select Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option>Foods</option>
                <option>Cleaning</option>
                <option>Electronics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-normal text-[#929394] mb-2">
                Select Sub Category
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option>Fruits</option>
                <option>Vegetables</option>
                <option>Dairy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-normal text-[#929394] mb-2">
                Quantity
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="500-600gm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-normal text-[#929394] mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
              placeholder="Write here..."
            />
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-[#DD5621] hover:bg-[#c94b1c] text-white font-semibold py-3 px-32 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


