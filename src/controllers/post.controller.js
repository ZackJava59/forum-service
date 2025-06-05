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

    async updateLikeById(req, res, next) {
        try {
            const post = await postService.addLike(req.params.id);
            res.status(200).json(post);
        } catch (err) {
            next(err);
        }
    }

    async getPostsByAuthor(req, res, next) {
        try {
            const post = await postService.getPostByAuthor(req.params.user);
            res.status(200).json(post);
        } catch (err) {
            next(err);
        }
    }

    async addComment(req, res, next) {
        try {
            const comment = await postService.addComment(req.params.id, req.params.commenter, req.body.message);
            res.status(200).json(comment);
        } catch (err) {
            next(err);
        }
    }

    async deletePost(req, res, next) {
        try {
            const post = await postService.deletePost(req.params.id);
            res.status(200).json(post);
        } catch (err) {
            next(err);
        }
    }

    async getPostsByTags(req, res, next) {
        try {
            const valuesString = req.query.values;
            const posts = await postService.getPostsByTags(valuesString);
            return res.status(200).json(posts);
        } catch (err) {
            next(err);
        }
    }

    async getPostsByPeriod(req, res, next) {
        try {
            const dateFromStr = req.query.dateFrom;
            const dateToStr = req.query.dateTo;
            const posts = await postService.getPostsByPeriod(dateFromStr, dateToStr);
            return res.status(200).json(posts);
        } catch (err) {
            next(err);
        }
    }

    async updatePost(req, res, next) {
        try {
            const id = req.params.id;
            const data = req.body;
            const updated = await postService.updatePost(id, data);
            return res.status(200).json(updated);
        } catch (err) {
            next(err);
        }
    }

}

export default new PostController();