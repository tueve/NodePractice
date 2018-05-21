const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({username: String, password: String, email: String})

mongoose.model('user', UserSchema);