const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');
const logger = require('../utils/logger');

// Create campaign
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for campaign creation
    validateRequiredFields(data, 'campaign');
    
    // Process webhook
    await handleWebhook(data, 'create', 'campaign');
    
    res.status(200).json({ message: 'Campaign creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing campaign creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update campaign
router.post('/update', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for update
    validateUpdateData(data);
    
    // Process webhook
    await handleWebhook(data, 'update', 'campaign');
    
    res.status(200).json({ message: 'Campaign update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing campaign update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete campaign
router.post('/delete', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Process webhook
    await handleWebhook(data, 'delete', 'campaign');
    
    res.status(200).json({ message: 'Campaign deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing campaign deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 