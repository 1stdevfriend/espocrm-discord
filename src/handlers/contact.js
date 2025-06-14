const { COLORS, EMOJIS } = require('../utils/constants');

function createContactEmbed(data, eventType, baseEmbed) {
  const embed = {
    ...baseEmbed,
    color: COLORS.CONTACT,
    author: {
      name: `${EMOJIS.CONTACT} Contact ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`
    }
  };

  switch (eventType) {
    case 'create':
      embed.fields = [
        { name: 'First Name', value: data.firstName || 'N/A', inline: true },
        { name: 'Last Name', value: data.lastName || 'N/A', inline: true },
        { name: 'Email', value: data.emailAddress || 'N/A', inline: true },
        { name: 'Phone', value: data.phoneNumber || 'N/A', inline: true },
        { name: 'Title', value: data.title || 'N/A', inline: true },
        { name: 'Account', value: data.accountName || 'N/A', inline: true },
        { name: 'Description', value: data.description || 'N/A', inline: false }
      ];
      break;

    case 'update':
      embed.fields = [
        { name: 'Contact ID', value: data.id || 'N/A', inline: false }
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
        { name: 'Contact ID', value: data.id || 'N/A', inline: false }
      ];
      break;
  }

  return embed;
}

module.exports = {
  createContactEmbed
}; 