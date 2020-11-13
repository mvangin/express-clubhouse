let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
       fullname: 'string',
       username: 'string',
       password: 'string',
       membership: Boolean,
    }
)

module.exports = mongoose.model('User', UserSchema);