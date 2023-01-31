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
  saveNewProjectController,
  getPaginationAllProjects,
  getProjectById,
  getProjectByIdUser,
  updateProject,
  updateStatusProject,
  sendEmailNotificationProjectCreated,
  searchProjectByQuery,
  assignProjectsToEvaluatorsController,
  getProjectsByLineSearchWithoutAssignmentController,
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
import {
  getProgramByIdController,
  getProgramsByLineSearchWithoutAssignmentController,
  getProgramsByStatusController,
  getProgramsByIdUserController,
  registerNewProgramController,
  getProgramsWithProjectsPendingRegistrationController,
  assignProgramToEvaluatorsController,
  updateStatusProgramController,
} from '../../controllers/programs/programs.controllers.js';

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
  saveNewProjectController
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

router.get(
  '/get-projects-by-line-search',
  validateToken,
  getProjectsByLineSearchWithoutAssignmentController
);

router.post(
  '/assign-project-evaluator',
  validateToken,
  assignProjectsToEvaluatorsController
);

// * programs
router.post('/register-program', validateToken, registerNewProgramController);

router.get(
  '/get-programs-by-id-user',
  validateToken,
  getProgramsByIdUserController
);

router.get(
  '/get-programs-by-line-search',
  validateToken,
  getProgramsByLineSearchWithoutAssignmentController
);

router.post(
  '/assign-program-evaluator',
  validateToken,
  assignProgramToEvaluatorsController
);

router.put(
  '/update-approval-program',
  validateToken,
  updateStatusProgramController
);

// * admin
router.get('/get-program-by-id', validateToken, getProgramByIdController);

router.get('/get-all-programs', validateToken, getProgramsByStatusController);

router.get(
  '/get-programs-with-projects-pending-registration',
  validateToken,
  getProgramsWithProjectsPendingRegistrationController
);

export default router;
