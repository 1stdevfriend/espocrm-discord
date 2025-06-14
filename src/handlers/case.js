const { EMOJIS, COLORS } = require('../utils/constants');

function createCaseEmbed(data, eventType, baseEmbed) {
  let title = `${EMOJIS.case} Case ${capitalize(eventType)}`;
  let color = COLORS[eventType];
  let fields = [];
  if (eventType === 'create') {
    fields = [
      { name: 'Number', value: data.number || 'N/A', inline: true },
      { name: 'Name', value: data.name || 'N/A', inline: true },
      { name: 'Status', value: data.status || 'N/A', inline: true },
      { name: 'Type', value: data.type || 'N/A', inline: true },
      { name: 'Priority', value: data.priority || 'N/A', inline: true },
      { name: 'Account', value: data.accountName || 'N/A', inline: true },
      { name: 'Description', value: data.description || 'N/A', inline: false }
    ];
  } else if (eventType === 'update') {
    fields = [
      { name: 'Case ID', value: data.id || 'N/A', inline: true },
      ...Object.entries(data)
        .filter(([key]) => key !== 'id')
        .map(([key, value]) => ({ name: capitalize(key), value: value || 'N/A', inline: true }))
    ];
  } else if (eventType === 'delete') {
    fields = [
      { name: 'Case ID', value: data.id || 'N/A', inline: true }
    ];
  }
  return {
    ...baseEmbed,
    title,
    color,
    fields,
    footer: {
      text: 'Forwarded from EspoCRM',
      icon_url: 'https://media.discordapp.net/attachments/540447710239784971/1383355553178320997/image.png?ex=684e7dc1&is=684d2c41&hm=986b1a29ad98f19494bab49e6794b0acf5e2a5679b79bfaf0308c4f641f66f03&=&format=webp&quality=lossless&width=203&height=184',
      url: 'https://espocrm.koders.in'
    }
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { createCaseEmbed }; 