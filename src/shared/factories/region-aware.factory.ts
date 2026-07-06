import { faker as fakerDe } from "@faker-js/faker/locale/de";
import { faker as fakerEnGB } from "@faker-js/faker/locale/en_GB";
import { faker as fakerEnUS } from "@faker-js/faker/locale/en_US";

import { AppConfigFactory } from "@core/config/app-config.factory";
import type { AppConfig } from "@core/config/types/app-config";

export interface RegionProfile {
  currency: string;
  country: string;
}

export abstract class RegionAwareFactory {
  protected readonly region: string;
  protected readonly regionProfile: RegionProfile;
  protected readonly fakerInstance: typeof fakerDe;

  constructor(protected readonly appConfig: AppConfig = AppConfigFactory.create()) {
    this.region = this.normalizeRegion(appConfig.runtime.region);
    this.regionProfile = this.resolveRegionProfile(this.region);
    this.fakerInstance = this.createFakerForRegion(this.region);
  }

  protected applyOverrides<T extends Record<string, unknown>>(defaults: T, overrides?: Partial<T>): T {
    return { ...defaults, ...(overrides ?? {}) };
  }

  private normalizeRegion(region: string): string {
    return region.trim().toLowerCase();
  }

  private resolveRegionProfile(region: string): RegionProfile {
    switch (region) {
      case "uk":
        return { currency: "GBP", country: "GB" };
      case "us":
        return { currency: "USD", country: "US" };
      case "eu":
      default:
        return { currency: "EUR", country: "DE" };
    }
  }

  private createFakerForRegion(region: string): typeof fakerDe {
    switch (region) {
      case "uk":
        return fakerEnGB;
      case "us":
        return fakerEnUS;
      case "eu":
      default:
        return fakerDe;
    }
  }
}
