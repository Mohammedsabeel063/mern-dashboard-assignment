import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles, Zap } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { DashboardContent } from "./Dashboardcontetn";
import { AddProfileModal } from "./Addprofilrmodal";
import { TransactionsPage } from "./TransactionsPage";
import { SchedulesPage } from "./SchedulesPage";
import { AnalyticsPage } from "./AnalyticsPage";
import { UsersPage } from "./UsersPage";
import { ReportsPage } from "./ReportsPage";
import { SettingsPage } from "./SettingsPage";

export const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const themes = [
    { name: 'default', label: 'Default' },
    { name: 'sunset', label: 'Sunset' },
    { name: 'ocean', label: 'Ocean' },
    { name: 'forest', label: 'Forest' }
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    const shouldBeDark = hour < 6 || hour >= 18;
    setIsDarkMode(shouldBeDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAddProfile = () => {
    setShowAddProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowAddProfileModal(false);
  };

  const handlePageChange = (page: string) => {
    console.log('Page changed to:', page);
    setCurrentPage(page);
  };

  const quickActions = [
    { icon: Plus, label: 'Add Profile', action: handleAddProfile, color: 'bg-blue-500' },
    { icon: Sparkles, label: 'AI Insights', action: () => console.log('AI Insights'), color: 'bg-purple-500' },
    { icon: Zap, label: 'Quick Export', action: () => console.log('Quick Export'), color: 'bg-green-500' },
    { icon: Sparkles, label: 'Toggle Theme', action: toggleTheme, color: 'bg-indigo-500' }
  ];

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'transactions':
        return <TransactionsPage isDarkMode={isDarkMode} />;
      case 'schedules':
        return <SchedulesPage isDarkMode={isDarkMode} />;
      case 'analytics':
        return <AnalyticsPage isDarkMode={isDarkMode} />;
      case 'users':
        return <UsersPage isDarkMode={isDarkMode} />;
      case 'reports':
        return <ReportsPage isDarkMode={isDarkMode} />;
      case 'settings':
        return <SettingsPage isDarkMode={isDarkMode} />;
      case 'dashboard':
      default:
        return (
          <DashboardContent
            onAddProfile={handleAddProfile}
            isDarkMode={isDarkMode}
            currentTheme={currentTheme}
          />
        );
    }
  };

  return (
    <div className={`flex h-screen transition-all duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Sidebar 
        isDarkMode={isDarkMode} 
        currentTheme={currentTheme} 
        onPageChange={handlePageChange}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderCurrentPage()}
      </div>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.button
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          } hover:scale-110`}
          onClick={() => setShowFloatingActions(!showFloatingActions)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-6 h-6" />
        </motion.button>

        {/* Quick Actions Menu */}
        <AnimatePresence>
          {showFloatingActions && (
            <motion.div
              className="absolute bottom-16 right-0 space-y-2"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  className={`${action.color} text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform`}
                  onClick={action.action}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <action.icon className="w-5 h-5" />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Modal with AnimatePresence */}
      <AnimatePresence>
        {showAddProfileModal && (
          <AddProfileModal onClose={handleCloseModal} isDarkMode={isDarkMode} />
        )}
      </AnimatePresence>
    </div>
  );
};
