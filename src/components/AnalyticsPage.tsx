import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  Download, 
  Filter,
  Calendar,
  Target,
  Activity,
  PieChart,
  LineChart
} from "lucide-react";

interface AnalyticsPageProps {
  isDarkMode: boolean;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ isDarkMode }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const analyticsData = {
    overview: [
      { label: 'Total Revenue', value: '$45.2k', change: '+23%', icon: DollarSign, color: 'text-green-500' },
      { label: 'Active Users', value: '1.2k', change: '+12%', icon: Users, color: 'text-blue-500' },
      { label: 'Conversion Rate', value: '3.2%', change: '+15%', icon: Target, color: 'text-purple-500' },
      { label: 'Avg. Session', value: '4m 32s', change: '+8%', icon: Activity, color: 'text-orange-500' }
    ],
    trends: [
      { month: 'Jan', revenue: 12000, users: 800, conversion: 2.8 },
      { month: 'Feb', revenue: 15000, users: 950, conversion: 3.1 },
      { month: 'Mar', revenue: 18000, users: 1100, conversion: 3.3 },
      { month: 'Apr', revenue: 22000, users: 1250, conversion: 3.5 },
      { month: 'May', revenue: 28000, users: 1400, conversion: 3.7 },
      { month: 'Jun', revenue: 35000, users: 1600, conversion: 3.9 }
    ]
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
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Analytics</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <motion.button
            className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center space-x-2 transition-colors`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </motion.button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsData.overview.map((stat, index) => (
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <motion.div
          className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Revenue Trend</h3>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Bar Chart</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {analyticsData.trends.map((item, index) => (
              <div key={item.month} className="flex items-center space-x-4">
                <div className="w-16 text-sm font-medium">{item.month}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="h-4 bg-blue-500 rounded"
                      style={{ width: `${(item.revenue / 35000) * 100}%` }}
                    ></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      ${(item.revenue / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Users Chart */}
        <motion.div
          className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>User Growth</h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Line Chart</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {analyticsData.trends.map((item, index) => (
              <div key={item.month} className="flex items-center space-x-4">
                <div className="w-16 text-sm font-medium">{item.month}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="h-4 bg-green-500 rounded"
                      style={{ width: `${(item.users / 1600) * 100}%` }}
                    ></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.users.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detailed Metrics */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
        <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Performance Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversion Rate */}
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-purple-500" />
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Conversion Rate</span>
            </div>
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - 3.9 / 10)}`}
                    className="text-purple-500"
                  />
                </svg>
                <span className="absolute text-lg font-bold text-purple-500">3.9%</span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Target: 4.0%</p>
            </div>
          </div>

          {/* User Engagement */}
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>User Engagement</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Page Views</span>
                <span className="font-semibold">45.2k</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Bounce Rate</span>
                <span className="font-semibold text-red-500">23.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Avg. Session</span>
                <span className="font-semibold">4m 32s</span>
              </div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Revenue Sources</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Products</span>
                <span className="font-semibold">$28.5k</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Services</span>
                <span className="font-semibold">$12.3k</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Subscriptions</span>
                <span className="font-semibold">$4.4k</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            className={`p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create Custom Report</span>
            </div>
          </motion.button>
          
          <motion.button
            className={`p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Set Goals</span>
            </div>
          </motion.button>
          
          <motion.button
            className={`p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <Eye className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>View Insights</span>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
