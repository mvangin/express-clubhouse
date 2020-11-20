let Message = require("../models/message");
exports.createMessageGet = function(req,res) {
    res.render('createMessage')
}

exports.createMessagePost = function(req,res) {
    let title = req.body.title;
    let date = new Date();
    let text= req.body.messageText;
    
    let message = new Message({
        title: title,
        timestamp: date,
        text: text,
        user: req.user
    })
    message.save();
    res.redirect('/');
}