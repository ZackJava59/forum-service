import postService from "../services/post.service.js";

class PostController {
    async createPost(req, res, next) {
        try {
            const post = await postService.createPost(req.params.author, req.body);
            res.status(201).json(post);
        } catch (err) {
            next(err);
        }
    }

    async getPostById(req, res, next) {
        try {
            const post = await postService.getPostById(req.params.id);
            res.status(200).json(post);
        } catch (err) {
            next(err);
        }
    }

    async addLike(req, res, next) {
        try {
            const post = await postService.addLike(req.params.id);
            res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }

    async getPostsByAuthor(req, res, next) {
        try {
            const posts = await postService.getPostsByAuthor(req.params.author);
            res.json(posts);
        } catch (err) {
            next(err);
        }
    }

    async addComment(req, res, next) {
        try {
            const post = await postService.addComment(req.params.id, req.params.commenter, req.body.message);
            res.json(post);
        } catch (err) {
            next(err);
        }
    }

    async deletePost(req, res, next) {
        try {
            const post = await postService.deletePost(req.params.id);
            res.json(post);
        } catch (err) {
            next(err);
        }
    }

    async getPostsByTags(req, res, next) {
        try {
            const values = Array.isArray(req.query.values) ? req.query.values : [req.query.values];
            const posts = await postService.getPostsByTags(values);
            return res.json(posts);
        } catch (err) {
            next(err);
        }
    }

    async getPostsByPeriod(req, res, next) {
        try {
            const posts = await postService.getPostsByPeriod(req.query.dateFrom, req.query.dateTo);
            return res.json(posts);
        } catch (err) {
            next(err);
        }
    }

    async updatePost(req, res, next) {
        try {
            const updated = await postService.updatePost(req.params.id, req.body);
            return res.json(updated);
        } catch (err) {
            next(err);
        }
    }

}

export default new PostController();