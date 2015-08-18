---
layout: index
title: Authentication
weight: 5
---

## Introduction
MREST authentication uses Bitcoin to sign requests and responses. This page details the signing and authentication instructions, which will be required for all [routes]({{ "/sockjs" | prepend: site.baseurl }}) using the 'authenticate' rule.

*All examples on this page are using Python 2.7*

## Signing
Start with a json encoded message, like you would send in the request body of a plain request.

1. Base 64 encode the message.
2. Create a new dict with one key 'data', which has the base64 encoded message as its value. This is the message data to send (remember to json encode one last time).
3. Create SIGNDATA by catenating the base 64 encoded message with the upper case method and signing timestamp. i.e. bWVzc2FnZQ==PUT1434064070
4. Create SIGN using your bitcoin private key and the SIGNDATA
5. Add SIGN to the request header field 'x-mrest-sign'
6. Add the signing timestamp to the request header field 'x-mrest-time'
7. Add your bitcoin address to the request header field 'x-mrest-pubhash'
8. Send your request using the method you specified in step 3.

Example message signing

```
import base64
import json
import time
import unirest
from bitcoin.signmessage import BitcoinMessage, SignMessage
from bitcoin.wallet import CBitcoinAddress, P2PKHBitcoinAddress, CKey

PRIV_KEY = CKey("L4vB5fomsK8L95wQ7GFzvErYGht49JsCPJyJMHpB4xGM6xgi2jvG")
PUB_KEY = P2PKHBitcoinAddress("1F26pNMrywyZJdr22jErtKcjF8R3Ttt55G")

method = 'put'
message = json.dumps({'metal':'AU','mint':'perth'})  # 0
b64message= base64.b64encode(message)  # 1
data = {'data': b64message}  # 2
sendstr = json.dumps(data)  # FYI
sign_time = str(time.time()) # the timestamp as a string, for signing
SIGNDATA = b64message + method.upper() + sign_time  # 3
SIGN = SignMessage(PRIV_KEY, BitcoinMessage(SIGNDATA))
headers = {}
headers['x-mrest-sign'] = SIGN  # 5
headers['x-mrest-time'] = sign_time  # 6
headers['x-mrest-pubhash'] = PUB_KEY  # 7
getattr(unirest, method)("https://test.deginner.com", params=sendstr, headers=headers)  # 8
```

## Authenticating a Message

1. decode the json body of the message, and extract it's 'data' value, if it is in the authentication format
2. Get the SIGN out of the 'x-mrest-sign' header
3. Get the SIGN_TIME out of the 'x-mrest-time' header.
4. Create SIGNDATA using the message, method, and the SIGN_TIME. If authenticating a response, use method 'RESPONSE'.
5. Verify using the server's bitcoin public key to check the signature against the SIGNDATA.

Example message authentication
```
message = json.loads(response.body)['data']  # 1
SIGN = response.headers['x-mrest-sign']  # 2
SIGN_TIME = response.headers['x-mrest-time']  # 3
method = 'RESPONSE'  # 4
VerifyMessage(P2PKHBitcoinAddress(headers['x-mrest-pubhash']),
              BitcoinMessage(create_sign_str(message, method, SIGN_TIME)),
              SIGN)  # 5
```

## Additional Signers
Some models require multiple signatures, as denoted by the "signers" json schema property, which is a list of pem pubhashs, the same as the client generates.

`"signers": ["pubhash0", "pubhash1"]`

This indicates that when receiving an item belonging to this schema, the client should require the item to be signed by the owners of both pubhash0 and pubhash1. Additional signatures can be added to the header by appending '-<x>' to 'x-mrest-sign', 'x-mrest-pubhash' and 'x-mrest-time'.

```
headers = {"x-mrest-sign": "pubhash0 signature",
           "x-mrest-time": "pubhash0 signature time",
           "x-mrest-pubhash": "pubhash0",
           "x-mrest-sign-1": "pubhash1 signature",
           "x-mrest-time-1": "pubhash1 signature time",
           "x-mrest-pubhash-1": "pubhash1",}
```

This is useful for multi-layer architectures where another server sits behind the MREST API server and performs protected activities. This protected server and the client can authenticate messages to each other independent of the intermediary, even while validating that the intermediary is the trusted one they know.

## Alternative Authentication methods
MREST uses Bitcoin signing because it involves clients programming themselves based on server responses. This asyncronous relationship is uniquely suited to asyncronous cryptography, and Bitcoin is commonly available.

If other types of authentication are needed, we recommend using [Kong plugins](http://getkong.org/plugins/). These sit in front of your web server and can provide uniform, front-line authentication using popular methods.
