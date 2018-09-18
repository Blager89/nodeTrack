const authController = require('./controllers/auth');

module.exports = function(app) {
  app.use('/api',authController);

};


