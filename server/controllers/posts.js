//Corresponding route ke functionality kya hogi wo yha par likhi hai
//wo route agar database me CRUD operation karna chahti hai to kar sakti hai
//Now yha se phir frontend me data return karegi. as a response.

//Here we talk to Database
//Importing PostMessage Model (LIKE A TABLE IN SQL)
import PostMessage from "../models/postMessage.js";
import express from "express";
const router = express.Router();
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    //We want to show only a Limit of post
    const LIMIT = 8;
    //Finding Starting index for every page.
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    const endIndex = Number(page) * LIMIT - 1;
    //We want post From startIndex to endIndex
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      totalNumberofPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
//QUERY  -> query some data
//PARAMS -> if we want some specific data
export const getPostsBySearch = async (req, res) => {
  const { searchMemories, searchTags } = req.query; //Here we are usign req.query
  // console.log(searchMemories, searchTags);
  try {
    const title = new RegExp(searchMemories, "i");
    //Find all the post that matches either title or tags.
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: searchTags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params; //Here we are using req.params
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    //Save the Upcoming Message
    //save()method present in mongoose
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params; //jo ruotes me url bheje ho whi ayega yha par.
  //Now id--->_id ke name se jana jayega.
  const { creator, title, message, tags, selectedFile } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);
  const updatedPost = { creator, title, message, tags, selectedFile, _id };
  await PostMessage.findByIdAndUpdate(_id, updatedPost, { new: true });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  // console.log(_id);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);

  await PostMessage.findByIdAndRemove(_id);
  res.json({ message: "Post Deleted Succesfully" });
};

export const likePost = async (req, res) => {
  //id is the specific id of a post
  const { id: _id } = req.params;
  // console.log(`aditya id is this${req.userId}`);
  //we have added this userId in Auth Middleware folder.
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);
  const post = await PostMessage.findById(_id);
  // console.log(post);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  // console.log(`${index} is this you know`);
  if (index === -1) {
    //Like the Post
    post.likes.push(req.userId);
  } else {
    //Unlike the Post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const commentPosts = async (req, res) => {
  const { id } = req.params;
  const { finalComment } = req.body;
  const post = await PostMessage.findById(id); //object return hoga
  post.comments.push(finalComment);
  const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatePost);
};
