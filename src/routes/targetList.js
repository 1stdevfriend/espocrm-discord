const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');
const logger = require('../utils/logger');
const sendErrorWebhook = require('../utils/errorWebhook');

// Create target list
router.post('/create', async (req, res) => {
  const data = req.body;
  logger.logPayload({ route: '/targetlist/create', method: 'POST' }, data);
  try {
    if (!validateBasicData(data)) {
      await sendErrorWebhook({ entityType: 'targetList', eventType: 'create', error: 'Invalid data', payload: data });
      return res.status(400).json({ error: 'Invalid data' });
    }
    if (!validateRequiredFields(data, 'targetList')) {
      await sendErrorWebhook({ entityType: 'targetList', eventType: 'create', error: 'Missing required fields', payload: data });
      return res.status(400).json({ error: 'Missing required fields' });
    }
    await handleWebhook(data, 'create', 'targetList');
    res.status(200).json({ message: 'Target list creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing target list creation webhook', { error: error.message, data });
    await sendErrorWebhook({ entityType: 'targetList', eventType: 'create', error: error.message, payload: data });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update target list
router.post('/update', async (req, res) => {
  const data = req.body;
  logger.logPayload({ route: '/targetlist/update', method: 'POST' }, data);
  try {
    if (!validateBasicData(data)) {
      await sendErrorWebhook({ entityType: 'targetList', eventType: 'update', error: 'Invalid data', payload: data });
      return res.status(400).json({ error: 'Invalid data' });
    }
    if (!validateUpdateData(data)) {
      await sendErrorWebhook({ entityType: 'targetList', eventType: 'update', error: 'Missing id for update', payload: data });
      return res.status(400).json({ error: 'Missing id for update' });
    }
    await handleWebhook(data, 'update', 'targetList');
    res.status(200).json({ message: 'Target list update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing target list update webhook', { error: error.message, data });
    await sendErrorWebhook({ entityType: 'targetList', eventType: 'update', error: error.message, payload: data });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete target list
router.post('/delete', async (req, res) => {
  const data = req.body;
  logger.logPayload({ route: '/targetlist/delete', method: 'POST' }, data);
  try {
    if (!validateBasicData(data)) {
      await sendErrorWebhook({ entityType: 'targetList', eventType: 'delete', error: 'Invalid data', payload: data });
      return res.status(400).json({ error: 'Invalid data' });
    }
    await handleWebhook(data, 'delete', 'targetList');
    res.status(200).json({ message: 'Target list deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing target list deletion webhook', { error: error.message, data });
    await sendErrorWebhook({ entityType: 'targetList', eventType: 'delete', error: error.message, payload: data });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 