import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  // Declare  all The Attributes
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  //For More Strict Information Make Object
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
