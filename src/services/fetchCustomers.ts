import { Customer } from '../types/CustomerList';
import { dummyCustomers } from './dummyCustomer';

export const fetchCustomers = (start: number, limit: number): Promise<Customer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyCustomers.slice(start, start + limit));
    }, 500); 
  });
};
