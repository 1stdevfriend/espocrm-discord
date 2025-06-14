const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');
const logger = require('../utils/logger');

// Create opportunity
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for opportunity creation
    validateRequiredFields(data, 'opportunity');
    
    // Process webhook
    await handleWebhook(data, 'create', 'opportunity');
    
    res.status(200).json({ message: 'Opportunity creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing opportunity creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update opportunity
router.post('/update', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for update
    validateUpdateData(data);
    
    // Process webhook
    await handleWebhook(data, 'update', 'opportunity');
    
    res.status(200).json({ message: 'Opportunity update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing opportunity update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete opportunity
router.post('/delete', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Process webhook
    await handleWebhook(data, 'delete', 'opportunity');
    
    res.status(200).json({ message: 'Opportunity deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing opportunity deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 