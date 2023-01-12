import express from 'express';
const router = express.Router();

// routes
import user from './user/user.routes.js';
import admin from './admin/admin.routes.js';
import publicRoute from './public/public.routes.js';

router.use(`/user`, user);
router.use(`/admin`, admin);
router.use(`/public`, publicRoute);

export default router;
