var _ = require('lodash');
var itemsHelper = require('../helpers/itemsHelper');
var ERRORS = require('../routers/validation/parameterValidationErrors')


/**
 * Get the items from database (just a properties file in this case), and apply the business logic (if there is any)
 * As an example I have just added logic to return items whose quantity > 0
 *
 * @returns {*}
 */
function getItems() {
    var items;

    try {
        items = itemsHelper.getItems();
        if (typeof items !== 'undefined' && items != null && items.length > 0) {
            items = _.filter(items, function(item) {
                return item['quantity'] > 0;
            });
        } else {
            items = [];
        }
    } catch (e) {
        throw getItemsErrorObject(ERRORS.GET_ITEMS_USER_MESSAGE, e, 400, ERRORS.ITEMS_RETRIEVAL_ERROR);
    }

    return items;
}

/**
 *
 *
 * @param purchaseDetails : array of items as part of the purchase.
 * For example: [
                 {
                   "id": "2",
                   "name": "",
                   "description": "",
                   "value": "",
                   "quantity": 1
                 },
                 {
                   "id": "3",
                   "name": "4",
                   "description": "",
                   "value": "",
                   "quantity": 1
                 }
                ]
 *
 * returns purchaseOrderResponse: {
                                      "PurchaseId": 5,
                                      "Status": "PROCESSING",
                                      "DatePurchased": "2016-02-14T20:56:26.677Z",
                                      "Name": "Some Name",
                                      "Price": 123,
                                      "ProductIds": [
                                        "2",
                                        "3"
                                      ]
                                    }
 */
function purchaseItem(purchaseDetails) {
    try {
        arePurchaseItemsAvailabile(purchaseDetails);
        var purchaseItemsIds = getIds(purchaseDetails);
        var purchaseOrderResponse = itemsHelper.purchaseOrder(purchaseItemsIds);
        return purchaseOrderResponse;
    } catch(e) {
        if (e.status === ERRORS.ITEMS_RETRIEVAL_ERROR) {
            throw getItemsErrorObject(ERRORS.ITEMS_RETRIEVAL_ERROR_USER_MESSAGE, e, 400, ERRORS.ITEMS_RETRIEVAL_ERROR);
        } else if (e.status === ERRORS.ITEMS_UNAVAILABLE_ERROR) {
            throw getItemsErrorObject(ERRORS.ITEMS_UNAVAILABLE_USER_MESSAGE, e, 400, ERRORS.ITEMS_UNAVAILABLE_ERROR);
        } else {
            throw e;
        }
    }
}

/**
 * checks if the items in the purchase are available in the database.
 * or else throws items unavailable in the database error.
 *
 * @param listOfPurchaseItems
 */
function arePurchaseItemsAvailabile(listOfPurchaseItems) {
    var items = itemsHelper.getItems();
    if (typeof items === 'undefined' || Object.keys(items).length === 0) {
        throw 'No items available in the store to purchase'
    }

    var purchaseItemsIds = getIds(listOfPurchaseItems);
    var availableItemIds = getIds(items);

    var foundIds = _.intersection(availableItemIds, purchaseItemsIds);

    if (foundIds.length !== purchaseItemsIds.length) {
        var nonAvaiableIds = _.difference(purchaseItemsIds, foundIds);
        var unAvailableItems = getUnavailableErrorResponse(listOfPurchaseItems, nonAvaiableIds);
        throw {
            status: ERRORS.ITEMS_UNAVAILABLE_ERROR,
            items: unAvailableItems
        };
    }

}

function getUnavailableErrorResponse(listOfPurchaseItems, nonAvaiableIds) {
    var items = [];
    listOfPurchaseItems.forEach(function (item) {
        if (_.indexOf(nonAvaiableIds, item.id) >= 0) {
            items.push(item);
        }
    });

    return items;
}

function getIds(items) {
    var ids = [];
    items.forEach(function (item) {
        ids.push(item.id);
    });

    return ids;
}

function getItemsErrorObject(userMessage, error, statusCode, errorStatus) {
    return {
        'userMessage': userMessage,
        'internalMessage': error,
        'code': statusCode,
        'status' : errorStatus
    }
}


module.exports = {
    getItems: getItems,
    purchaseItem: purchaseItem,
    arePurchaseItemsAvailabile: arePurchaseItemsAvailabile
}