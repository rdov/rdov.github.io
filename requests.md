---
layout: index
title: Requests
weight: 3
---

## HTTP Requests
MREST requests should always be made using HTTP, using the [routes]({{ "/routes" | prepend: site.baseurl }}) defined by the server's [schemas]({{ "/data-types" | prepend: site.baseurl }}).

When creating new items using POST, the item should pass validation against the corresponding json schema.

## Headers
MREST defines a variable number of custom HTTP headers. These come in sets of 3, and each set describes a single signature of the message content.

| Header          | type                     | Description                                 |
|-----------------|--------------------------|---------------------------------------------|
| x-mrest-time    | string of unix timestamp | The timestamp used to sign the message.     |
| x-mrest-pubhash | bitcoin address          | The bitcoin address of the signer.          |
| x-mrest-sign    | string                   | The signature.                              |

Example:

```
x-mrest-time:	1439854057.62
x-mrest-pubhash:	1GnsHrVdB4khKzHbiRyYfrrn5E9MHutyCQ
x-mrest-sign:	IHqn5RXd8R79Fp9r9Dm9n5DdEZmG0FbbcIqFE9BmvyntXdI6YWZtyc6eIj/FV4SBqYXAYDR47tHU9LU5XSN4lao=
```

Additional signers can be included by adding additional headers with a dash and an ascending natural number appended to the end. ('-1', '-2'...)

The table below assumes there are n+1 signers total. Note that the first signer does not get a number, after which the counting starts at 1. Therefore the last signer will get a number 1 less than the total number of signers.

| Header          | type                     | Description                                 |
|-----------------|--------------------------|---------------------------------------------|
| x-mrest-time-n    | string of unix timestamp | The timestamp used to by the n-1 signer.     |
| x-mrest-pubhash-n | bitcoin address          | The bitcoin address of the n-1 signer.          |
| x-mrest-sign-n    | string                   | The n-1 signature.                       |


Example with 3 signers:

```
x-mrest-time:	1439854057.62
x-mrest-pubhash:	1GnsHrVdB4khKzHbiRyYfrrn5E9MHutyCQ
x-mrest-sign:	IHqn5RXd8R79Fp9r9Dm9n5DdEZmG0FbbcIqFE9BmvyntXdI6YWZtyc6eIj/FV4SBqYXAYDR47tHU9LU5XSN4lao=
x-mrest-time-1:	1439859662.23
x-mrest-pubhash-1:	1PgoZyPFTU5V93ePvTGsxXMvHvyuXobvLi
x-mrest-sign-1:	IGntQ1a163+gwcd4j8qQxGh3z/x77V5zPAu13pKVKypDWjEJdgfSEFRIEBt8KF/+qs9mngIcbnHfH2YEiQyUjNI=
x-mrest-time-2:	1439859682.83
x-mrest-pubhash-2:	17MVsM6HyY4FMAyoSo55Ae9t13pajfnuX2
x-mrest-sign-2:	HyXWaS8og3GIgmyS9wCThxr87UAQGP+XC+SVAF9T9LBmHJqcqPah5w/0oS7ISYJLoG8bxC0FavyGWby5W5O/r00=
```
