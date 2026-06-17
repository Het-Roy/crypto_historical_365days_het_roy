import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Top Navigation */}
        <TopNavBar />

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<div className="text-textMuted">Dashboard coming soon...</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
