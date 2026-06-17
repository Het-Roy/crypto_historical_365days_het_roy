import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Placeholder for TopNavBar */}
        <header className="p-4 border-b border-border bg-background">
           <h1 className="text-xl font-bold text-textMain">CMC Clone Init</h1>
        </header>

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
