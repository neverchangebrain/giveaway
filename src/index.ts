import { ConfigManager } from "@utils/config/manager.js";

const client = {
  config: ConfigManager.getInstance().getConfig(),
};
