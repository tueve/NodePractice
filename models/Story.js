const mongoose = require('mongoose');
const { Schema } = mongoose;

const StorySchema = new Schema({
	title: {
		type: String,
		default: ''
	},
	status: {
		type: String,
		default: 'public'
	},
	enableCmt: {
		type: Boolean,
		default: true
	},
	editor: {
		type: String,
		default: ''
	},
	date: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	comments: [
		{
			commentBody: {
				type: String,
				default: ''
			},
			commentDate: {
				type: Date,
				default: Date.now
			},
			commentUser: {
				type: Schema.Types.ObjectId,
				ref: 'user'
			}
		}
	]
});

mongoose.model('story', StorySchema);
