const { COLORS, EMOJIS } = require('../utils/constants');

function createMeetingEmbed(data, eventType, baseEmbed) {
  const embed = {
    ...baseEmbed,
    color: COLORS.MEETING,
    author: {
      name: `${EMOJIS.MEETING} Meeting ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`
    }
  };

  switch (eventType) {
    case 'create':
      embed.fields = [
        { name: 'Name', value: data.name || 'N/A', inline: true },
        { name: 'Status', value: data.status || 'N/A', inline: true },
        { name: 'Type', value: data.type || 'N/A', inline: true },
        { name: 'Date', value: data.date || 'N/A', inline: true },
        { name: 'Duration', value: data.duration || 'N/A', inline: true },
        { name: 'Location', value: data.location || 'N/A', inline: true },
        { name: 'Description', value: data.description || 'N/A', inline: false }
      ];
      break;

    case 'update':
      embed.fields = [
        { name: 'Meeting ID', value: data.id || 'N/A', inline: false }
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
        { name: 'Meeting ID', value: data.id || 'N/A', inline: false }
      ];
      break;
  }

  return embed;
}

module.exports = {
  createMeetingEmbed
}; 