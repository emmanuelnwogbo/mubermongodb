const Driver = require('../models/driver');

module.exports = {
  greeting(req, res, next) {
    res.render('index');
  },

  index(req, res, next) {

    const {lng, lat} = req.query;

    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 }//the unit system used by mongodb is metres, so 200000 here is 200km
    )
    .then( drivers => res.send(drivers))
    .catch(next);

  },

  create(req, res, next) {

      const name = req.body.name;
      if(req.files.upl) {
      const mainImageOriginalName   = req.files.upl.originalname;
      const mainImageName           = req.files.upl.name;
      const mainImageMime           = req.files.upl.mimetype;
      const mainImagePath           = req.files.upl.path;
      const mainImageExt            = req.files.upl.extension;
      const mainImageSize           = req.files.upl.size;
    }

    Driver.create({
      "name": name,
      "upl": mainImageName
    }).then(driver => res.send(driver));

    /*const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);

    //console.log(req.body);*/
    },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId}, driverProps)
        .then(() => Driver.findById({ _id: driverId }))
        .then(driver => res.send(driver))
        .catch(next);
    },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({ _id: driverId})
      .then(driver => res.status(204).send(driver))
      .catch(next);
    }
};
