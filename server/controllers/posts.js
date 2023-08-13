/*Importing PostMessage model consider it as a table in mysql database.*/
import PostMessage from "../models/postMessage.js";
/*Importing NewComment model this feature is not fully implemented.*/
import NewComment from "../models/Comment.js";
import mongoose from "mongoose";


/*Here we are defining callback function which will hit in routes posts component.*/
/*If request needs any kind of database operation it will be done here*/
/*Then we will send response back to where request came.*/


/*Serves the request to get all the posts but here we are implementing the logic of pagination.
We will get a page number in req.query according to that we will find startIndex and endIndex then
find all the post which is lying in that range and then return the response back.
*/
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    /*We want to show only a Limit of post*/
    const LIMIT = 8;
    /*Finding starting index corresponding to that page*/
    const startIndex = (Number(page) - 1) * LIMIT;
    /*Counting the total documents present in PostMessage Model.*/
    const total = await PostMessage.countDocuments({});
    /*Finding ending index corresponding to that page*/
    const endIndex = Number(page) * LIMIT - 1;
    /*We want post from startIndex to endIndex
    I have to learn more about database query methods week point here
    sort() takes an object as parameter where the values are 1 or -1
    Use -1 for descending order and 1 for ascending
    */
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    /*Send back response what all response we are sending back and why is that required.*/
    res.status(200).json({
      data: posts, currentPage: Number(page), totalNumberofPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


/*Understand the difference between query and params
QUERY  -> query some data
PARAMS -> if we want some specific data
*/

/*
Serves the request to get all the posts which is matched with search query. serach query can be of 2 types
Search according to tags or tille. get values through req.query
*/
export const getPostsBySearch = async (req, res) => {
  const { searchMemories, searchTags } = req.query;
  try {
    const title = new RegExp(searchMemories, "i");
    /*Find all the post that matches either title or tags.*/
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: searchTags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/*Serves the request to get a unique post which is matched with id comming as request in params */
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


/*Serves the request to create a post. request has all the data for a post */
export const createPost = async (req, res) => {
  const post = req.body;
  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


/*Serves the request to update a unique post id of post will be in request params */
export const updatePost = async (req, res) => {
  /*jo ruotes me url bheje ho whi ayega yha par.*/
  const { id: _id } = req.params;
  /*Now id--->_id ke name se jana jayega.*/
  const { creator, title, message, tags, selectedFile } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);
  const updatedPost = { creator, title, message, tags, selectedFile, _id };
  await PostMessage.findByIdAndUpdate(_id, updatedPost, { new: true });
  res.json(updatedPost);
};

/*Serves the request to delete a unique post. id of post we will get through request params */
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);
  await PostMessage.findByIdAndRemove(_id);
  res.json({ message: "Post Deleted Succesfully" });
};

/*Serves the request to like a unique post. Id of post we will get thoough request params */
export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  /*we have added this userId in Auth Middleware folder. Go more deep*/
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);
  const post = await PostMessage.findById(_id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

/*Serves the request to comment in a unique post problem is we are storing comment inside postMessage
model If a post has so many comment then we have to move comment array outSide a postMessage model.
*/
export const commentPosts = async (req, res) => {
  console.log(req);
  const { id } = req.params;
  const { finalComment } = req.body;
  const post = await PostMessage.findById(id); //object return hoga
  post.comments.push(finalComment);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};


/*This feature is just not completed it is in undergoing process */
export const commentOnPost = async (req, res) => {
  const commentBody = req.body;
  const newComm = new NewComment({
    ...commentBody,
    username: req.username,
    userId: req.userId,
    createdAt: new Date().toISOString()
  })

}