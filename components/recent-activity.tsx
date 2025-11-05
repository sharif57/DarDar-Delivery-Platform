// 'use client';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Delete, MoreHorizontal } from "lucide-react";
// import Link from "next/link";
// import { useGetAllNotificationQuery } from "@/redux/feature/notificationSlice";

// export function RecentActivity() {

//   const {data} = useGetAllNotificationQuery(undefined);
//   console.log(data,'==========')
//   const activities = [
//     {
//       id: 1,
//       title: "User John Doe registered",
//       time: "5 minutes ago",
//       status: "Unread",
//     },
//     {
//       id: 2,
//       title: "Match LA Galaxy vs NY Red Bulls started",
//       time: "4 minutes ago",
//       status: "Read",
//     },
//     {
//       id: 3,
//       title: "User John Doe registered",
//       time: "1 minute ago",
//       status: "Read",
//     },
//     {
//       id: 4,
//       title: "Match LA Galaxy vs NY Red Bulls started",
//       time: "1 minute ago",
//       status: "Read",
//     }
//   ];

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <CardTitle>Recent Activity</CardTitle>
//           {/* <Link href="/actitvity"><Button variant="ghost" size="sm">
//             See all
//           </Button></Link> */}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {activities.map((activity) => (
//             <div
//               key={activity.id}
//               className="flex items-center justify-between p-3 bg-[#fdf7e9] border  rounded-lg"
//             >
//               <div className="flex-1 ">
//                 <p className="text-sm font-medium">{activity.title}</p>
//                 <p className="text-xs text-gray-600">{activity.time}</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span
//                   className={`text-xs px-2 py-1 rounded ${
//                     activity.status === "Unread"
//                       ? " text-red-800"
//                       : " text-gray-800"
//                   }`}
//                 >
//                   {activity.status}
//                 </span>
//                 <div className=""></div>
//               </div>
//               <Button variant="ghost" size="sm">
//                 {/* <MoreHorizontal className="w-4 h-4" /> */}
//                 <svg
//                   width="18"
//                   height="22"
//                   viewBox="0 0 18 22"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M16 5.99951C15.7348 5.99951 15.4804 6.10487 15.2929 6.29241C15.1054 6.47994 15 6.7343 15 6.99951V18.1905C14.9713 18.6962 14.744 19.1701 14.3675 19.5089C13.991 19.8477 13.4959 20.0241 12.99 19.9995H5.01C4.5041 20.0241 4.00898 19.8477 3.63251 19.5089C3.25603 19.1701 3.02869 18.6962 3 18.1905V6.99951C3 6.7343 2.89464 6.47994 2.70711 6.29241C2.51957 6.10487 2.26522 5.99951 2 5.99951C1.73478 5.99951 1.48043 6.10487 1.29289 6.29241C1.10536 6.47994 1 6.7343 1 6.99951V18.1905C1.02854 19.2267 1.46658 20.2094 2.21818 20.9234C2.96978 21.6373 3.97367 22.0242 5.01 21.9995H12.99C14.0263 22.0242 15.0302 21.6373 15.7818 20.9234C16.5334 20.2094 16.9715 19.2267 17 18.1905V6.99951C17 6.7343 16.8946 6.47994 16.7071 6.29241C16.5196 6.10487 16.2652 5.99951 16 5.99951ZM17 2.99951H13V0.999512C13 0.734295 12.8946 0.479941 12.7071 0.292405C12.5196 0.104869 12.2652 -0.000488281 12 -0.000488281H6C5.73478 -0.000488281 5.48043 0.104869 5.29289 0.292405C5.10536 0.479941 5 0.734295 5 0.999512V2.99951H1C0.734784 2.99951 0.48043 3.10487 0.292893 3.29241C0.105357 3.47994 0 3.7343 0 3.99951C0 4.26473 0.105357 4.51908 0.292893 4.70662C0.48043 4.89415 0.734784 4.99951 1 4.99951H17C17.2652 4.99951 17.5196 4.89415 17.7071 4.70662C17.8946 4.51908 18 4.26473 18 3.99951C18 3.7343 17.8946 3.47994 17.7071 3.29241C17.5196 3.10487 17.2652 2.99951 17 2.99951ZM7 2.99951V1.99951H11V2.99951H7Z"
//                     fill="black"
//                     fillOpacity="0.9"
//                   />
//                   <path
//                     d="M8 15.9995V8.99951C8 8.7343 7.89464 8.47994 7.70711 8.29241C7.51957 8.10487 7.26522 7.99951 7 7.99951C6.73478 7.99951 6.48043 8.10487 6.29289 8.29241C6.10536 8.47994 6 8.7343 6 8.99951V15.9995C6 16.2647 6.10536 16.5191 6.29289 16.7066C6.48043 16.8942 6.73478 16.9995 7 16.9995C7.26522 16.9995 7.51957 16.8942 7.70711 16.7066C7.89464 16.5191 8 16.2647 8 15.9995ZM12 15.9995V8.99951C12 8.7343 11.8946 8.47994 11.7071 8.29241C11.5196 8.10487 11.2652 7.99951 11 7.99951C10.7348 7.99951 10.4804 8.10487 10.2929 8.29241C10.1054 8.47994 10 8.7343 10 8.99951V15.9995C10 16.2647 10.1054 16.5191 10.2929 16.7066C10.4804 16.8942 10.7348 16.9995 11 16.9995C11.2652 16.9995 11.5196 16.8942 11.7071 16.7066C11.8946 16.5191 12 16.2647 12 15.9995Z"
//                     fill="black"
//                     fillOpacity="0.9"
//                   />
//                 </svg>
//               </Button>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

