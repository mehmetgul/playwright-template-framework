import path from 'path'; // Import 'path'
import winston from 'winston'; // Import 'winston'
import fs from 'fs';


const logsFolder = path.join(__dirname, '../../artifacts/playwright/logs');
const testRunTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
const testRunLogFile = path.join(logsFolder, `test-run-${testRunTimestamp}.log`);

// Ensure logs folder exists
const ensureFolderExists = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};
ensureFolderExists(logsFolder);

// Create the logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: testRunLogFile }),
  ],
});

export default logger;
