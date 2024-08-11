import React, { useRef } from 'react';
import { useCustomerContext } from '../context/CustomerContext';
import CustomerCard from '../components/CustomerCard/CustomerCard';
import CustomerDetails from '../components/CustomerDetails/CustomerDetails';
import './home.css'
import NoCustomer from '../components/InitialPage/NoCustomer';
import { CUSTOMER_TOTAL_ENTRIES } from '../utils/constant';

const Home: React.FC = () => {
  const { customers, selectedCustomer, selectCustomer, hasMore, loading } = useCustomerContext();
  const listRef = useRef<HTMLDivElement>(null);


  return (
    <div className="home">
      <div
        ref={listRef}
        className="customer-list"
      >
        {/* Render customer cards */}
        {customers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            isSelected={selectedCustomer?.id === customer.id}
            onSelect={() => selectCustomer(customer)}
          />
        ))}
        {!hasMore && <div className='information-indicator-wrapper'><p className='information-indicator'>No more customers to load.</p></div>}
        {loading && <div className='information-indicator-wrapper'><p className='information-indicator'>Loading...</p></div>}
        <div className='items-indicator-wrapper'><p className='items-indicator'>{customers.length}/{CUSTOMER_TOTAL_ENTRIES}</p></div>
      </div>
      {/* showing the customer Card details or No Customer placeholder */}
      {selectedCustomer ? <CustomerDetails customer={selectedCustomer} /> : <NoCustomer />}
    </div>
  );
};

export default Home;
