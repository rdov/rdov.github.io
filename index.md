---
layout: index
title: Introduction
weight: 0
---


## MREST (Model Representational State Transfer)

*The fastest and most secure way to build a RESTful MVC application.*

MREST is an application framework for use with heavily structured ("modeled") data. If you are building an API for an MVC application, it can save you a lot of time.

MREST uses the following projects and technologies.

 * [REST](http://www.w3.org/2001/sw/wiki/REST)
 * [JSON Schemas](http://json-schema.org/)
 * [Bitcoin](bitcoin.org)
 * [Flask](http://flask.pocoo.org/)
 * [SockJS](http://sockjs.org)

## Models
The 'M' in MREST stands for model, as it is intended for use in a Model View Controller (MVC) framework. MREST uses json schemas for your models.

### One Schema to Rule Them All

MREST is [schema]({{ "/data-types" | prepend: site.baseurl }}) driven from database to user interface. Your schemas specify everything functional about your application.

*If you can write a JSON schema, you can write an MREST application.* In fact, that is all there is to it. The schemas describe what objects are available in your application, and their permissions. From that, [routes]({{ "/routes" | prepend: site.baseurl }}) will automatically be generated, and [authentication]({{ "/authentication" | prepend: site.baseurl }}) will be enforced according to your rules.

### Self-Programming Clients
Because MREST servers [publish]({{ "/routes" | prepend: site.baseurl }}) their own configuration requirements (i.e. their schemas and keyring), clients can program themselves on the fly. This means you will never have to write a client for an MREST server. The official, generic [MREST clients]({{ "/clients" | prepend: site.baseurl }}) will work perfectly for any situation.

## Secure
By using Bitcoin's ECC key management and message signing, MREST requests can have trustless, financial-grade security, and auditable outcomes.

API keys are generated client-side and only the public key (bitcoin address) is ever sent to the server. The server similarly signs all responses with its own key(s).

Because all requests and responses are cryptographically signed, the signatures are perfect for building auditable hash trees.

## Open Source
MREST components are all available via the [MIT](http://opensource.org/licenses/MIT) open source license. Most of the inherited modules are under MIT or very similar BSD licenses.
