---
layout: post
title: ! "GraphQL Advances when fetching data in iOS with Swift and Apollo SDK"
categories: [graphql, swift]
tags: [graphql, apple, ios, apollo]
---

In previous articles, we discussed how to [get started](/graphql-ios-swift/) and use [subscriptions](/graphql-subscriptions/) with GraphQL in iOS (and iPadOS, tvOS, and macOS) using Swift programing language.

This time I want to discuss some advanced topics using GraphQL with Apollo SDK and Swift. How to use GraphQL fragments and Swift scalar types? As well I would like to talk about optionality with GraphQL it’s pluses and minuses.

<!--more-->

## Using fragments

At first, what is a **fragment** in GraphQL? It is a reusable piece of the query. For instance, if you need same fields in multiple queries you can extract into a reusable piece called [GraphQL fragment](https://graphql.org/learn/queries/#fragments).

```graphql
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

When you use fragments in your Swift project queries then Apollo iOS SDK [generates separate result types](https://www.apollographql.com/docs/ios/fragments/). It is a good way to divide UI, for instance, UITableViewCell or UICollectionViewCell. This way a child view can be reused and only depends on a parent - UITableView or UICollectionView.

## GraphQL scalar types in Swift

In GraphQL a [scalar type](https://graphql.org/learn/schema/#scalar-types) is a field that has to resolve to some concrete type. In Swift language it can be `Date` or `enum`. Once you download schema JSON file you can see it like this:

```json
  "type": {
    "kind": "SCALAR",
    "name": "Date",
    "ofType": null
  }
```

Using Apollo code generation argument `--passthroughCustomScalars` you can use your own types for custom scalars.

Swift `Date` type from Foundation framework is a good example. If you want to convert GraphQL Date type to Swift using Apollo iOS SDK, just pass `--passthroughCustomScalars` when generating the Swift code.

You car use custom formats for `Date` like `ISO8601` or use milliseconds. Just need to extend `Date` type and conform to `JSONDecodable` which requires implementing initialize method.

```swift
  extension Date: JSONDecodable {
    public init(jsonValue value: JSONValue) throws {
      guard let isoString = value as? String else {
        throw JSONDecodingError.couldNotConvert(value: value, to: Date.self)
      }
      
      var tmpDate: Date?
      if isoString.count == 17 {
        tmpDate = DateFormatter.ISO8601short.date(from: isoString)
      } else if isoString.count == 24 {
        tmpDate = DateFormatter.ISO8601Milliseconds.date(from: isoString)
      } else {
        tmpDate = DateFormatter.ISO8601.date(from: isoString)
      }
      
      guard let date = tmpDate else {
        throw JSONDecodingError.couldNotConvert(value: value, to: Date.self)
      }
      self = date
    }
  }
```

`ISO8601short`, `ISO8601Milliseconds` and `ISO8601` declared in DateFormatter type extension as static instance properties.

## Dealing with optionals with GraphQL

Optional type properties I think is one of the biggest downsides of the GraphQL with Apollo iOS SDK. It is because in many cases GraphQL type field can not be specified, basically it can be null.

When you are [fetching queries](https://www.apollographql.com/docs/ios/fetching-queries/) with Apollo iOS SDK `GraphQLResult` type has optional property `data`. This property is a typed result data which means it has fetched type properties and those can be also optional.

This optional hell can be solved using extension for a specific type and add optional initializer:

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

You can use this initializer when you fetch data and transform it from GraphQL types to your app models. By abstracting this with another layer you can hide it away and return let’s say a Swift Result type.

## TL;DR

GraphQL fragments is a great way to extract some parts of the query code and reuse it in multiple places. Using Apollo iOS SDK it will generate Swift code for your apps and projects.

Converting types like GraphQL `Date` to Swift `Date` is a great hidden gem in Apollo iOS SDK. All you need to do is to add argument `--passthroughCustomScalars` during code generation.

Dealing with optionals can be a pain with GraphQL in your Swift projects. One way to improve the code base is to use custom initializers for your models.

## Links

* [Using GraphQL fragments](https://www.apollographql.com/docs/ios/fragments/)
* [Tooling for development and production Apollo workflows](https://github.com/apollographql/apollo-tooling)
* [Fetching queries](https://www.apollographql.com/docs/ios/fetching-queries/)
* [Mapping GraphQL types to Swift](https://blog.apollographql.com/mapping-graphql-types-to-swift-aa85e5693db4)
* [Add support for Date Type in Apollo iOS SDK](https://github.com/apollographql/apollo-ios/issues/450)