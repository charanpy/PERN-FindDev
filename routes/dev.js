const express = require('express');
const { getDev, addDev, search, deleteDev } = require('../controllers/dev');

const router = express.Router();

router.route('/').get(getDev).post(addDev);

router.route('/search').get(search);

router.route('/:devId').delete(deleteDev);

module.exports = router;
