import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import TopNavBar from './components/TopNavBar';
import BottomStatusBar from './components/BottomStatusBar';
import Home from './pages/Home';
import CoinDetail from './pages/CoinDetail';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Top Navigation */}
          <div className="sticky top-0 z-50">
            <TopNavBar />
          </div>

          {/* Main Content Area - padded bottom to account for fixed status bar */}
          <main className="flex-grow container mx-auto px-4 py-6 pb-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coins/:id" element={<CoinDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>

          {/* Fixed Bottom Status Bar */}
          <BottomStatusBar />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
