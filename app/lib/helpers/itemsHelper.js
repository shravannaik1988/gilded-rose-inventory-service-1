function getItems() {
    return require('../database/items');
}

function prepareOrder(purchaseItems) {
    return Math.floor((Math.random() * 10) + 1);
}

function purchaseOrder(purchaseItemIds) {
    var purchaseId = prepareOrder(purchaseItemIds);

    var purchaseOrderResponse = {};
    purchaseOrderResponse.PurchaseId = purchaseId;
    purchaseOrderResponse.Status = 'PROCESSING';
    purchaseOrderResponse.DatePurchased = new Date();
    purchaseOrderResponse.Name = 'Some Name';
    purchaseOrderResponse.Price = 123
    purchaseOrderResponse.ProductIds = purchaseItemIds;

    return purchaseOrderResponse;
}

module.exports = {
    getItems: getItems,
    purchaseOrder: purchaseOrder
}