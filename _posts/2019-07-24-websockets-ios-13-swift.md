---
layout: post
title: ! "Websockets in iOS 13 using Swift and Xcode 11"
categories: [swift, websockets, xcode11, ios13]
tags: [swift, apple, websockets, ios, xcode]
---

Websockets in iOS 13, macOS 10.15, tvOS 13, watchOS 6 and Mac Catalyst have gained first-class citizen status in networking stack. Apple has finally added support in [URLSession](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask) and for lower level in [Network.framework](https://developer.apple.com/documentation/network/nwprotocolwebsocket) for their platforms.

This time we will focus on implementing Websockets using URLSession capabilities.

<!--more-->

## Before iOS 13

Previosly if you wanted to use Websockets in Apple platforms you had to rely on [CFNetwork](https://developer.apple.com/documentation/cfnetwork) which was added in iOS 2.0. It is using C based foundation streams. You then have to deal with pointers and memory allocation issues which is quite common in C language.

Another way was to use third party solutions like [Starscream](https://github.com/daltoniam/Starscream) which I have [described before](/websockets-swift/).

## Websockets using URLSession

Here are three ways how you can construct a Websocket using [URLSessionWebSocketTask](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask) class provided by [URLSession](https://developer.apple.com/documentation/foundation/urlsession):

```swift
  func webSocketTask(with: URL) -> URLSessionWebSocketTask
  func webSocketTask(with: URLRequest) -> URLSessionWebSocketTask
  func webSocketTask(with: URL, protocols: [String]) -> URLSessionWebSocketTask
```

### Opening connection

To create and open Websocket connection:

```swift
  let urlSession = URLSession(configuration: .default)
  let webSocketTask = urlSession.webSocketTask(with: "wss://echo.websocket.org")
  webSocketTask.resume()
```


### Sending messages

When connection has been established you can send `Data` or `String` message using [URLSessionWebSocketTask.send](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/3281790-send) function. You need to construct message with [URLSessionWebSocketTask.Message](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/message) enum type.

```swift
  let message = URLSessionWebSocketTask.Message.string("Hello World")
  webSocketTask.send(message) { error in
    if let error = error {                
      print("WebSocket couldn’t send message because: \(error)")
    }
  }
```

### Receiving messages

To receive messages from the server you need to use [URLSessionWebSocketTask.receive](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/3281789-receive) method. It accepts completion handler which is a [Result](https://developer.apple.com/documentation/swift/result) of [Message](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/message) type.

```swift
  webSocketTask.receive { result in
    switch result {
    case .failure(let error):
      print("Error in receiving message: \(error)")
    case .success(let message):
      switch message {
        case .string(let text):
          print("Received string: \(text)")
        case .data(let data):
          print("Received data: \(data)")
        }
    }
  }
```

Be aware that if you want to receive messages continuously you need to call this again once you are done with receiving a message. One way is to wrap this in a function and call the same function recursively.

```swift
  func receiveMessage() {
    webSocketTask.receive { result in
      switch result {
      case .failure(let error):
        print("Error in receiving message: \(error)")
      case .success(let message):
        switch message {
        case .string(let text):
          print("Received string: \(text)")
        case .data(let data):
          print("Received data: \(data)")
        }
        
        self.receiveMessage()                
      }
    }	
  }
```

### Pings and pongs

To keep connection active with the server it is a good approach to send PING message with an interval. You can achieve that with [URLSessionWebSocketTask.sendPing](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/3181206-sendping) function.

```swift
  func sendPing() {
    webSocketTask.sendPing { (error) in
      if let error = error {
        print("Sending PING failed: \(error)")
      }

      DispatchQueue.main.asyncAfter(deadline: .now() + 10) {
        self.sendPing()
      }
    }
  }
```

Here again you need to take care of the next PING sending yourself. Easiest way is to just use DispatchQueue or Timer functionality.

### Close connection

Once you’re done and would like to close the Websocket connection you need to send a close code which is a [URLSessionWebSocketTask.CloseCode](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask/closecode) enum type.

```swift
  webSocketTask.cancel(closeCode: .goingAway, reason: nil)
```

### Checking connection state

To monitor connection status you can use [URLSessionWebSocketDelegate](https://developer.apple.com/documentation/foundation/urlsessionwebsocketdelegate) protocol. You can check once connection has been opened or closed.

```swift
  /// connection disconnected
  func urlSession(_ session: URLSession, 
                  webSocketTask: URLSessionWebSocketTask,
                  didCloseWith closeCode: URLSessionWebSocketTask.CloseCode,
                  reason: Data?)

  // connection established
  func urlSession(_ session: URLSession,
                  webSocketTask: URLSessionWebSocketTask,
                  didOpenWithProtocol protocol: String?)
```

## TL;DR

Apple has finally added Websockets as first-class citzen to its platforms. Of course there are small quirks and rough edges. For instance, you can’t receive messages continously, but you don’t need to mess with constructing Websocket frame anymore which is a big win.

Right now it is available only for latest betas and if you support older versions of iOS, tvOS, watchOS or macOS you need to think about backwards compatibility yourself.

## Links

* [URLsession documentation](https://developer.apple.com/documentation/foundation)
* [URLSessionWebSocketTask documentation](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask)
* [URLSessionWebSocketDelegate documentation](https://developer.apple.com/documentation/foundation/urlsessionwebsocketdelegate)
* [Blogpost by AppSpector](https://appspector.com/blog/websockets-in-ios-using-urlsessionwebsockettask)
* [My previous blogpost about using Websockets](/websockets-swift/)