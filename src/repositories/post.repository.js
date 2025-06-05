import Post from '../model/post.model.js';

class PostRepository {

    async createPost(postData) {
        const post = new Post(postData);
        return post.save();
    }

    async findById(id) {
        return Post.findById(id);
    }

    async save(post) {
        post.save();
    }

    async getPostsByAuthor(author) {
        return Post.find({author}).collation({locale: 'en', strength: 2});
    }

    async addComment(id, commentData) {
        return Post.findByIdAndUpdate(id, commentData, {new: true});
    }

    async deletePost(id) {
        return Post.findByIdAndDelete(id);
    }

    async findByTags(tagsArray) {
        return Post
            .find({tags: {$in: tagsArray}})
            .collation({locale: 'en', strength: 2});
    }

    async findByPeriod(startDate, endDate) {
        return Post.find({
            dateCreated: {
                $gte: startDate,
                $lte: endDate
            }
        });
    }

    async updatePostById(id, updateData) {
        return Post.findByIdAndUpdate(id, updateData, {new: true});
    }
}

export default new PostRepository();