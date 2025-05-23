import { Snowflake } from "discord.js";

export interface YAMLConfig {
  clientId: Snowflake;
  guildId: Snowflake;
}

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

export interface ValidationRule {
  validate: (config: YAMLConfig) => boolean;
  message: string;
}
