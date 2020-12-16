const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let choreSchema = new Schema ({
    name: {type: String, required: true},
    description: String,
    completed: {type: Boolean, required: true},
    dueDate: Date
})

module.exports = mongoose.model('chores', choreSchema);