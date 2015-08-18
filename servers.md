---
layout: index
title: Servers
weight: 8
permalink: /servers/
---

## Server Architecture
As MREST is a pretty generic extension of REST, there are a number of ways to build a compatible server.

### HTTP server
Pretty self-explanatory. You need to be able to handle HTTP requests for GET, POST, PUT, and DELETE methods. Handlers for these and your server info path need to be implemented, according to the [routes]({{ "/routes" | prepend: site.baseurl }}) section.

### SockJS server (optional)
We recommend [SockJS]({{ "/sockjs" | prepend: site.baseurl }}) for streaming or asyncronous MREST applications. This should be separate from your http server, and you can probably just re-use our official [SockJS MQ](https://bitbucket.org/deginner/sockjs-mq-server) server.

### JSON Schemas
You will have to generate and validate requests using MREST's customized [JSON Schemas]({{ "/data-types" | prepend: site.baseurl }}). JSON schemas are supported by most popular languages, so that shouldn't be a problem.

### Bitcoin signing
As described more in the [Authentication]({{ "/authentication" | prepend: site.baseurl }}) section, MREST uses Bitcoin to sign and verify messages. Your server will need some basic requirements for this process.

+ An ECDSA library with support for the secp256k1 curve
+ SHA-256
+ RIPEMD-160
+ base58 encoding

As base58 in particular is not common, you may wish to find a bitcoin library in the language your server is written in.

## Official Servers

### [Flask MREST](https://bitbucket.org/deginner/flask-mrest)
The official MREST server is built using Python 2.7 and [Flask](http://flask.pocoo.org/).

## Easily Compatible Servers

### Sails.js
The routes used by MREST are modeled after the [Sails.js](http://sailsjs.org) [Blueprint API](http://sailsjs.org/#!/documentation/reference/blueprint-api). If you want to write your server in Node.js, Sails will work with MREST clients out of the box. You will have to do some work porting your json schemas to Sails models, however.

