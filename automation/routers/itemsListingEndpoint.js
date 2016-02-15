var assert = require('assert');
var restClient = require('restler');

var serviceUrl = 'http://localhost:8080/inventory/items/';

describe('getItemsEndpoint', function () {
    describe('getItems', function (){
        it('should return items from the inventory database', function (done) {
            var getItemsEndpoint = serviceUrl;
            var options = {
                headers: {
                    authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiY2FsbGVyMiJ9.gnYRSY_57tjFwQ_a-Vt_ge-HUmYTwGwXCinuSjYDd6I'
                }
            };
            return restClient
                .get(getItemsEndpoint, options, {})
                .on('complete', function (data, response) {
                    assert.equal(response.statusCode, 200);
                    assert(data.length > 0);
                    done();
                });
        });

        it('should throw authentication error if the JWT is invalid', function (done) {
            var getItemsEndpoint = serviceUrl;
            var options = {
                headers: {
                    authorization: 'ayJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiY2FsbGVyMiJ9.gnYRSY_57tjFwQ_a-Vt_ge-HUmYTwGwXCinuSjYDd6I'
                }
            };
            return restClient
                .get(getItemsEndpoint, options, {})
                .on('complete', function (data, response) {
                    assert.equal(response.statusCode, 401);
                    done();
                });
        });
    });
});