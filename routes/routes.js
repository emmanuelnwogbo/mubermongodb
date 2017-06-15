const DriversController = require('../controllers/drivers_controller');
const multer = require('multer');

module.exports = (app) => {
  app.get('/api', DriversController.greeting);

  app.post('/api/drivers', multer({ dest: './uploads/'}).single('upl'), DriversController.create);

  app.put('/api/drivers/:id', DriversController.edit);

  app.delete('/api/drivers/:id', DriversController.delete);

  app.get('/api/drivers', DriversController.index);
  //traditionally get requests are associated with finding or getting any
  //lists or displaying of data. Using index here is a convention where the
  //function returning a list of records is normally called index
};
