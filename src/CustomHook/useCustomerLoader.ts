import { useState, useCallback } from 'react';
import { Customer } from '../types/CustomerList';
import { CUSTOMER_DETAILS_PER_PAGE } from '../utils/constant';
import { fetchCustomers } from '../services/fetchCustomers';

export const useCustomerLoader = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true)
      // Calculate the start index and limit for the current page
      const start = (currentPage - 1) * CUSTOMER_DETAILS_PER_PAGE;
      const limit = CUSTOMER_DETAILS_PER_PAGE;
      // Fetch the next batch of customers
      const newCustomers = await fetchCustomers(start, limit);

       // Determine if there are more customers to load
      setHasMore(newCustomers.length === CUSTOMER_DETAILS_PER_PAGE);

      // Add only unique customers to the list to avoid duplicates
      setCustomers(prevCustomers => {
        const existingIds = new Set(prevCustomers.map(c => c.id));
        const uniqueNewCustomers = newCustomers.filter(customer => !existingIds.has(customer.id));
        return [...prevCustomers, ...uniqueNewCustomers];
      });

      // Move to the next page for future loading
      setCurrentPage(prevPage => prevPage + 1);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching customers:', error);
      console.log({ type: 'FETCH_CUSTOMERS_FAILURE' });
    }
  }, [currentPage]);

  return { customers, loadCustomers, hasMore, currentPage, loading };
};
