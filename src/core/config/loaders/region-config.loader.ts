import { readFileSync } from "node:fs";
import path from "node:path";

import { ConfigurationError } from "../../errors/configuration.error";
import { regionConfigSchema } from "../schemas/region-config.schema";
import type { RegionConfig } from "../types/region-config";

export class RegionConfigLoader {
  static load(regionCode: string): RegionConfig {
    const regionFilePath = path.resolve(process.cwd(), "config", "regions", `${regionCode}.json`);

    try {
      const raw = readFileSync(regionFilePath, "utf-8");
      const json = JSON.parse(raw) as unknown;
      return regionConfigSchema.parse(json);
    } catch (error) {
      throw new ConfigurationError(
        `Unable to load region configuration for "${regionCode}" from ${regionFilePath}.`,
        error
      );
    }
  }
}

