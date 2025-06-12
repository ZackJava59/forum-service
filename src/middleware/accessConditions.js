import postRepository from "../repositories/post.repository.js";

export const isOwner = (req) =>
    req.principal.username === req.params.login || req.principal.username === req.body.login;

export const isPostOwner = async (req) => {
    const post = await postRepository.findById(req.params.id);
    if (!post) return false;

    return post.author === req.principal.username;
};

export const isAuthor = (req) =>
    req.principal.username === req.params.author;

export const isCommentAuthor = (req) =>
    req.principal.username === req.params.commenter;

export const isOwnerOrAdmin = (req) =>
    isOwner(req) || req.principal.roles.includes('Admin');

export const isPostOwnerOrModerator = async (req) => {
    const user = req.principal;
    const id = req.params.id;

    const post = await postRepository.findById(id);
    if (!post) return false;

    return post.author === user.username || user.roles.includes('Moderator');
};
