const mongoose = require('mongoose');

const Post = new mongoose.Schema({
  user: { type: String, required: true},
  password: { type: String, required: true, trim: true },
  title: { type: String},
  content: { type: String},
  createdAt: {type:Date, default:Date.now}

});


module.exports = mongoose.model('Post', Post);

