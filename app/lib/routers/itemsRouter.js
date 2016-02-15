var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var itemsService = require('../services/itemsService');
var validParam = require('../routers/validation/parameterValidation');
var serviceCallers = require('../security/serviceCallers.json');
var jwt = require('jwt-simple');
var ERRORS = require('../routers/validation/parameterValidationErrors');

var router = express.Router();
router.use(bodyParser.json());

router.get('/', function (req, res) {
    try {
        authorizeCall(req);

        var items = itemsService.getItems();
        res.status(200).send(items).end();
    } catch (e) {
        //should actually use loggers
        console.log(e.internalMessage + ' ' + e.errorStatus);
        res.status(e.code).send(e.userMessage).end();
    }
});

router.post('/purchase', function (req, res) {
    try {
        authorizeCall(req);

        var purchaseDetails = validParam.checkPurchaseItems(req);
        var purchaseResponse = itemsService.purchaseItem(purchaseDetails);
        res.status(200).send(purchaseResponse).end();
    } catch (e) {
        //should actually use loggers
        console.log(e.internalMessage + ' ' + e.status);
        res.status(e.code).send(e).end();
    }
});

function authorizeCall(req) {
    var token = req['headers'].authorization;
    try {
        var decoded = jwt.decode(token, serviceCallers.secret   );
        if (_.indexOf(serviceCallers.serviceComsumers, decoded.name) < 0) {
            throw returnJwtError();
        }
    } catch (e) {
        throw returnJwtError();
    }

}

function returnJwtError() {
    return {
        userMessage: 'Sorry, you are not authorized to call this service.',
        internalMessage: 'Invalid JWT',
        code: 401
    }
}

module.exports = router;
