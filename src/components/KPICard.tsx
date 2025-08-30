import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Wifi } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  color: "green" | "yellow" | "red" | "blue";
  icon: LucideIcon;
  isDarkMode?: boolean;
  isLive?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  color, 
  icon: Icon, 
  isDarkMode = false,
  isLive = false
}) => {
  const colorClasses = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
  };

  const colorGradients = {
    green: "from-green-400 to-green-600",
    yellow: "from-yellow-400 to-yellow-600",
    red: "from-red-400 to-red-600",
    blue: "from-blue-400 to-blue-600",
  };

  const bgColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const subtitleColor = isDarkMode ? "text-gray-400" : "text-gray-500";

  return (
    <motion.div 
      className={`${bgColor} rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden group ${
        isDarkMode ? 'border-gray-700' : ''
      }`}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { type: "spring", stiffness: 300 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
      </div>

      {/* Live Indicator */}
      {isLive && (
        <motion.div
          className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live</span>
        </motion.div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm ${subtitleColor} font-medium`}>{title}</span>
          <motion.div 
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorGradients[color]} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
            whileHover={{ rotate: 5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        <motion.div 
          className={`text-3xl font-bold ${textColor} mb-3`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {value}
        </motion.div>

        <div className="flex items-center space-x-2">
          <motion.div
            className={`flex items-center space-x-1 text-sm font-medium ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {changeType === "positive" ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{change}</span>
          </motion.div>

          {/* Additional Info */}
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <span>vs last month</span>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${colorGradients[color]} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: changeType === "positive" ? "75%" : "45%" }}
            transition={{ delay: 0.8, duration: 1.5 }}
          />
        </motion.div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300 opacity-0 group-hover:opacity-100"></div>
    </motion.div>
  );
};
