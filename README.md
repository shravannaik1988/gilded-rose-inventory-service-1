# gilded-rose-inventory-service

> A service to get and purchase items.


## Getting Started

### What is this service for?

> The Gilded Rose service is to help clients to get all the available items in the store and puchase sertain items frmom the store

### getItems

* http://localhost:8080/inventory/items
* method:GET

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
