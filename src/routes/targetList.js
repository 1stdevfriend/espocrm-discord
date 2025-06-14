const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');
const logger = require('../utils/logger');

// Create target list
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for target list creation
    validateRequiredFields(data, 'targetList');
    
    // Process webhook
    await handleWebhook(data, 'create', 'targetList');
    
    res.status(200).json({ message: 'Target list creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing target list creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update target list
router.post('/update', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for update
    validateUpdateData(data);
    
    // Process webhook
    await handleWebhook(data, 'update', 'targetList');
    
    res.status(200).json({ message: 'Target list update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing target list update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete target list
router.post('/delete', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Process webhook
    await handleWebhook(data, 'delete', 'targetList');
    
    res.status(200).json({ message: 'Target list deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing target list deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 