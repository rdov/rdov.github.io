---
layout: post
title: Clients
weight: 7
permalink: /clients/
---

## Client Structure
MREST clients are able to authenticate and communicate with any compatible server. This flexibility requires some up front work. Still, MREST clients are relatively simple, with three main features: HTTP requests, JSON schemas, Bitcoin signing.

### HTTP requests
This is pretty self-explanatory. The client needs to be able to make HTTP requests using the GET, POST, PUT, and DELETE methods. The requests will include custom headers and application/json content.

### JSON Schemas
The data sent on MREST APIs has to fit a [json schema](http://json-schema.org/). Conveniently, there are [json schema tools](http://json-schema.org/implementations.html) written for many popular languages, including validators.

It is the validators that MREST clients make use of. Compatible clients will maintain a json schema validator and provide getters and setters for its schemas. Then it is a matter of running 'validate' on any model item prior to sending a request, or upon receiving a response.

In addition, clients need to read the custom attributes described in the [data-types]([JSON Schemas]({{ "/data-types/#json-schemas" | prepend: site.baseurl }})) section.

### Bitcoin signing
As described more in the [Authentication]({{ "/authentication" | prepend: site.baseurl }}) section, MREST uses Bitcoin to sign and verify messages. Each client will need meet some basic requirements for this process.

+ An ECDSA library with support for the secp256k1 curve
+ SHA-256
+ RIPEMD-160
+ base58 encoding

As base58 in particular is not common, developers may wish to find a bitcoin library in the client language.

## Official Clients
+ [Python](https://bitbucket.org/deginner/mrest-client-python)
+ [Javascript](https://bitbucket.org/deginner/mrest-client-nodejs)
