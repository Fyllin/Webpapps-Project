
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({

    title: {type: String},
    user: {type: String},
    text: {type: String},
    commentCount: {type: Number}

});

module.exports = mongoose.model("posts", postSchema);
