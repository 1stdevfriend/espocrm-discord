const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');
const logger = require('../utils/logger');

// Create case
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for case creation
    validateRequiredFields(data, 'case');
    
    // Process webhook
    await handleWebhook(data, 'create', 'case');
    
    res.status(200).json({ message: 'Case creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing case creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update case
router.post('/update', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for update
    validateUpdateData(data);
    
    // Process webhook
    await handleWebhook(data, 'update', 'case');
    
    res.status(200).json({ message: 'Case update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing case update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete case
router.post('/delete', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Process webhook
    await handleWebhook(data, 'delete', 'case');
    
    res.status(200).json({ message: 'Case deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing case deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 