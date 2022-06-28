const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, postCtrl.editPost);
router.delete('/:id', auth, postCtrl.deletePost);

router.post('/:id/like', auth, postCtrl.likePost);

module.exports = router;
