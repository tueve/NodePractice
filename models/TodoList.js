const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
	title: String,
	description: String,
	date: {
		type: Date,
		default: Date.now()
	}
});

mongoose.model('todo', todoSchema);
