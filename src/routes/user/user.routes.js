const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/user.controller');
const projectsController = require('../../controllers/projects/projects.controller');
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

// * projects register
// * route private, only register users
// * validate token

router.post(
  '/register-project',
  validateToken,
  userMiddleware.validateDataProjectStepOne,
  projectsController.saveNewProject
);

router.get(
  '/get-all-projects-pagination',
  validateToken,
  projectsController.getPaginationAllProjects
);

router.get(
  '/get-project-by-id',
  validateToken,
  projectsController.getProjectById
);

router.get(
  '/get-projects-by-id-user',
  validateToken,
  projectsController.getProjectByIdUser
);

router.put(
  '/update-project',
  validateToken,
  userMiddleware.validateDataProjectBySteps,
  projectsController.updateProject
);

router.put(
  '/update-approval-project',
  validateToken,
  projectsController.updateStatusProject
);

router.post(
  '/test-emails',
  validateToken,
  projectsController.sendEmailNotificationProjectCreated
);

router.get(
  '/search-projects',
  validateToken,
  projectsController.searchProjectByQuery
);

module.exports = router;
