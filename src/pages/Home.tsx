import React, { useRef, useCallback, useEffect } from 'react';
import { useCustomerContext } from '../context/CustomerContext';
import CustomerCard from '../components/CustomerCard/CustomerCard';
import CustomerDetails from '../components/CustomerDetails/CustomerDetails';
import './home.css';
import NoCustomer from '../components/InitialPage/NoCustomer';
import { CUSTOMER_TOTAL_ENTRIES } from '../utils/constant';
import debounce from 'lodash/debounce';


const Home: React.FC = () => {
  const { customers, selectedCustomer, selectCustomer, hasMore, loading, loadMoreCustomers } = useCustomerContext();
  const listRef = useRef<HTMLDivElement>(null);

  // Handler function to check if we should load more customers
  const handleScroll = useCallback(() => {
    if (listRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = listRef.current;
      if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore && !loading) {
        loadMoreCustomers(); // Call the function to load more customers
      }
    }
  }, [hasMore, loading, loadMoreCustomers]);

  // Debounce the handleScroll function
  const debouncedHandleScroll = useCallback(debounce(handleScroll, 200), [handleScroll]);

  // Attach the scroll event listener
  useEffect(() => {
    const currentRef = listRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', debouncedHandleScroll);
      return () => {
        currentRef.removeEventListener('scroll', debouncedHandleScroll);
      };
    }
  }, [debouncedHandleScroll]);

  return (
    <div className="home">
      <div ref={listRef} className="customer-list">
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
      {/* Showing the customer Card details or No Customer placeholder */}
      {selectedCustomer ? <CustomerDetails customer={selectedCustomer} /> : <NoCustomer />}
    </div>
  );
};

export default Home;
