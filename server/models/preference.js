var mongoose = require('mongoose');

module.exports = mongoose.model('Preference', {
  username:  { type: String, default: '' },
  prefData:  { type: String, default: '{}' },
  lastSaved: { type: Date,   default: new Date() }
});