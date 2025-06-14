const { createUserEmbed } = require('./user');
const { createAccountEmbed } = require('./account');
const { createCallEmbed } = require('./call');
const { createCampaignEmbed } = require('./campaign');
const { createCaseEmbed } = require('./case');
const { createContactEmbed } = require('./contact');
const { createDocumentEmbed } = require('./document');
const { createMeetingEmbed } = require('./meeting');
const { createOpportunityEmbed } = require('./opportunity');
const { createTargetListEmbed } = require('./targetList');
const { createTaskEmbed } = require('./task');
const axios = require('axios');
const logger = require('../utils/logger');

// Import other entity handlers as they are created
// const { createCallEmbed } = require('./call');
// etc...

async function handleWebhook(data, eventType, entityType) {
  const baseEmbed = {
    timestamp: new Date().toISOString()
  };

  let embed;
  switch (entityType.toLowerCase()) {
    case 'user':
      embed = createUserEmbed(data, eventType, baseEmbed);
      break;
    case 'account':
      embed = createAccountEmbed(data, eventType, baseEmbed);
      break;
    case 'call':
      embed = createCallEmbed(data, eventType, baseEmbed);
      break;
    case 'campaign':
      embed = createCampaignEmbed(data, eventType, baseEmbed);
      break;
    case 'case':
      embed = createCaseEmbed(data, eventType, baseEmbed);
      break;
    case 'contact':
      embed = createContactEmbed(data, eventType, baseEmbed);
      break;
    case 'document':
      embed = createDocumentEmbed(data, eventType, baseEmbed);
      break;
    case 'meeting':
      embed = createMeetingEmbed(data, eventType, baseEmbed);
      break;
    case 'opportunity':
      embed = createOpportunityEmbed(data, eventType, baseEmbed);
      break;
    case 'targetlist':
      embed = createTargetListEmbed(data, eventType, baseEmbed);
      break;
    case 'task':
      embed = createTaskEmbed(data, eventType, baseEmbed);
      break;
    // Add other entity types as they are created
    // case 'call':
    //   embed = createCallEmbed(data, eventType, baseEmbed);
    //   break;
    // etc...
    default:
      throw new Error(`Unsupported entity type: ${entityType}`);
  }

  // Send to Discord
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error('Discord webhook URL not configured');
  }

  try {
    const response = await axios.post(webhookUrl, { embeds: [embed] });
    logger.info('Webhook sent successfully', { entityType, eventType });
    return response.data;
  } catch (error) {
    logger.error('Error sending webhook', { error: error.message });
    throw error;
  }
}

module.exports = {
  handleWebhook
}; 