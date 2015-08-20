---
layout: post
title: Accounts
weight: 6
permalink: /accounts/
highlight: true
---

## Summary
MREST applications often have user accounts, and require [authentication]({{ "/authentication" | prepend: site.baseurl }}) for restricted resources. While this isn't needed in all situations, there are some best practices to follow if you choose to make use of accounts.

## Default User Schema
The official [Flask MREST](https://bitbucket.org/deginner/flask-mrest) server comes with a default User schema, which is used in the example app. This default User is the second simplest example of how an MREST user model could be structured. It has only two properties: username and pubhash.

{% highlight json %}
{
      "$schema": "http://json-schema.org/draft-04/schema#", 
      "description": "model for an api user or item user", 
      "properties": {
        "pubhash": {
          "maxLength": 36, 
          "type": "string"
        }, 
        "username": {
          "maxLength": 36, 
          "type": "string"
        }
      }, 
      "required": [
        "pubhash", 
        "username"
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
  }
{% endhighlight %}

Add more attributes as your needs fit, but always consider interoperability. Clients will not necessarily understand additional property requirements. Consider using additional objects owned by the user.

### Ownership and Authentication
By adding the user public key hash as a foreign key to other models, you can implement ownership and require authentication.

It is up to the application developer to implement specific authentication checks, the standard is to only allow access to 'authenticate' routes if the signer's public key is referenced by the object.

{% highlight python %}
class CoinSA(SABase):
    """model for coin"""
    __tablename__ = "coin"

    id = sa.Column(sa.Integer, primary_key=True, doc="primary key")
    metal = sa.Column(sa.String(255), nullable=False)
    mint = sa.Column(sa.String(255), nullable=False)

    # the owner of the coin. only authenticate if this user has signed.
    user_pubhash = sa.Column(sa.String(120), sa.ForeignKey('user.pubhash'), nullable=False)
    user = orm.relationship("UserSA")
{% endhighlight %}



## Registration
To register for a server, call POST to the 'user_model' specified in the server info. Typically, this will require your client's public key hash, and a username unique to that server. You could use the first bits of your bitcoin address, if you are lazy.

{% highlight python %}
self.post('user', {"pubhash": self.pubhash, "username": self.pubhash[0:8]})
{% endhighlight %}

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

The above steps can be completed manually by simply providing them in the configuration argument to your client constructor. This should be done for dedicated or highly sensitive clients. In the case where [mulptiple signers]({{ "/authentication/#additional-signers" | prepend: site.baseurl }}) are used, all of the keys should be cached in your keyring and passed in at client initialization.

### Rediscovery
After the initial discovery, the cached configuration should be checked on client initialization. If any of the important data, particularly the server's signing key have changed, an exception should be raised.

### Use case
Lets say there is an application named Happy. Happy lives in a Lamassu BTM, and has access to an MREST client. Every day people walk up to Happy's machine and he helps them find and buy goods and services from MREST servers.

Every night Happy checks the MREST forums and registries to see if any new MREST servers are available. When a new one is discovered, Happy calls their / route, and compares their schemas with his needs. Do they have a catalog of items for sale? Do they accept Bitcoin payments in his programmed checkout process? If so, Happy begins communicating with the server, requesting their catalog, entering orders for users, etc..

After some time, Happy notices that lots of users are searching for a particular item that he does not have in his catalog. Something called a "Jimmy Choo". Happy has no idea what this Jimmy Choo thing is, but clearly users want it!

Some months later, Happy discovers a new store in his nightly update: choo247.com. When he gets their schemas, he sees that they have a catalog. Sure enough, they have a number items in the "shoe" category that match the brand name "Jimmy Choo". Happy knows somes users that will like this, so he promptly adds the items to the catalog and emails the users. The next day, a line of customers show up to buy the latest shoes. His plan succeeded!