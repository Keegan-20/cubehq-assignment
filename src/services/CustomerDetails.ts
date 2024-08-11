import { Customer } from "../types/CustomerList";
import { CUSTOMER_TOTAL_ENTRIES_LIMIT } from "../utils/constant";
import { faker } from '@faker-js/faker';

// Assuming you have a generateRandomPhotos function
// If not, we'll create a simple one
const generateRandomPhotos = (count: number): string[] => {
  return Array.from({ length: count }, () => faker.image.url());
};

export const generateDummyCustomers = (): Customer[] => {
  return Array.from({ length: CUSTOMER_TOTAL_ENTRIES_LIMIT }, (_, index) => ({
    id: index,
    name: faker.person.fullName(),
    title: faker.lorem.paragraph(), // Changed from lorem.paragraph() to jobTitle() for more realistic titles
    address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`,
    photos: generateRandomPhotos(9),
  }));
};