"use client";


import { useAllReadNotificationMutation, useGetAllNotificationQuery, useSingleReadNotificationMutation } from "@/redux/feature/notificationSlice";
import { useState } from "react";
import { toast } from "sonner";

interface Notification {
  id: number;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function RecentActivity() {
  const { data, refetch, isLoading } = useGetAllNotificationQuery(undefined);
  const [allReadNotification] = useAllReadNotificationMutation();
  const [singleReadNotification] = useSingleReadNotificationMutation();

  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [markAllLoading, setMarkAllLoading] = useState(false);

  const notifications: Notification[] = data?.data || [];

  // ✅ Mark single notification as read
  const handleMarkAsRead = async (id: number) => {
    try {
      setLoadingId(id);
      const res = await singleReadNotification(id).unwrap();
      toast.success(res?.message || "Marked as read");
      await refetch();
    } catch (error: any) {
      console.error("❌ Failed to mark as read:", error);
      toast.error(error?.data?.message || "Failed to mark as read");
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      setMarkAllLoading(true);
      const res = await allReadNotification(undefined).unwrap();
      toast.success(res?.message || "All marked as read");
      await refetch();
    } catch (error: any) {
      console.error("❌ Failed to mark all as read:", error);
      toast.error(error?.data?.message || "Failed to mark all as read");
    } finally {
      setMarkAllLoading(false);
    }
  };

  return (
    <>
      <title>Notification</title>
      <div className="w-full container mx-auto pt- px-4 overflow-hidden bg-white p-4 rounded-lg shadow-sm">

        {/* Header Actions */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl font-medium">Recent Activity</h1>
          <p className="text-gray-700 font-medium">
            Unread: {data?.unread_count || 0}
          </p>

          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              disabled={markAllLoading}
              className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
            >
              {markAllLoading ? "Marking..." : "Mark All as Read"}
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="divide-y space-y-4 divide-gray-200 ">
          {isLoading ? (
            <p className="text-center text-gray-500 py-6">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No notifications found.
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-6 py-4 flex  items-center justify-between rounded-lg transition-colors ${
                  notification.is_read
                    ? "bg-gray-50"
                    : "bg-yellow-50 border-l-4 border-yellow-400"
                }`}
              >
                <div className="flex-1">
                  <div className="text-gray-900 font-medium text-sm">
                    #{notification.id} - {notification.title}
                  </div>
                  <p className="text-gray-700 text-sm">{notification.message}</p>

                  <div className="text-primary text-xs mt-1">
                    {new Date(notification.created_at).toLocaleString("en-BD", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </div>

                {/* Action Button */}
                {!notification.is_read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    disabled={loadingId === notification.id}
                    className="ml-4 px-3 py-2 text-xs text-white bg-primary rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                  >
                    {loadingId === notification.id ? "Reading..." : "Mark Read"}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
