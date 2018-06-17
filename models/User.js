const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  bookmarks: [
    {
      feedID: {
				type: Schema.Types.ObjectId,
				ref: 'feed'
			},
      dateBookmark: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

mongoose.model('user', UserSchema);