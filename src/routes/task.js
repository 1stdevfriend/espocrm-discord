const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Create task
router.post('/create', async (req, res) => {
  try {
    const taskData = req.body[0];
    if (!validateBasicData(taskData) || !validateRequiredFields(taskData, 'task')) {
      return res.status(400).json({ error: 'Invalid task data' });
    }
    await handleWebhook(taskData, 'create', 'task');
    res.status(200).json({ message: 'Task creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing task creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update task
router.post('/update', async (req, res) => {
  try {
    const taskData = req.body[0];
    if (!validateBasicData(taskData) || !validateUpdateData(taskData)) {
      return res.status(400).json({ error: 'Invalid task data' });
    }
    await handleWebhook(taskData, 'update', 'task');
    res.status(200).json({ message: 'Task update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing task update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete task
router.post('/delete', async (req, res) => {
  try {
    const taskData = req.body[0];
    if (!validateBasicData(taskData)) {
      return res.status(400).json({ error: 'Invalid task data' });
    }
    await handleWebhook(taskData, 'delete', 'task');
    res.status(200).json({ message: 'Task deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing task deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 