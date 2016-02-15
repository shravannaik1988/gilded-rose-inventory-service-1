var express = require('express');
var bodyParser = require('body-parser');
var inventoryRouter = require('./routers/inventoryRouter');

var INVENTORY_ENDPOINT = '/inventory';
var PORT = 8080;

var app = express();
app.use(bodyParser.json());
app.use(INVENTORY_ENDPOINT, inventoryRouter);

app.listen(PORT, function () {
    console.log('Server started and running on port:' + PORT)
});
