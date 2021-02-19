const LikeDislike = require('../models/likes');
const mysql = require('mysql');

exports.addLike = (req,res) => {
    LikeDislike.findByArticleId(req.params.articleId)
    console.log(req.body)

    .then(like => res.status(200).json(like))
    .catch(error => res.status(500).json({error}));
}