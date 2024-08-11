// src/App.tsx

import React, { useState } from 'react';
import Header from './components/Header/Header';
import CustomerCard from './components/CustomerCard/CustomerCard';
import { Customer } from './types/CustomerList';
import './App.css';

const App: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="app">
      <Header title="This here is the heading" />
      <main className="main-content">
      {customer.map((customer) => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          isSelected={customer.id === selectedCustomer}
          onSelect={() => handleSelectCustomer(customer.id)}
        />
      ))}
       
      </main>
    </div>
  );
};

export default App;