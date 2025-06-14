const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const sendErrorWebhook = require('../utils/errorWebhook');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Create user
router.post('/create', async (req, res) => {
  const userData = req.body[0];
  logger.logPayload({ route: '/user/create', method: 'POST' }, userData);
  try {
    if (!validateBasicData(userData) || !validateRequiredFields(userData, 'user')) {
      await sendErrorWebhook({ entityType: 'user', eventType: 'create', error: 'Invalid user data', payload: userData });
      return res.status(400).json({ error: 'Invalid user data' });
    }
    await handleWebhook(userData, 'create', 'user');
    res.status(200).json({ message: 'User creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing user creation webhook', { error: error.message, userData });
    await sendErrorWebhook({ entityType: 'user', eventType: 'create', error: error.message, payload: userData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
router.post('/update', async (req, res) => {
  const userData = req.body[0];
  logger.logPayload({ route: '/user/update', method: 'POST' }, userData);
  try {
    if (!validateBasicData(userData) || !validateUpdateData(userData)) {
      await sendErrorWebhook({ entityType: 'user', eventType: 'update', error: 'Invalid user data', payload: userData });
      return res.status(400).json({ error: 'Invalid user data' });
    }
    await handleWebhook(userData, 'update', 'user');
    res.status(200).json({ message: 'User update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing user update webhook', { error: error.message, userData });
    await sendErrorWebhook({ entityType: 'user', eventType: 'update', error: error.message, payload: userData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
router.post('/delete', async (req, res) => {
  const userData = req.body[0];
  logger.logPayload({ route: '/user/delete', method: 'POST' }, userData);
  try {
    if (!validateBasicData(userData)) {
      await sendErrorWebhook({ entityType: 'user', eventType: 'delete', error: 'Invalid user data', payload: userData });
      return res.status(400).json({ error: 'Invalid user data' });
    }
    await handleWebhook(userData, 'delete', 'user');
    res.status(200).json({ message: 'User deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing user deletion webhook', { error: error.message, userData });
    await sendErrorWebhook({ entityType: 'user', eventType: 'delete', error: error.message, payload: userData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 