---
layout: post
title: ! "How to use subscriptions with GraphQL using Apollo iOS SDK and Swift?"
categories: [graphql, apple]
tags: [graphql, apple, ios, wallet]
---

GraphQL main functionality is to fetch and update data from the server. In addition to that `subscriptions` allow to listen and to send messages from and to the the server on real time. It is similar to regular queries, but answer will be received when event happens either on the server or on the client.

Apollo iOS SDK library supports subscriptions and it is powered by the Swift WebSocekt library [Starscream](/websockets-swift/) to connect to the server. We will look into how to set it up and start using right now.

<!--more-->

## Schema and code generation

Subscriptions are already supported once you download your schema file from the GraphQL server and perform the code generation. It will generate all the subscriptions using `GraphQLSubscription` protocol which allows to pass parameters that subscription you want to implement takes.

Let's imagine we have chat application and GraphQL server has ability to get messages for specific thread as soon as they are sent. We need to create a GraphQL query in our `.graphql` file like this:

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

Once this is done we use Apollo iOS SDK to auto generate type safe Swift code. Which can be used in our app.

## Setting up the client

Setting up the Apollo client using subscriptions can be the most trickiest step, but let's go over it.

First we need to create `WebSocketTransport` instance to send GraphQL subscription operations to the server.

```swift
  private lazy var webSocketTransport: WebSocketTransport = {
    let url = URL(string: "ws://messaging.app/websocket")!
    let request = URLRequest(url: url)
    return WebSocketTransport(request: request)
  }()
```


An HTTP transport to use for queries and mutations

```swift
  
  private lazy var httpTransport: HTTPNetworkTransport = {
    let url = URL(string: "http://localhost:8080/graphql")!
    return HTTPNetworkTransport(url: url)
  }()
```

A split network transport to allow the use of both of the above 

```swift
  /// transports through a single `NetworkTransport` instance.
  private lazy var splitNetworkTransport = SplitNetworkTransport(
    httpNetworkTransport: self.httpTransport, 
    webSocketNetworkTransport: self.webSocketTransport
  )
```

Then we create client

```swift
	let apolloClient = Apollo(networkTransport: splitTransport)
```

## Use the subscription

After we have created the Apollo client to use subscriptions

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
```
 
## TL;DR



## Links

* https://www.apollographql.com/docs/ios/subscriptions/
* https://github.com/hasura/graphql-engine/issues/503
* https://stackoverflow.com/questions/51720378/how-to-implement-graphql-subscription-using-apollo-ios-client
* https://www.apollographql.com/docs/react/data/subscriptions/