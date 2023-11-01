const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  alloted_to_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  state: {
    light: {
      type: Boolean,
      default: false
    },
    fan: {
      type: Boolean,
      default: false
    },
    misc: {
      type: Boolean,
      default: false
    }
  }
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
