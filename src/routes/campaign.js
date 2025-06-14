const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Create campaign
router.post('/create', async (req, res) => {
  try {
    const campaignData = req.body[0];
    if (!validateBasicData(campaignData) || !validateRequiredFields(campaignData, 'campaign')) {
      return res.status(400).json({ error: 'Invalid campaign data' });
    }
    await handleWebhook(campaignData, 'create', 'campaign');
    res.status(200).json({ message: 'Campaign creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing campaign creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update campaign
router.post('/update', async (req, res) => {
  try {
    const campaignData = req.body[0];
    if (!validateBasicData(campaignData) || !validateUpdateData(campaignData)) {
      return res.status(400).json({ error: 'Invalid campaign data' });
    }
    await handleWebhook(campaignData, 'update', 'campaign');
    res.status(200).json({ message: 'Campaign update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing campaign update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete campaign
router.post('/delete', async (req, res) => {
  try {
    const campaignData = req.body[0];
    if (!validateBasicData(campaignData)) {
      return res.status(400).json({ error: 'Invalid campaign data' });
    }
    await handleWebhook(campaignData, 'delete', 'campaign');
    res.status(200).json({ message: 'Campaign deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing campaign deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 