import React from 'react';
import { 
  useGetDashboardStatsQuery, 
  useGetDashboardAnalyticsQuery 
} from '../../services/api';
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  FileText,
  Briefcase,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { formatDate, getStatusColor } from '../../utils/helpers';

const StatCard = ({ title, count, icon: Icon }) => (
  <Card className="bg-[#11191D] border-none text-white p-6 rounded-xl flex items-center space-x-4 shadow-md">
    <div className="p-3 bg-[#D99A32]/20 text-[#D99A32] rounded-full">
      <Icon size={24} />
    </div>
    <div>
      <p className="text-gray-400 text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold font-serif text-white mt-1">{count}</h3>
    </div>
  </Card>
);

const DashboardPage = () => {
  const { data: statsData, isLoading: statsLoading, error: statsError } = useGetDashboardStatsQuery();
  const { data: analyticsData, isLoading: analyticsLoading } = useGetDashboardAnalyticsQuery();

  if (statsLoading || analyticsLoading) return <div className="p-8 flex justify-center"><LoadingSpinner /></div>;
  if (statsError) return <div className="p-8 text-red-500">Error loading dashboard data</div>;

  const stats = statsData?.data || {};
  const recentAppointments = stats.recentAppointments || [];
  const recentEnquiries = stats.recentEnquiries || [];
  
  // Fake chart data if not provided
  const monthlyData = analyticsData?.data?.monthlyAppointments || [
    { month: 'Jan', count: 12 }, { month: 'Feb', count: 19 }, 
    { month: 'Mar', count: 15 }, { month: 'Apr', count: 22 }, 
    { month: 'May', count: 18 }, { month: 'Jun', count: 28 }
  ];
  const maxCount = Math.max(...monthlyData.map(d => d.count), 1);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-[#252525] font-bold">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back to the Justicia admin portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Appointments" count={stats.totalAppointments || 0} icon={Calendar} />
        <StatCard title="Pending Appointments" count={stats.pendingAppointments || 0} icon={Clock} />
        <StatCard title="Total Enquiries" count={stats.totalEnquiries || 0} icon={MessageSquare} />
        <StatCard title="Total Blog Posts" count={stats.totalBlogs || 0} icon={FileText} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Practice Areas" count={stats.totalPracticeAreas || 0} icon={Briefcase} />
        <StatCard title="Total Case Studies" count={stats.totalCaseStudies || 0} icon={BookOpen} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Appointments */}
          <Card className="p-6 shadow-sm border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#252525]">Recent Appointments</h2>
              <Link to="/admin/appointments" className="text-[#D99A32] text-sm hover:underline font-medium">View All</Link>
            </div>
            
            {recentAppointments.length === 0 ? (
              <EmptyState title="No recent appointments" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500 text-sm">
                      <th className="pb-3 font-medium">Client</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAppointments.map(apt => (
                      <tr key={apt._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                        <td className="py-3">
                          <p className="font-medium text-[#252525]">{apt.name}</p>
                          <p className="text-xs text-gray-500">{apt.email}</p>
                        </td>
                        <td className="py-3 text-sm text-gray-600">{formatDate(apt.date)}</td>
                        <td className="py-3">
                          <Badge variant={getStatusColor(apt.status)}>{apt.status}</Badge>
                        </td>
                        <td className="py-3 text-right">
                          <Link to={`/admin/appointments?id=${apt._id}`} className="text-blue-600 hover:text-blue-800 text-sm">View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
          
          {/* Chart */}
          <Card className="p-6 shadow-sm border-gray-100">
            <h2 className="text-lg font-bold text-[#252525] mb-6">Appointments (Last 6 Months)</h2>
            <div className="flex items-end space-x-4 h-64 pt-4 border-l border-b border-gray-200 px-4">
              {monthlyData.map((data, i) => {
                const heightPercentage = (data.count / maxCount) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                    <div className="text-xs text-gray-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{data.count}</div>
                    <div 
                      className="w-full max-w-[40px] bg-[#D99A32] rounded-t-sm hover:bg-[#F0B84C] transition-colors"
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div>
          {/* Recent Enquiries */}
          <Card className="p-6 shadow-sm border-gray-100 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#252525]">Recent Enquiries</h2>
              <Link to="/admin/enquiries" className="text-[#D99A32] text-sm hover:underline font-medium">View All</Link>
            </div>
            
            {recentEnquiries.length === 0 ? (
              <EmptyState title="No recent enquiries" />
            ) : (
              <div className="space-y-4">
                {recentEnquiries.map(enquiry => (
                  <div key={enquiry._id} className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-[#252525]">{enquiry.name}</p>
                      <Badge variant={getStatusColor(enquiry.status)} size="sm">{enquiry.status}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{enquiry.subject}</p>
                    <Link to={`/admin/enquiries?id=${enquiry._id}`} className="text-xs text-[#D99A32] font-medium hover:underline">
                      Read Message
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
