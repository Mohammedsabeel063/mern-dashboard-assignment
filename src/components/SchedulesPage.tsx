import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  Users,
  Phone,
  Video,
  MapPin,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface SchedulesPageProps {
  isDarkMode: boolean;
}

export const SchedulesPage: React.FC<SchedulesPageProps> = ({ isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const schedules = [
    { 
      id: 'SCH001', 
      title: 'Team Standup Meeting', 
      type: 'Meeting', 
      time: '9:00 AM', 
      date: '2024-01-15', 
      duration: '30 min',
      attendees: ['John Doe', 'Sarah Smith', 'Mike Johnson'],
      status: 'Confirmed',
      location: 'Conference Room A'
    },
    { 
      id: 'SCH002', 
      title: 'Client Call - Project Review', 
      type: 'Call', 
      time: '2:00 PM', 
      date: '2024-01-15', 
      duration: '1 hour',
      attendees: ['David Wilson', 'Client Team'],
      status: 'Confirmed',
      location: 'Zoom Meeting'
    },
    { 
      id: 'SCH003', 
      title: 'Product Development Review', 
      type: 'Review', 
      time: '4:00 PM', 
      date: '2024-01-15', 
      duration: '45 min',
      attendees: ['Development Team'],
      status: 'Pending',
      location: 'Development Lab'
    },
    { 
      id: 'SCH004', 
      title: 'Weekly Planning Session', 
      type: 'Planning', 
      time: '10:00 AM', 
      date: '2024-01-16', 
      duration: '1 hour',
      attendees: ['Management Team'],
      status: 'Confirmed',
      location: 'Board Room'
    },
    { 
      id: 'SCH005', 
      title: 'Training Session - New Tools', 
      type: 'Training', 
      time: '3:00 PM', 
      date: '2024-01-16', 
      duration: '2 hours',
      attendees: ['All Staff'],
      status: 'Confirmed',
      location: 'Training Center'
    }
  ];

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         schedule.attendees.some(attendee => attendee.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || schedule.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Meeting': return <Users className="w-4 h-4 text-blue-500" />;
      case 'Call': return <Phone className="w-4 h-4 text-green-500" />;
      case 'Review': return <Eye className="w-4 h-4 text-purple-500" />;
      case 'Planning': return <Calendar className="w-4 h-4 text-orange-500" />;
      case 'Training': return <CheckCircle className="w-4 h-4 text-indigo-500" />;
      default: return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
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
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Schedules</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manage meetings, calls, and events</p>
        </div>
        <motion.button
          className={`px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center space-x-2 transition-colors`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          <span>Schedule Event</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Today\'s Events', value: '8', change: '+2', icon: Calendar, color: 'text-blue-500' },
          { label: 'This Week', value: '24', change: '+5', icon: Clock, color: 'text-green-500' },
          { label: 'Confirmed', value: '18', change: '+3', icon: CheckCircle, color: 'text-green-500' },
          { label: 'Pending', value: '6', change: '-1', icon: AlertCircle, color: 'text-yellow-500' }
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

      {/* Search and Filters */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search schedules by title or attendees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`px-4 py-3 rounded-lg border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          >
            <option value="all">All Types</option>
            <option value="Meeting">Meeting</option>
            <option value="Call">Call</option>
            <option value="Review">Review</option>
            <option value="Planning">Planning</option>
            <option value="Training">Training</option>
          </select>
          <motion.button
            className={`px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center space-x-2 transition-colors`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </motion.button>
        </div>
      </div>

      {/* Schedules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSchedules.map((schedule, index) => (
          <motion.div
            key={schedule.id}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-xl transition-all duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {getTypeIcon(schedule.type)}
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{schedule.title}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{schedule.type}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                {schedule.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-3">
                <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {schedule.time} • {schedule.duration}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {schedule.date}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {schedule.location}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Attendees:</p>
              <div className="flex flex-wrap gap-2">
                {schedule.attendees.map((attendee, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {attendee}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className={`text-xs font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {schedule.id}
              </span>
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
                  <Edit className="w-4 h-4 text-green-500" />
                </motion.button>
                <motion.button
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
