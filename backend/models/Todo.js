const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dueDate:{
    type: String,
    required: true,
  },
  priority:{
    type: String,
    enum: ['High', 'Medium', 'Low'],
  },
});

module.exports = mongoose.model('Todo', TodoSchema);

