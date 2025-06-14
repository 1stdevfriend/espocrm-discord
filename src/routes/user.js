const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Create user
router.post('/create', async (req, res) => {
  try {
    const userData = req.body[0];
    if (!validateBasicData(userData) || !validateRequiredFields(userData, 'user')) {
      return res.status(400).json({ error: 'Invalid user data' });
    }
    await handleWebhook(userData, 'create', 'user');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
router.post('/update', async (req, res) => {
  try {
    const userData = req.body[0];
    if (!validateBasicData(userData) || !validateUpdateData(userData)) {
      return res.status(400).json({ error: 'Invalid user data' });
    }
    await handleWebhook(userData, 'update', 'user');
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
router.post('/delete', async (req, res) => {
  try {
    const userData = req.body[0];
    if (!validateBasicData(userData)) {
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