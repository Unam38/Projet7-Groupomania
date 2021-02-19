const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/likes');
const auth = require('../middlewares/auth');

// Ajouter un like à un article
router.post('/:articleId/like', auth, likeCtrl.addLike);

// Ajouter un dislike à un article
//router.post('/:articleId/dislike', auth, likeCtrl.addDislike);


module.exports = router;