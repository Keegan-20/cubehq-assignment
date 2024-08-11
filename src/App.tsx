import React, { useEffect } from 'react';
import { useCustomerContext } from './context/CustomerContext';
import Home from './pages/Home';
import Header from './components/Header/Header';
import './App.css';


const App: React.FC = () => {
  const { loadCustomers } = useCustomerContext();


  useEffect(() => {
    loadCustomers();
  }, []);


  return (
    <div className="app">
      <Header title='Customer Details' />
      <Home />
    </div>
  );
};

export default App;
