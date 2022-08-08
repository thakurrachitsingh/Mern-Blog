const {model, Schema} = require("mongoose");

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {  timestamps: true });

module.exports = model("post", postSchema);

