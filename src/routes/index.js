const express = require('express');
const router = express.Router();

// Import entity routes
const userRoutes = require('./user');
const accountRoutes = require('./account');
const callRoutes = require('./call');
const campaignRoutes = require('./campaign');
const caseRoutes = require('./case');
const contactRoutes = require('./contact');
const documentRoutes = require('./document');
const meetingRoutes = require('./meeting');
const opportunityRoutes = require('./opportunity');
const targetListRoutes = require('./targetList');
const taskRoutes = require('./task');
const leadRoutes = require('./lead');

// Mount entity routes
router.use('/lead', leadRoutes);
router.use('/account', accountRoutes);
router.use('/call', callRoutes);
router.use('/campaign', campaignRoutes);
router.use('/case', caseRoutes);
router.use('/contact', contactRoutes);
router.use('/document', documentRoutes);
router.use('/meeting', meetingRoutes);
router.use('/opportunity', opportunityRoutes);
router.use('/targetlist', targetListRoutes);
router.use('/task', taskRoutes);
router.use('/user', userRoutes);

module.exports = router; 