import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/LoginPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <LoginPage onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;