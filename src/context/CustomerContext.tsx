import { createContext, useContext, ReactNode, useState } from 'react';
import { Customer } from '../types/CustomerList';
import { useCustomerLoader } from '../CustomHook/useCustomerLoader';

interface CustomerContextType {
  customers: Customer[];
  selectedCustomer: Customer | null;
  loadCustomers: () => void;
  loadMoreCustomers: () => void;
  selectCustomer: (customer: Customer) => void;
  hasMore: boolean;
  currentPage: number;
  loading: boolean;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomerContext must be used within a CustomerProvider');
  }
  return context;
};

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const { customers, loadCustomers, loadMoreCustomers, hasMore, currentPage, loading } = useCustomerLoader();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <CustomerContext.Provider value={{ customers, selectedCustomer, loadCustomers, loadMoreCustomers, selectCustomer, hasMore, currentPage, loading }}>
      {children}
    </CustomerContext.Provider>
  );
};
