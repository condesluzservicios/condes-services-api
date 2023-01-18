import express from 'express';
const router = express.Router();

import {
  signIn,
  updateUserSignin,
  login,
  getDataUser,
  updateDataUser,
} from '../../controllers/users/user.controller.js';
import {
  saveNewProject,
  getPaginationAllProjects,
  getProjectById,
  getProjectByIdUser,
  updateProject,
  updateStatusProject,
  sendEmailNotificationProjectCreated,
  searchProjectByQuery,
  assignProjectsToEvaluatorsController,
} from '../../controllers/projects/projects.controller.js';
import {
  validateFormatLoginUser,
  validateExistUser,
  validateFormatUpdateUserSignin,
  validateDataUser,
  validateDataProjectStepOne,
  validateDataProjectBySteps,
} from '../../middlewares/users/validateUser.middleware.js';
import { validateToken } from '../../middlewares/admin/verificateToken.middleware.js';

router.post('/signin', validateFormatLoginUser, validateExistUser, signIn);

router.put(
  '/update-sigin-user',
  validateFormatUpdateUserSignin,
  updateUserSignin
);

router.post('/login', validateFormatLoginUser, login);

router.get('/get-data-user', validateToken, getDataUser);

router.put(
  '/update-data-user',
  validateToken,
  validateDataUser,
  updateDataUser
);

// * projects register
// * route private, only register users
// * validate token

router.post(
  '/register-project',
  validateToken,
  validateDataProjectStepOne,
  saveNewProject
);

router.get(
  '/get-all-projects-pagination',
  validateToken,
  getPaginationAllProjects
);

router.get('/get-project-by-id', validateToken, getProjectById);

router.get('/get-projects-by-id-user', validateToken, getProjectByIdUser);

router.put(
  '/update-project',
  validateToken,
  validateDataProjectBySteps,
  updateProject
);

router.put('/update-approval-project', validateToken, updateStatusProject);

router.post('/test-emails', validateToken, sendEmailNotificationProjectCreated);

router.get('/search-projects', validateToken, searchProjectByQuery);

router.post(
  '/assign-project-evaluator',
  validateToken,
  assignProjectsToEvaluatorsController
);

export default router;
