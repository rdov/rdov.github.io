---
layout: index
title: Data Types
weight: 1
permalink: /data-types/
---

## JSON Schemas
MREST uses JSON schemas to define models, routes, permissions, and signing keys.

The schemas each contain two custom attributes: routes and signers.

| Attribute       |  Description                                           |
|-----------------|--------------------------------------------------------|
| routes          | An object showing routes and permissions for the model. See 'Routes & Permissions' subsection.|
| signers         | Specific signers which are required for authenticating an item. (optional) |

### Example Schema
For example, lets say you wanted to build an API to manage a collection of coins. Each coin has two required properties: metal & mint. This model can be represented as the following json schema:

```
{
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
}
```

This schema would be given a name (i.e. 'coin') and distributed to both the MREST server and clients. Both would know that any time they are sending or receiving a coin, they should validate it against the schema. The custom attributes routes and signers indicate which routes and authentication the client should expect for the model.

### Routes & Permissions
These indicate the authentication rules for the model's routes. The "/" and "/:id" subsets indicate whether the restriction applies to the /:model/ route or to the /:model/:id route.

### Signers
One or more [authentication signatures]({{ "/authentication" | prepend: site.baseurl }}) will be included in MREST requests for authenticated routes. When specific signers are included in the schema for a model, the client will check each incoming item for signatures by each of those upon receipt. This comes in useful for multi-tier architectures where many backend servers work together to satisfy a request.

## MREST Messages
Raw MREST messages are any json that satisfies one of the json schemas. For the example schema above, the following would be a valid raw MREST message:

```
{"mint": "Perth", "metal": "AU"}
```

### Signed Format
To ensure consistent inputs for hashing, signed messages are base64 encoded then wrapped in another JSON object before sending.

1. Base64 encode the raw (json encoded) message.
2. Create a json object with one attribute "data" whose value is the output of step 1.

The base64 encoded message is used to construct the sign string during [authentication]({{ "/authentication" | prepend: site.baseurl }}).

For the example raw message above, the signed message body would look like this:

```
{"data": "eyJtaW50IjogIlBlcnRoIiwgIm1ldGFsIjogIkFVIn0="}
```

The norm is to send headers separate from the message body. This is the format used by the official HTTP clients.

### Compact Signed Format
The compact MREST message format includes the headers in the message body. This format can be used where custom headers are not supported or easily available, such as for AMQP or the official SockJS server.

```
{"headers": {"x-mrest-time": "1439854057.62", "x-mrest-pubhash": "1GnsHrVdB4khKzHbiRyYfrrn5E9MHutyCQ", "x-mrest-sign": "IHqn5RXd8R79Fp9r9Dm9n5DdEZmG0FbbcIqFE9BmvyntXdI6YWZtyc6eIj/FV4SBqYXAYDR47tHU9LU5XSN4lao="}, "data": "eyJtaW50IjogIlBlcnRoIiwgIm1ldGFsIjogIkFVIn0=", "method": "POST"}
```