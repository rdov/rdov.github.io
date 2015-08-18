---
layout: index
title: Accounts
weight: 6
permalink: /accounts/
---

## Summary
MREST applications often have user accounts, and require [authentication]({{ "/authentication" | prepend: site.baseurl }}) for restricted resources. While this isn't required in all situations, there are some best practices to follow if you choose to make use of accounts.

## Default User Schema
The official [Flask MREST](https://bitbucket.org/deginner/flask-mrest) server comes with a default User schema, which is used in the example app. This default User is the simplest example of how an MREST user model could be structured.

Add more attributes as your needs fit, but always consider interoperability. Clients will not necessarily understand additional property requirements. Consider using additional objects owned by the user.

```
    {
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
```

## Registration
To register for a server, call POST to the 'user_model' specified in the server info. Typically, this will require your client's bitcoin address in the request header.

From the [Python MREST client](https://bitbucket.org/deginner/mrest-client-python/src/182861222e36281474686d4caace29fbb2e81043/mrest_client/client.py?at=master#client.py-102).

`self.post('user', {"id": self.pubhash})`

## Server Discovery
By visiting the [Info route]({{ "/routes" | prepend: site.baseurl }}) on any MREST server, a client can learn all it needs to know to use that server. In this way, a client could utilize many servers with different schemas and purposes throughout its lifecycle.

### Steps
A client should follow the same steps each time it discovers a server it wishes to use.

1. Visit the server's / route to learn about the server privacy, authentication, registration, and other policies.
2. Load the server's routes and permissions into the client for request formatting.
3. Load the server's public keyring, if you trust it.
4. Load the json schemas.
5. Register by creating an instance (POST) of the user model supplying your client's bitcoin public key in the request header.
6. Cache the schemas, keyring, routes, url, and other configuration info for next time

The above steps can be completed manually by simply providing them in the configuration argument to your client constructor. This should be done for dedicated or highly sensitive clients. In the case where [mulptiple signers](https://bitbucket.org/deginner/flask-mrest/wiki/Authentication) are used, all of the keys should be cached in your keyring and passed in at client initialization.

### Rediscovery
After the initial discovery, the cached configuration should be checked on client initialization. If any of the important data, particularly the server's signing key have changed, an exception should be raised.

### Use case
Lets say there is an application named Happy. Happy lives in a Lamassu BTM, and has access to an MREST client. Every day people walk up to Happy's machine and he helps them find and buy goods and services from MREST servers.

Every night Happy checks the MREST forums and registries to see if any new MREST servers are available. When a new one is discovered, Happy calls their / route, and compares their schemas with his needs. Do they have a catalog of items for sale? Do they accept Bitcoin payments in his programmed checkout process? If so, Happy begins communicating with the server, requesting their catalog, entering orders for users, etc..

After some time, Happy notices that lots of users are searching for a particular item that he does not have in his catalog. Something called a "Jimmy Choo". Happy has no idea what this Jimmy Choo thing is, but clearly users want it!

Some months later, Happy discovers a new store in his nightly update: choo247.com. When he gets their schemas, he sees that they have a catalog. Sure enough, they have a number items in the "shoe" category that match the brand name "Jimmy Choo". Happy knows somes users that will like this, so he promptly adds the items to the catalog and emails the users. The next day, a line of customers show up to buy the latest shoes. His plan succeeded!