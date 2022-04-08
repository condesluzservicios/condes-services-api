const multer = require('multer');
const path = require('path');
const express = require('express');
const {
  validateToken,
} = require('../../middlewares/admin/verificateToken.middleware');

const imagesPath = path.join(__dirname, '../../assets/images');
const upload = multer({ dest: imagesPath });

const newsController = require('../../controllers/admin/news.controller');
const eventsController = require('../../controllers/admin/events.controller');
const coursesController = require('../../controllers/admin/courses.controller');
const userController = require('../../controllers/users/user.controller');
const router = express.Router();

// users
router.get('/get-users-list', validateToken, userController.getAllUser);
router.get('/get-data-user', validateToken, userController.getUserByID);
router.put(
  '/update-data-user',
  validateToken,
  userController.updateDataUserFromAdmin
);
router.get('/search-users', validateToken, userController.searchUsers);

// news
router.post(
  '/create-news',
  validateToken,
  upload.single('portada'),
  newsController.createNewNews
);

router.get('/get-all-news', newsController.getAllNews);
router.get('/get-news-pagination', newsController.getNewsPagination);
router.get('/get-mews-by-id', newsController.getNewsById);
router.put(
  '/update-news',
  validateToken,
  upload.single('portada'),
  newsController.updateNews
);
router.delete('/delete-news', validateToken, newsController.deleteNews);
// buscar por titulo o autor
router.get('/search-news', validateToken, newsController.getNewsByTitleAuthor);

// events
router.post(
  '/create-event',
  validateToken,
  upload.single('portada'),
  eventsController.createEvent
);
router.get('/get-all-events', eventsController.getAllEvents);
router.get('/get-events-pagination', eventsController.getEventsPagination);
router.get('/get-event-by-id', eventsController.getEventById);
router.put(
  '/update-event',
  validateToken,
  upload.single('portada'),
  eventsController.updateEvent
);
router.delete('/delete-event', validateToken, eventsController.deleteevent);
router.get(
  '/search-events',
  validateToken,
  eventsController.searchEventsByTitleAndAuthor
);

// courses
router.post(
  '/create-course',
  validateToken,
  upload.single('portada'),
  coursesController.createCourse
);

router.get('/get-all-courses', coursesController.getAllCourses);
router.get(
  '/get-courses-pagination',
  coursesController.getAllCoursesPagination
);
router.get('/get-course-by-id', coursesController.getCourseById);
router.put(
  '/update-course',
  validateToken,
  upload.single('portada'),
  coursesController.updateCourse
);
router.delete(
  '/delete-course',
  validateToken,
  coursesController.deleteCourseById
);
router.get(
  '/search-courses',
  validateToken,
  coursesController.searchCourseByTitleAndTeacher
);

module.exports = router;
