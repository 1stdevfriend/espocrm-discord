const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../handlers');
const logger = require('../utils/logger');

// Lead webhook endpoints
router.post('/create', async (req, res) => {
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
    res.status(200).json({ message: 'Lead created successfully' });
  } catch (error) {
    logger.error('Error processing lead creation', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/update', async (req, res) => {
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
    res.status(200).json({ message: 'Lead updated successfully' });
  } catch (error) {
    logger.error('Error processing lead update', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/delete', async (req, res) => {
  try {
    const leadData = req.body[0];

    if (!leadData || !leadData.id) {
      logger.warn('Invalid lead data received', { data: req.body });
      return res.status(400).json({ error: 'Invalid lead data' });
    }

    await handleWebhook(leadData, 'delete', 'lead');
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    logger.error('Error processing lead deletion', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 