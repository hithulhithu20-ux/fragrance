import React from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

function AppContent() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-neutral-800 flex flex-col font-sans">
      
      {/* Global Navbar */}
      <Navbar />

      {/* Fragrance Shop Home Page & Sidebar System */}
      <Home />

      {/* Full-width Luxury Footer */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

