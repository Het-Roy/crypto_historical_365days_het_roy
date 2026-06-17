import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import SecondaryTabBar from './components/SecondaryTabBar';
import BottomStatusBar from './components/BottomStatusBar';
import Home from './pages/Home';
import CoinDetail from './pages/CoinDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Top Navigation */}
        <div className="sticky top-0 z-50">
          <TopNavBar />
          <SecondaryTabBar />
        </div>

        {/* Main Content Area - padded bottom to account for fixed status bar */}
        <main className="flex-grow container mx-auto px-4 py-6 pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coins/:id" element={<CoinDetail />} />
          </Routes>
        </main>

        {/* Fixed Bottom Status Bar */}
        <BottomStatusBar />
      </div>
    </Router>
  );
}

export default App;
