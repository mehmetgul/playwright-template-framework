import fs from 'fs';
import path from 'path';

export interface Config {
  baseUrl: string;
  defaultTimeout: number;
  featureToggle?: Record<string, boolean>;
}

// Initialize cachedConfig as null
let cachedConfig: Config | null = null;

export function loadConfig(): Config {
  // Check if cachedConfig is already loaded
  if (cachedConfig !== null) {
    return cachedConfig;
  }

  // Determine environment and config file path
  const env = process.env.ENV || 'dev'; // Default to 'dev'
  const configPath = path.resolve(__dirname, `../../config/${env}.json`);

  // Check if the configuration file exists
  if (!fs.existsSync(configPath)) {
    throw new Error(`Configuration file not found: ${configPath}`);
  }

  // Parse and cache the configuration
  cachedConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as Config;

  // Return the cached configuration
  return cachedConfig;
}
