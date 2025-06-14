const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const sendErrorWebhook = require('../utils/errorWebhook');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Lead webhook endpoints
router.post('/create', async (req, res) => {
  const leadData = req.body[0];
  logger.logPayload({ route: '/lead/create', method: 'POST' }, leadData);
  try {
    if (!validateBasicData(leadData) || !validateRequiredFields(leadData, 'lead')) {
      await sendErrorWebhook({ entityType: 'lead', eventType: 'create', error: 'Invalid lead data', payload: leadData });
      return res.status(400).json({ error: 'Invalid lead data' });
    }
    await handleWebhook(leadData, 'create', 'lead');
    res.status(200).json({ message: 'Lead creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing lead creation webhook', { error: error.message, leadData });
    await sendErrorWebhook({ entityType: 'lead', eventType: 'create', error: error.message, payload: leadData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/update', async (req, res) => {
  const leadData = req.body[0];
  logger.logPayload({ route: '/lead/update', method: 'POST' }, leadData);
  try {
    if (!validateBasicData(leadData) || !validateUpdateData(leadData)) {
      await sendErrorWebhook({ entityType: 'lead', eventType: 'update', error: 'Invalid lead data', payload: leadData });
      return res.status(400).json({ error: 'Invalid lead data' });
    }
    await handleWebhook(leadData, 'update', 'lead');
    res.status(200).json({ message: 'Lead update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing lead update webhook', { error: error.message, leadData });
    await sendErrorWebhook({ entityType: 'lead', eventType: 'update', error: error.message, payload: leadData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/delete', async (req, res) => {
  const leadData = req.body[0];
  logger.logPayload({ route: '/lead/delete', method: 'POST' }, leadData);
  try {
    if (!validateBasicData(leadData)) {
      await sendErrorWebhook({ entityType: 'lead', eventType: 'delete', error: 'Invalid lead data', payload: leadData });
      return res.status(400).json({ error: 'Invalid lead data' });
    }
    await handleWebhook(leadData, 'delete', 'lead');
    res.status(200).json({ message: 'Lead deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing lead deletion webhook', { error: error.message, leadData });
    await sendErrorWebhook({ entityType: 'lead', eventType: 'delete', error: error.message, payload: leadData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 