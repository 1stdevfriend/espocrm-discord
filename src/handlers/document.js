const { COLORS, EMOJIS } = require('../utils/constants');

function createDocumentEmbed(data, eventType, baseEmbed) {
  const embed = {
    ...baseEmbed,
    color: COLORS.DOCUMENT,
    author: {
      name: `${EMOJIS.DOCUMENT} Document ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`
    }
  };

  switch (eventType) {
    case 'create':
      embed.fields = [
        { name: 'Name', value: data.name || 'N/A', inline: true },
        { name: 'Type', value: data.type || 'N/A', inline: true },
        { name: 'Category', value: data.category || 'N/A', inline: true },
        { name: 'Size', value: data.size || 'N/A', inline: true },
        { name: 'Created By', value: data.createdByName || 'N/A', inline: true },
        { name: 'Description', value: data.description || 'N/A', inline: false }
      ];
      break;

    case 'update':
      embed.fields = [
        { name: 'Document ID', value: data.id || 'N/A', inline: false }
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
        { name: 'Document ID', value: data.id || 'N/A', inline: false }
      ];
      break;
  }

  return embed;
}

module.exports = {
  createDocumentEmbed
}; 