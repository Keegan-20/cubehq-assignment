
import { Customer } from "../types/CustomerList";

const API_URL = 'https://fakerapi.it/api/v1';

export const fetchCustomers = async (count: number = 10): Promise<Customer[]> => {
  try {
    const response = await fetch(`${API_URL}/persons?_quantity=${count}`);
    const data = await response.json();
    
    return data.data.map((person: any) => ({
      id: person.id,
      name: `${person.firstname} ${person.lastname}`,
      title: person.title,
      address: `${person.address.street}, ${person.address.city}`
    }));
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
};