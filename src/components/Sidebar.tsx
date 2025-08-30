import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  CreditCard, 
  Calendar, 
  Users, 
  Settings, 
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  ChevronRight,
  X,
  Download,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  DollarSign,
  UserCheck,
  Shield,
  Palette,
  Globe,
  Database
} from "lucide-react";

interface SidebarProps {
  isDarkMode: boolean;
  currentTheme: string;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isDarkMode, currentTheme, onPageChange }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getThemeColors = () => {
    const colorMap = {
      default: { primary: 'blue', secondary: 'indigo', accent: 'purple' },
      sunset: { primary: 'orange', secondary: 'red', accent: 'pink' },
      ocean: { primary: 'cyan', secondary: 'blue', accent: 'teal' },
      forest: { primary: 'emerald', secondary: 'green', accent: 'lime' }
    };
    return colorMap[currentTheme as keyof typeof colorMap] || colorMap.default;
  };

  const colors = getThemeColors();

  const handleNavigationClick = (itemId: string) => {
    console.log('Navigation clicked:', itemId);
    setActiveSection(itemId);
    
    // Navigate to the selected page
    onPageChange(itemId);
  };

  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      progress: 100,
      notifications: 0
    },
    { 
      id: 'transactions', 
      label: 'Transactions', 
      icon: CreditCard, 
      progress: 75,
      notifications: 3
    },
    { 
      id: 'schedules', 
      label: 'Schedules', 
      icon: Calendar, 
      progress: 60,
      notifications: 1
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      progress: 45,
      notifications: 0
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: Users, 
      progress: 90,
      notifications: 5
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: PieChart, 
      progress: 30,
      notifications: 2
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      progress: 20,
      notifications: 0
    }
  ];

  const quickStats = [
    { label: 'Active Users', value: '2.4k', change: '+12%', icon: TrendingUp },
    { label: 'Revenue', value: '$45.2k', change: '+8%', icon: Activity }
  ];

  return (
    <motion.div 
      className={`${collapsed ? 'w-20' : 'w-64'} flex flex-col h-screen rounded-r-2xl shadow-2xl transition-all duration-500 relative overflow-hidden ${
        isDarkMode 
          ? `bg-gradient-to-b from-${colors.primary}-500 to-${colors.secondary}-600 text-white`
          : `bg-gradient-to-b from-${colors.primary}-100 to-${colors.secondary}-200 text-gray-800 border-r border-gray-200`
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${
          isDarkMode 
            ? 'from-white via-transparent to-transparent' 
            : 'from-gray-400 via-transparent to-transparent'
        } transform rotate-45`}></div>
        <div className={`absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl ${
          isDarkMode ? 'bg-white' : 'bg-gray-300'
        }`}></div>
      </div>

      {/* Header */}
      <motion.div 
        className="p-6 relative z-10"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between">
          <motion.h1 
            className={`text-3xl font-bold ${
              isDarkMode 
                ? 'bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {collapsed ? 'B.' : 'Board.'}
          </motion.h1>
          <motion.button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-white/20' 
                : 'hover:bg-gray-200/50'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      {!collapsed && (
        <motion.div 
          className="px-6 mb-6 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`backdrop-blur-sm rounded-lg p-3 ${
                isDarkMode 
                  ? 'bg-white/10' 
                  : 'bg-white/80 border border-gray-200'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>{stat.label}</p>
                  <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{stat.value}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-500">{stat.change}</p>
                  <stat.icon className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 relative z-10">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <motion.button
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group ${
                  activeSection === item.id 
                    ? (isDarkMode ? 'bg-white/20 backdrop-blur-sm shadow-lg' : 'bg-white/90 backdrop-blur-sm shadow-lg')
                    : (isDarkMode ? 'text-gray-100 hover:bg-white/10' : 'text-gray-700 hover:bg-white/50')
                }`}
                onClick={() => handleNavigationClick(item.id)}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Progress Bar */}
                <div className={`absolute bottom-0 left-0 h-1 rounded-b-xl overflow-hidden ${
                  isDarkMode ? 'bg-white/30' : 'bg-gray-300/50'
                }`}>
                  <motion.div
                    className={`h-full ${isDarkMode ? 'bg-white' : 'bg-gray-600'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ delay: 1 + index * 0.1, duration: 1 }}
                  />
                </div>

                <item.icon className={`w-5 h-5 transition-colors ${
                  activeSection === item.id 
                    ? (isDarkMode ? 'text-white' : 'text-gray-800')
                    : (isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800')
                }`} />
                
                {!collapsed && (
                  <span className="flex-1 text-left">{item.label}</span>
                )}

                {/* Notifications Badge */}
                {item.notifications > 0 && !collapsed && (
                  <motion.div
                    className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 + index * 0.1, type: "spring" }}
                  >
                    {item.notifications}
                  </motion.div>
                )}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <motion.div 
        className="p-6 mt-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {!collapsed && (
          <div className="space-y-3">
            <motion.button
              className={`w-full flex items-center space-x-3 px-4 py-3 backdrop-blur-sm rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20' 
                  : 'bg-white/80 hover:bg-white/90 border border-gray-200'
              }`}
              onClick={() => setShowNotifications(!showNotifications)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Bell className="w-5 h-5" />
              <span className="flex-1 text-left">Notifications</span>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            </motion.button>
            
            <div className="space-y-1 text-sm">
              <p className={`cursor-pointer transition-colors ${
                isDarkMode 
                  ? 'text-blue-200 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}>Help</p>
              <p className={`cursor-pointer transition-colors ${
                isDarkMode 
                  ? 'text-blue-200 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}>Contact Us</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && !collapsed && (
          <motion.div
            className={`absolute right-full top-20 w-80 rounded-lg shadow-2xl p-4 mr-4 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border border-gray-200'
            }`}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring" }}
          >
            <div>
              <h3 className="font-semibold mb-3">Recent Notifications</h3>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div className={`p-2 rounded text-sm ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <p className="font-medium">New transaction completed</p>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>2 minutes ago</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transactions Panel */}
      <AnimatePresence>
        {activeSection === 'transactions' && (
          <motion.div
            className={`absolute right-full top-20 w-96 rounded-lg shadow-2xl p-6 mr-4 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border border-gray-200'
            }`}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Transaction Management</h3>
              <button onClick={() => handleNavigationClick('dashboard')} className="p-1 hover:bg-gray-700 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <button className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}>
                  <Filter className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                {[
                  { id: 'TX001', amount: '$2,450', status: 'Completed', date: '2024-01-15' },
                  { id: 'TX002', amount: '$1,890', status: 'Pending', date: '2024-01-14' },
                  { id: 'TX003', amount: '$3,120', status: 'Completed', date: '2024-01-13' }
                ].map((tx) => (
                  <div className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        tx.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium">{tx.id}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{tx.amount}</p>
                      <p className={`text-sm ${
                        tx.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                      }`}>{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className={`w-full py-2 rounded-lg ${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              } text-white flex items-center justify-center space-x-2`}>
                <Plus className="w-4 h-4" />
                <span>New Transaction</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedules Panel */}
      <AnimatePresence>
        {activeSection === 'schedules' && (
          <motion.div
            className={`absolute right-full top-20 w-96 rounded-lg shadow-2xl p-6 mr-4 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border border-gray-200'
            }`}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Schedule Management</h3>
              <button onClick={() => handleNavigationClick('dashboard')} className="p-1 hover:bg-gray-700 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Today</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-500">8</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Meetings</p>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <span className="font-medium">This Week</span>
                  </div>
                  <p className="text-2xl font-bold text-green-500">24</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Events</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {[
                  { time: '9:00 AM', title: 'Team Standup', type: 'Meeting' },
                  { time: '2:00 PM', title: 'Client Call', type: 'Call' },
                  { time: '4:00 PM', title: 'Project Review', type: 'Review' }
                ].map((item, index) => (
                  <div className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.type === 'Meeting' ? 'bg-blue-100 text-blue-800' :
                      item.type === 'Call' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>{item.type}</span>
                  </div>
                ))}
              </div>
              
              <button className={`w-full py-2 rounded-lg ${
                isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
              } text-white flex items-center justify-center space-x-2`}>
                <Plus className="w-4 h-4" />
                <span>Schedule Event</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics Panel */}
      <AnimatePresence>
        {activeSection === 'analytics' && (
          <motion.div
            className={`absolute right-full top-20 w-96 rounded-lg shadow-2xl p-6 mr-4 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border border-gray-200'
            }`}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Analytics Overview</h3>
              <button onClick={() => handleNavigationClick('dashboard')} className="p-1 hover:bg-gray-700 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Growth</span>
                  </div>
                  <p className="text-2xl font-bold text-green-500">+23%</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>vs last month</p>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Users</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-500">1.2k</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active users</p>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h4 className="font-medium mb-3">Top Metrics</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Conversion Rate', value: '3.2%', change: '+15%' },
                    { label: 'Bounce Rate', value: '23.4%', change: '-5%' },
                    { label: 'Avg. Session', value: '4m 32s', change: '+8%' }
                  ].map((metric) => (
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{metric.label}</span>
                      <div className="text-right">
                        <p className="font-semibold">{metric.value}</p>
                        <p className={`text-xs ${
                          metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                        }`}>{metric.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className={`w-full py-2 rounded-lg ${
                isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'
              } text-white flex items-center justify-center space-x-2`}>
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Users Panel */}
      <AnimatePresence>
        {activeSection === 'users' && (
          <motion.div
            className={`absolute right-full top-20 w-96 rounded-lg shadow-2xl p-6 mr-4 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border border-gray-200'
            }`}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">User Management</h3>
              <button onClick={() => handleNavigationClick('dashboard')} className="p-1 hover:bg-gray-700 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <button className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                {[
                  { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
                  { name: 'Sarah Smith', email: 'sarah@example.com', role: 'User', status: 'Active' },
                  { name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor', status: 'Inactive' }
                ].map((user) => (
                  <div className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs px-2 py-1 rounded-full ${
                        user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                        user.role === 'Editor' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>{user.role}</p>
                      <p className={`text-xs ${
                        user.status === 'Active' ? 'text-green-500' : 'text-red-500'
                      }`}>{user.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <button className={`flex-1 py-2 rounded-lg ${
                  isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white flex items-center justify-center space-x-2`}>
                  <UserCheck className="w-4 h-4" />
                  <span>Invite User</span>
                </button>
                <button className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'
                } text-white`}>
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reports Panel */}
      <AnimatePresence>
        {activeSection === 'reports' && (
          <motion.div
            className={`absolute right-full top-20 w-96 rounded-lg shadow-2xl p-6 mr-4 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border border-gray-200'
            }`}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Reports & Analytics</h3>
              <button onClick={() => handleNavigationClick('dashboard')} className="p-1 hover:bg-gray-700 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Generated</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-500">24</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This month</p>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <PieChart className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Scheduled</span>
                  </div>
                  <p className="text-2xl font-bold text-green-500">8</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Next week</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {[
                  { name: 'Monthly Revenue Report', type: 'Revenue', status: 'Ready' },
                  { name: 'User Activity Summary', type: 'Analytics', status: 'Processing' },
                  { name: 'Performance Metrics', type: 'Performance', status: 'Ready' }
                ].map((report) => (
                  <div className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        report.type === 'Revenue' ? 'bg-green-500' :
                        report.type === 'Analytics' ? 'bg-blue-500' :
                        'bg-purple-500'
                      }`}>
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{report.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>{report.status}</span>
                      <button className="p-1 hover:bg-gray-600 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className={`w-full py-2 rounded-lg ${
                isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
              } text-white flex items-center justify-center space-x-2`}>
                <Plus className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {activeSection === 'settings' && (
          <motion.div
            className={`absolute right-full top-20 w-96 rounded-lg shadow-2xl p-6 mr-4 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border border-gray-200'
            }`}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">System Settings</h3>
              <button onClick={() => handleNavigationClick('dashboard')} className="p-1 hover:bg-gray-700 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Palette className="w-5 h-5 text-blue-500" />
                      <span>Theme Settings</span>
                    </div>
                    <button className={`px-3 py-1 rounded text-sm ${
                      isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      Configure
                    </button>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      <span>Security</span>
                    </div>
                    <button className={`px-3 py-1 rounded text-sm ${
                      isDarkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
                    }`}>
                      Manage
                    </button>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-purple-500" />
                      <span>Language</span>
                    </div>
                    <button className={`px-3 py-1 rounded text-sm ${
                      isDarkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
                    }`}>
                      English
                    </button>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Database className="w-5 h-5 text-orange-500" />
                      <span>Backup</span>
                    </div>
                    <button className={`px-3 py-1 rounded text-sm ${
                      isDarkMode ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      Backup Now
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className={`flex-1 py-2 rounded-lg ${
                  isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}>
                  Save Changes
                </button>
                <button className={`flex-1 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'
                } text-white`}>
                  Reset
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};