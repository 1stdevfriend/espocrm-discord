const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const sendErrorWebhook = require('../utils/errorWebhook');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Create campaign
router.post('/create', async (req, res) => {
  const campaignData = req.body[0];
  logger.logPayload({ route: '/campaign/create', method: 'POST' }, campaignData);
  try {
    if (!validateBasicData(campaignData) || !validateRequiredFields(campaignData, 'campaign')) {
      await sendErrorWebhook({ entityType: 'campaign', eventType: 'create', error: 'Invalid campaign data', payload: campaignData });
      return res.status(400).json({ error: 'Invalid campaign data' });
    }
    await handleWebhook(campaignData, 'create', 'campaign');
    res.status(200).json({ message: 'Campaign creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing campaign creation webhook', { error: error.message, campaignData });
    await sendErrorWebhook({ entityType: 'campaign', eventType: 'create', error: error.message, payload: campaignData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update campaign
router.post('/update', async (req, res) => {
  const campaignData = req.body[0];
  logger.logPayload({ route: '/campaign/update', method: 'POST' }, campaignData);
  try {
    if (!validateBasicData(campaignData) || !validateUpdateData(campaignData)) {
      await sendErrorWebhook({ entityType: 'campaign', eventType: 'update', error: 'Invalid campaign data', payload: campaignData });
      return res.status(400).json({ error: 'Invalid campaign data' });
    }
    await handleWebhook(campaignData, 'update', 'campaign');
    res.status(200).json({ message: 'Campaign update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing campaign update webhook', { error: error.message, campaignData });
    await sendErrorWebhook({ entityType: 'campaign', eventType: 'update', error: error.message, payload: campaignData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete campaign
router.post('/delete', async (req, res) => {
  const campaignData = req.body[0];
  logger.logPayload({ route: '/campaign/delete', method: 'POST' }, campaignData);
  try {
    if (!validateBasicData(campaignData)) {
      await sendErrorWebhook({ entityType: 'campaign', eventType: 'delete', error: 'Invalid campaign data', payload: campaignData });
      return res.status(400).json({ error: 'Invalid campaign data' });
    }
    await handleWebhook(campaignData, 'delete', 'campaign');
    res.status(200).json({ message: 'Campaign deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing campaign deletion webhook', { error: error.message, campaignData });
    await sendErrorWebhook({ entityType: 'campaign', eventType: 'delete', error: error.message, payload: campaignData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 