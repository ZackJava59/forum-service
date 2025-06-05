import express from 'express';
import postController from "../controllers/post.controller.js";
import validate from "../middleware/validation.middleware.js";


const router = express.Router();
router.post('/post/:author', validate('createPost'), postController.createPost);
router.get('/post/:id', postController.getPostById);
router.patch('/post/:id/like', postController.updateLikeById);
router.get('/posts/author/:user', postController.getPostsByAuthor);
router.patch('/post/:id/comment/:commenter', postController.addComment)
router.delete('/post/:id', postController.deletePost);
router.get('/posts/tags', postController.getPostsByTags);
router.get("/posts/period", postController.getPostsByPeriod);
router.patch("/post/:id", postController.updatePost);

export default router;