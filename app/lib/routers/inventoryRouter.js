var express = require('express');
var itemsRouter = require('./itemsRouter');
var router = express.Router();

var ITEMS_ENDPOINT = '/items';

router.use(ITEMS_ENDPOINT, itemsRouter);

module.exports = router;
