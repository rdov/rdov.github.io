---
layout: index
title: Kong
weight: 12
permalink: /kong/
---

## What is Kong?
[Kong](http://getkong.org/) is

> The open-source management layer for APIs,
> delivering high performance and reliability.

In other words, it is [nginx](http://wiki.nginx.org/Main) tailored for APIs.

## Why should I use Kong with my MREST server?
Kong can perform a variety of front-line duties for your server, such as rate limiting, caching, logging, and load balancing. If you plan to run an enterprise API with lots of active users, these issues are likely to require attention. If you are using MREST to power a dedicated client application or small website, Kong is probably overkill.

## What is Mashape?
Kong is maintained by [Mashape](https://www.mashape.com), the same as the [Unirest](http://unirest.io) dependency. Mashape lets you document and publish your API, effectively sindicating it as a service. They will even help you charge your users, if that is your plan.

## JSON Configuration
Kong, and to a limited extent Mashape, support JSON configuration. As you can read in the installation section below, Kong has a JSON controlled admin API.

In the case of Mashape, they allow you to import [Swagger 1.2](https://github.com/swagger-api/swagger-spec/blob/master/versions/1.2.md) API documents. This is an extension of the [json schema](http://json-schema.org/implementations.html).

A goal of the MREST project is to unify these configuration and documentation processes with your master json schema.

## How do I install Kong?
As of this writing, Kong was only recently open sourced, and its database dependency Cassandra has bad documentation.

### Install Cassandra
Cassandra is a Java database that is required by Kong. The installation
instructions I found on google were really bad so I documented my
experience installing it on Ubuntu 14.04 x64.


Check that you have Java > 1.7 available. OpenJDK is fine.

`$ java -version`


Now cd to the directory you wish to install cassandra in. Download and extract the cassandra package.

```
$ wget http://apache.cs.utah.edu/cassandra/2.0.15/apache-cassandra-2.0.15-bin.tar.gz
$ tar -xf apache-cassandra-2.0.15-bin.tar.gz
```


Export the newly extracted apache-cassandra* directory as your CASSANDRA_HOME. Append the bin directory to your PATH, and then add both lines to your ~/.bashrc file, if you wish.

```
$ export CASSANDRA_HOME=~/data/programs/cassandra/apache-cassandra-2.0.15
$ export PATH=$PATH:$CASSANDRA_HOME/bin
```


Now set up the directories cassandra will use. These may require sudo, though I believe you can arrange it so cassandra has any user. For production use, a dedicated user should be created.

```
mkdir /var/lib/cassandra
mkdir /var/log/cassandra
chown -R $USER:$GROUP /var/lib/cassandra
chown -R $USER:$GROUP /var/log/cassandra`
```


Finally, run cassandra.

`sh $CASSANDRA_HOME/bin/cassandra`


### Kong
While Kong's documentation is better, it is still quite new and simple. If you've managed to get Cassandra installed, you can follow the rest of their installation instructions. Here are the Ubuntu ones:

http://getkong.org/download/#ubuntu

The basic functionality we want to access in Kong is registering our server as a [Kong API object](http://getkong.org/docs/0.2.1/admin-api/#api-object). This is done through Kong's [admin API](http://getkong.org/docs/0.2.1/admin-api/). The MREST example API object looks like this:


```
{
    data: [
        {
            public_dns: "example.com",
            id: "6794a166-bd60-422f-c2a2-ced0cf9a857f",
            target_url: "http://0.0.0.0:8002",
            name: "example",
            created_at: 1433358767000
        }
    ]
}
```

I used [Postman](https://www.getpostman.com/) to do the API setup, and it only took a couple of minutes.
