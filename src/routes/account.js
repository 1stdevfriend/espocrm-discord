const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const sendErrorWebhook = require('../utils/errorWebhook');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Create account
router.post('/create', async (req, res) => {
  const accountData = req.body[0];
  logger.logPayload({ route: '/account/create', method: 'POST' }, accountData);
  try {
    if (!validateBasicData(accountData) || !validateRequiredFields(accountData, 'account')) {
      await sendErrorWebhook({ entityType: 'account', eventType: 'create', error: 'Invalid account data', payload: accountData });
      return res.status(400).json({ error: 'Invalid account data' });
    }
    await handleWebhook(accountData, 'create', 'account');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message, accountData });
    await sendErrorWebhook({ entityType: 'account', eventType: 'create', error: error.message, payload: accountData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update account
router.post('/update', async (req, res) => {
  const accountData = req.body[0];
  logger.logPayload({ route: '/account/update', method: 'POST' }, accountData);
  try {
    if (!validateBasicData(accountData) || !validateUpdateData(accountData)) {
      await sendErrorWebhook({ entityType: 'account', eventType: 'update', error: 'Invalid account data', payload: accountData });
      return res.status(400).json({ error: 'Invalid account data' });
    }
    await handleWebhook(accountData, 'update', 'account');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message, accountData });
    await sendErrorWebhook({ entityType: 'account', eventType: 'update', error: error.message, payload: accountData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete account
router.post('/delete', async (req, res) => {
  const accountData = req.body[0];
  logger.logPayload({ route: '/account/delete', method: 'POST' }, accountData);
  try {
    if (!validateBasicData(accountData)) {
      await sendErrorWebhook({ entityType: 'account', eventType: 'delete', error: 'Invalid account data', payload: accountData });
      return res.status(400).json({ error: 'Invalid account data' });
    }
    await handleWebhook(accountData, 'delete', 'account');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message, accountData });
    await sendErrorWebhook({ entityType: 'account', eventType: 'delete', error: error.message, payload: accountData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 