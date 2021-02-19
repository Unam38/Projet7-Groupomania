const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/likes');
const auth = require('../middlewares/auth');

// Interagir avec les likes Dislikes
router.post('/:articleId/likesDislikes', auth, likeCtrl.addLikeDislike);

module.exports = router;