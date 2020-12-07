const router = require('express').Router();

const postControllers = require('../controllers/postcontrollers');
const authenticate = require('../utils/authenticate');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.post('/add', authenticate.verifyToken, upload.single("postImage"), postControllers.postAddNew);
router.get('/find', authenticate.verifyToken, postControllers.getFindPost);
router.delete('/delete', authenticate.verifyToken, postControllers.deletePost);
router.patch('/update', authenticate.verifyToken, upload.single("postImage"), postControllers.patchUpdatePost);
router.post('/like', authenticate.verifyToken, postControllers.postLikePost);
router.delete('/unlike', authenticate.verifyToken, postControllers.deleteUnlikePost);
router.get('/likedby', authenticate.verifyToken, postControllers.getPostLikes);

module.exports = router;
