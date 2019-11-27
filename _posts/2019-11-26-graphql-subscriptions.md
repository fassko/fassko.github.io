---
layout: post
title: ! "How to use subscriptions with GraphQL using Apollo iOS SDK and Swift?"
categories: [graphql, swift]
tags: [graphql, apple, ios, apollo]
---

GraphQL main functionality is to fetch and update data from the server. In addition to that subscriptions allow us to listen and to send messages from and to the server in real-time. It is similar to regular queries, but the answer will be received when an event happens either on the server or on the client.

Apollo iOS SDK library supports subscriptions and it is powered by the Swift WebSocket library [Starscream](/websockets-swift/) behind the scenes to connect to the server. We will look into how to set it up and start using it right now.

<!--more-->

## Schema and code generation

Subscriptions are already supported once you download your schema file from the GraphQL server and perform the code generation. It will generate all the subscriptions using `GraphQLSubscription` protocol which allows passing parameters to subscription you want to implement.

Let’s imagine we have a chat application and GraphQL server can get messages for a specific thread as soon as they are sent. We need to create a GraphQL query in our `.graphql` file like this:

```graphql
  subscription messagesReceived($threadID: ID!) {
    messagesReceived(threadID: $threadID) {
      id
      date
      text
      author
    }
  }
```

Once this is done we use Apollo iOS SDK to auto-generate type-safe Swift code. Which can be used in our app.

More about using Apollo iOS SDK you can read in previous [post](/graphql-ios-swift/).

## Setting up the client

Setting up the Apollo client using subscriptions can be the trickiest step, but let's go over it.

First, we need to create `WebSocketTransport` instance to send GraphQL subscription operations to the server.

```swift
  let webSocketTransport: WebSocketTransport = {
    let url = URL(string: "ws://messaging.app/websocket")!
    let request = URLRequest(url: url)
    return WebSocketTransport(request: request)
  }()
```

Then an HTTP transport instance will help us to use queries and mutations.

```swift
  let httpTransport = HTTPNetworkTransport(url: URL(string: "http://messaging.app/graphql")!)
```

A split network transport to allow the use of HTTP Transport and WebSocket transport protocols. That allows us to avoid any potential issues of having multiple client objects.

```swift
  let splitNetworkTransport = SplitNetworkTransport(
    httpNetworkTransport: httpTransport, 
    webSocketNetworkTransport: webSocketTransport
  )
```

Then we create the Apollo client using network transport type which in this case is `SplitNetworkTransport`.

```swift
  let apolloClient = Apollo(networkTransport: splitTransport)
```

## Using the subscription

After we have created the Apollo client with subscription capabilities we can use it our app to listen when a new message has been created to the specific thread.

```swift
  let receivedMessagesSubscription = MessagesReceivedSubscription(id: threadID)
  let messagesSubsription = apolloClient.subscribe(subscription: receivedMessagesSubscription) {[weak self] result in
    switch result {
    case .success(let graphQLResult):
      	if let message = graphQLResult.data.message {
    		  print("Message received \(message)")			
    	  }
    case .failure(let error):
    	  print("Failed to subscribe \(error)")
    }
  }
```

Each time when a message has been sent code inside closure is executed with new data.
 
## TL;DR

GraphQL is not only for fetching data from the server and updating data on the server. You can be using GraphQL subscription feature to listen and send real-time messages using WebSockets.

Apollo iOS SDK library has the functionality to support subscriptions in your Swift applications. It is using WebSocket library Starscream behind the scenes to offload this cumbersome task. Leveraging code generation you can use strictly typed Swift code to interact with your GraphQL server in real-time in your iOS, iPadOS, macOS and tvOS apps.

## Links

* [Apollo iOS SDK library subscriptions documentation](https://www.apollographql.com/docs/ios/subscriptions/)
* [Some use cases setting up Apollo iOS SDK](https://stackoverflow.com/questions/51720378/how-to-implement-graphql-subscription-using-apollo-ios-client)
* [Apollo SDK official subscriptions documentation](https://www.apollographql.com/docs/react/data/subscriptions/)