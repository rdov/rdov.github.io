---
layout: index
title: Routes
weight: 2
permalink: /routes/
---

## REST
In this REST API, the basic [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations are available via the various HTTP methods. In all cases, data should be sent as JSON in the request body, and the response will follow the same pattern.


| Method | Action  | Description                                     |
|--------|---------|-------------------------------------------------|
| POST   | Create  | Create new items with the supplied arguments.   |
| GET    | Read    | Search and find data.                           |
| PUT    | Update  | Update an item with the supplied arguments.     |
| DELETE | Delete  | Delete the specified item.                      |


For example, using our Node.js client and example server, you could create a new Coin item with a POST:


```
var coin;

mrest.post('coin', {'metal':'PB','mint':'perhaps my basement?'}, function(err, resp) {
  coin = resp;
});

```

Then get the Coin you just created:

`
mrest.get('coin', coin.id, function(err, resp) {});
`

Update the Coin to have a new mint:

`
mrest.put('coin', coin.id, {'metal':'PB', 'mint': 'pirate booty'}, function(err, resp) {});
`


Delete the Coin:

`
mrest.delete('coin', coin.id, function(err, resp) {});
`
 
### Model Routes
Each model can have routes generated for it. Depending on the implementation, some of these may be restricted altogether or based on permissions. This is denoted by the routes attribute of the json schema. Standard routes are:


| Method | Path           | Description                                      |
|--------|----------------|--------------------------------------------------|
| POST   | /:model        | Create one or more items for the model specified.|
| POST   | /:model/:id    | Create an item by id for the model specified.    |
| GET    | /:model        | Get a list or search.                            |
| GET    | /:model/:id    | Get an individual item.                          |
| PUT    | /:model        | Update items in bulk.                            |
| PUT    | /:model/:id    | Update an item with the supplied arguments.      |
| DELETE | /:model        | Delete items in bulk.                            |
| DELETE | /:model/:id    | Delete the specified item.                       |

The MREST clients have special get, put, post, and delete methods with corresponding arguments for id and data if expected.
