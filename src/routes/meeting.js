const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');
const logger = require('../utils/logger');

// Create meeting
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for meeting creation
    validateRequiredFields(data, 'meeting');
    
    // Process webhook
    await handleWebhook(data, 'create', 'meeting');
    
    res.status(200).json({ message: 'Meeting creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing meeting creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update meeting
router.post('/update', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for update
    validateUpdateData(data);
    
    // Process webhook
    await handleWebhook(data, 'update', 'meeting');
    
    res.status(200).json({ message: 'Meeting update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing meeting update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete meeting
router.post('/delete', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Process webhook
    await handleWebhook(data, 'delete', 'meeting');
    
    res.status(200).json({ message: 'Meeting deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing meeting deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 