const tagRoutes = require('../routes/TagRoutes');
const ticketRoutes = require('../routes/TicketRoutes');

module.exports = {
  useRoutes(app) {
    app.use(tagRoutes);
    app.use(ticketRoutes);
  },
};
