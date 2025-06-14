const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');
const logger = require('../utils/logger');

// Create contact
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for contact creation
    validateRequiredFields(data, 'contact');
    
    // Process webhook
    await handleWebhook(data, 'create', 'contact');
    
    res.status(200).json({ message: 'Contact creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing contact creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update contact
router.post('/update', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for update
    validateUpdateData(data);
    
    // Process webhook
    await handleWebhook(data, 'update', 'contact');
    
    res.status(200).json({ message: 'Contact update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing contact update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete contact
router.post('/delete', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Process webhook
    await handleWebhook(data, 'delete', 'contact');
    
    res.status(200).json({ message: 'Contact deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing contact deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 