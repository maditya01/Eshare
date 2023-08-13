//Here we are declaring the routes.
//If routes will match then corresponding callback function will execute.
//We can not declare two routes who has same http request.

import express from "express";
import auth from "../middleware/auth.js";
import { commentOnPost, commentPosts, getPost, getPostsBySearch, createPost, getPosts, updatePost, deletePost, likePost,} from "../controllers/posts.js";

//Getting the router Object
const router = express.Router();

//It is the URL which will hit for this page http://localhost:3001/posts/
//If the above api request hits and now after posts/ will match with any one of them 
//then we will go corresponding callback function to controllers component

//Get all the posts which matches the search
router.get("/search/", getPostsBySearch);
//Get all the posts present in your app it will give some limit number of posts.
router.get("/", getPosts);
//Get a unique post with id
router.get("/:id", getPost);
//Creating a new post
router.post("/", auth, createPost);
//Update a post with post id it will consider /:id id as a req.params
router.patch("/:id", auth, updatePost);
//Delete a post with post id. A single post is identified by its unique Id.
router.delete("/:id", auth, deletePost);
//Comment in a unique post it will go under posts object
router.post("/:id/commentPost", auth, commentPosts);
//Comment in a unique post it will go with new object Not implemented till now.
router.post("/:id/commentOnPost",auth,commentOnPost);
//Like a post with post Id.
router.patch("/:id/likePost", auth, likePost);

export default router;
