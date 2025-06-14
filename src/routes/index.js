const express = require('express');
const router = express.Router();

// Import entity routes
const userRoutes = require('./user');
const accountRoutes = require('./account');
// Import other entity routes as they are created
// const callRoutes = require('./call');
// etc...

// Mount entity routes
router.use('/user', userRoutes);
router.use('/account', accountRoutes);
// Mount other entity routes as they are created
// router.use('/call', callRoutes);
// etc...

module.exports = router; 