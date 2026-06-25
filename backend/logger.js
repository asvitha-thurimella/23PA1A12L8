const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "logs.txt");

const logger = (req, res, next) => {
  const entry = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  fs.appendFileSync(logFile, entry);
  next();
};

module.exports = logger;