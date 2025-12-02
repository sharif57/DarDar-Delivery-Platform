
// "use client";

// import { useState } from "react";
// import { ArrowLeft, FileImage, RefreshCw, X } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useAllCategoryListQuery } from "@/redux/feature/categorySlice";
// import { useAllSubcategoriesQuery } from "@/redux/feature/subcategorieSlice";
// import { useCreateProductMutation } from "@/redux/feature/productSlice";

// export interface Category {
//   id: number;
//   name: string;
//   image: string;
//   vendor: number;
// }

// export interface SubCategory {
//   id: number;
//   name: string;
//   image: string;
//   vendor: number;
//   category: number;        // category ID
//   category_name: string;   // category name
// }



// export default function AddProductsClient() {
//   const router = useRouter();
//   const [uploadedImages, setUploadedImages] = useState<(string | null)[]>([null, null, null]);
//   const [formData, setFormData] = useState({
//     productName: "Fresh Strawberry",
//     price: "$100",
//     currency: "$90",
//     deliveryFee: "$8",
//     category: "Foods",
//     subCategory: "Fruits",
//     quantity: "500-600gm",
//     description: "",
//   });


//   const { data: categoryList } = useAllCategoryListQuery(undefined);
//   const categories = categoryList?.data;

//   const { data: subCategoryList } = useAllSubcategoriesQuery(undefined);
//   const subCategories = subCategoryList?.data;

//   const [createProduct] = useCreateProductMutation();

//   const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const newImages = [...uploadedImages];
//         newImages[index] = event.target?.result as string;
//         setUploadedImages(newImages);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = (index: number) => {
//     const newImages = [...uploadedImages];
//     newImages[index] = null;
//     setUploadedImages(newImages);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const fromData = new FormData();
//       fromData.append("name", formData.productName);
//       fromData.append("price", formData.price);
//       fromData.append("currency", formData.currency);
//       fromData.append("delivery_fee", formData.deliveryFee);
//       fromData.append("category", formData.category);
//       fromData.append("subcategory", formData.subCategory);
//       fromData.append("quantity", formData.quantity);
//       fromData.append("description", formData.description);

//       uploadedImages.forEach((image, index) => {
//         if (image) {
//           fromData.append(`image_${index + 1}`, image);
//         }
//       });

//       const res = await createProduct(fromData).unwrap();
//       console.log(res)
//     } catch (error) {
//       console.error("Error creating product:", error);
//     }

//     // console.log("Product submitted:", { ...formData, images: uploadedImages });
//     // alert("Product published successfully!");
//   };

//   return (
//     <div className="min-h-screen  p-8">
//       <div className="bg-[#fafafa] rounded-lg shadow-sm border border-gray-200 p-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => router.back()}
//               className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
//             >
//               <ArrowLeft size={20} className="text-gray-700" />
//             </button>
//             <h1 className="text-[16px] font-medium text-[#333333]">Add Product</h1>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="flex items-center gap-2 bg-[#F4F5F7] px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
//               <RefreshCw className="text-[#5B52A3]" size={18} />
//               <span className="text-[14px]">Data Refresh</span>
//             </button>
//             <span className="text-[14px] bg-white px-4 py-2 rounded border border-gray-200 text-gray-600">
//               {new Date().toLocaleString()}
//             </span>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Image Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-4">
//               Upload Product Image
//             </label>
//             <div className="grid grid-cols-3 gap-6">
//               {uploadedImages.map((image, index) => (
//                 <div key={index} className="relative">
//                   {image ? (
//                     <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
//                       <img
//                         src={image}
//                         alt={`Product ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ) : (
//                     <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <FileImage className="w-10 h-10 text-gray-400 mb-3" />
//                         <span className="text-sm font-medium text-[#7CC84E]">
//                           Browse Image
//                         </span>
//                       </div>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => handleImageUpload(index, e)}
//                         className="hidden"
//                       />
//                     </label>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Form Fields */}
//           <div className="grid grid-cols-4 gap-6">
//             <div>
//               <label className="block text-sm font-normal text-[#929394] mb-2">
//                 Product Name
//               </label>
//               <input
//                 type="text"
//                 name="productName"
//                 value={formData.productName}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
//                 placeholder="Fresh Strawberry"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-normal text-[#929394] mb-2">Price</label>
//               <input
//                 type="text"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//                 placeholder="$100"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-normal text-[#929394] mb-2">
//                 Select Currency
//               </label>
//               <select
//                 name="currency"
//                 value={formData.currency}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//               >
//                 <option>BDT</option>
//                 <option></option>
//                 <option>$150</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-normal text-[#929394] mb-2">
//                 Delivery Fee
//               </label>
//               <input
//                 type="text"
//                 name="deliveryFee"
//                 value={formData.deliveryFee}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//                 placeholder="$8"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-normal text-[#929394] mb-2">
//                 Select Category
//               </label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//               >
//                 {
//                   categories?.map((category: Category) => <option key={category.id}>{category.name}</option>)
//                 }

//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-normal text-[#929394] mb-2">
//                 Select Sub Category
//               </label>
//               <select
//                 name="subCategory"
//                 value={formData.subCategory}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//               >
//                 {
//                   subCategories?.map((subCategory: SubCategory) => <option key={subCategory.id}>{subCategory.name}</option>)
//                 }

