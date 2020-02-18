---
layout: post
title: ! "Clearing up after subscribing to Swift WeabSockets"
categories: [websockets, swift]
tags: [websockets, apple, ios, apollo]
---

Opening and keeping WebSocket connection alive isn't enough when dealing with it. The connection need to be closed either from user or sever side. That is [mentioned](https://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76#section-6) in the WebSocket protocol.

Previously we have looked into how to use WebSockets using [Starscream library](/websockets-swift/), [URLSessionWebSocketTask](/websockets-ios-13-swift/) and [GraphQL](https://kristaps.me/graphql-subscriptions/) in Swift. This time we will look into how to clean the connection.

If you don’t close the connection and clean up then various problems can arise like memory leaks, server overwork and data corruptions.



* why need to clear websocket subscription
    * Clean up after yourself
    * Don’t overwork the server
    * What is close code?
* clear subscriptions with URLSessionWebSocketTask
    * https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/3181200-cancel
    * Close code type
* Clear subscription with Starscream
* clear subscriptions with GraphQL
    * https://www.apollographql.com/docs/ios/subscriptions/

<!--more-->

# Closing the WebSocket

As we are looking into how to close connection from user agent there are couple of things to consider. When closing the connection it needs to inform server about the reason using close code which can be useful for developers. There are several close codes which you can check out in [RFC 6455](https://tools.ietf.org/html/rfc6455#section-7.4.1) specification or in human language [here](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent).

If anything goes wrong with the connection on user side connection should be closed. Importantly to note is that when user agent notices that server has closed its connection, user should do the same on the other side. That is clearly [stated](https://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76#section-6.3) in the official WebSocket protocol. Now let’s see how we can do it in your Swift apps.

# Cancel the URLSessionWebSocketTask

To cancel a `URLSessionWebSocketTask` you just need to call a `cancel` [method](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/3181200-cancel).

When calling this instance method you need to provide a [close code](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/closecode) and reason. Close code is from the WebSocket standard and reason is just more detailed information explaining the problem.

```swift

let url = URL(string: "wss://echo.websocket.org")!
let webSocketTask = URLSession.shared.webSocketTask(with: url)

// ...

webSocketTask.cancel(with: .goingAway, reason: nil)

```

# Disconnect with Starscream

To close a WebSocket created with library [Starscream](https://github.com/daltoniam/Starscream) you need to call a `disconnect` method. Close code here is optional if you want to specify it.

```swift

let socket = WebSocket(url: URL(string: "ws://localhost:8080/")!)

// ...

socket.disconnect(closeCode: CloseCode.normal.rawValue)

```


# Clear subscriptions with GraphQL



## TL;DR



## Links

* [Closing the connection from WebSocket protocol](https://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76#section-6)
* [Cancel URLSessionWebSocketTask](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/3181200-cancel)
* [GraphQL subscriptions](https://www.apollographql.com/docs/ios/subscriptions/)
