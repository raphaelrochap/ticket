const express = require('express');
const TagController = require('../controllers/TagController');
const routes = express.Router();
const apiTagPath = '/api/tag';

routes.get(apiTagPath, TagController.getAll);
routes.get(apiTagPath + '/index', TagController.getIndex);
routes.post(apiTagPath, TagController.store);
routes.put(apiTagPath + '/:tagId', TagController.update);
routes.delete(apiTagPath + '/:tagId', TagController.delete);

module.exports = routes;
