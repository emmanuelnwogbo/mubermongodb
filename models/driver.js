const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' }
});

const DriverSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  upl: {
    type: String,
  },
  geometry: PointSchema
  //the line directly below makes it possible for every driver to have a //location
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
