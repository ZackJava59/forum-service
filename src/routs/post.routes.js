import express from 'express';
import postController from "../controllers/post.controller.js";
import validate from "../middleware/postValidation.middleware.js";
import authenticate from "../middleware/authentication.middleware.js";
import {authorize} from "../middleware/authorize.js";
import {
    isAuthor,
    isCommentAuthor,
    isOwner,
    isOwnerOrAdmin, isPostOwner,
    isPostOwnerOrModerator
} from "../middleware/accessConditions.js";


const router = express.Router();
router.post('/post/:author',
    authenticate,
    authorize({roles: ['User'], condition: isAuthor}),
    validate('createPost'),
    postController.createPost);

router.get('/post/:id',
    authenticate,
    authorize({roles: ['User']}),
    postController.getPostById);

router.patch('/post/:id/like',
    authenticate,
    authorize({roles: ['User']}),
    postController.addLike);

router.get('/posts/author/:author',
    authenticate,
    authorize({roles: ['User', 'Admin', 'Moderator']}),
    postController.getPostsByAuthor);

router.patch('/post/:id/comment/:commenter',
    authenticate,
    authorize({roles: ['User'], condition: isCommentAuthor}),
    validate('addComment'),
    postController.addComment);

router.delete('/post/:id',
    authenticate,
    authorize({roles: ['User', 'Moderator'], condition: isPostOwnerOrModerator}),
    postController.deletePost);

router.get('/posts/tags', postController.getPostsByTags);
router.get("/posts/period", validate('datePeriod'), postController.getPostsByPeriod);
router.patch("/post/:id",
    authenticate,
    authorize({roles: ['User'], condition: isPostOwner}),
    validate('updatePost'),
    postController.updatePost);

export default router;