//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-normal text-[#929394] mb-2">
//                 Quantity
//               </label>
//               <input
//                 type="text"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//                 placeholder="500-600gm"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-normal text-[#929394] mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows={6}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
//               placeholder="Write here..."
//             />
//           </div>

//           <div className="flex justify-center pt-6">
//             <button
//               type="submit"
//               className="bg-[#DD5621] hover:bg-[#c94b1c] text-white font-semibold py-3 px-32 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
//             >
//               Publish
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useRef } from "react";
import { ArrowLeft, FileImage, RefreshCw, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAllCategoryListQuery } from "@/redux/feature/categorySlice";
import { useAllSubcategoriesQuery } from "@/redux/feature/subcategorieSlice";
import { useCreateProductMutation } from "@/redux/feature/productSlice";
import { toast } from "sonner";

export interface Category {
  id: number;
  name: string;
  image: string;
  vendor: number;
}

export interface SubCategory {
  id: number;
  name: string;
  image: string;
  vendor: number;
  category: number;
  category_name: string;
}

export default function AddProductsClient() {
  const router = useRouter();
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Store actual File objects (not base64)
  const [uploadedImages, setUploadedImages] = useState<(File | null)[]>([null, null, null]);

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    currency: "BDT",
    deliveryFee: "",
    category: "",
    subCategory: "",
    quantity: "",
    description: "",
  });

  const { data: categoryList } = useAllCategoryListQuery(undefined);
  const categories = categoryList?.data || [];

  const { data: subCategoryList } = useAllSubcategoriesQuery(undefined);
  const subCategories = subCategoryList?.data || [];
  console.log(subCategories, 'skjlksjl')

  const [createProduct, { isLoading }] = useCreateProductMutation();

  // Handle image selection (stores actual File)
  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImages = [...uploadedImages];
      newImages[index] = file;
      setUploadedImages(newImages);

      // Reset input so same file can be selected again
      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index]!.value = "";
      }
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages[index] = null;
    setUploadedImages(newImages);
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Final Submit Function - Sends Real Files
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productName || !formData.price || !formData.category) {
      alert("Please fill all required fields");
      return;
    }

    const formDataToSend = new FormData();

    // Append text fields
    formDataToSend.append("name", formData.productName);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("currency", formData.currency);
    formDataToSend.append("delivery_fee", formData.deliveryFee);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("subcategory", formData.subCategory);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("description", formData.description);

    // Append images correctly as real files
    uploadedImages.forEach((file, index) => {
      if (file) {
        // Option 1: If your backend expects image_1, image_2, image_3
        formDataToSend.append(`image_${index + 1}`, file);

        // Option 2: If backend accepts multiple under "images"
        // formDataToSend.append("images", file);
      }
    });

    try {
      const response = await createProduct(formDataToSend).unwrap();
      console.log("Product created:", response);

      toast.success(response.message || "Product published successfully!");

      router.back();
      // Reset form
      setFormData({
        productName: "",
        price: "",
        currency: "BDT",
        deliveryFee: "",
        category: "",
        subCategory: "",
        quantity: "",
        description: "",
      });
      setUploadedImages([null, null, null]);

      // Optional: redirect after success
      // router.push("/vendor/products");
    } catch (error: any) {
      console.error("Failed to create product:", error);
      toast.error("Error: " + (error?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="bg-[#fafafa] rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-xl font-medium text-[#333333]">Add Product</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-[#F4F5F7] px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
              <RefreshCw className="text-[#5B52A3]" size={18} />
              <span className="text-sm">Data Refresh</span>
            </button>
            <span className="text-sm bg-white px-4 py-2 rounded border border-gray-200 text-gray-600">
              {new Date().toLocaleString()}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Upload Product Images (Up to 3)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[0, 1, 2].map((index) => (
                <div key={index} className="relative">
                  {uploadedImages[index] ? (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-300">
                      <img
                        src={URL.createObjectURL(uploadedImages[index]!)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileImage className="w-12 h-12 text-gray-400 mb-3" />
                        <span className="text-sm font-medium text-[#7CC84E]">
                          Browse Image
                        </span>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        ref={(el) => {
                          fileInputRefs.current[index] = el;
                        }}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-normal text-[#929394] mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Tasty Pasta"
              />
            </div>
            <div>
              <label className="block text-sm font-normal text-[#929394] mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-normal text-[#929394] mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option>BDT</option>
                <option>USD</option>
                <option>EUR</option>
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
                placeholder="20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-normal text-[#929394] mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat: Category) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-normal text-[#929394] mb-2">
                Sub Category
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="">Select Subcategory</option>
                {/* {subCategories
                  .filter((sub: SubCategory) => sub.category === Number(formData.category))
                  .map((sub: SubCategory) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))} */}
                {subCategories.map((cat: SubCategory) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
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
                placeholder="50"
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
              placeholder="Write product description here..."
            />
          </div>

          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#DD5621] hover:bg-[#c94b1c] disabled:opacity-70 text-white font-semibold py-4 px-40 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95 text-lg"
            >
              {isLoading ? "Publishing..." : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}