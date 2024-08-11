import { Customer } from "../types/CustomerList";
import { CUSTOMER_TOTAL_ENTRIES } from "../utils/constant";
import { faker } from '@faker-js/faker';
import { generateRandomPhotos } from "../utils/randomImages";

export const dummyCustomers: Customer[] = Array.from({ length: CUSTOMER_TOTAL_ENTRIES }, (_, index) => ({
  id: index,
  name: faker.person.fullName(),
  title: faker.lorem.paragraph(),
  address: faker.location.streetAddress() + ', ' + faker.location.countryCode() + ', ' + faker.location.country(),
  photos: generateRandomPhotos(9), 
}));
