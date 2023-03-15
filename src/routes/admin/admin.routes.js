import express from 'express';
import { validateToken } from '../../middlewares/admin/verificateToken.middleware.js';

import {
  createNewNews,
  getAllNews,
  getNewsPagination,
  getNewsById,
  updateNews,
  deleteNews,
  getNewsByTitleAuthor,
} from '../../controllers/admin/news.controller.js';
import {
  createEvent,
  getAllEvents,
  getEventsPagination,
  getEventById,
  updateEvent,
  deleteevent,
  searchEventsByTitleAndAuthor,
} from '../../controllers/admin/events.controller.js';
import {
  createCourse,
  getAllCourses,
  getAllCoursesPagination,
  getCourseById,
  updateCourse,
  deleteCourseById,
  searchCourseByTitleAndTeacher,
} from '../../controllers/admin/courses.controller.js';
import {
  getAllUser,
  getUserByID,
  updateDataUserFromAdmin,
  searchUsers,
  createNewUserForAdmin,
  getUsersByRoleAndCommissionsRoleController,
} from '../../controllers/users/user.controller.js';
import {
  getSettingsController,
  updateSettingsController,
} from '../../controllers/settings/settings.controllers.js';
const router = express.Router();

// users
router.get('/get-users-list', validateToken, getAllUser);
router.get('/get-data-user', validateToken, getUserByID);
router.put('/update-data-user', validateToken, updateDataUserFromAdmin);
router.get('/search-users', validateToken, searchUsers);
// coordinate users
router.post('/create-user-for-admin', validateToken, createNewUserForAdmin);
router.get(
  '/get-users-by-role-and-commissions-role',
  validateToken,
  getUsersByRoleAndCommissionsRoleController
);

// news
router.post('/create-news', validateToken, createNewNews);
router.get('/get-all-news', getAllNews);
router.get('/get-news-pagination', getNewsPagination);
router.get('/get-mews-by-id', getNewsById);
router.put('/update-news', validateToken, updateNews);
router.delete('/delete-news', validateToken, deleteNews);
// buscar por titulo o autor
router.get('/search-news', validateToken, getNewsByTitleAuthor);

// events
router.post('/create-event', validateToken, createEvent);
router.get('/get-all-events', getAllEvents);
router.get('/get-events-pagination', getEventsPagination);
router.get('/get-event-by-id', getEventById);
router.put('/update-event', validateToken, updateEvent);
router.delete('/delete-event', validateToken, deleteevent);
router.get('/search-events', validateToken, searchEventsByTitleAndAuthor);

// courses
router.post('/create-course', validateToken, createCourse);

router.get('/get-all-courses', getAllCourses);
router.get('/get-courses-pagination', getAllCoursesPagination);
router.get('/get-course-by-id', getCourseById);
router.put('/update-course', validateToken, updateCourse);
router.delete('/delete-course', validateToken, deleteCourseById);
router.get('/search-courses', validateToken, searchCourseByTitleAndTeacher);

// settings routes
router.get('/get-settings', validateToken, getSettingsController);
router.put('/update-settings', validateToken, updateSettingsController);

export default router;
