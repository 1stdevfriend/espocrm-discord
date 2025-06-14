const { COLORS, EMOJIS } = require('../utils/constants');

function createCampaignEmbed(data, eventType, baseEmbed) {
  const embed = {
    ...baseEmbed,
    color: COLORS.CAMPAIGN,
    author: {
      name: `${EMOJIS.CAMPAIGN} Campaign ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`
    }
  };

  switch (eventType) {
    case 'create':
      embed.fields = [
        { name: 'Name', value: data.name || 'N/A', inline: true },
        { name: 'Type', value: data.type || 'N/A', inline: true },
        { name: 'Status', value: data.status || 'N/A', inline: true },
        { name: 'Start Date', value: data.startDate || 'N/A', inline: true },
        { name: 'End Date', value: data.endDate || 'N/A', inline: true },
        { name: 'Budget', value: data.budget || 'N/A', inline: true },
        { name: 'Description', value: data.description || 'N/A', inline: false }
      ];
      break;

    case 'update':
      embed.fields = [
        { name: 'Campaign ID', value: data.id || 'N/A', inline: false }
      ];
      
      // Add all updated fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'id' && value !== undefined) {
          embed.fields.push({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: value || 'N/A',
            inline: true
          });
        }
      });
      break;

    case 'delete':
      embed.fields = [
        { name: 'Campaign ID', value: data.id || 'N/A', inline: false }
      ];
      break;
  }

  return embed;
}

module.exports = {
  createCampaignEmbed
}; 