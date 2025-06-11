import Post from '../model/post.model.js';

class PostRepository {

    async createPost(postData) {
        const post = new Post(postData);
        return post.save();
    }

    async findById(id) {
        return Post.findById(id);
    }

    async addLike(id) {
        return Post.findByIdAndUpdate(id, {$inc: {likes: 1}}, {new: true})
    }

    async getPostsByAuthor(author) {
        return Post.find({author}).collation({locale: 'en', strength: 2});
    }

    async addComment(id, comment) {
        return Post.findByIdAndUpdate(id, {$push: {comments: comment}}, {new: true});
    }

    async deletePost(id) {
        return Post.findByIdAndDelete(id);
    }

    async findPostsByTags(tags) {
        return Post
            .find({tags: {$in: tags}})
            .collation({locale: 'en', strength: 2});
    }

    async findPostsByPeriod(dateFrom, dateTo) {
        return Post.find({
            dateCreated: {
                $gte: dateFrom,
                $lte: dateTo
            }
        });
    }

    async updatePost(id, updateData) {
        return Post.findByIdAndUpdate(id, updateData, {new: true});
    }
}

export default new PostRepository();