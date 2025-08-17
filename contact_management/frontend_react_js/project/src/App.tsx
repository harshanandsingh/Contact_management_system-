import React from 'react';
import { StarryBackground } from './components/StarryBackground';
import Dashboard from './pages/Dashboard';
import { ContactsProvider } from './context/ContactsContext';

function App() {
  return (
    <ContactsProvider>
      <div className="min-h-screen bg-gray-900 text-white relative">
        <StarryBackground />
        <Dashboard />
      </div>
    </ContactsProvider>
  );
}

export default App;