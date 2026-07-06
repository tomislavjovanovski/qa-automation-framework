import { RegionAwareFactory } from "./region-aware.factory";

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  currency: string;
  country: string;
}

export class CustomerFactory extends RegionAwareFactory {
  buildRetailCustomer(overrides?: Partial<CustomerData>): CustomerData {
    return this.applyOverrides(
      {
        firstName: this.fakerInstance.person.firstName(),
        lastName: this.fakerInstance.person.lastName(),
        email: this.fakerInstance.internet.email(),
        phoneNumber: this.fakerInstance.phone.number(),
        address: this.fakerInstance.location.streetAddress(),
        currency: this.regionProfile.currency,
        country: this.regionProfile.country
      },
      overrides
    );
  }

  buildInvalidRetailCustomer(overrides?: Partial<CustomerData>): CustomerData {
    return this.buildRetailCustomer({
      email: "not-an-email",
      phoneNumber: "invalid-phone",
      address: "",
      firstName: " ",
      ...overrides
    });
  }
}

