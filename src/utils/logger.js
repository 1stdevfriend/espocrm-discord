const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, '../../logs/combined.log') }),
    new transports.File({ filename: path.join(__dirname, '../../logs/app.log') })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

// Log all incoming payloads
function logPayload(context, payload) {
  logger.info('Incoming payload', { context, payload });
}

module.exports = logger;
module.exports.logPayload = logPayload; 