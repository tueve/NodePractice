const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedSchema = new Schema({
	content: String,
	contentSnipet: String,
	guild: String,
	isoDate: String,
	link: String,
	pubDate: String,
	title: String,
	category: String,
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

mongoose.model('feed', FeedSchema);
