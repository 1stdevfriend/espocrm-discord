const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Create opportunity
router.post('/create', async (req, res) => {
  try {
    const opportunityData = req.body[0];
    if (!validateBasicData(opportunityData) || !validateRequiredFields(opportunityData, 'opportunity')) {
      return res.status(400).json({ error: 'Invalid opportunity data' });
    }
    await handleWebhook(opportunityData, 'create', 'opportunity');
    res.status(200).json({ message: 'Opportunity creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing opportunity creation webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update opportunity
router.post('/update', async (req, res) => {
  try {
    const opportunityData = req.body[0];
    if (!validateBasicData(opportunityData) || !validateUpdateData(opportunityData)) {
      return res.status(400).json({ error: 'Invalid opportunity data' });
    }
    await handleWebhook(opportunityData, 'update', 'opportunity');
    res.status(200).json({ message: 'Opportunity update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing opportunity update webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete opportunity
router.post('/delete', async (req, res) => {
  try {
    const opportunityData = req.body[0];
    if (!validateBasicData(opportunityData)) {
      return res.status(400).json({ error: 'Invalid opportunity data' });
    }
    await handleWebhook(opportunityData, 'delete', 'opportunity');
    res.status(200).json({ message: 'Opportunity deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing opportunity deletion webhook', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 