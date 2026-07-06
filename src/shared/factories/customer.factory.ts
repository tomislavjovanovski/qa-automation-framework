import { faker as fakerDe } from "@faker-js/faker/locale/de";
import { faker as fakerEnGB } from "@faker-js/faker/locale/en_GB";
import { faker as fakerEnUS } from "@faker-js/faker/locale/en_US";

import { AppConfigFactory } from "@core/config/app-config.factory";
import type { AppConfig } from "@core/config/types/app-config";

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  currency: string;
  country: string;
}

export class CustomerFactory {
  private readonly fakerInstance;

  constructor(private readonly appConfig: AppConfig = AppConfigFactory.create()) {
    this.fakerInstance = this.createFakerForRegion(appConfig.runtime.region);
  }

  buildRetailCustomer(overrides?: Partial<CustomerData>): CustomerData {
    const region = this.appConfig.runtime.region.toLowerCase();
    const regionProfile = this.getRegionProfile(region);

    return this.applyOverrides(
      {
        firstName: this.fakerInstance.person.firstName(),
        lastName: this.fakerInstance.person.lastName(),
        email: this.fakerInstance.internet.email(),
        phoneNumber: this.fakerInstance.phone.number(),
        address: this.fakerInstance.location.streetAddress(),
        currency: regionProfile.currency,
        country: regionProfile.country
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

  private applyOverrides<T extends Record<string, unknown>>(defaults: T, overrides?: Partial<T>): T {
    return { ...defaults, ...(overrides ?? {}) };
  }

  private createFakerForRegion(region: string) {
    switch (region.toLowerCase()) {
      case "uk":
        return fakerEnGB;
      case "us":
        return fakerEnUS;
      case "eu":
      default:
        return fakerDe;
    }
  }

  private getRegionProfile(region: string) {
    switch (region.toLowerCase()) {
      case "uk":
        return { currency: "GBP", country: "GB" };
      case "us":
        return { currency: "USD", country: "US" };
      case "eu":
      default:
        return { currency: "EUR", country: "DE" };
    }
  }
}

