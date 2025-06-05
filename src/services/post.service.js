import postRepository from "../repositories/post.repository.js";
import postController from "../controllers/post.controller.js";

class PostService {
    async createPost(author, data) {
        return await postRepository.createPost({author, ...data});
    }

    async getPostById(id) {
        const post = await postRepository.findById(id);
        if (!post) {
            throw new Error(`Post with ${id} not found`);
        }
        return post;
    }

    async addLike(id) {
        const post = await postRepository.findById(id);
        if (!post) {
            throw new Error(`Post with ${id} not found`);
        }
        post.likes += 1;
        return postRepository.save(post);
    }

    async getPostByAuthor(user) {
        const post = await postRepository.getPostsByAuthor(user);
        if (!post) {
            throw new Error(`Post with ${author} not found`);
        }
        return post;
    }

    async addComment(id, commenter, message) {
        const toUpdate = {
            user: commenter,
            message,
            dateCreated: new Date(),
        }

        const commentData = {$push: {comments: toUpdate}};
        const comment = await postRepository.addComment(id, commentData);
        if (!comment) {
            throw new Error(`Post with ${id} not found`);
        }
        return comment;
    }

    async deletePost(id) {
        const post = await postRepository.deletePost(id)
        if (!post) {
            throw new Error(`Post with ${id} not found`);
        }
        return post;
    }

    async getPostsByTags(valuesString) {
        const tagsArray = valuesString
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
        if (tagsArray.length === 0) {
            return [];
        }
        return await postRepository.findByTags(tagsArray);
    }

    async getPostsByPeriod(dateFromStr, dateToStr) {
        const startDate = new Date(dateFromStr);
        const endDate = new Date(dateToStr);
        return await postRepository.findByPeriod(startDate, endDate);
    }

    async updatePost(id, data) {
        if (!id) {
            throw new Error("Post id is required");
        }
        if (!data || typeof data !== "object") {
            throw new Error("Update data is required");
        }
        const updatedPost = await postRepository.updatePostById(id, data);
        if (!updatedPost) {
            throw new Error(`Post with id ${id} not found`);
        }
        return updatedPost;
    }

}

export default new PostService();