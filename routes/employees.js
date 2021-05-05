const express = require('express')
const router = express.Router()

const controller = require('../controllers/employees')
const auth = require('../middleware/auth')
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime-types');






router.post('/add', controller.add);

router.get('/list', controller.list);


router.patch('/update/:id', controller.update);

router.patch('/remove/:id', controller.remove);

module.exports = router