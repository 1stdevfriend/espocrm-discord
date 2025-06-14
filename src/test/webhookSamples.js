// Sample webhook payloads for all entities (create, update, delete)

module.exports = {
  user: {
    create: {
      id: 'u1',
      name: 'John Doe',
      userName: 'johndoe',
      emailAddress: 'john@example.com',
      title: 'Manager',
      type: 'Regular',
      gender: 'Male',
      status: 'Active'
    },
    update: {
      id: 'u1',
      emailAddress: 'john.doe@newmail.com',
      status: 'Inactive',
      modifiedByName: 'Admin User'
    },
    delete: {
      id: 'u1'
    }
  },
  account: {
    create: {
      id: 'a1',
      name: 'Acme Corp',
      type: 'Customer',
      industry: 'Manufacturing',
      website: 'https://acme.com',
      phoneNumber: '+1234567890',
      emailAddress: 'info@acme.com',
      billingAddressStreet: '123 Main St',
      description: 'A sample account.'
    },
    update: {
      id: 'a1',
      phoneNumber: '+1987654321',
      description: 'Updated description.',
      modifiedByName: 'Admin User'
    },
    delete: {
      id: 'a1'
    }
  },
  call: {
    create: {
      id: 'c1',
      name: 'Initial Call',
      status: 'Planned',
      direction: 'Outbound',
      dateStart: '2024-07-01T10:00:00Z',
      dateEnd: '2024-07-01T10:30:00Z',
      duration: '30',
      phoneNumber: '+1234567890',
      description: 'Discuss project requirements.'
    },
    update: {
      id: 'c1',
      status: 'Held',
      duration: '45',
      modifiedByName: 'Admin User'
    },
    delete: {
      id: 'c1'
    }
  },
  campaign: {
    create: {
      id: 'cmp1',
      name: 'Summer Promo',
      type: 'Email',
      status: 'Active',
      startDate: '2024-07-01',
      endDate: '2024-07-31',
      budget: '5000',
      description: 'Promotional campaign for summer.'
    },
    update: {
      id: 'cmp1',
      status: 'Completed',
      budget: '6000',
      modifiedByName: 'Admin User'
    },
    delete: {
      id: 'cmp1'
    }
  },
  case: {
    create: {
      id: 'cs1',
      number: 'CASE-001',
      name: 'Login Issue',
      status: 'New',
      type: 'Support',
      priority: 'High',
      accountName: 'Acme Corp',
      description: 'User cannot log in.'
    },
    update: {
      id: 'cs1',
      status: 'Closed',
      priority: 'Low',
      modifiedByName: 'Admin User'
    },
    delete: {
      id: 'cs1'
    }
  },
  contact: {
    create: {
      id: 'ct1',
      firstName: 'Jane',
      lastName: 'Smith',
      emailAddress: 'jane.smith@example.com',
      phoneNumber: '+1234567890',
      title: 'CTO',
      accountName: 'Acme Corp',
      description: 'Main technical contact.'
    },
    update: {
      id: 'ct1',
      phoneNumber: '+1987654321',
      title: 'Chief Technology Officer',
      modifiedByName: 'Admin User'
    },
    delete: {
      id: 'ct1'
    }
  },
  document: {
    create: {
      id: 'doc1',
      name: 'Proposal.pdf',
      fileName: 'Proposal.pdf',
      type: 'PDF',
      category: 'Proposals',
      size: '2MB',
      createdByName: 'John Doe',
      description: 'Project proposal document.'
    },
    update: {
      id: 'doc1',
      name: 'Final_Proposal.pdf',
      size: '2.5MB',
      modifiedByName: 'Admin User'
    },
    delete: {
      id: 'doc1'
    }
  },
  meeting: {
    create: {
      id: 'm1',
      name: 'Kickoff Meeting',
      status: 'Scheduled',
      type: 'Internal',
      dateStart: '2024-07-05T14:00:00Z',
      dateEnd: '2024-07-05T15:00:00Z',
      duration: '60',
      location: 'Conference Room',
      description: 'Project kickoff.'
    },
    update: {
      id: 'm1',
      status: 'Held',
      duration: '90',
      modifiedByName: 'Admin User'
    },
    delete: {
      id: 'm1'
    }
  },
  opportunity: {
    create: {
      id: 'opp1',
      name: 'Big Deal',
      stage: 'Prospecting',
      type: 'New Business',
      amount: '10000',
      probability: '70%',
      accountName: 'Acme Corp',
      description: 'Potential large contract.'
    },
    update: {
      id: 'opp1',
      stage: 'Negotiation',
      amount: '12000',
      modifiedByName: 'Admin User'
    },
    delete: {
      id: 'opp1'
    }
  },
  targetList: {
    create: {
      id: 'tl1',
      name: 'VIP Clients',
      type: 'Static',
      category: 'Premium',
      createdByName: 'Jane Smith',
      description: 'List of VIP clients.'
    },
    update: {
      id: 'tl1',
      name: 'Top VIP Clients',
      modifiedByName: 'Admin User'
    },
    delete: {
      id: 'tl1'
    }
  },
  task: {
    create: {
      id: 'tsk1',
      name: 'Follow Up',
      status: 'Not Started',
      type: 'Call',
      priority: 'High',
      dateStart: '2024-07-10T09:00:00Z',
      dateEnd: '2024-07-10T10:00:00Z',
      assignedUserName: 'John Doe',
      description: 'Follow up with client.'
    },
    update: {
      id: 'tsk1',
      status: 'Completed',
      priority: 'Low',
      modifiedByName: 'Admin User'
    },
    delete: {
      id: 'tsk1'
    }
  }
}; 