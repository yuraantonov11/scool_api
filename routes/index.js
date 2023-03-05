const express = require("express");
const router = express.Router();
const users = require('./users');
const posts = require('./posts');
const healthcheck = require('./helthcheck');

router.use([
    users,
    posts,
    healthcheck
])

module.exports = router;
