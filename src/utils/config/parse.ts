import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { parse } from "yaml";
import { YAMLConfig } from "@utils/config/types.js";

const file = readFileSync(new URL("../config.yml", import.meta.url), "utf-8");
const data = parse(file);

export default data as YAMLConfig;
