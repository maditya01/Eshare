import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  body:String, 
  username: String,
  userId: String,
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