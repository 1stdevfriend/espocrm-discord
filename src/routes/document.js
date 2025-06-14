const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Create document
router.post('/create', async (req, res) => {
  try {
    const documentData = req.body[0];
    if (!validateBasicData(documentData) || !validateRequiredFields(documentData, 'document')) {
      return res.status(400).json({ error: 'Invalid document data' });
    }
    await handleWebhook(documentData, 'create', 'document');
    res.status(200).json({ message: 'Document creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing document creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update document
router.post('/update', async (req, res) => {
  try {
    const documentData = req.body[0];
    if (!validateBasicData(documentData) || !validateUpdateData(documentData)) {
      return res.status(400).json({ error: 'Invalid document data' });
    }
    await handleWebhook(documentData, 'update', 'document');
    res.status(200).json({ message: 'Document update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing document update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete document
router.post('/delete', async (req, res) => {
  try {
    const documentData = req.body[0];
    if (!validateBasicData(documentData)) {
      return res.status(400).json({ error: 'Invalid document data' });
    }
    await handleWebhook(documentData, 'delete', 'document');
    res.status(200).json({ message: 'Document deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing document deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 