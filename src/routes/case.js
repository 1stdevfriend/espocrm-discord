const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Create case
router.post('/create', async (req, res) => {
  try {
    const caseData = req.body[0];
    if (!validateBasicData(caseData) || !validateRequiredFields(caseData, 'case')) {
      return res.status(400).json({ error: 'Invalid case data' });
    }
    await handleWebhook(caseData, 'create', 'case');
    res.status(200).json({ message: 'Case creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing case creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update case
router.post('/update', async (req, res) => {
  try {
    const caseData = req.body[0];
    if (!validateBasicData(caseData) || !validateUpdateData(caseData)) {
      return res.status(400).json({ error: 'Invalid case data' });
    }
    await handleWebhook(caseData, 'update', 'case');
    res.status(200).json({ message: 'Case update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing case update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete case
router.post('/delete', async (req, res) => {
  try {
    const caseData = req.body[0];
    if (!validateBasicData(caseData)) {
      return res.status(400).json({ error: 'Invalid case data' });
    }
    await handleWebhook(caseData, 'delete', 'case');
    res.status(200).json({ message: 'Case deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing case deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 