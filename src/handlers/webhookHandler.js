const axios = require('axios');
const logger = require('../utils/logger');

async function handleWebhook(data, eventType, entityType) {
  try {
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhookUrl) {
      throw new Error('Discord webhook URL not configured');
    }

    const embed = createEmbed(data, eventType, entityType);
    const payload = { embeds: [embed] };

    await axios.post(discordWebhookUrl, payload);
    logger.info(`Successfully sent ${eventType} event to Discord`, { id: data.id, entityType });
  } catch (error) {
    logger.error('Error sending to Discord', { error: error.message });
    throw error;
  }
}

function createEmbed(data, eventType, entityType) {
  const baseEmbed = {
    timestamp: new Date().toISOString()
  };

  switch (entityType) {
    case 'lead':
      return createLeadEmbed(data, eventType, baseEmbed);
    case 'opportunity':
      return createOpportunityEmbed(data, eventType, baseEmbed);
    case 'account':
      return createAccountEmbed(data, eventType, baseEmbed);
    case 'call':
      return createCallEmbed(data, eventType, baseEmbed);
    case 'campaign':
      return createCampaignEmbed(data, eventType, baseEmbed);
    case 'case':
      return createCaseEmbed(data, eventType, baseEmbed);
    case 'contact':
      return createContactEmbed(data, eventType, baseEmbed);
    case 'document':
      return createDocumentEmbed(data, eventType, baseEmbed);
    case 'meeting':
      return createMeetingEmbed(data, eventType, baseEmbed);
    case 'targetlist':
      return createTargetListEmbed(data, eventType, baseEmbed);
    case 'task':
      return createTaskEmbed(data, eventType, baseEmbed);
    case 'user':
      return createUserEmbed(data, eventType, baseEmbed);
    default:
      throw new Error(`Unsupported entity type: ${entityType}`);
  }
}

function createLeadEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: '🎯 New Lead Created',
      color: 0x4CAF50,
      fields: [
        {
          name: 'Name',
          value: `${data.firstName} ${data.lastName}`,
          inline: true
        },
        {
          name: 'Email',
          value: data.emailAddress || 'N/A',
          inline: true
        },
        {
          name: 'Phone',
          value: data.phoneNumber || 'N/A',
          inline: true
        },
        {
          name: 'Status',
          value: data.status || 'N/A',
          inline: true
        },
        {
          name: 'Source',
          value: data.source || 'N/A',
          inline: true
        },
        {
          name: 'Assigned To',
          value: data.assignedUserName || 'N/A',
          inline: true
        }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      {
        name: 'Lead ID',
        value: data.id,
        inline: true
      },
      {
        name: 'Modified By',
        value: data.modifiedByName,
        inline: true
      }
    ];

    // Add all fields from the update payload except id and modifiedBy
    const updateFields = Object.entries(data)
      .filter(([key]) => !['id', 'modifiedById', 'modifiedByName'].includes(key))
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value || 'N/A',
        inline: true
      }));

    fields.push(...updateFields);

    return {
      ...baseEmbed,
      title: '📝 Lead Updated',
      color: 0xFFA500,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: '🗑️ Lead Deleted',
      color: 0xFF0000,
      fields: [
        {
          name: 'Lead ID',
          value: data.id,
          inline: true
        }
      ]
    };
  }
}

function createOpportunityEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: '💰 New Opportunity Created',
      color: 0x4CAF50,
      fields: [
        { name: 'Name', value: data.name, inline: true },
        { name: 'Stage', value: data.stage || 'N/A', inline: true },
        { name: 'Amount', value: `${data.amount} ${data.amountCurrency || 'USD'}`, inline: true },
        { name: 'Probability', value: `${data.probability || 0}%`, inline: true },
        { name: 'Close Date', value: data.closeDate || 'N/A', inline: true },
        { name: 'Account', value: data.accountName || 'N/A', inline: true },
        { name: 'Assigned To', value: data.assignedUserName || 'N/A', inline: true },
        { name: 'Description', value: data.description || 'N/A', inline: false }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      { name: 'Opportunity ID', value: data.id, inline: true },
      { name: 'Modified By', value: data.modifiedByName, inline: true }
    ];
    const updateFields = Object.entries(data)
      .filter(([key]) => !['id', 'modifiedById', 'modifiedByName'].includes(key))
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value || 'N/A',
        inline: true
      }));
    fields.push(...updateFields);
    return {
      ...baseEmbed,
      title: '📝 Opportunity Updated',
      color: 0xFFA500,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: '🗑️ Opportunity Deleted',
      color: 0xFF0000,
      fields: [
        { name: 'Opportunity ID', value: data.id, inline: true }
      ]
    };
  }
}

function createAccountEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: '🏢 New Account Created',
      color: 0x4CAF50,
      fields: [
        {
          name: 'Name',
          value: data.name,
          inline: true
        },
        {
          name: 'Type',
          value: data.type || 'N/A',
          inline: true
        },
        {
          name: 'Industry',
          value: data.industry || 'N/A',
          inline: true
        },
        {
          name: 'Email',
          value: data.emailAddress || 'N/A',
          inline: true
        },
        {
          name: 'Phone',
          value: data.phoneNumber || 'N/A',
          inline: true
        },
        {
          name: 'Website',
          value: data.website || 'N/A',
          inline: true
        }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      {
        name: 'Account ID',
        value: data.id,
        inline: true
      },
      {
        name: 'Modified By',
        value: data.modifiedByName,
        inline: true
      }
    ];

    // Add all fields from the update payload except id and modifiedBy
    const updateFields = Object.entries(data)
      .filter(([key]) => !['id', 'modifiedById', 'modifiedByName'].includes(key))
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value || 'N/A',
        inline: true
      }));

    fields.push(...updateFields);

    return {
      ...baseEmbed,
      title: '📝 Account Updated',
      color: 0xFFA500,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: '🗑️ Account Deleted',
      color: 0xFF0000,
      fields: [
        {
          name: 'Account ID',
          value: data.id,
          inline: true
        }
      ]
    };
  }
}

function createCallEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: '📞 New Call Created',
      color: 0x4CAF50,
      fields: [
        {
          name: 'Name',
          value: data.name,
          inline: true
        },
        {
          name: 'Status',
          value: data.status || 'N/A',
          inline: true
        },
        {
          name: 'Direction',
          value: data.direction || 'N/A',
          inline: true
        },
        {
          name: 'Start Time',
          value: data.dateStart || 'N/A',
          inline: true
        },
        {
          name: 'End Time',
          value: data.dateEnd || 'N/A',
          inline: true
        },
        {
          name: 'Duration',
          value: `${data.duration} minutes`,
          inline: true
        },
        {
          name: 'Account',
          value: data.accountName || 'N/A',
          inline: true
        },
        {
          name: 'Contact',
          value: data.contactName || 'N/A',
          inline: true
        },
        {
          name: 'Assigned To',
          value: data.assignedUserName || 'N/A',
          inline: true
        }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      {
        name: 'Call ID',
        value: data.id,
        inline: true
      },
      {
        name: 'Modified By',
        value: data.modifiedByName,
        inline: true
      }
    ];

    // Add all fields from the update payload except id and modifiedBy
    const updateFields = Object.entries(data)
      .filter(([key]) => !['id', 'modifiedById', 'modifiedByName'].includes(key))
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value || 'N/A',
        inline: true
      }));

    fields.push(...updateFields);

    return {
      ...baseEmbed,
      title: '📝 Call Updated',
      color: 0xFFA500,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: '🗑️ Call Deleted',
      color: 0xFF0000,
      fields: [
        {
          name: 'Call ID',
          value: data.id,
          inline: true
        }
      ]
    };
  }
}

function createCampaignEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: '📢 New Campaign Created',
      color: 0x9C27B0,
      fields: [
        {
          name: 'Name',
          value: data.name,
          inline: true
        },
        {
          name: 'Status',
          value: data.status || 'N/A',
          inline: true
        },
        {
          name: 'Type',
          value: data.type || 'N/A',
          inline: true
        },
        {
          name: 'Start Date',
          value: data.startDate || 'N/A',
          inline: true
        },
        {
          name: 'End Date',
          value: data.endDate || 'N/A',
          inline: true
        },
        {
          name: 'Budget',
          value: `${data.budget} ${data.budgetCurrency || ''}`,
          inline: true
        },
        {
          name: 'Description',
          value: data.description || 'N/A',
          inline: false
        }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      {
        name: 'Campaign ID',
        value: data.id,
        inline: true
      },
      {
        name: 'Modified By',
        value: data.modifiedByName,
        inline: true
      }
    ];

    // Add all fields from the update payload except id and modifiedBy
    const updateFields = Object.entries(data)
      .filter(([key]) => !['id', 'modifiedById', 'modifiedByName'].includes(key))
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value || 'N/A',
        inline: true
      }));

    fields.push(...updateFields);

    return {
      ...baseEmbed,
      title: '📝 Campaign Updated',
      color: 0xFFA500,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: '🗑️ Campaign Deleted',
      color: 0xFF0000,
      fields: [
        {
          name: 'Campaign ID',
          value: data.id,
          inline: true
        }
      ]
    };
  }
}

function createCaseEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: '🎯 New Case Created',
      color: 0x4CAF50,
      fields: [
        {
          name: 'Name',
          value: data.name,
          inline: true
        },
        {
          name: 'Status',
          value: data.status || 'N/A',
          inline: true
        },
        {
          name: 'Type',
          value: data.type || 'N/A',
          inline: true
        },
        {
          name: 'Priority',
          value: data.priority || 'N/A',
          inline: true
        },
        {
          name: 'Account',
          value: data.accountName || 'N/A',
          inline: true
        },
        {
          name: 'Contact',
          value: data.contactName || 'N/A',
          inline: true
        },
        {
          name: 'Assigned To',
          value: data.assignedUserName || 'N/A',
          inline: true
        },
        {
          name: 'Description',
          value: data.description || 'N/A',
          inline: false
        }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      {
        name: 'Case ID',
        value: data.id,
        inline: true
      },
      {
        name: 'Modified By',
        value: data.modifiedByName,
        inline: true
      }
    ];

    // Add all fields from the update payload except id and modifiedBy
    const updateFields = Object.entries(data)
      .filter(([key]) => !['id', 'modifiedById', 'modifiedByName'].includes(key))
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value || 'N/A',
        inline: true
      }));

    fields.push(...updateFields);

    return {
      ...baseEmbed,
      title: '📝 Case Updated',
      color: 0xFFA500,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: '🗑️ Case Deleted',
      color: 0xFF0000,
      fields: [
        {
          name: 'Case ID',
          value: data.id,
          inline: true
        }
      ]
    };
  }
}

function createContactEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: '👤 New Contact Created',
      color: 0x4CAF50,
      fields: [
        {
          name: 'Name',
          value: data.name,
          inline: true
        },
        {
          name: 'Email',
          value: data.emailAddress || 'N/A',
          inline: true
        },
        {
          name: 'Phone',
          value: data.phoneNumber || 'N/A',
          inline: true
        },
        {
          name: 'Title',
          value: data.title || 'N/A',
          inline: true
        },
        {
          name: 'Account',
          value: data.accountName || 'N/A',
          inline: true
        },
        {
          name: 'Assigned To',
          value: data.assignedUserName || 'N/A',
          inline: true
        },
        {
          name: 'Address',
          value: [
            data.addressStreet,
            data.addressCity,
            data.addressState,
            data.addressCountry,
            data.addressPostalCode
          ].filter(Boolean).join(', ') || 'N/A',
          inline: false
        },
        {
          name: 'Description',
          value: data.description || 'N/A',
          inline: false
        }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      {
        name: 'Contact ID',
        value: data.id,
        inline: true
      },
      {
        name: 'Modified By',
        value: data.modifiedByName,
        inline: true
      }
    ];

    // Add all fields from the update payload except id and modifiedBy
    const updateFields = Object.entries(data)
      .filter(([key]) => !['id', 'modifiedById', 'modifiedByName'].includes(key))
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value || 'N/A',
        inline: true
      }));

    fields.push(...updateFields);

    return {
      ...baseEmbed,
      title: '📝 Contact Updated',
      color: 0xFFA500,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: '🗑️ Contact Deleted',
      color: 0xFF0000,
      fields: [
        {
          name: 'Contact ID',
          value: data.id,
          inline: true
        }
      ]
    };
  }
}

function createDocumentEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: '📄 New Document Created',
      color: 0x2196F3, // Blue
      fields: [
        { name: 'Name', value: data.name, inline: true },
        { name: 'Status', value: data.status || 'N/A', inline: true },
        { name: 'Publish Date', value: data.publishDate || 'N/A', inline: true },
        { name: 'File Name', value: data.fileName || 'N/A', inline: true },
        { name: 'Assigned To', value: data.assignedUserName || 'N/A', inline: true },
        { name: 'Description', value: data.description || 'N/A', inline: false }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      { name: 'Document ID', value: data.id, inline: true },
      { name: 'Modified By', value: data.modifiedByName, inline: true }
    ];
    const updateFields = Object.entries(data)
      .filter(([key]) => !['id', 'modifiedById', 'modifiedByName'].includes(key))
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value || 'N/A',
        inline: true
      }));
    fields.push(...updateFields);
    return {
      ...baseEmbed,
      title: '📝 Document Updated',
      color: 0xFFA500,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: '🗑️ Document Deleted',
      color: 0xFF0000,
      fields: [
        { name: 'Document ID', value: data.id, inline: true }
      ]
    };
  }
}

function createMeetingEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: '📅 New Meeting Created',
      color: 0x00BCD4, // Cyan
      fields: [
        { name: 'Name', value: data.name, inline: true },
        { name: 'Status', value: data.status || 'N/A', inline: true },
        { name: 'Start Time', value: data.dateStart || 'N/A', inline: true },
        { name: 'End Time', value: data.dateEnd || 'N/A', inline: true },
        { name: 'Duration', value: data.duration ? `${data.duration / 60} min` : 'N/A', inline: true },
        { name: 'Account', value: data.accountName || 'N/A', inline: true },
        { name: 'Assigned To', value: data.assignedUserName || 'N/A', inline: true },
        { name: 'Description', value: data.description || 'N/A', inline: false }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      { name: 'Meeting ID', value: data.id, inline: true },
      { name: 'Modified By', value: data.modifiedByName, inline: true }
    ];
    const updateFields = Object.entries(data)
      .filter(([key]) => !['id', 'modifiedById', 'modifiedByName'].includes(key))
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value || 'N/A',
        inline: true
      }));
    fields.push(...updateFields);
    return {
      ...baseEmbed,
      title: '📝 Meeting Updated',
      color: 0xFFA500,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: '🗑️ Meeting Deleted',
      color: 0xFF0000,
      fields: [
        { name: 'Meeting ID', value: data.id, inline: true }
      ]
    };
  }
}

function createTargetListEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: '📋 New Target List Created',
      color: 0x9C27B0, // Purple
      fields: [
        { name: 'Name', value: data.name, inline: true },
        { name: 'Description', value: data.description || 'N/A', inline: true },
        { name: 'Assigned To', value: data.assignedUserName || 'N/A', inline: true },
        { name: 'Entry Count', value: data.entryCount || '0', inline: true },
        { name: 'Opted Out Count', value: data.optedOutCount || '0', inline: true }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      { name: 'Target List ID', value: data.id, inline: true },
      { name: 'Modified By', value: data.modifiedByName, inline: true }
    ];
    const updateFields = Object.entries(data)
      .filter(([key]) => !['id', 'modifiedById', 'modifiedByName'].includes(key))
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value || 'N/A',
        inline: true
      }));
    fields.push(...updateFields);
    return {
      ...baseEmbed,
      title: '📝 Target List Updated',
      color: 0xFFA500,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: '🗑️ Target List Deleted',
      color: 0xFF0000,
      fields: [
        { name: 'Target List ID', value: data.id, inline: true }
      ]
    };
  }
}

function createTaskEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    const attachments = data.attachmentsNames ? 
      Object.entries(data.attachmentsNames)
        .map(([id, name]) => `${name} (${data.attachmentsTypes?.[id] || 'unknown type'})`)
        .join('\n') : 'None';

    return {
      ...baseEmbed,
      title: '✅ New Task Created',
      color: 0x2196F3, // Blue
      fields: [
        { name: 'Name', value: data.name, inline: true },
        { name: 'Status', value: data.status || 'N/A', inline: true },
        { name: 'Priority', value: data.priority || 'N/A', inline: true },
        { name: 'Start Date', value: data.dateStart || 'N/A', inline: true },
        { name: 'End Date', value: data.dateEnd || 'N/A', inline: true },
        { name: 'Account', value: data.accountName || 'N/A', inline: true },
        { name: 'Assigned To', value: data.assignedUserName || 'N/A', inline: true },
        { name: 'Description', value: data.description || 'N/A', inline: false },
        { name: 'Attachments', value: attachments, inline: false }
      ]
    };
  } else if (eventType === 'update') {
    const fields = [
      { name: 'Task ID', value: data.id, inline: true },
      { name: 'Modified By', value: data.modifiedByName, inline: true }
    ];
    const updateFields = Object.entries(data)
      .filter(([key]) => !['id', 'modifiedById', 'modifiedByName'].includes(key))
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value || 'N/A',
        inline: true
      }));
    fields.push(...updateFields);
    return {
      ...baseEmbed,
      title: '📝 Task Updated',
      color: 0xFFA500,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: '🗑️ Task Deleted',
      color: 0xFF0000,
      fields: [
        { name: 'Task ID', value: data.id, inline: true }
      ]
    };
  }
}

function createUserEmbed(data, eventType, baseEmbed) {
  if (eventType === 'create') {
    return {
      ...baseEmbed,
      title: '👤 New User Created',
      color: 0x673AB7, // Deep Purple
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
      title: '📝 User Updated',
      color: 0xFFA500,
      fields
    };
  } else if (eventType === 'delete') {
    return {
      ...baseEmbed,
      title: '🗑️ User Deleted',
      color: 0xFF0000,
      fields: [
        { name: 'User ID', value: data.id, inline: true }
      ]
    };
  }
}

module.exports = {
  handleWebhook
}; 