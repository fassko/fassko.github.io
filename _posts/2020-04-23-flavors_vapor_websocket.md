---
layout: post
title: ! "NSTimer vs CADisplayLink"
categories: [swift]
tags: [nstimer, cadisplaylink, apple, ios]
---

Swift on the server lately is getting more traction despite [IBM leaving the club](https://forums.swift.org/t/december-12th-2019/31735). One of the most popular framework out there is [Vapor](https://vapor.codes/). It is built on top of Apple’s [SwiftNIO](https://github.com/apple/swift-nio) and writtent fully in Swift programming language.

This time we will look into how to work with WebSockets using Vapor framework. We are going to see how to create a client and server using Vapor’s module [WebSocketKit](https://github.com/vapor/websocket-kit) and Vapor app approach.

<!--more-->

## WebSocketKit

[WebSocketKit](https://github.com/vapor/websocket-kit) is a WebSocket client library built on SwiftNIO. In fact Vapor framework consists of many smaller modules and this is one of them. WebSocketKit is hiding away SwiftNIO lower level complexity and nicely abstracting the event loops. Let’s see how can we use it.

### Client

When creating a WebSocket client with WebSocketKit we need to follow a couple of steps.
At first we need to create a event loop group where we can receive the WebSocket events like receiving text.

```swift

var eventLoopGroup = MultiThreadedEventLoopGroup(numberOfThreads: 2)

```

After that we should create a WebSocket promise within the created event loop group. Within the promise we specify the WebSocket events. In this example we are sending `hello` String value and printing out text what we receive back.

```swift

let port: Int = 8080
let promise = eventLoopGroup.next().makePromise(of: String.self)
WebSocket.connect(to: "ws://localhost:\(port)", on: eventLoopGroup) { ws in
  ws.send("hello")
  ws.onText { ws, string in
    print(string)
  }
}.cascadeFailure(to: promise)

```

After that we need to wait for executing events within this promise and event loop group.

```swift

_  = try promise.futureResult.wait()

```

### Server

Creating a server with WebSocketKit is a bit more complicated, but let’s move step by step.

Similarly when creating the client we need to create the event loop group.

```swift

var eventLoopGroup = MultiThreadedEventLoopGroup(numberOfThreads: 2)

```

A GET connection can be transformed into WebSocket connection via upgrade dance. Using this approach we need to configure that ourselves.

```swift

let upgradePipelineHandler: (Channel, HTTPRequestHead) -> EventLoopFuture<Void> = { channel, req in
  WebSocket.server(on: channel) { ws in
    ws.send("You have connected to WebSocket")
    
    ws.onText { ws, string in
      print("received")
      ws.send(string.trimmingCharacters(in: .whitespacesAndNewlines).reversed())
    }
    
    ws.onBinary { ws, buffer in
      print(buffer)
    }
    
    ws.onClose.whenSuccess { value in
      print("onClose")
    }
  }
}

```

Now as we have create the WebSocket upgrade pipeline let’s use it. To do that we need to create the promise within we can receive the events.

```swift

let promise = eventLoopGroup.next().makePromise(of: String.self)

let server = try ServerBootstrap(group: eventLoopGroup).childChannelInitializer { channel in
  let webSocket = NIOWebSocketServerUpgrader(
    shouldUpgrade: { channel, req in
      return channel.eventLoop.makeSucceededFuture([:])
  },
    upgradePipelineHandler: upgradePipelineHandler
  )
  
  return channel.pipeline.configureHTTPServerPipeline(
    withServerUpgrade: (
      upgraders: [webSocket],
      completionHandler: { ctx in
        // complete
    })
  )
}.bind(host: "localhost", port: port).wait()

```

To boot up the server we need to start waiting for the events with freshly created promise and server object.

```swift

_ = try promise.futureResult.wait()
try server.close(mode: .all).wait()

```

Now we have a running server using WebSocketKit framework. When a client sends text message we are reversing all the characters. For example when client sends `Hello` we are sending back `olleH`.

## Vapor app approach

All this seems quite complicated, but don’t worry using Vapor app approach all this complexity is hidden away.

### Client

Creating client is much easier within Vapor app. You just need to create a new WebSocket instance using event loop group from `app` object. Then connect to the network address. Within a closure you get WebSocket object on which you can register events you want to trigger and how to reach.

```swift

let url = "wss://echo.websocket.org"
    let _ = WebSocket.connect(to: url, on: app.eventLoopGroup) { ws in
      ws.onText { ws, text in
        print(text)
      }
      
      ws.send("Hello")
    }
    
```

In this example client sends `Hello` to the server once connected and prints out to the console any text what is being received.

### Server

When creating a server we need to provide an endpoint where clients can connect to. Then within a closure we get WebSocket object and request objects.

Similarly like with client we can specify what we want to do when these events are triggered. For instance once server receives text it will reverse it and send back.

```swift

app.webSocket("") { request, ws in
    ws.send("You have been connected to WebSockets")
    
    ws.onText { ws, string in
      ws.send(string.trimmingCharacters(in: .whitespacesAndNewlines).reversed())
    }
    
    ws.onClose.whenComplete { result in
      switch result {
      case .success():
        print("Closed")
      case .failure(let error):
        print("Failed to close connection \(error)")
      }
    }
  }
  
```

Additional to that we can can react once client disconnects and many [more](http://api.vapor.codes/websocket/latest/WebSocket/Classes/WebSocket.html).

## TL;DR

Swift on the server has gained a lot of popularity especially now iOS developers can create apps and backend services in same language.

Most of the Swift server frameworks are built on top of SwiftNIO framework that gives a very granular way to configure WebSockets.

Using Vapor tools like WebSocketKit and app framework itself we can easy this complicated process. You can check out the [code samples](https://github.com/fassko/vapor-websockets) and start using Swift when you need to deal with WebSockets on the backend.

## Links

* [WebSocketKit on Github](https://github.com/vapor/websocket-kit)
* [WebSocketKit documentation](http://api.vapor.codes/websocket/latest/WebSocket/index.html)
* [Vapor 4.0 WebSockets documentation](https://github.com/fassko/vapor-websockets)
* [Vapor WebSockets code samples](http://api.vapor.codes/websocket/latest/WebSocket/index.html)
* [SwiftNIO](https://github.com/apple/swift-nio)
