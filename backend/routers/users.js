const router = require('express').Router();

const userControllers = require('../controllers/usercontrollers');
const authenticate = require('../utils/authenticate');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.post('/register', userControllers.postRegisterUser);
router.get('/activate', userControllers.getActivateUser);
router.post('/authenticate', userControllers.postAuthenticateUser);
router.get('/me', authenticate.verifyToken, userControllers.getFindCurrentUser);
router.get('/logout', authenticate.verifyToken, userControllers.getLogoutUser);
router.get('/reset', userControllers.getResetPassword);
router.post('/reset', userControllers.postResetPassword);
router.put('/reset', userControllers.putResetPassword);
router.patch(
  '/update',
  authenticate.verifyToken,
  userControllers.patchUpdateUser
);
router.patch(
  '/changepass',
  authenticate.verifyToken,
  userControllers.patchChangePassword
);
router.delete('/delete', authenticate.verifyToken, userControllers.deleteUser);
router.put(
  '/visibility',
  authenticate.verifyToken,
  userControllers.putChangeVisibility
);
router.get('/find', authenticate.verifyToken, userControllers.getFindUsers);
router.post(
  '/profileImage',
  authenticate.verifyToken,
  upload.single('profileImage'),
  userControllers.patchProfileImage
);

module.exports = router;
