const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/likes');
const auth = require('../middlewares/auth');

// Récupérer les likes d'un article
router.get('/likesDislikes/:articleId', auth, likeCtrl.findLikes);

// Interagir avec les likes Dislikes
router.post('/:articleId/likesDislikes', auth, likeCtrl.addLikeDislike);

module.exports = router;