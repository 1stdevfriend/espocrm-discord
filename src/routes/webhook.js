const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../handlers/webhookHandler');
const logger = require('../utils/logger');

// Lead webhook endpoints
router.post('/lead/create', async (req, res) => {
  try {
    const leadData = req.body[0];
    
    if (!leadData || !leadData.id) {
      logger.warn('Invalid lead data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid lead data' });
    }

    // Validate required fields for lead creation
    if (!leadData.firstName || !leadData.lastName) {
      logger.warn('Missing required fields for lead creation', { data: leadData });
      return res.status(400).json({ error: 'Missing required fields for lead creation' });
    }

    await handleWebhook(leadData, 'create', 'lead');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/lead/update', async (req, res) => {
  try {
    const leadData = req.body[0];
    
    if (!leadData || !leadData.id) {
      logger.warn('Invalid lead data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid lead data' });
    }

    // Validate required fields for lead update
    if (!leadData.modifiedByName) {
      logger.warn('Missing required fields for lead update', { data: leadData });
      return res.status(400).json({ error: 'Missing required fields for lead update' });
    }

    await handleWebhook(leadData, 'update', 'lead');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/lead/delete', async (req, res) => {
  try {
    const leadData = req.body[0];
    
    if (!leadData || !leadData.id) {
      logger.warn('Invalid lead data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid lead data' });
    }

    await handleWebhook(leadData, 'delete', 'lead');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Opportunity webhook endpoints
router.post('/opportunity/create', async (req, res) => {
  try {
    const opportunityData = req.body[0];
    if (!opportunityData || !opportunityData.id) {
      logger.warn('Invalid opportunity data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid opportunity data' });
    }
    if (!opportunityData.name || !opportunityData.stage || !opportunityData.amount) {
      logger.warn('Missing required fields for opportunity creation', { data: opportunityData });
      return res.status(400).json({ error: 'Missing required fields for opportunity creation' });
    }
    await handleWebhook(opportunityData, 'create', 'opportunity');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/opportunity/update', async (req, res) => {
  try {
    const opportunityData = req.body[0];
    if (!opportunityData || !opportunityData.id) {
      logger.warn('Invalid opportunity data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid opportunity data' });
    }
    if (!opportunityData.modifiedByName) {
      logger.warn('Missing required fields for opportunity update', { data: opportunityData });
      return res.status(400).json({ error: 'Missing required fields for opportunity update' });
    }
    await handleWebhook(opportunityData, 'update', 'opportunity');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/opportunity/delete', async (req, res) => {
  try {
    const opportunityData = req.body[0];
    if (!opportunityData || !opportunityData.id) {
      logger.warn('Invalid opportunity data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid opportunity data' });
    }
    await handleWebhook(opportunityData, 'delete', 'opportunity');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Account webhook endpoints
router.post('/account/create', async (req, res) => {
  try {
    const accountData = req.body[0];
    
    if (!accountData || !accountData.id) {
      logger.warn('Invalid account data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid account data' });
    }

    // Validate required fields for account creation
    if (!accountData.name) {
      logger.warn('Missing required fields for account creation', { data: accountData });
      return res.status(400).json({ error: 'Missing required fields for account creation' });
    }

    await handleWebhook(accountData, 'create', 'account');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/account/update', async (req, res) => {
  try {
    const accountData = req.body[0];
    
    if (!accountData || !accountData.id) {
      logger.warn('Invalid account data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid account data' });
    }

    // Validate required fields for account update
    if (!accountData.modifiedByName) {
      logger.warn('Missing required fields for account update', { data: accountData });
      return res.status(400).json({ error: 'Missing required fields for account update' });
    }

    await handleWebhook(accountData, 'update', 'account');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/account/delete', async (req, res) => {
  try {
    const accountData = req.body[0];
    
    if (!accountData || !accountData.id) {
      logger.warn('Invalid account data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid account data' });
    }

    await handleWebhook(accountData, 'delete', 'account');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Call webhook endpoints
router.post('/call/create', async (req, res) => {
  try {
    const callData = req.body[0];
    
    if (!callData || !callData.id) {
      logger.warn('Invalid call data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid call data' });
    }

    // Validate required fields for call creation
    if (!callData.name || !callData.dateStart || !callData.dateEnd) {
      logger.warn('Missing required fields for call creation', { data: callData });
      return res.status(400).json({ error: 'Missing required fields for call creation' });
    }

    await handleWebhook(callData, 'create', 'call');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/call/update', async (req, res) => {
  try {
    const callData = req.body[0];
    
    if (!callData || !callData.id) {
      logger.warn('Invalid call data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid call data' });
    }

    // Validate required fields for call update
    if (!callData.modifiedByName) {
      logger.warn('Missing required fields for call update', { data: callData });
      return res.status(400).json({ error: 'Missing required fields for call update' });
    }

    await handleWebhook(callData, 'update', 'call');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/call/delete', async (req, res) => {
  try {
    const callData = req.body[0];
    
    if (!callData || !callData.id) {
      logger.warn('Invalid call data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid call data' });
    }

    await handleWebhook(callData, 'delete', 'call');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Campaign webhook endpoints
router.post('/campaign/create', async (req, res) => {
  try {
    const campaignData = req.body[0];
    
    if (!campaignData || !campaignData.id) {
      logger.warn('Invalid campaign data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid campaign data' });
    }

    // Validate required fields for campaign creation
    if (!campaignData.name || !campaignData.status || !campaignData.type) {
      logger.warn('Missing required fields for campaign creation', { data: campaignData });
      return res.status(400).json({ error: 'Missing required fields for campaign creation' });
    }

    await handleWebhook(campaignData, 'create', 'campaign');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/campaign/update', async (req, res) => {
  try {
    const campaignData = req.body[0];
    
    if (!campaignData || !campaignData.id) {
      logger.warn('Invalid campaign data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid campaign data' });
    }

    // Validate required fields for campaign update
    if (!campaignData.modifiedByName) {
      logger.warn('Missing required fields for campaign update', { data: campaignData });
      return res.status(400).json({ error: 'Missing required fields for campaign update' });
    }

    await handleWebhook(campaignData, 'update', 'campaign');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/campaign/delete', async (req, res) => {
  try {
    const campaignData = req.body[0];
    
    if (!campaignData || !campaignData.id) {
      logger.warn('Invalid campaign data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid campaign data' });
    }

    await handleWebhook(campaignData, 'delete', 'campaign');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Case webhook endpoints
router.post('/case/create', async (req, res) => {
  try {
    const caseData = req.body[0];
    
    if (!caseData || !caseData.id) {
      logger.warn('Invalid case data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid case data' });
    }

    // Validate required fields for case creation
    if (!caseData.name || !caseData.status || !caseData.type) {
      logger.warn('Missing required fields for case creation', { data: caseData });
      return res.status(400).json({ error: 'Missing required fields for case creation' });
    }

    await handleWebhook(caseData, 'create', 'case');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/case/update', async (req, res) => {
  try {
    const caseData = req.body[0];
    
    if (!caseData || !caseData.id) {
      logger.warn('Invalid case data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid case data' });
    }

    // Validate required fields for case update
    if (!caseData.modifiedByName) {
      logger.warn('Missing required fields for case update', { data: caseData });
      return res.status(400).json({ error: 'Missing required fields for case update' });
    }

    await handleWebhook(caseData, 'update', 'case');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/case/delete', async (req, res) => {
  try {
    const caseData = req.body[0];
    
    if (!caseData || !caseData.id) {
      logger.warn('Invalid case data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid case data' });
    }

    await handleWebhook(caseData, 'delete', 'case');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact webhook endpoints
router.post('/contact/create', async (req, res) => {
  try {
    const contactData = req.body[0];
    
    if (!contactData || !contactData.id) {
      logger.warn('Invalid contact data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid contact data' });
    }

    // Validate required fields for contact creation
    if (!contactData.name || !contactData.emailAddress) {
      logger.warn('Missing required fields for contact creation', { data: contactData });
      return res.status(400).json({ error: 'Missing required fields for contact creation' });
    }

    await handleWebhook(contactData, 'create', 'contact');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/contact/update', async (req, res) => {
  try {
    const contactData = req.body[0];
    
    if (!contactData || !contactData.id) {
      logger.warn('Invalid contact data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid contact data' });
    }

    // Validate required fields for contact update
    if (!contactData.modifiedByName) {
      logger.warn('Missing required fields for contact update', { data: contactData });
      return res.status(400).json({ error: 'Missing required fields for contact update' });
    }

    await handleWebhook(contactData, 'update', 'contact');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/contact/delete', async (req, res) => {
  try {
    const contactData = req.body[0];
    
    if (!contactData || !contactData.id) {
      logger.warn('Invalid contact data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid contact data' });
    }

    await handleWebhook(contactData, 'delete', 'contact');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Document webhook endpoints
router.post('/document/create', async (req, res) => {
  try {
    const documentData = req.body[0];
    if (!documentData || !documentData.id) {
      logger.warn('Invalid document data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid document data' });
    }
    if (!documentData.name || !documentData.fileName) {
      logger.warn('Missing required fields for document creation', { data: documentData });
      return res.status(400).json({ error: 'Missing required fields for document creation' });
    }
    await handleWebhook(documentData, 'create', 'document');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/document/update', async (req, res) => {
  try {
    const documentData = req.body[0];
    if (!documentData || !documentData.id) {
      logger.warn('Invalid document data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid document data' });
    }
    if (!documentData.modifiedByName) {
      logger.warn('Missing required fields for document update', { data: documentData });
      return res.status(400).json({ error: 'Missing required fields for document update' });
    }
    await handleWebhook(documentData, 'update', 'document');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/document/delete', async (req, res) => {
  try {
    const documentData = req.body[0];
    if (!documentData || !documentData.id) {
      logger.warn('Invalid document data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid document data' });
    }
    await handleWebhook(documentData, 'delete', 'document');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Meeting webhook endpoints
router.post('/meeting/create', async (req, res) => {
  try {
    const meetingData = req.body[0];
    if (!meetingData || !meetingData.id) {
      logger.warn('Invalid meeting data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid meeting data' });
    }
    if (!meetingData.name || !meetingData.dateStart || !meetingData.dateEnd) {
      logger.warn('Missing required fields for meeting creation', { data: meetingData });
      return res.status(400).json({ error: 'Missing required fields for meeting creation' });
    }
    await handleWebhook(meetingData, 'create', 'meeting');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/meeting/update', async (req, res) => {
  try {
    const meetingData = req.body[0];
    if (!meetingData || !meetingData.id) {
      logger.warn('Invalid meeting data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid meeting data' });
    }
    if (!meetingData.modifiedByName) {
      logger.warn('Missing required fields for meeting update', { data: meetingData });
      return res.status(400).json({ error: 'Missing required fields for meeting update' });
    }
    await handleWebhook(meetingData, 'update', 'meeting');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/meeting/delete', async (req, res) => {
  try {
    const meetingData = req.body[0];
    if (!meetingData || !meetingData.id) {
      logger.warn('Invalid meeting data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid meeting data' });
    }
    await handleWebhook(meetingData, 'delete', 'meeting');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Target List webhook endpoints
router.post('/targetlist/create', async (req, res) => {
  try {
    const targetListData = req.body[0];
    if (!targetListData || !targetListData.id) {
      logger.warn('Invalid target list data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid target list data' });
    }
    if (!targetListData.name) {
      logger.warn('Missing required fields for target list creation', { data: targetListData });
      return res.status(400).json({ error: 'Missing required fields for target list creation' });
    }
    await handleWebhook(targetListData, 'create', 'targetlist');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/targetlist/update', async (req, res) => {
  try {
    const targetListData = req.body[0];
    if (!targetListData || !targetListData.id) {
      logger.warn('Invalid target list data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid target list data' });
    }
    if (!targetListData.modifiedByName) {
      logger.warn('Missing required fields for target list update', { data: targetListData });
      return res.status(400).json({ error: 'Missing required fields for target list update' });
    }
    await handleWebhook(targetListData, 'update', 'targetlist');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/targetlist/delete', async (req, res) => {
  try {
    const targetListData = req.body[0];
    if (!targetListData || !targetListData.id) {
      logger.warn('Invalid target list data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid target list data' });
    }
    await handleWebhook(targetListData, 'delete', 'targetlist');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Task webhook endpoints
router.post('/task/create', async (req, res) => {
  try {
    const taskData = req.body[0];
    if (!taskData || !taskData.id) {
      logger.warn('Invalid task data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid task data' });
    }
    if (!taskData.name || !taskData.status || !taskData.dateStart || !taskData.dateEnd) {
      logger.warn('Missing required fields for task creation', { data: taskData });
      return res.status(400).json({ error: 'Missing required fields for task creation' });
    }
    await handleWebhook(taskData, 'create', 'task');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/task/update', async (req, res) => {
  try {
    const taskData = req.body[0];
    if (!taskData || !taskData.id) {
      logger.warn('Invalid task data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid task data' });
    }
    if (!taskData.modifiedByName) {
      logger.warn('Missing required fields for task update', { data: taskData });
      return res.status(400).json({ error: 'Missing required fields for task update' });
    }
    await handleWebhook(taskData, 'update', 'task');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/task/delete', async (req, res) => {
  try {
    const taskData = req.body[0];
    if (!taskData || !taskData.id) {
      logger.warn('Invalid task data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid task data' });
    }
    await handleWebhook(taskData, 'delete', 'task');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User webhook endpoints
router.post('/user/create', async (req, res) => {
  try {
    const userData = req.body[0];
    if (!userData || !userData.id) {
      logger.warn('Invalid user data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid user data' });
    }
    if (!userData.name || !userData.userName || !userData.emailAddress) {
      logger.warn('Missing required fields for user creation', { data: userData });
      return res.status(400).json({ error: 'Missing required fields for user creation' });
    }
    await handleWebhook(userData, 'create', 'user');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/user/update', async (req, res) => {
  try {
    const userData = req.body[0];
    if (!userData || !userData.id) {
      logger.warn('Invalid user data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid user data' });
    }
    await handleWebhook(userData, 'update', 'user');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/user/delete', async (req, res) => {
  try {
    const userData = req.body[0];
    if (!userData || !userData.id) {
      logger.warn('Invalid user data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid user data' });
    }
    await handleWebhook(userData, 'delete', 'user');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 