---
layout: post
title: ! "Clearing up after subscribing to Swift WeabSockets"
categories: [websockets, swift]
tags: [websockets, apple, ios, apollo]
---

Opening and keeping a WebSocket connection alive isn't enough when dealing with it. The connection need to be closed either from user or sever side. That is [mentioned](https://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76#section-6) in the official WebSocket protocol.

Previously we have looked into how to implement WebSockets using [Starscream library](/websockets-swift/), [URLSessionWebSocketTask](/websockets-ios-13-swift/) and [GraphQL](https://kristaps.me/graphql-subscriptions/) in Swift projects. This time we will look into how to clean up the connection after you don’t need it anymore.

If you don’t close the connection and clean up properly then various problems can arise like memory leaks, server overworking and data corruptions.

<!--more-->

# Closing the WebSocket

As we are looking into how to close connection from user agent there are couple of things to consider. When closing the connection we need to inform server about the reason using close code which can be useful for server developers. There are several close codes which you can check out in [RFC 6455](https://tools.ietf.org/html/rfc6455#section-7.4.1) specification or simplified version [here](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent).

If anything goes wrong with the connection on user side connection should be closed. Importantly is to note is that when user agent notices that server has closed its connection, it should do the same on the other side. That is clearly [stated](https://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76#section-6.3) in the official WebSocket protocol.

# Cancel the URLSessionWebSocketTask

To cancel a `URLSessionWebSocketTask` you just need to call a `cancel` [method](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/3181200-cancel).

When calling this instance method you need to provide a [close code](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/closecode) and a reason.

```swift

let url = URL(string: "wss://echo.websocket.org")!
let webSocketTask = URLSession.shared.webSocketTask(with: url)

// ...

webSocketTask.cancel(with: .goingAway, reason: nil)

```

# Disconnect with Starscream

To close a WebSocket created with library [Starscream](https://github.com/daltoniam/Starscream) you need to call a `disconnect` method. If you want to specify it the close code you can do so but it is optional.

```swift

let socket = WebSocket(url: URL(string: "ws://localhost:8080/")!)

// ...

socket.disconnect(closeCode: CloseCode.normal.rawValue)

```


# Cancel subscriptions with GraphQL

When using GraphQL with subscriptions Apollo protocol handles all the heavy duty work behind the scenes. Clients can get immediate data changes from the server.

In Apollo iOS SDK library subscriptions are `Cancellable` [protocol](https://github.com/apollographql/apollo-ios/Sources/Apollo/Cancellable.swift) types. It is an object that can be cancelled when in progress and it has just one method `cancel`.

In order to clean up after GraphQL subscriptions are not needed anymore the easiest way is to keep track of all subscriptions and cancel when needed or within object `deinit` method.

```swift


var subscriptions: [Cancellable]

// ...

let newPricesSubcriprion = ApolloClient.subscribe(NewPricesSubscription()) { ... }

// ...

subscriptions.forEach { subscription in
    subscription.cancel()
}

```


## TL;DR

When working with WebSockets we need to remember to close connections and clean up. Forgetting to do so we can run into multiple issues which can be later hard to debug and understand.

We can use WebSockets in our Swift projects in multiple ways and it each one requires a different approach to close the connection. But most importantly as WebSocket protocol tells us we need to do it either connection is closed from the user or server side.

## Links

* [Closing the connection from WebSocket protocol](https://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76#section-6)
* [Cancel URLSessionWebSocketTask](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/3181200-cancel)
* [Starscream library documentation](https://github.com/daltoniam/Starscream)
* [GraphQL subscriptions](https://www.apollographql.com/docs/ios/subscriptions/)