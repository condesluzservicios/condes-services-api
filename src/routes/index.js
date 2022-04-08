const express = require('express');
const router = express.Router();
const base_url = process.env.SERVER_BASE_ROUTE;

// routes
const user = require('./user/user.routes');
const admin = require('./admin/admin.routes');
const public = require('./public/public.routes');

router.use(`${base_url}/user`, user);
router.use(`${base_url}/admin`, admin);
router.use(`${base_url}/public`, public);

module.exports = router;
