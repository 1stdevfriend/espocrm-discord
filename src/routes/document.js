const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');
const logger = require('../utils/logger');

// Create document
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for document creation
    validateRequiredFields(data, 'document');
    
    // Process webhook
    await handleWebhook(data, 'create', 'document');
    
    res.status(200).json({ message: 'Document creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing document creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update document
router.post('/update', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for update
    validateUpdateData(data);
    
    // Process webhook
    await handleWebhook(data, 'update', 'document');
    
    res.status(200).json({ message: 'Document update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing document update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete document
router.post('/delete', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Process webhook
    await handleWebhook(data, 'delete', 'document');
    
    res.status(200).json({ message: 'Document deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing document deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 