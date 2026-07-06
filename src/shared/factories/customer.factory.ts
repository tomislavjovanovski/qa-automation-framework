import { faker } from "@faker-js/faker";

export class CustomerFactory {
  buildRetailCustomer() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      address: faker.location.streetAddress()
    };
  }
}

