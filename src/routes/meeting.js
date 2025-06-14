const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const sendErrorWebhook = require('../utils/errorWebhook');
const { handleWebhook } = require('../handlers');
const { validateBasicData, validateRequiredFields, validateUpdateData } = require('../utils/validation');

// Create meeting
router.post('/create', async (req, res) => {
  const meetingData = req.body[0];
  logger.logPayload({ route: '/meeting/create', method: 'POST' }, meetingData);
  try {
    if (!validateBasicData(meetingData) || !validateRequiredFields(meetingData, 'meeting')) {
      await sendErrorWebhook({ entityType: 'meeting', eventType: 'create', error: 'Invalid meeting data', payload: meetingData });
      return res.status(400).json({ error: 'Invalid meeting data' });
    }
    await handleWebhook(meetingData, 'create', 'meeting');
    res.status(200).json({ message: 'Meeting creation webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing meeting creation webhook', { error: error.message, meetingData });
    await sendErrorWebhook({ entityType: 'meeting', eventType: 'create', error: error.message, payload: meetingData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update meeting
router.post('/update', async (req, res) => {
  const meetingData = req.body[0];
  logger.logPayload({ route: '/meeting/update', method: 'POST' }, meetingData);
  try {
    if (!validateBasicData(meetingData) || !validateUpdateData(meetingData)) {
      await sendErrorWebhook({ entityType: 'meeting', eventType: 'update', error: 'Invalid meeting data', payload: meetingData });
      return res.status(400).json({ error: 'Invalid meeting data' });
    }
    await handleWebhook(meetingData, 'update', 'meeting');
    res.status(200).json({ message: 'Meeting update webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing meeting update webhook', { error: error.message, meetingData });
    await sendErrorWebhook({ entityType: 'meeting', eventType: 'update', error: error.message, payload: meetingData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete meeting
router.post('/delete', async (req, res) => {
  const meetingData = req.body[0];
  logger.logPayload({ route: '/meeting/delete', method: 'POST' }, meetingData);
  try {
    if (!validateBasicData(meetingData)) {
      await sendErrorWebhook({ entityType: 'meeting', eventType: 'delete', error: 'Invalid meeting data', payload: meetingData });
      return res.status(400).json({ error: 'Invalid meeting data' });
    }
    await handleWebhook(meetingData, 'delete', 'meeting');
    res.status(200).json({ message: 'Meeting deletion webhook processed successfully' });
  } catch (error) {
    logger.error('Error processing meeting deletion webhook', { error: error.message, meetingData });
    await sendErrorWebhook({ entityType: 'meeting', eventType: 'delete', error: error.message, payload: meetingData });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 