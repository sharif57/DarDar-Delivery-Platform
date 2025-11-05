"use client"

import { useState } from "react"
import { ChevronLeft, Search, Trash2, ArrowLeft, CheckCircle2 } from "lucide-react"

import { useRouter } from "next/navigation"
import ShareLite from "./icon/share-lite"
import Shear from "./icon/shear"

interface Feedback {
    id: number
    name: string
    description: string
    time: string
    status: "Pending" | "Replied"
}

const feedbackData: Feedback[] = [
    {
        id: 1,
        name: "Juilu Jalal",
        description: "Our Bachelor of Commerce program is ACBSP-accredited.",
        time: "8:38 AM",
        status: "Pending",
    },
    {
        id: 2,
        name: "Juilu Jalal",
        description: "Our Bachelor of Commerce program is ACBSP-accredited.",
        time: "8:38 AM",
        status: "Replied",
    },
    {
        id: 3,
        name: "Juilu Jalal",
        description: "Our Bachelor of Commerce program is ACBSP-accredited.",
        time: "8:38 AM",
        status: "Replied",
    },
    {
        id: 4,
        name: "Juilu Jalal",
        description: "Our Bachelor of Commerce program is ACBSP-accredited.",
        time: "8:38 AM",
        status: "Replied",
    },
    {
        id: 5,
        name: "Juilu Jalal",
        description: "Our Bachelor of Commerce program is ACBSP-accredited.",
        time: "8:38 AM",
        status: "Replied",
    },
]

export default function FeedbackPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("")
    const [feedback, setFeedback] = useState<Feedback[]>(feedbackData)

    const handleDelete = (id: number) => {
        setFeedback(feedback.filter((item) => item.id !== id))
    }

    const filteredFeedback = feedback.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="min-h-screen p-8">
            <div className="bg-white rounded-lg p-4">
                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <ArrowLeft size={20} className="text-gray-700" />
                    </button>
                    <h1 className="text-[16px] font-medium text-[#333333]">Feedback</h1>
                </div>

                {/* Search Bar */}
                <div className="mb-6 w-1/3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                        />
                    </div>
                </div>

                {/* Feedback Table */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* Table Header */}
                            <thead>
                                <tr className="border-b border-gray-200 bg-white">
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Description</th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Time</th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Action</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {filteredFeedback.map((item, index) => (
                                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        {/* Name */}
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                                        </td>

                                        {/* Description */}
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{item.description}</span>
                                        </td>

                                        {/* Time */}
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm text-gray-600">{item.time}</span>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="px-6 py-4 text-right">
                                            {item.status === "Pending" ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-md border border-purple-400 bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700">
                                                    <ShareLite />
                                                    {item.status}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 rounded-md border border-green-400 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                                                    {/* <CheckCircle2 className="h-3.5 w-3.5" /> */}
                                                    <Shear />
                                                    {item.status}
                                                </span>
                                            )}
                                        </td>

                                        {/* Delete Action */}
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-200 transition-colors"
                                                aria-label="Delete feedback"
                                            >
                                                <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Empty State */}
                        {filteredFeedback.length === 0 && (
                            <div className="flex items-center justify-center py-12">
                                <span className="text-sm text-gray-500">No feedback found</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
