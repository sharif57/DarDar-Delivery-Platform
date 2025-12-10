import First from './icon/first'
import Second from './icon/second'
import PackageCheck from './icon/thrid'
import Clock from './icon/clock'
import StatCard from './stat-card'


export default function StartCard() {
  return (
    <div>
        {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Sales"
                  value="566+"
                  icon={<First />}
                  bgColor="bg-[#F4F5F7]"
                  iconBg="bg-blue-500"
                />
                <StatCard
                  title="Total Income"
                  value="258+"
                  icon={<Second />}
                  bgColor="bg-[#F4F5F7]"
                  iconBg="bg-purple-500"
                />
                <StatCard
                  title="Complete Orders"
                  value="865+"
                  icon={<PackageCheck />}
                  bgColor="bg-[#F4F5F7]"
                  iconBg="bg-"
                />
                <StatCard
                  title="Pending Orders"
                  value="865+"
                  icon={<Clock />}
                  bgColor="bg-[#F4F5F7]"
                  iconBg="bg-orange-500"
                />
              </div>
    </div>
  )
}
