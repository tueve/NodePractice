const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
	title: String,
	description: String,
	date: {
		type: Date,
		default: Date.now()
	},
	user: String
});

mongoose.model('todo', todoSchema);
