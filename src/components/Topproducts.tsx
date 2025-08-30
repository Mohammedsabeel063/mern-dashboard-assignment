import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Plus, TrendingUp, Eye, Download } from "lucide-react";

interface TopProductsProps {
  onAddProfile: () => void;
  isDarkMode?: boolean;
}

const data = [
  { name: "Basic Tees", value: 55, color: "#22c55e", trend: "+12%", sales: "2,345 units" },
  { name: "Custom Short Pants", value: 31, color: "#f97316", trend: "+8%", sales: "1,234 units" },
  { name: "Super Hoodies", value: 14, color: "#ef4444", trend: "+5%", sales: "567 units" },
];

export const TopProducts: React.FC<TopProductsProps> = ({ onAddProfile, isDarkMode = false }) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const bgColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const subtitleColor = isDarkMode ? "text-gray-400" : "text-gray-500";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";

  return (
    <div className="space-y-6">
      {/* Top Products */}
      <motion.div 
        className={`${bgColor} rounded-xl p-6 shadow-lg border ${borderColor} transition-all duration-300`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ y: -2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-lg font-semibold ${textColor} mb-1`}>Top products</h3>
            <p className={`text-sm ${subtitleColor}`}>May - June 2021</p>
          </div>
          <motion.button
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(!showDetails)}
          >
            <Eye className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </motion.button>
        </div>

        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie 
                  data={data} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={45} 
                  outerRadius={70} 
                  dataKey="value"
                  onMouseEnter={(entry) => setSelectedProduct(entry.name)}
                  onMouseLeave={() => setSelectedProduct(null)}
                >
                  {data.map((entry, i) => (
                    <Cell 
                      key={i} 
                      fill={entry.color}
                      className="cursor-pointer transition-all duration-300 hover:opacity-80"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="space-y-3">
          {data.map((item, i) => (
            <motion.div 
              key={i} 
              className={`flex justify-between items-center p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                selectedProduct === item.name 
                  ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-50') 
                  : ''
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              onMouseEnter={() => setSelectedProduct(item.name)}
              onMouseLeave={() => setSelectedProduct(null)}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <span className={`text-sm font-medium ${textColor}`}>{item.name}</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-500">{item.trend}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold ${textColor}`}>{item.value}%</span>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.sales}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Details Panel */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              className={`mt-4 p-4 rounded-lg border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-gray-50 border-gray-200 text-gray-800'
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Product Insights</h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Revenue</p>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>$45,678</p>
                </div>
                <div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Growth Rate</p>
                  <p className="font-semibold text-green-500">+23%</p>
                </div>
                <div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Market Share</p>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>12.4%</p>
                </div>
                <div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Customer Rating</p>
                  <p className="font-semibold text-yellow-500">4.8/5</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Add Profile - Enhanced */}
      <motion.div
        className={`${bgColor} rounded-xl p-6 shadow-lg border-2 border-dashed ${borderColor} flex flex-col items-center justify-center h-36 cursor-pointer transition-all duration-300 group`}
        onClick={onAddProfile}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ 
          scale: 1.02, 
          borderColor: isDarkMode ? "#3b82f6" : "#3b82f6",
          boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1)"
        }}
      >
        <motion.div 
          className="w-12 h-12 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center mb-3 group-hover:border-blue-500 transition-colors duration-300"
          whileHover={{ rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
        </motion.div>
        <span className={`text-sm font-medium ${subtitleColor} group-hover:text-blue-500 transition-colors duration-300`}>
          Add Profile
        </span>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Click to create new profile</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className={`${bgColor} rounded-xl p-4 shadow-md border ${borderColor}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h4 className={`text-sm font-semibold ${textColor} mb-3`}>Quick Actions</h4>
        <div className="space-y-2">
          {[
            { label: 'Export Data', icon: Download, action: () => console.log('Export') },
            { label: 'View Analytics', icon: Eye, action: () => console.log('Analytics') }
          ].map((action, index) => (
            <motion.button
              key={action.label}
              onClick={action.action}
              className={`w-full flex items-center space-x-2 p-2 rounded-lg text-left transition-all duration-300 ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                  : 'hover:bg-gray-50 text-gray-600 hover:text-gray-800'
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <action.icon className="w-4 h-4" />
              <span className="text-sm">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
