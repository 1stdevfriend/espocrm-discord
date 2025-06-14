const axios = require('axios');

const ERROR_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL_ERROR;

async function sendErrorWebhook({ entityType, eventType, error, payload }) {
  if (!ERROR_WEBHOOK_URL) return;
  const embed = {
    title: '🚨 Webhook Error',
    color: 0xff0000,
    fields: [
      { name: 'Entity', value: entityType || 'N/A', inline: true },
      { name: 'Event', value: eventType || 'N/A', inline: true },
      { name: 'Error', value: error ? String(error).slice(0, 1024) : 'N/A' },
      { name: 'Payload', value: '```json\n' + JSON.stringify(payload, null, 2).slice(0, 900) + '\n```' },
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: 'EspoCRM Discord Webhook',
      icon_url: 'https://www.espocrm.com/wp-content/uploads/2019/02/favicon.png',
    },
  };
  try {
    await axios.post(ERROR_WEBHOOK_URL, { embeds: [embed] });
  } catch (err) {
    // Optionally log to file if error webhook fails
    // console.error('Failed to send error webhook', err);
  }
}

module.exports = sendErrorWebhook; 