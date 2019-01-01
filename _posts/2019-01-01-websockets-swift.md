---
layout: post
title: ! "Websockets in iOS using Swift"
categories: [swift, networking]
tags: [websocket, swift, starscream, networking]
---

WebSockets allow extremely fast two-way networking communication, meaning that you can securely send and receive updates quicker and more often. WebSockets is a communication protocol using sockets, providing duplex communication over a single TCP connection. It was standardized by the [IETF](https://tools.ietf.org/html/rfc6455) in 2011 and is a different protocol from HTTP.

Websockets are widely used in chat apps, streaming real time notifications and stock prices.

<!--more-->

## Websocket lifecycle

### Shaking hands with the server

The [handshake](https://tools.ietf.org/html/rfc6455#section-4) app is the Web part in WebSockets. It's the bridge from HTTP to WebSocket. Client sends to the server a pretty standard HTTP GET [request](https://tools.ietf.org/html/rfc6455#section-4.2.1):

```
    GET /chat HTTP/1.1
    Host: example.com:8000
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
    Sec-WebSocket-Version: 1
```

The most interesting thing here is `Sec-WebSocket-Key` which is needed for security reasons and is generated according to the (WebSocket standard)[http://tools.ietf.org/html/rfc6455#page-7].

Server will validate the request and if everything is fine it sends back HTTP [response](https://tools.ietf.org/html/rfc6455#section-4.2.2):

```
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

### Exchange the information

At any time server or client can send data with follows specific format:

![Websocket Frame Format](assets/img/websocket-frame-format.png)

I will not go over each part but you can read it more in the [standard](https://tools.ietf.org/html/rfc6455#section-5.6).

### Pings and pongs

At any point either client of the server can send a [ping](https://tools.ietf.org/html/rfc6455#section-5.5.2) and other party should send back a [pong](https://tools.ietf.org/html/rfc6455#section-5.5.3).

### Closing

Connection can be closed by any party by [sending](https://tools.ietf.org/html/rfc6455#section-5.5.1) a specified control sequence.

# Implementing WebSockets in iOS

Implementing Websockets in iOS, macOS, tvOS or watchOS isn’t a trivial task. New [Network.framework](https://developer.apple.com/documentation/network) can simplify that but you still need to deal underlying tasks like upgrading connection and setting up websocket frame.

## Starscream

Swift websocket client library [Startscream](https://github.com/daltoniam/Starscream) simplifies all the heavy lifting tasks. Install the library and just import it in any Swift file.

```swift
    import Starscream
```

### Creating the connection

After that create a connection and set up the delegate.

```swift
    socket = WebSocket(url: URL(string:”ws:echo.websocket.org”)!)
    socket.delegate = self
```

### Setting up delegation

Then we need to set up delegate methods. Library offers also option to use closures, but in this example we will not cover it.

- websocketDidConnect
- websocketDidDisconnect
- websocketDidReceiveMessage
- websocketDidReceiveData
- websocketDidReceivePong (optional)

Once this is done we can start the connection. Making the handshake and upgrading connection is done behind the scenes by the library.

```swift
    socket.connect();
```

### Sending data

There are several ways to send data:

- binary
- string
- ping
- pong

Easiest way is to just send a string:

```swift
    socket.write(string: "Hi Server!")
```

### Closing the connection

At any point we can check if connection is still open and also close it when it’s not needed anymore.

```swift
    if socket.isConnected {
        	socket.disconnect()
    }
```

# TL;DR

WebSockets isn’t a first class citizen in iOS, macOS, tvOS and watchOS. It can be quite overwhelming to implement, use and understand it. But using Swift library Starscream it can take care of all the tasks.


# Links

- [The WebSocket Protocol](The WebSocket Protocol)
- [Writing WebSocket servers](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)
- [Starscream Swift WebSocket library](https://github.com/daltoniam/Starscream)
- [Websocket Frame implementation in Swift](https://github.com/ZewoGraveyard/WebSocket/blob/master/Sources/WebSocket/Frame.swift)
- [WebSockets 101](http://lucumr.pocoo.org/2012/9/24/websockets-101/)
- [WebSocket Security](https://devcenter.heroku.com/articles/websocket-security)
