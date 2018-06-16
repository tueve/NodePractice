const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  bookmarks: [
    {
      feedID: String,
      dateBookmark: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

mongoose.model('user', UserSchema);