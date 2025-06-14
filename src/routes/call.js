const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Create call
router.post('/create', async (req, res) => {
  try {
    const callData = req.body[0];
    if (!validateBasicData(callData) || !validateRequiredFields(callData, 'call')) {
      return res.status(400).json({ error: 'Invalid call data' });
    }
    await handleWebhook(callData, 'create', 'call');
    res.status(200).json({ message: 'Call creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing call creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update call
router.post('/update', async (req, res) => {
  try {
    const callData = req.body[0];
    if (!validateBasicData(callData) || !validateUpdateData(callData)) {
      return res.status(400).json({ error: 'Invalid call data' });
    }
    await handleWebhook(callData, 'update', 'call');
    res.status(200).json({ message: 'Call update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing call update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete call
router.post('/delete', async (req, res) => {
  try {
    const callData = req.body[0];
    if (!validateBasicData(callData)) {
      return res.status(400).json({ error: 'Invalid call data' });
    }
    await handleWebhook(callData, 'delete', 'call');
    res.status(200).json({ message: 'Call deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing call deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 