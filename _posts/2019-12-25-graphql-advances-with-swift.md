---
layout: post
title: ! "GraphQL Advances when fetching data in iOS with Swift and Apollo SDK"
categories: [graphql, swift]
tags: [graphql, apple, ios, apollo]
---

In previous articles we discussed how to [get started](https://kristaps.me/graphql-ios-swift/) and [use subscriptions](https://kristaps.me/graphql-subscriptions/) with GraphQL in iOS (and iPadOS, tvOS and macOS) using Swift programing language.

This time I want to discuss some advanced topics using GraphQL with Apollo SDK and Swift. How to use GraphQL fragments and Swift scalar types types? As well I would like to talk about optionality with GraphQL it’s pluses and minuses.

<!--more-->

## Using fragments

At first what is a **fragment** in GraphQL? It is a reusable piece of the query. For instance if you need same fields in multiple queries you can extract into a reusable piece called [GraphQL fragment](https://graphql.org/learn/queries/#fragments).

```javascript

query Users($id: userID) {
	users(id $id) {
		...UserDetails
		followers {
			...UserDetails
		}
	}
}

fragment UserDetails on User {
	id
	firstName
	lastName
	email
}

```

When you use fragments in your Swift project queries then Apollo iOS SDK [generates separate result types](https://www.apollographql.com/docs/ios/fragments/). It is a good way to divide UI, for instance UITableViewCell or UICollectionViewCell. This way a child view can be reused and only depends on it’s parent - UITableView or UICollectionView.

## GraphQL scalar types in Swift

In GraphQL a [scalar type](https://graphql.org/learn/schema/#scalar-types) is a field which has to resolve to some concrete type. In Swift language it can be `Date` or `enum`. Once you download schema JSON file you can see it like this:

```json
”type": {
  "kind": "SCALAR",
  "name": "Date",
  "ofType": null
}
```


Using Apollo code generation argument `--passthroughCustomScalars` you can use your own types for custom scalars.

Swift `Date` type from Foundation framwork is a good example. If you want to convert GraphQL Date type to Swift using Apollo iOS SDK, just pass `--passthroughCustomScalars` when generating the Swift code.

—> need to check Qminder TV Date decoding from GraphQL
—> do we need a custom decoder?

## Dealing with optionals with GraphQL

Optional type properties I think is one of the biggest downsides of the GraphQL with Apollo iOS SDK. It is because in many cases GraphQL type field can not be specified, basically it can be null.

When you are [fetching queries](https://www.apollographql.com/docs/ios/fetching-queries/) with Apollo iOS SDK result has optional data, which has optional type and then optional fields or in Swift type parameters.

It can be solved using extension for specific type and add optional initializer:

```swift

extension User {
  
	init?(_ user: UsersQuery.Data.User) {
    guard let userID = Int(user.id) else {
      return nil
    }
    
    self.id = userID
    self.firstName = user.firstName
    self.lastName = user.lastName
    self.email = user.email
  }
}

```

You can use this initializer when you fetch data and transform from GraphQL types to your app models. By abstracting this with another layer you can hide it away and return let’s say a Swift Result type.

—> check generated code for optionals

## TL;DR

* fragments - reuse code in queries, generates swift code
* convert scalars - can be used for Swift data types
* Optionality - one of the downsides for GraphQL in Swift projects

## Links

* fragments
* code generation tool
* Fetching data