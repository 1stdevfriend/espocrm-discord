const logger = require('./logger');
const { REQUIRED_FIELDS } = require('./constants');

/**
 * Validates the basic structure of webhook data
 * @param {Object} data - The webhook data to validate
 * @returns {boolean} - Whether the data is valid
 */
function validateBasicData(data) {
  if (!data || !data.id) {
    logger.warn('Invalid data received', { data });
    return false;
  }
  return true;
}

/**
 * Validates required fields for entity creation
 * @param {Object} data - The entity data to validate
 * @param {string} entityType - The type of entity
 * @returns {boolean} - Whether all required fields are present
 */
function validateRequiredFields(data, entityType) {
  const requiredFields = REQUIRED_FIELDS[entityType.toUpperCase()];
  if (!requiredFields) {
    logger.warn(`No required fields defined for entity type: ${entityType}`);
    return false;
  }

  const missingFields = requiredFields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    logger.warn(`Missing required fields for ${entityType} creation`, {
      data,
      missingFields
    });
    return false;
  }
  return true;
}

/**
 * Validates required fields for entity update
 * @param {Object} data - The entity data to validate
 * @returns {boolean} - Whether all required fields are present
 */
function validateUpdateData(data) {
  if (!data.modifiedByName) {
    logger.warn('Missing required fields for update', { data });
    return false;
  }
  return true;
}

module.exports = {
  validateBasicData,
  validateRequiredFields,
  validateUpdateData
}; 