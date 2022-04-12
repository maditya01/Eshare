//Router ke under route define kar rhe hain.
//Phir uske Corresponding ak callback function hoga jo us
//Route ke milne par chalega.
//Do route ka SAME HTTP REQUEST,ROUTE NHI HO SAKTA HAI.

import express from "express";
import auth from "../middleware/auth.js";
import {
  commentPosts,
  getPost,
  getPostsBySearch,
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

const router = express.Router();

//http://localhost:3001/posts/
router.get("/search/", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);

//controller me "/:id" ise as a req.parms me Dekha jayega.
router.patch("/:id", auth, updatePost);

//For Deleting a single Post we are looking
//A single Post is identified using their ID.
router.delete("/:id", auth, deletePost);

router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPosts);

export default router;
