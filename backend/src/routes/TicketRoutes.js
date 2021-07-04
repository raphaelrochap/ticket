const express = require('express');
const TicketController = require('../controllers/TicketController');
const routes = express.Router();
const apiTicketPath = '/api/ticket';

routes.get(apiTicketPath, TicketController.getAll);
routes.get(apiTicketPath + '/index', TicketController.getIndex);
routes.post(apiTicketPath, TicketController.store);
routes.put(apiTicketPath + '/:ticketId', TicketController.update);
routes.delete(apiTicketPath + '/:ticketId', TicketController.delete);

module.exports = routes;
