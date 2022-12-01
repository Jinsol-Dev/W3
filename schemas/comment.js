const mongoose = require('mongoose');

const Comment = new mongoose.Schema({  
  postId: {type: String},
  user: { type: String, required: true},
  password: { type: String, required: true, trim: true}, //trim은 공백 없애기
  content: { type: String },
  commentId: {type: String},
  createdAt: {type:Date, default:Date.now}
  
});


module.exports = mongoose.model('Comment', Comment);


