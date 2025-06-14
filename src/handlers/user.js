const { COLORS, EMOJIS } = require('../utils/constants');

function createUserEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: `${EMOJIS.CREATE.USER} New User Created`,
      color: COLORS.CREATE.USER,
      fields: [
        { name: 'Name', value: data.name, inline: true },
        { name: 'Username', value: data.userName, inline: true },
        { name: 'Email', value: data.emailAddress, inline: true },
        { name: 'Title', value: data.title || 'N/A', inline: true },
        { name: 'Type', value: data.type || 'N/A', inline: true },
        { name: 'Gender', value: data.gender || 'N/A', inline: true },
        { name: 'Status', value: data.isActive ? 'Active' : 'Inactive', inline: true }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      { name: 'User ID', value: data.id, inline: true }
    ];
    const updateFields = Object.entries(data)
      .filter(([key]) => key !== 'id')
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value || 'N/A',
        inline: true
      }));
    fields.push(...updateFields);
    return {
      ...baseEmbed,
      title: `${EMOJIS.UPDATE} User Updated`,
      color: COLORS.UPDATE,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: `${EMOJIS.DELETE} User Deleted`,
      color: COLORS.DELETE,
      fields: [
        { name: 'User ID', value: data.id, inline: true }
      ]
    };
  }
}

module.exports = {
  createUserEmbed
}; 