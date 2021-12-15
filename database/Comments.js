const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema ({

    user: {type: String},
    text: {type: String},
    parentPost: {type: String}

});

module.exports = mongoose.model("comments", commentSchema);
