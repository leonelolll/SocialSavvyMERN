// routes/posts.js
import express from "express";
import { Get, Create, Update, Delete} from '../controller/postsController.js';
const router = express.Router();

// Get all posts
router.get('/posts', Get);

// Create a new post
router.post('/posts', Create);

// Update a post
router.put('/posts/:id', Update);

// Delete a post
router.delete('/posts/:id', Delete);

export default router;
