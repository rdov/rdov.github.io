---
layout: post
title: Routes
weight: 2
permalink: /routes/
highlight: true
---

## Server Info Route (/)
Only one static route is defined for MREST: the root path '/'. This is for providing clients information they need to self-configure for a given server. By GETing this route, a client learns what models the server supports, and how it can go about registering and making requests against them.

The response is json encoded object with four attributes: name, schemas, keyring, and user_model. Using these, a client should be able to configure itself for further communication with the server.

| Attribute | Description                                     |
|-----------|----------------------------------------------------------|
| name      | The server's name as a string. For information only.     |
| schemas   | The [json schemas]({{ "/data-types/#json-schemas" | prepend: site.baseurl }}) this server supports.   |
| keyring   | The list of bitcoin keys this server signs responses with. (Not all will be used for a given response)  |
| user_model | The name of the model the server uses for registration and authentication. |

For example, lets look at the info for the example server. Note that the example "coin" and [default user]({{ "/accounts/#default-user-schema" | prepend: site.baseurl }}) schemas are included.

{% highlight json %}
{
  "keyring": [
    "1F26pNMrywyZJdr22jErtKcjF8R3Ttt55G"
  ], 
  "name": "Coin collection", 
  "schemas": {
    "coin": {
      "$schema": "http://json-schema.org/draft-04/schema#", 
      "description": "model for coin", 
      "properties": {
        "metal": {
          "maxLength": 255, 
          "type": "string"
        }, 
        "mint": {
          "maxLength": 255, 
          "type": "string"
        }
      },
      "required": [
        "metal", 
        "mint"
      ], 
      "routes": {
        "/": {
          "GET": [], 
          "POST": [
            "authenticate"
          ]
        }, 
        "/:id": {
          "DELETE": [
            "authenticate"
          ], 
          "GET": [], 
          "PUT": [
            "authenticate"
          ]
        }
      }, 
      "title": "CoinSA", 
      "type": "object"
    }, 
    "user": {
      "$schema": "http://json-schema.org/draft-04/schema#", 
      "description": "model for an api user or item user", 
      "properties": {
        "id": {
          "description": "primary key", 
          "maxLength": 36, 
          "type": "string"
        }
      }, 
      "required": [
        "id"
      ], 
      "routes": {
        "/": {
          "POST": [
            "pubhash"
          ]
        }, 
        "/:id": {
          "GET": [
            "authenticate"
          ]
        }
      }, 
      "title": "UserSA", 
      "type": "object"
    }
  }, 
  "user_model": "user"
}
{% endhighlight %}


## Model Routes
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

## Route Permissions
Each json schema should have a 'routes' attribute. This defines the routes available for the model, and which authentication rules apply for each route. The "/" and "/:id" subsets indicate whether the restriction applies to the /:model/ route or to the /:model/:id route.

| Permission   |  Description                                                         |
|--------------|----------------------------------------------------------------------|
| null         | An empty array in the routes indicates no restrictions on the route. Public access. |
| authenticate | Require the client to [sign]({{ "/authentication.html#signing" | prepend: site.baseurl }}) the message.                              |
| pubhash      | Require the client to include its [pubhash header]({{ "/requests/#headers" | prepend: site.baseurl }}).             |


In the following example, from the [default user schema]({{ "/accounts/#default-user-schema" | prepend: site.baseurl }}), the POST /:model route requires the client to include only the pubhash header, while the GET /:model/:id route requires the client to fully sign the message. No other routes are allowed.

{% highlight json %}
      "routes": {
        "/": {
          "POST": [
            "pubhash"
          ]
        }, 
        "/:id": {
          "GET": [
            "authenticate"
          ]
        }
      }
{% endhighlight %}
