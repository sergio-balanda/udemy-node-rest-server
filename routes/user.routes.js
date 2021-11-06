const { Router } = require('express');
const { get, deleteUser, post, put } = require('../controllers/user.controller');

const router = Router()

router.get("/", get);

router.post("/", post);

router.put("/:id", put);

router.delete("/", deleteUser);

module.exports = router