---
layout: index
title: Server Info Route
weight: 2.5
permalink: /routes/info/
---

## Server Info Route (/)
Only one static route is defined for MREST: the root path '/'. This is for providing clients information they need to self-configure for a given server. By GETing this route, a client learns what models the server supports, and how it can go about registering and making requests against them.

The response is json encoded object with four attributes: name, schemas, keyring, and user_model. Using these, a client should be able to configure itself for further communication with the server.

| Attribute | Description                                     |
|-----------|----------------------------------------------------------|
| name      | The server's name as a string. For information only.     |
| schemas   | The [json schemas]({{ "/data-types" | prepend: site.baseurl }}) this server supports.   |
| keyring   | The list of bitcoin keys this server signs responses with. (Not all will be used for a given response)  |
| user_model | The name of the model the server uses for registration and authentication. |

For example, lets look at the info for the example server. Note that the example "coin" and default [account]({{ "/accounts" | prepend: site.baseurl }}) "User" schemas are included.

```
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
```