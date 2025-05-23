import { YAMLConfig, ValidationRule } from "@utils/config/types.js";

export const defaultRules: ValidationRule[] = [
  {
    validate: (config) => !!config.clientId,
    message: "clientId is required",
  },
  {
    validate: (config) => !!config.guildId,
    message: "guildId is required",
  },
];
