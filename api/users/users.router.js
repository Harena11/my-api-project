const express = require('express');
const UsersController = require('./users.controller');
const router = express.Router();

router.get('/', UsersController.getAll);
router.get('/:id', UsersController.getById);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);
module.exports = router;