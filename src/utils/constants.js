// Discord embed colors
const COLORS = {
  CREATE: {
    ACCOUNT: 0x4CAF50,    // Green
    CALL: 0x4CAF50,       // Green
    CAMPAIGN: 0x9C27B0,   // Purple
    CASE: 0xFF5722,       // Deep Orange
    CONTACT: 0x2196F3,    // Blue
    DOCUMENT: 0x2196F3,   // Blue
    MEETING: 0x00BCD4,    // Cyan
    OPPORTUNITY: 0x4CAF50, // Green
    TARGETLIST: 0x9C27B0, // Purple
    TASK: 0x2196F3,       // Blue
    USER: 0x673AB7        // Deep Purple
  },
  UPDATE: 0xFFA500,       // Orange
  DELETE: 0xFF0000        // Red
};

// Discord embed emojis
const EMOJIS = {
  CREATE: {
    ACCOUNT: '🏢',
    CALL: '📞',
    CAMPAIGN: '📢',
    CASE: '📋',
    CONTACT: '👤',
    DOCUMENT: '📄',
    MEETING: '📅',
    OPPORTUNITY: '💰',
    TARGETLIST: '📋',
    TASK: '✅',
    USER: '👤'
  },
  UPDATE: '📝',
  DELETE: '🗑️'
};

// Required fields for entity creation
const REQUIRED_FIELDS = {
  ACCOUNT: ['name'],
  CALL: ['name', 'dateStart', 'dateEnd'],
  CAMPAIGN: ['name', 'status', 'type'],
  CASE: ['name', 'status'],
  CONTACT: ['firstName', 'lastName', 'emailAddress'],
  DOCUMENT: ['name', 'fileName'],
  MEETING: ['name', 'dateStart', 'dateEnd'],
  OPPORTUNITY: ['name', 'stage', 'amount'],
  TARGETLIST: ['name'],
  TASK: ['name', 'status', 'dateStart', 'dateEnd'],
  USER: ['name', 'userName', 'emailAddress']
};

module.exports = {
  COLORS,
  EMOJIS,
  REQUIRED_FIELDS
}; 