import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  User, 
  Search, 
  DollarSign, 
  ShoppingCart, 
  ThumbsUp, 
  Users as UsersIcon,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  RefreshCw,
  Sparkles,
  Target,
  Zap
} from "lucide-react";
import { KPICard } from "./KPICard";
import { ActivitiesChart } from "./ActivitiesChart";
import { TopProducts } from "./Topproducts";

interface DashboardContentProps {
  onAddProfile: () => void;
  isDarkMode: boolean;
  currentTheme: string;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({ 
  onAddProfile, 
  isDarkMode, 
  currentTheme 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 1247,
    transactions: 89,
    revenue: 45678
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        transactions: prev.transactions + Math.floor(Math.random() * 5) - 2,
        revenue: prev.revenue + Math.floor(Math.random() * 1000) - 500
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const aiInsights = [
    { 
      type: 'trend', 
      message: 'Revenue increased by 23% this week', 
      confidence: 94,
      icon: TrendingUp,
      color: 'text-green-500'
    },
    { 
      type: 'alert', 
      message: 'User engagement peak at 3 PM daily', 
      confidence: 87,
      icon: Target,
      color: 'text-blue-500'
    },
    { 
      type: 'opportunity', 
      message: 'Mobile conversion rate can improve by 15%', 
      confidence: 76,
      icon: Zap,
      color: 'text-purple-500'
    }
  ];

  const quickActions = [
    { label: 'Export Report', icon: Download, action: () => console.log('Export') },
    { label: 'View Analytics', icon: Eye, action: () => console.log('Analytics') },
    { label: 'AI Insights', icon: Sparkles, action: () => setShowAIInsights(!showAIInsights) }
  ];

  return (
    <motion.div 
      className={`flex-1 p-8 transition-all duration-500 overflow-y-auto ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Header */}
      <motion.div 
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-4">
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            Dashboard
          </motion.h1>
          <motion.div
            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
              isDarkMode 
                ? 'bg-green-900 text-green-200 border border-green-700' 
                : 'bg-green-100 text-green-800 border border-green-200'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </motion.div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Enhanced Search */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
          >
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search analytics, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </motion.div>

          {/* Quick Actions */}
          <div className="flex space-x-2">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                onClick={action.action}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                } shadow-sm hover:shadow-md`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <action.icon className="w-4 h-4" />
              </motion.button>
            ))}
          </div>

          {/* Refresh Button */}
          <motion.button
            onClick={handleRefresh}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800'
            } shadow-sm hover:shadow-md`}
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: isRefreshing ? 1 : 0.3 }}
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>

          {/* Notifications */}
          <motion.div
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            />
          </motion.div>

          {/* User Avatar */}
          <motion.div
            className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-5 h-5 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* AI Insights Panel */}
      <AnimatePresence>
        {showAIInsights && (
          <motion.div
            className={`mb-8 p-6 border rounded-xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600' 
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
            }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>AI Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-200 text-gray-800'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <insight.icon className={`w-4 h-4 ${insight.color}`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{insight.type}</span>
                  </div>
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{insight.message}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Confidence</span>
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{insight.confidence}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced KPI Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <KPICard 
          title="Total Revenues" 
          value={`$${realTimeData.revenue.toLocaleString()}`} 
          change="+2.5%" 
          changeType="positive" 
          color="green" 
          icon={DollarSign}
          isDarkMode={isDarkMode}
          isLive={true}
        />
        <KPICard 
          title="Total Transactions" 
          value={realTimeData.transactions.toLocaleString()} 
          change="+1.7%" 
          changeType="positive" 
          color="yellow" 
          icon={ShoppingCart}
          isDarkMode={isDarkMode}
          isLive={true}
        />
        <KPICard 
          title="Total Likes" 
          value="9,721" 
          change="+1.4%" 
          changeType="positive" 
          color="red" 
          icon={ThumbsUp}
          isDarkMode={isDarkMode}
          isLive={false}
        />
        <KPICard 
          title="Active Users" 
          value={realTimeData.activeUsers.toLocaleString()} 
          change="+4.2%" 
          changeType="positive" 
          color="blue" 
          icon={UsersIcon}
          isDarkMode={isDarkMode}
          isLive={true}
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="lg:col-span-2">
          <ActivitiesChart isDarkMode={isDarkMode} />
        </div>
        <div>
          <TopProducts onAddProfile={onAddProfile} isDarkMode={isDarkMode} />
        </div>
      </motion.div>

      {/* Real-time Activity Feed */}
      <motion.div
        className={`mt-8 p-6 rounded-xl shadow-sm border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Live Activity</h3>
        <div className="space-y-3">
          {[
            { user: 'John Doe', action: 'completed a transaction', time: '2 min ago', amount: '$1,250' },
            { user: 'Sarah Smith', action: 'added new profile', time: '5 min ago', amount: null },
            { user: 'Mike Johnson', action: 'updated settings', time: '8 min ago', amount: null }
          ].map((activity, index) => (
            <motion.div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
              </div>
              {activity.amount && (
                <span className="text-sm font-semibold text-green-500">{activity.amount}</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Additional Content Sections to Fill Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Transactions */}
        <motion.div
          className={`p-6 rounded-xl shadow-sm border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-200 text-gray-900'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Transactions</h3>
          <div className="space-y-3">
            {[
              { id: '#TX001', amount: '$2,450', status: 'Completed', time: '5 min ago' },
              { id: '#TX002', amount: '$1,890', status: 'Pending', time: '12 min ago' },
              { id: '#TX003', amount: '$3,120', status: 'Completed', time: '18 min ago' },
              { id: '#TX004', amount: '$890', status: 'Failed', time: '25 min ago' }
            ].map((tx, index) => (
              <motion.div
                key={tx.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    tx.status === 'Completed' ? 'bg-green-500' : 
                    tx.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{tx.id}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{tx.amount}</p>
                  <p className={`text-xs ${
                    tx.status === 'Completed' ? 'text-green-500' : 
                    tx.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'
                  }`}>{tx.status}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          className={`p-6 rounded-xl shadow-sm border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-200 text-gray-900'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>System Status</h3>
          <div className="space-y-4">
            {[
              { name: 'Server Load', value: '67%', status: 'Normal', color: 'text-green-500' },
              { name: 'Database', value: 'Connected', status: 'Healthy', color: 'text-green-500' },
              { name: 'API Response', value: '142ms', status: 'Fast', color: 'text-green-500' },
              { name: 'Uptime', value: '99.9%', status: 'Excellent', color: 'text-green-500' }
            ].map((item, index) => (
              <motion.div
                key={item.name}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
              >
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.name}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.status}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${item.color}`}>{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats Summary */}
      <motion.div
        className={`mt-8 p-6 rounded-xl shadow-sm border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Performance Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Page Views', value: '45.2k', change: '+12%', trend: 'up' },
            { label: 'Bounce Rate', value: '23.4%', change: '-5%', trend: 'down' },
            { label: 'Avg. Session', value: '4m 32s', change: '+8%', trend: 'up' },
            { label: 'Conversion', value: '3.2%', change: '+15%', trend: 'up' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`text-center p-4 rounded-lg transition-all duration-300 ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mt-1`}>{stat.value}</p>
              <div className={`flex items-center justify-center space-x-1 mt-2 ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="text-xs font-medium">{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
