
"use client"

import { useState } from "react"
import { Search, Trash2, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAllFeedbackListQuery, useDeleteFeedbackMutation } from "@/redux/feature/feedbackSlice"
import { toast } from "sonner"

interface Feedback {
    id: number
    name: string
    comments: string
    created_at: string
    status: "Pending" | "Replied"
}

export default function FeedbackPage() {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

    const { data, refetch, isLoading } = useAllFeedbackListQuery(undefined);
    const [deleteFeedback] = useDeleteFeedbackMutation();

    // Feedback list from API
    const allFeedback: Feedback[] = data?.data || [];

    // DELETE
    const handleDelete = async (id: number) => {
        try {
            const res = await deleteFeedback(id).unwrap();
            toast.success(res?.message || "Feedback deleted!");

            // refetch updated list from server
            await refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete feedback");
        }
    };

    // SEARCH
    const filteredFeedback = allFeedback.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.comments.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen p-8">
            <div className="bg-white rounded-lg p-4">

                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-700" />
                    </button>
                    <h1 className="text-[16px] font-medium text-[#333333]">Feedback</h1>
                </div>

                {/* Search */}
                <div className="mb-6 w-1/3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-white">
                                    <th className="px-6 py-4 text-sm font-medium text-gray-700 text-center">Name</th>
                                    <th className="px-6 py-4 text-sm font-medium text-gray-700 text-center">Description</th>
                                    <th className="px-6 py-4 text-sm font-medium text-gray-700 text-center">Time</th>
                                    <th className="px-6 py-4 text-sm font-medium text-gray-700 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredFeedback.map(item => (
                                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">

                                        <td className="px-6 py-4 text-center">{item.name}</td>

                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => setSelectedFeedback(item)}
                                                className="text-sm text-gray-600 underline hover:text-blue-600"
                                            >
                                                {item.comments.slice(0, 40)}...
                                                <span className="text-blue-500"> see more</span>
                                            </button>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {new Date(item.created_at).toLocaleString()}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 hover:bg-gray-200 rounded-md"
                                            >
                                                <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Empty */}
                        {filteredFeedback.length === 0 && (
                            <div className="flex items-center justify-center py-12">
                                <span className="text-sm text-gray-500">No feedback found</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedFeedback && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[450px] p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-lg font-semibold mb-4">Feedback Details</h2>

                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {selectedFeedback.comments}
                        </p>

                        <button
                            onClick={() => setSelectedFeedback(null)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
