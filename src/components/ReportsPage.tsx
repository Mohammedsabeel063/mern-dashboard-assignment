import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  Download, 
  Eye, 
  Filter,
  Calendar,
  FileText,
  Users,
  DollarSign,
  Activity,
  Target
} from "lucide-react";

interface ReportsPageProps {
  isDarkMode: boolean;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ isDarkMode }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const reports = [
    { 
      id: 'RPT001', 
      title: 'Monthly Revenue Report', 
      type: 'Financial', 
      status: 'Generated',
      lastGenerated: '2 hours ago',
      nextScheduled: 'Next month',
      size: '2.4 MB',
      format: 'PDF'
    },
    { 
      id: 'RPT002', 
      title: 'User Activity Summary', 
      type: 'Analytics', 
      status: 'Pending',
      lastGenerated: '1 day ago',
      nextScheduled: 'Weekly',
      size: '1.8 MB',
      format: 'Excel'
    },
    { 
      id: 'RPT003', 
      title: 'Performance Metrics', 
      type: 'Performance', 
      status: 'Generated',
      lastGenerated: '6 hours ago',
      nextScheduled: 'Daily',
      size: '3.2 MB',
      format: 'PDF'
    },
    { 
      id: 'RPT004', 
      title: 'Customer Insights', 
      type: 'Marketing', 
      status: 'Failed',
      lastGenerated: '2 days ago',
      nextScheduled: 'Weekly',
      size: '0 MB',
      format: 'PDF'
    },
    { 
      id: 'RPT005', 
      title: 'System Health Report', 
      type: 'Technical', 
      status: 'Generated',
      lastGenerated: '12 hours ago',
      nextScheduled: 'Daily',
      size: '1.1 MB',
      format: 'JSON'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Financial': return <DollarSign className="w-4 h-4 text-green-500" />;
      case 'Analytics': return <BarChart3 className="w-4 h-4 text-blue-500" />;
      case 'Performance': return <Target className="w-4 h-4 text-purple-500" />;
      case 'Marketing': return <Users className="w-4 h-4 text-orange-500" />;
      case 'Technical': return <Activity className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className={`flex-1 p-8 transition-all duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reports</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Generate and manage business reports</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <motion.button
            className={`px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg flex items-center space-x-2 transition-colors`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-4 h-4" />
            <span>Generate Report</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Reports', value: '156', change: '+23', icon: FileText, color: 'text-blue-500' },
          { label: 'Generated Today', value: '12', change: '+5', icon: TrendingUp, color: 'text-green-500' },
          { label: 'Pending', value: '8', change: '-2', icon: Calendar, color: 'text-yellow-500' },
          { label: 'Failed', value: '3', change: '-1', icon: Activity, color: 'text-red-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Report Templates */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Sales Summary', icon: DollarSign, color: 'text-green-500', description: 'Daily sales performance overview' },
            { title: 'User Analytics', icon: Users, color: 'text-blue-500', description: 'User behavior and engagement metrics' },
            { title: 'System Performance', icon: Activity, color: 'text-purple-500', description: 'Technical system health report' }
          ].map((template, index) => (
            <motion.button
              key={template.title}
              className={`p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              } text-left`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <template.icon className={`w-6 h-6 ${template.color}`} />
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{template.title}</span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{template.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Reports Table */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Report</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Type</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Status</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Last Generated</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Next Scheduled</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {getTypeIcon(report.type)}
                      </div>
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{report.title}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{report.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{report.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{report.lastGenerated}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{report.nextScheduled}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-4 h-4 text-blue-500" />
                      </motion.button>
                      <motion.button
                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Download className="w-4 h-4 text-green-500" />
                      </motion.button>
                      <motion.button
                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Filter className="w-4 h-4 text-purple-500" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
