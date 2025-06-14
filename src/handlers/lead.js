function createLeadEmbed(data, eventType, baseEmbed) {
  const embed = {
    ...baseEmbed,
    title: `Lead ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`,
    color: 0x00ff00,
    fields: [
      { name: 'ID', value: data.id, inline: true },
      { name: 'Name', value: `${data.firstName} ${data.lastName}`, inline: true },
      { name: 'Email', value: data.email || 'N/A', inline: true },
      { name: 'Phone', value: data.phone || 'N/A', inline: true },
      { name: 'Status', value: data.status || 'N/A', inline: true },
      { name: 'Source', value: data.source || 'N/A', inline: true }
    ]
  };
  return embed;
}

module.exports = { createLeadEmbed }; 