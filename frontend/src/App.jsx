import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import SecondaryTabBar from './components/SecondaryTabBar';
import BottomStatusBar from './components/BottomStatusBar';

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
            <Route path="/" element={<div className="text-textMuted">Dashboard coming soon...</div>} />
          </Routes>
        </main>

        {/* Fixed Bottom Status Bar */}
        <BottomStatusBar />
      </div>
    </Router>
  );
}

export default App;
