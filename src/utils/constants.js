// Discord embed colors
const COLORS = {
  user: 0x7289da, // blurple
  account: 0x800080, // purple
  call: 0x4CAF50, // green
  campaign: 0x9C27B0, // deep purple
  case: 0xe67e22, // orange
  contact: 0x00bcd4, // cyan
  document: 0x607d8b, // blue grey
  meeting: 0x03a9f4, // light blue
  opportunity: 0xffc107, // amber
  targetList: 0x8bc34a, // light green
  task: 0xff5722, // deep orange
  create: 0x4CAF50,   // Green
  update: 0xFFC107,   // Yellow
  delete: 0xF44336,   // Red
};

// Discord embed emojis
const EMOJIS = {
  user: '👤',
  account: '🏢',
  call: '📞',
  campaign: '📢',
  case: '🗂️',
  contact: '📇',
  document: '📄',
  meeting: '📅',
  opportunity: '💼',
  targetList: '🎯',
  task: '✅',
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

const THUMBNAILS = {
  user: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
  account: 'https://cdn-icons-png.flaticon.com/512/2920/2920067.png',
  call: 'https://cdn-icons-png.flaticon.com/512/724/724664.png',
  campaign: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  case: 'https://cdn-icons-png.flaticon.com/512/2991/2991108.png',
  contact: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
  document: 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
  meeting: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
  opportunity: 'https://cdn-icons-png.flaticon.com/512/1907/1907555.png',
  targetList: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
  task: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
};

module.exports = {
  COLORS,
  EMOJIS,
  REQUIRED_FIELDS,
  THUMBNAILS
}; 