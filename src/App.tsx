
import React from 'react';
import Header from './components/Header/Header';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header title="Customer Details" />
      <main className="main-content">
        {/* Customer list and details will go here */}
      </main>
    </div>
  );
};

export default App;