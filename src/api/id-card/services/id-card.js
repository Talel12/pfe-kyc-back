'use strict';

/**
 * id-card service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::id-card.id-card');
