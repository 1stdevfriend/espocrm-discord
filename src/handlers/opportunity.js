const { COLORS, EMOJIS } = require('../utils/constants');

function createOpportunityEmbed(data, eventType, baseEmbed) {
  const embed = {
    ...baseEmbed,
    color: COLORS.OPPORTUNITY,
    author: {
      name: `${EMOJIS.OPPORTUNITY} Opportunity ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`
    }
  };

  switch (eventType) {
    case 'create':
      embed.fields = [
        { name: 'Name', value: data.name || 'N/A', inline: true },
        { name: 'Stage', value: data.stage || 'N/A', inline: true },
        { name: 'Type', value: data.type || 'N/A', inline: true },
        { name: 'Amount', value: data.amount || 'N/A', inline: true },
        { name: 'Probability', value: data.probability || 'N/A', inline: true },
        { name: 'Account', value: data.accountName || 'N/A', inline: true },
        { name: 'Description', value: data.description || 'N/A', inline: false }
      ];
      break;

    case 'update':
      embed.fields = [
        { name: 'Opportunity ID', value: data.id || 'N/A', inline: false }
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
        { name: 'Opportunity ID', value: data.id || 'N/A', inline: false }
      ];
      break;
  }

  return embed;
}

module.exports = {
  createOpportunityEmbed
}; 