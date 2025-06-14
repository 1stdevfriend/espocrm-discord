const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const sendErrorWebhook = require('../utils/errorWebhook');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Create contact
router.post('/create', async (req, res) => {
  const contactData = req.body[0];
  logger.logPayload({ route: '/contact/create', method: 'POST' }, contactData);
  try {
    if (!validateBasicData(contactData) || !validateRequiredFields(contactData, 'contact')) {
      await sendErrorWebhook({ entityType: 'contact', eventType: 'create', error: 'Invalid contact data', payload: contactData });
      return res.status(400).json({ error: 'Invalid contact data' });
    }
    await handleWebhook(contactData, 'create', 'contact');
    res.status(200).json({ message: 'Contact creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing contact creation webhook', { error: error.message, contactData });
    await sendErrorWebhook({ entityType: 'contact', eventType: 'create', error: error.message, payload: contactData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update contact
router.post('/update', async (req, res) => {
  const contactData = req.body[0];
  logger.logPayload({ route: '/contact/update', method: 'POST' }, contactData);
  try {
    if (!validateBasicData(contactData) || !validateUpdateData(contactData)) {
      await sendErrorWebhook({ entityType: 'contact', eventType: 'update', error: 'Invalid contact data', payload: contactData });
      return res.status(400).json({ error: 'Invalid contact data' });
    }
    await handleWebhook(contactData, 'update', 'contact');
    res.status(200).json({ message: 'Contact update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing contact update webhook', { error: error.message, contactData });
    await sendErrorWebhook({ entityType: 'contact', eventType: 'update', error: error.message, payload: contactData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete contact
router.post('/delete', async (req, res) => {
  const contactData = req.body[0];
  logger.logPayload({ route: '/contact/delete', method: 'POST' }, contactData);
  try {
    if (!validateBasicData(contactData)) {
      await sendErrorWebhook({ entityType: 'contact', eventType: 'delete', error: 'Invalid contact data', payload: contactData });
      return res.status(400).json({ error: 'Invalid contact data' });
    }
    await handleWebhook(contactData, 'delete', 'contact');
    res.status(200).json({ message: 'Contact deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing contact deletion webhook', { error: error.message, contactData });
    await sendErrorWebhook({ entityType: 'contact', eventType: 'delete', error: error.message, payload: contactData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 