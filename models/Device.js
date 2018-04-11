var mongoose = require('mongoose')

// Devices Schema
var DeviceSchema = mongoose.Schema({
  id: {
    type: String,
    index: true
  },
  name: {
    type: String
  },
  type: {
    type: Number
  },
  status: {
    type: Number
  },
  code: {
    type: String
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  }
})

var Device = module.exports = mongoose.model('Device', DeviceSchema)

module.exports.getDevicesByUserId = function (userId, callback) {
  var query = {
    'user.$id': userId
  }
  Device.find(query, callback)
}

module.exports.getDevicesByType = function (type, callback) {
  var query = {
    type: type
  }
  Device.find(query, callback)
}

module.exports.getAllDevices = function (callback) {
  Device.find(callback)
}

module.exports.getDeviceUserDetail = function (code, callback) {
  var query = {
    code: code
  }
  Device.findOne(query).populate('user').exec(callback)
}
