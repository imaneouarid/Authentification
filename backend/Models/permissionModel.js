// models/permissionModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
