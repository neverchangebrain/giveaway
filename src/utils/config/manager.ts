import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { parse } from "yaml";
import { defaultRules } from "@utils/config/validation.js";
import {
  YAMLConfig,
  ConfigError,
  ValidationRule,
} from "@utils/config/types.js";

export class ConfigManager {
  private static instance: ConfigManager;
  private config: YAMLConfig;
  private validationRules: ValidationRule[] = defaultRules;

  private constructor() {
    try {
      const file = readFileSync(
        new URL("../config.yml", import.meta.url),
        "utf-8",
      );
      this.config = parse(file);
      this.validateConfig();
    } catch (error) {
      throw new ConfigError(`Failed to load config: ${error.message}`);
    }
  }

  private validateConfig(): void {
    const failures = this.validationRules
      .filter((rule) => !rule.validate(this.config))
      .map((rule) => rule.message);

    if (failures.length > 0) {
      throw new ConfigError(
        `Config validation failed:\n${failures.join("\n")}`,
      );
    }
  }

  public addValidationRule(rule: ValidationRule): void {
    this.validationRules.push(rule);
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public getConfig(): YAMLConfig {
    return this.config;
  }
}
