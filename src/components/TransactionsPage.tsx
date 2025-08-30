import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  TrendingUp,
  DollarSign,
  Calendar,
  User
} from "lucide-react";

interface TransactionsPageProps {
  isDarkMode: boolean;
}

export const TransactionsPage: React.FC<TransactionsPageProps> = ({ isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const transactions = [
    { id: 'TX001', amount: '$2,450', status: 'Completed', date: '2024-01-15', customer: 'John Doe', type: 'Purchase' },
    { id: 'TX002', amount: '$1,890', status: 'Pending', date: '2024-01-14', customer: 'Sarah Smith', type: 'Refund' },
    { id: 'TX003', amount: '$3,120', status: 'Completed', date: '2024-01-13', customer: 'Mike Johnson', type: 'Purchase' },
    { id: 'TX004', amount: '$890', status: 'Failed', date: '2024-01-12', customer: 'Lisa Brown', type: 'Purchase' },
    { id: 'TX005', amount: '$4,200', status: 'Completed', date: '2024-01-11', customer: 'David Wilson', type: 'Subscription' },
    { id: 'TX006', amount: '$1,750', status: 'Pending', date: '2024-01-10', customer: 'Emma Davis', type: 'Purchase' }
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Purchase': return <CreditCard className="w-4 h-4 text-blue-500" />;
      case 'Refund': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'Subscription': return <Calendar className="w-4 h-4 text-purple-500" />;
      default: return <CreditCard className="w-4 h-4 text-gray-500" />;
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
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Transactions</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manage and monitor all transactions</p>
        </div>
        <motion.button
          className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          <span>New Transaction</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Transactions', value: '1,247', change: '+12%', icon: CreditCard, color: 'text-blue-500' },
          { label: 'Total Revenue', value: '$45.2k', change: '+8%', icon: DollarSign, color: 'text-green-500' },
          { label: 'Pending', value: '23', change: '-5%', icon: Calendar, color: 'text-yellow-500' },
          { label: 'Failed', value: '8', change: '-2%', icon: TrendingUp, color: 'text-red-500' }
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
              placeholder="Search transactions by ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-3 rounded-lg border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="all">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <motion.button
            className={`px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center space-x-2 transition-colors`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-5 h-5" />
            <span>Export</span>
          </motion.button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Transaction ID</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Customer</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Type</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Amount</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Status</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Date</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((tx, index) => (
                <motion.tr
                  key={tx.id}
                  className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-6 py-4">
                    <span className={`font-mono text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>{tx.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{tx.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(tx.type)}
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tx.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{tx.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tx.date}</span>
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
