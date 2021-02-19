const db = require('../config/db');
const mysql = require('mysql');

// Constructeur
const LikeDislike = function(LikeDislike) {
    this.likes = LikeDislike.likes,
    this.dislikes = LikeDislike.dislikes,
    this.users_id = LikeDislike.users_id,
    this.articles_id = LikeDislike.articles.id
};

// Like un article
LikeDislike.like = (articleId, userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO groupomania.likes SET likes=1, users_id=${userId}, articles_id=${articleId}`,
            function (error, result) {
                if (error) {
                    reject (error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

// Dislike un article
LikeDislike.dislike = (articleId, userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO groupomania.likes SET dislikes=1, users_id=${userId}, articles_id=${articleId}`,
            function (error, result) {
                if (error) {
                    reject (error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

// Annuler un Like/Dislike article
LikeDislike.cancelLikeDislike = (articleId, userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM groupomania.likes WHERE articles_id=${articleId} AND users_id=${userId}`,
            function (error, result) {
                if (error) {
                    reject (error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

// Trouver les avis d'un article
LikeDislike.findByArticleId = (articleId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM groupomania.likes WHERE articles_id=${articleId}`,
            function (error, result, fields) {
                if (error) {
                    reject (error);
                } else {
                    resolve (result);
                }
            }
        )
    })
};

module.exports = LikeDislike;