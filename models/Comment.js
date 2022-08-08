const {Schema, model}=require("mongoose");
const commentSchema= new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    comment:{
        type: String,
        require: true
    },
    userName: {
        type: String,
        required: true
    },
},{timestamps:true});
module.exports = model('comment',commentSchema);