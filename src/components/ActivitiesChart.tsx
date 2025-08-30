import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  TrendingUp,
  Download,
  RefreshCw,
  Eye
} from "lucide-react";

interface ActivitiesChartProps {
  isDarkMode?: boolean;
}

const data = [
  { name: "Week 1", Guest: 400, User: 240, Revenue: 2400, Conversion: 65 },
  { name: "Week 2", Guest: 300, User: 139, Revenue: 1800, Conversion: 58 },
  { name: "Week 3", Guest: 200, User: 980, Revenue: 3200, Conversion: 72 },
  { name: "Week 4", Guest: 278, User: 390, Revenue: 2800, Conversion: 68 },
  { name: "Week 5", Guest: 189, User: 480, Revenue: 3600, Conversion: 75 },
  { name: "Week 6", Guest: 239, User: 380, Revenue: 2900, Conversion: 71 },
];

const chartTypes = [
  { id: 'bar', label: 'Bar Chart', icon: BarChart3, color: 'text-blue-600' },
  { id: 'line', label: 'Line Chart', icon: LineChartIcon, color: 'text-green-600' },
  { id: 'area', label: 'Area Chart', icon: TrendingUp, color: 'text-purple-600' },
  { id: 'pie', label: 'Pie Chart', icon: PieChartIcon, color: 'text-orange-600' }
];

export const ActivitiesChart: React.FC<ActivitiesChartProps> = ({ isDarkMode = false }) => {
  const [chartType, setChartType] = useState('bar');
  const [selectedMetric, setSelectedMetric] = useState('User');
  const [showInsights, setShowInsights] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [animatedData, setAnimatedData] = useState(data);

  const bgColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const subtitleColor = isDarkMode ? "text-gray-400" : "text-gray-500";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedData(prev => prev.map(item => ({
        ...item,
        Guest: item.Guest + Math.floor(Math.random() * 50) - 25,
        User: item.User + Math.floor(Math.random() * 30) - 15,
        Revenue: item.Revenue + Math.floor(Math.random() * 200) - 100,
        Conversion: Math.max(50, Math.min(90, item.Conversion + Math.floor(Math.random() * 10) - 5))
      })));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const renderChart = () => {
    const commonProps = {
      data: animatedData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
            <XAxis 
              dataKey="name" 
              stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
              fontSize={12}
            />
            <YAxis 
              stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                border: `1px solid ${isDarkMode ? "#4b5563" : "#e5e7eb"}`,
                borderRadius: "8px",
                color: isDarkMode ? "#ffffff" : "#000000"
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Guest" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2, fill: "#ffffff" }}
            />
            <Line 
              type="monotone" 
              dataKey="User" 
              stroke="#22c55e" 
              strokeWidth={3}
              dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#22c55e", strokeWidth: 2, fill: "#ffffff" }}
            />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
            <XAxis 
              dataKey="name" 
              stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
              fontSize={12}
            />
            <YAxis 
              stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                border: `1px solid ${isDarkMode ? "#4b5563" : "#e5e7eb"}`,
                borderRadius: "8px",
                color: isDarkMode ? "#ffffff" : "#000000"
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="Guest" 
              stackId="1" 
              stroke="#ef4444" 
              fill="#ef4444" 
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="User" 
              stackId="1" 
              stroke="#22c55e" 
              fill="#22c55e" 
              fillOpacity={0.6}
            />
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={animatedData.slice(-1)[0]}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="User"
            >
              {animatedData.slice(-1)[0] && Object.keys(animatedData.slice(-1)[0])
                .filter(key => key !== 'name')
                .map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={['#ef4444', '#22c55e', '#3b82f6', '#f59e0b'][index % 4]}
                  />
                ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                border: `1px solid ${isDarkMode ? "#4b5563" : "#e5e7eb"}`,
                borderRadius: "8px",
                color: isDarkMode ? "#ffffff" : "#000000"
              }}
            />
          </PieChart>
        );

      default:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
            <XAxis 
              dataKey="name" 
              stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
              fontSize={12}
            />
            <YAxis 
              stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                border: `1px solid ${isDarkMode ? "#4b5563" : "#e5e7eb"}`,
                borderRadius: "8px",
                color: isDarkMode ? "#ffffff" : "#000000"
              }}
            />
            <Legend />
            <Bar 
              dataKey="Guest" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]}
              onMouseEnter={(entry) => setSelectedMetric('Guest')}
            />
            <Bar 
              dataKey="User" 
              fill="#22c55e" 
              radius={[4, 4, 0, 0]}
              onMouseEnter={(entry) => setSelectedMetric('User')}
            />
          </BarChart>
        );
    }
  };

  const insights = [
    { label: 'Peak Performance', value: 'Week 3', change: '+23%', color: 'text-green-500' },
    { label: 'Conversion Rate', value: '75%', change: '+12%', color: 'text-blue-500' },
    { label: 'Total Revenue', value: '$15.9k', change: '+18%', color: 'text-purple-500' }
  ];

  return (
    <motion.div 
      className={`${bgColor} rounded-xl p-6 shadow-lg border ${borderColor} transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      whileHover={{ y: -2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <motion.h3 
            className={`text-xl font-bold ${textColor} mb-1`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            Activities & Analytics
          </motion.h3>
          <p className={`text-sm ${subtitleColor}`}>Real-time performance metrics</p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Chart Type Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {chartTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => setChartType(type.id)}
                className={`p-2 rounded-md transition-all duration-300 ${
                  chartType === type.id 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <type.icon className={`w-4 h-4 ${type.color}`} />
              </motion.button>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.button
            onClick={() => setShowInsights(!showInsights)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </motion.button>

          <motion.button
            onClick={handleRefresh}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: isRefreshing ? 1 : 0.3 }}
          >
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </motion.button>

          <motion.button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Live Indicator */}
      <motion.div
        className="flex items-center space-x-2 mb-4 px-3 py-2 bg-green-50 border border-green-200 rounded-lg w-fit"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
      >
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-green-800">Live Data</span>
        <span className="text-xs text-green-600">Updates every 8s</span>
      </motion.div>

      {/* Chart */}
      <motion.div
        className="w-full h-80"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </motion.div>

      {/* AI Insights Panel */}
      <AnimatePresence>
        {showInsights && (
          <motion.div
            className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>AI Insights</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.label}
                  className="bg-white p-3 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-xs text-gray-600 mb-1">{insight.label}</p>
                  <p className="text-sm font-semibold text-gray-800 mb-1">{insight.value}</p>
                  <p className={`text-xs ${insight.color}`}>{insight.change}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metrics Summary */}
      <motion.div
        className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {[
          { label: 'Total Visitors', value: '1,597', change: '+12%', color: 'text-blue-600' },
          { label: 'Active Users', value: '1,139', change: '+8%', color: 'text-green-600' },
          { label: 'Revenue', value: '$15.9k', change: '+18%', color: 'text-purple-600' },
          { label: 'Conversion', value: '71%', change: '+5%', color: 'text-orange-600' }
        ].map((metric, index) => (
          <div key={metric.label} className="text-center">
            <p className={`text-xs ${subtitleColor} mb-1`}>{metric.label}</p>
            <p className={`text-lg font-bold ${textColor}`}>{metric.value}</p>
            <p className={`text-xs ${metric.color}`}>{metric.change}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};
