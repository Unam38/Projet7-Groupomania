const Like = require('../models/likes');
const mysql = require('mysql');

exports.addLikeDislike = (req, res, next) => {
    Like.findByArticleId(req.params.articleId)
    .then(like => {
        const userId = req.body.userId;
        const userWantsToLike = (req.body.like === 1);
        const userWantsToDislike = (req.body.like === -1);
        const userWantsToCancel = (req.body.like === 0);
        const userCanLike = (!like.users_id.includes(userId));
        const userCanDislike = (!like.users_id.includes(userId));
        const userCanCancel = (like.users_id.includes(userId));

        if (userWantsToLike && userCanLike) {Like.like(req.params.id, userId)};
        if (userWantsToDislike && userCanDislike) {Like.dislike(req.params.id, userId)};
        if (userWantsToCancel && userCanCancel) {Like.cancelLikeDislike(req.params.id, userId)};
    })
    .then(like => res.status(200).json(like))
    .catch(error => res.status(400).json({error}));
};

exports.findLikes = (req, res) => {
    console.log(req.params.articleId);
    Like.findByArticleId(req.params.articleId)
        .then(likes => res.status(200).json(likes))
        .catch(error => res.status(404).json({ error }));
};