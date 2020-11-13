let mongoose = require("mongoose")
let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    title : 'string',
    timestamp: 'string',
    text: 'string',
    author : {type: Schema.Types.ObjectId, ref: 'Author', required: true},
})

module.exports = mongoose.model('Message', MessageSchema)


