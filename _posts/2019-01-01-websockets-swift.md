---
layout: post
title: ! "Websockets in iOS using Swift"
---

Websockets allow extremely fast two-way networking communication, meaning that you can securely send and receive updates quicker and more often. Websockets is a communication protocol using sockets, providing duplex communication over a single TCP connection. It was standardized by the (IETF)[https://tools.ietf.org/html/rfc6455] in 2011 and is a different protocol from HTTP.

Websockets are widely used in chat apps like Slack, real time notifications, streaming stock prices and more.

<!--more-->

# Websocket lifecycle

## Handshake

THe handshake is the Web part in WebSockets. It's the bridge from HTTP to WebSocket. Client sends to the server a pretty standard HTTP Get request:

```
    GET /chat HTTP/1.1
    Host: example.com:8000
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
    Sec-WebSocket-Version: 1
```

The most interesting thing here is `Sec-WebSocket-Key` which is needed for security reasons and is generated according to the [WebSocket standard\(http://tools.ietf.org/html/rfc6455#page-7).

Server will validate the request and if everything is fine it sends back HTTP response.

```    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

