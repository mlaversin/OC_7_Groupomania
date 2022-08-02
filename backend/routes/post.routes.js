const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.controller');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.editPost);
router.delete('/:id', auth, postCtrl.deletePost);

router.post('/:id/like', auth, postCtrl.likePost);

router.put('/comment/:id', auth, postCtrl.createComment);
router.put('/comment/:id/edit', auth, postCtrl.editComment);
router.put('/comment/:id/delete', auth, postCtrl.deleteComment);

module.exports = router;
