const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');
const logger = require('../utils/logger');

// Create task
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for task creation
    validateRequiredFields(data, 'task');
    
    // Process webhook
    await handleWebhook(data, 'create', 'task');
    
    res.status(200).json({ message: 'Task creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing task creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update task
router.post('/update', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Validate required fields for update
    validateUpdateData(data);
    
    // Process webhook
    await handleWebhook(data, 'update', 'task');
    
    res.status(200).json({ message: 'Task update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing task update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete task
router.post('/delete', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate basic data structure
    validateBasicData(data);
    
    // Process webhook
    await handleWebhook(data, 'delete', 'task');
    
    res.status(200).json({ message: 'Task deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing task deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 