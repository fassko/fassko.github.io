---
layout: post
title: ! "Websockets in iOS using Swift"
categories: [swift, networking]
tags: [websocket, swift, starscream, networking]
---

WebSockets allow for extremely fast two-way networking communication, which lets you send and receive updates quicker and more often, not to mention securely. WebSocket is a communication protocol that uses sockets, providing duplex communication over a single TCP connection. It was standardized by the [IETF](https://tools.ietf.org/html/rfc6455) in 2011 and is a different protocol from HTTP.

WebSockets are widely used in chat apps, streaming real-time notifications, and stock prices.

<!--more-->

## Websocket lifecycle

### Shaking hands with the server

The [handshake](https://tools.ietf.org/html/rfc6455#section-4) app is the web part in WebSockets. It's the bridge from HTTP to WebSocket. The client sends a pretty standard HTTP GET [request](https://tools.ietf.org/html/rfc6455#section-4.2.1) to the server:

```
    GET /chat HTTP/1.1
    Host: example.com:8000
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
    Sec-WebSocket-Version: 1
```

The most interesting thing here is `Sec-WebSocket-Key` which is needed for security reasons and is generated according to the (WebSocket standard)[http://tools.ietf.org/html/rfc6455#page-7].

The server validates the request and, if everything is fine, sends back an HTTP [response](https://tools.ietf.org/html/rfc6455#section-4.2.2):

```
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

### Exchange the information

At any time, the server or client can send data that follows this specific format:

![Websocket Frame Format](/assets/img/websocket-frame-format.png)

I will not go over each part, but you can find out more in the [standard](https://tools.ietf.org/html/rfc6455#section-5.6).

### Pings and pongs

At any point, the client or server can send a [ping](https://tools.ietf.org/html/rfc6455#section-5.5.2), and other party must send back a [pong](https://tools.ietf.org/html/rfc6455#section-5.5.3).

### Closing

Connection can be closed by any party via sending a [specified control sequence](https://tools.ietf.org/html/rfc6455#section-5.5.1).

## Implementing WebSockets in iOS

Implementing WebSockets in iOS, macOS, tvOS or watchOS isn’t a trivial task. New [Network.framework](https://developer.apple.com/documentation/network) can simplify that but you still need to deal with underlying tasks like upgrading connection and setting up a WebSocket frame.

### Starscream

The Swift WebSocket client library [Startscream](https://github.com/daltoniam/Starscream) simplifies all the heavy-lifting tasks. Install the library and import it in any Swift file.

```swift
    import Starscream
```

### Creating the connection

After that, create a connection and set up the delegate.

```swift
    socket = WebSocket(url: URL(string:”ws:echo.websocket.org”)!)
    socket.delegate = self
```

### Setting up delegation

Then we need to set up delegate methods. Starscream also provides an option to use closures, but I will not be covering it here.

- websocketDidConnect
- websocketDidDisconnect
- websocketDidReceiveMessage
- websocketDidReceiveData
- websocketDidReceivePong (optional)

Once this is done, we can start the connection. Making the handshake and upgrading connection is done behind the scenes by the library.

```swift
    socket.connect();
```

### Sending data

There are several ways to send data:

- binary
- string
- ping
- pong

The easiest way is to just send a string:

```swift
    socket.write(string: "Hi Server!")
```

### Closing the connection

At any point, we can check whether the connection is still open, and close it if it’s not needed anymore.

```swift
    if socket.isConnected {
        	socket.disconnect()
    }
```

## TL;DR

WebSocket isn’t a first-class citizen in iOS, macOS, tvOS and watchOS. It can be quite overwhelming to implement, use and understand it, but the Swift library Starscream can help you take care of all these tasks.


## Links

- [The WebSocket Protocol](https://tools.ietf.org/html/rfc6455)
- [Writing WebSocket servers](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)
- [Starscream Swift WebSocket library](https://github.com/daltoniam/Starscream)
- [Websocket Frame implementation in Swift](https://github.com/ZewoGraveyard/WebSocket/blob/master/Sources/WebSocket/Frame.swift)
- [WebSockets 101](http://lucumr.pocoo.org/2012/9/24/websockets-101/)
- [WebSocket Security](https://devcenter.heroku.com/articles/websocket-security)
