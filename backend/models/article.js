const db = require('../config/db');
const mysql = require ('mysql');

// Constructeur
const Article = function(article) {
    this.title = article.title,
    this.body = article.body,
    this.image = article.image,
    this.created_at = article.created_at,
    this.user_id = article.user_id
};

//Création d'un article OK
Article.create = (newArticle, result) => {
    db.query(
        "INSERT INTO groupomania.articles SET ?",
        newArticle,
        (err, res) => {
            if (err) {
                console.log("error: " + err);
                result(err, null);
                return;
            }
            console.log("article créé" + {id: res.id, ...newArticle });
            result(null, {id: res.id, ...newArticle});
        }
    );
};

// Effacer un article par son Id OK
Article.deleteOne = (articleId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM groupomania.articles WHERE id=${articleId}`,
            function (error, result) {
                if (error) {
                    reject (error);
                } else {
                    resolve (result);
                }
            }
        )
    })
};

// Modification d'un article OK
Article.updateOne = (articleId, article) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE groupomania.articles SET title="${article.title}", body="${article.body}", image="${article.image}" WHERE id="${articleId}"`,
            function (error, result) {
                if (error) {
                    reject (error);
                    console.log("error :" + error);
                } else {
                    resolve (result);
                    console.log("Article " + {id: articleId, ...article} + "modifié avec succès");
                }
            }
        )
    })
};

// Chercher tous les articles OK
Article.findAll = (result) => {
    db.query(
        "SELECT * FROM groupomania.articles", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, {articles: res});
            }
    });
};

// Chercher un article par son id OK
Article.findOne = (articleId) => {
    return new Promise((resolve, reject)=> {
        db.query(
            `SELECT * FROM groupomania.articles WHERE id="${articleId}"`, 
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

// Chercher tous les articles d'un auteur en particulier OK
Article.findAllByUser = (user_id) => {
    return new Promise ((resolve, reject) => {
        db.query(
            `SELECT * FROM groupomania.articles WHERE user_id=${user_id}`,
            function (error, result, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

module.exports = Article;