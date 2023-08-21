import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  postId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'PostMessage'
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:'User'
  },
  body:{
    type:String,
    required:true
  },
  parentId: {
    type:String,
    default:null
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})
const NewComment = mongoose.model("NewComment",commentSchema);
export default NewComment;