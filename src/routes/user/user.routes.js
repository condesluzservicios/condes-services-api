const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/user.controller');
const userMiddleware = require('../../middlewares/users/validateUser.middleware');
const {
  validateToken,
} = require('../../middlewares/admin/verificateToken.middleware');

router.post(
  '/signin',
  userMiddleware.validateFormatLoginUser,
  userMiddleware.validateExistUser,
  userController.signIn
);

router.put(
  '/update-sigin-user',
  userMiddleware.validateFormatUpdateUserSignin,
  userController.updateUserSignin
);

router.post(
  '/login',
  userMiddleware.validateFormatLoginUser,
  userController.login
);

router.get('/get-data-user', validateToken, userController.getDataUser);

router.put(
  '/update-data-user',
  validateToken,
  userMiddleware.validateDataUser,
  userController.updateDataUser
);

module.exports = router;
