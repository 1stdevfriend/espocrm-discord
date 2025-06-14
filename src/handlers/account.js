const { COLORS, EMOJIS } = require('../utils/constants');

function createAccountEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: `${EMOJIS.CREATE.ACCOUNT} New Account Created`,
      color: COLORS.CREATE.ACCOUNT,
      fields: [
        { name: 'Name', value: data.name, inline: true },
        { name: 'Type', value: data.type || 'N/A', inline: true },
        { name: 'Industry', value: data.industry || 'N/A', inline: true },
        { name: 'Website', value: data.website || 'N/A', inline: true },
        { name: 'Phone', value: data.phoneNumber || 'N/A', inline: true },
        { name: 'Email', value: data.emailAddress || 'N/A', inline: true },
        { name: 'Billing Address', value: data.billingAddress || 'N/A', inline: false },
        { name: 'Description', value: data.description || 'N/A', inline: false }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      { name: 'Account ID', value: data.id, inline: true }
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
      title: `${EMOJIS.UPDATE} Account Updated`,
      color: COLORS.UPDATE,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: `${EMOJIS.DELETE} Account Deleted`,
      color: COLORS.DELETE,
      fields: [
        { name: 'Account ID', value: data.id, inline: true }
      ]
    };
  }
}

module.exports = {
  createAccountEmbed
}; 