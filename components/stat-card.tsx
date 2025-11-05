// ✅ StatCard.tsx
interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  bgColor: string
  iconBg: string
}

export default function StatCard({ title, value, icon, bgColor, iconBg }: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-lg p-6 flex items-start  gap-4`}>
      <div
        className={`${iconBg} w-12 h-12 rounded-lg flex items-center justify-center text-2xl text-white`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl text-[#50525D] font-semibold text-[32px]">{value}</p>
        <p className="text-gray-600 text-sm font-normal">{title}</p>
      </div>
    </div>
  )
}
