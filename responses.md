---
layout: index
title: Responses
weight: 4
permalink: /responses/
---

## Summary
MREST servers are often asyncronous and may not respond with an object right away. They should respond with valid HTTP status codes indicating the success or failure of a call.


## HTTP Responses
These could be raw if the server never uses authentication, but more likely will be in the [signed]({{ "/data-types" | prepend: site.baseurl }}) message format.

The headers for the signature will be the same as requests, but signed with method 'RESPONSE'.

## SockJS Responses
Optional, but particularly useful for asyncronous servers, responses can be sent via SockJS. When using SockJS, the messages will be sent using the compact message format.
