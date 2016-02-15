# gilded-rose-inventory-service

> A service to get and purchase items in gilded rose store.


## Getting Started

### What is this service for?

> The Gilded Rose service is to help clients to get all the available items in the store and puchase sertain items frmom the store

### getItems 

* URL
  * http://localhost:8080/inventory/items
* Method
  * GET
* Headers
  * Authorization = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiY2FsbGVyMiJ9.gnYRSY_57tjFwQ_a-Vt_ge-HUmYTwGwXCinuSjYDd6I
  * Content-Type = application/json

#####Sample response
```bash
[
  {
    "id": "2",
    "name": "Item1",
    "value": 30,
    "quantity": 5
  },
  {
    "id": "3",
    "name": "Item2",
    "value": 20,
    "quantity": 10
  }
]
```

### puchaseItem

* URL
  * http://localhost:8080/inventory/items/purchase
* Method
  * POST
* Headers
  * Authorization = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiY2FsbGVyMiJ9.gnYRSY_57tjFwQ_a-Vt_ge-HUmYTwGwXCinuSjYDd6I
  * Content-Type = application/json

#####Sample request body
```bash
[
  {
    "id": "123",
    "name": "Item1",
    "value": 30,
    "quantity": 5
  },
  {
    "id": "2434",
    "name": "Item2",
    "value": 20,
    "quantity": 10
  }
]
```
#####Sample response
```bash
{
  "PurchaseId": 5,
  "Status": "PROCESSING",
  "DatePurchased": "2016-02-14T20:56:26.677Z",
  "Name": "Customer Name",
  "Price": 123,
  "ProductIds": [
    "123",
    "2434"
  ]
}
```

## Authentication
* A simple JSON Web Token (JWT) is used to authenticate the callers.
* There is a file under gilded-rose-inventory-service/app/lib/security/serviceCallers.json, this file has list of expected callers and the secret which is used to decode JWT.
```bash
{
  "serviceComsumers": ["caller1", "caller2"],
  "secret": "shhhhhhhh"
}
```
* To generate a JWT, run this file
```bash 
> cd gilded-rose-inventory-service
> ./app/tools/jwtGenerator.js 
```
or use this token
```bash
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiY2FsbGVyMyJ9.DaofgPhwOY0L7zaJ9MJKPdtQ_E1O0Mf3rnjBNez4wnQ
```

## Running this service locally
```bash
> git clone https://github.com/shravansabavat/gilded-rose-inventory-service.git
> cd gilded-rose-inventory-service/app/lib
> npm install
> node webApp.js
```
This would start the serive on port 8080

## Run Automation Tests
```bash
> cd gilded-rose-inventory-service/automation
> npm install
> ./run.sh
```

##Run unit tests
```bash
> cd gilded-rose-inventory-service
> mocha app/test/ --recursive
```

##Run unit tests coverage
```bash
> cd gilded-rose-inventory-service/app
> grunt coverage
```
####Unit test coverage
* Open file locate at gilded-rose-inventory-service/app/coverage/index.html in chrome

![Alt text](test_coverage.png?raw=true "Test Coverage")
