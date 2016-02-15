var errors = require('./parameterValidationErrors');

module.exports = {
    checkPurchaseItems: function (req) {
        var purchaseItems = req.body;
        if (typeof purchaseItems === 'undefined' || purchaseItems === null ||
            Array.isArray(purchaseItems) == false || purchaseItems.length === 0) {
            throw errors.INVALID_ITEM; //item is invalid
        }
        return purchaseItems; //item is valid
    }

};