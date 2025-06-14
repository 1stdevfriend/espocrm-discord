const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');
const logger = require('../utils/logger');

// Create call
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for call creation
    validateRequiredFields(data, 'call');
    
    // Process webhook
    await handleWebhook(data, 'create', 'call');
    
    res.status(200).json({ message: 'Call creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing call creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update call
router.post('/update', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for update
    validateUpdateData(data);
    
    // Process webhook
    await handleWebhook(data, 'update', 'call');
    
    res.status(200).json({ message: 'Call update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing call update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete call
router.post('/delete', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Process webhook
    await handleWebhook(data, 'delete', 'call');
    
    res.status(200).json({ message: 'Call deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing call deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 