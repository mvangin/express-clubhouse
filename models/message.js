let mongoose = require("mongoose")
let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    title : 'string',
    timestamp: 'string',
    text: 'string',
    user : {type: Schema.Types.ObjectId, ref: 'User'},
})

MessageSchema.virtual("url").get(function () {
    return "/message/" + this._id;
  });

module.exports = mongoose.model('Message', MessageSchema)


