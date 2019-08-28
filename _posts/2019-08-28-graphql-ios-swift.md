---
layout: post
title: ! "Using GraphQL in iOS using Swift"
categories: [swift, graphql, xcode, ios]
tags: [swift, apple, graphql, ios, xcode]
---

GraphQL is an alternative to commonly used REST API approach. Using GraphQL you get only one single endpoint to the served and need to specify what data exactly do you need to use in your apps. It was created by Facebook in 2012 and open sourced in 2015.

Using GraphQL in your Swift applications is not that hard. Easiest way is to use Apollo iOS client which recently has seen a lot of great improvements and bug fixes. Apollo iOS is a strongly-typed, caching GraphQL client for iOS, macOS, iPadOS, watchOS and tvOS. It is written in Swift programming language.

<!--more-->

## GraphQL vs REST

REST API exposes one endpoint for each specific type of information. For example:

`/visitors` - list of all visitors
`/visitors/ID/` - concrete visitor details with ID

Imagine you would like to get a visitor by name. At first you need to get all visitors list and search by name. Once you find specific visitor ID you can get rest of the visitor details from another endpoint.

Using GraphQL you could do this with just one request to the server. You just need to specify what kind of data would you like to get in declarative GraphQL syntax:

```
{
	allVisitors(name: “John Appleseed”) {
		id
		name
		reasonOfVisit
		isServed
		signInTime
		feeedback
		...
	} 
}
```

This is just one simple example. In reality you could get multiple levels of data with just one go to the server.

## Setting up GraphQL using Swift in iOS

Using GraphQL in your iOS, iPadOS, macOS, watchOS and tvOS apps is not that hard. Easiest way is to use [Apollo iOS SDK](https://github.com/apollographql/apollo-ios) which is a strongly-typed, caching GraphQL client. It is written in Swift programming language.

### Installation

To set up Apollo client you need to [install Apollo framework](https://www.apollographql.com/docs/ios/installation/#installing-the-apollo-framework) and [generate schema file](https://www.apollographql.com/docs/ios/installation/#adding-a-schema-file-to-your-target-directory) which describes how you can get information from the server and add to your Xcode app target.

Then you [can create](https://www.apollographql.com/docs/ios/installation/#creating-graphql-files-with-your-queries-or-mutations) `.graphql` files with your queries or mutations how you would like to get or change data from the server. After that you need to add [code generation](https://www.apollographql.com/docs/ios/installation/#adding-a-code-generation-build-step) build step in Xcode build process to generate type safe Swift code to use for communication with your server.

Build your Xcode app target and [add generated](https://www.apollographql.com/docs/ios/installation/#adding-the-generated-api-file-to-your-target) API file to use it.

### Communicate with the server

After the installation process is done you can set up `ApolloClient` instance and point to your GraphQL server.

```
	import Apollo
	
	let graphQLClient = ApolloClient(url: URL(string: "http://localhost:8080/graphql")!)
```
 
Then you can use `graphQLClient` to fetch data and process query results.

```
	let allVisitorsQuery = AllVisitorsQuery(name: “John”)
	graphQLClient.fetch(query: allVisitorsQuery) { result in
		switch result {
		case .failure(let error):
			print(“Something bad happened \(error)”)
		case .success(let graphQLResult):
			guard let john = graphQLResult.data?.visitor else {
				return
			}
			
			print(john)  
	}
```

This is just a simple example in some of the next posts we will look into how we can mutate data and even use Websockets subscriptions.

## GraphQL pros and cons

Every technology has it’s pluses and minuses. You need to understand if the tradeoffs are worth to switch away from regular REST API.

### Pros

Using GrapHQL it is faster to implement, change and maintain your applications. You don’t need to communicate every smaller detail with your backend or even create new endpoints.

Using Apollo iOS framework helps a lot to use GraphQL in your Swift applications. It does support iOS, iPadOS, watchOS, macOS and tvOS. You can use Swift type safety and other great features like Result type and more. 

Lately Apollo iOS framework has seen a lot of great updates and  more bugs are being fixed. More and more companies switch to use GraphQL not only in web frontend, but their mobile applications too.

### Cons

Using GraphQL is not that straight forward especially if you have used to REST API approach. Switching your thinking and adapting next way can take some time. It also adds extra layer between server and your apps which you need to maintain in future.

With Apollo iOS SDK you need to be very careful with [caching](https://www.apollographql.com/docs/ios/watching-queries/). There are several ways to deal with cache and when to not cache at all. Just to be sure to check out official documentation before or if you run into any data inconsistency issues.

Apollo helps a lot to use GraphQL using Swift, but one downside is optionals. If you have freedom to tell what kind of data you want from server that comes with optionality tradeoff. It is a minor issue, just you need to deal with that when you construct your models and get data back from server.

## TL;DR

GraphQL is a modern way to communicate with your server. It can replace commonly used REST API approach. With GraphQL you communicate with backend via just one endpoint using declarative syntax.

Using GraphQL in your Swift applications for iOS, iPadOS, watchOS, macOS and tvOS is easy using Apollo framework. It is officially supported by GraphQL community and lately it has been well maintained and supported.

## Links

* Official iOS GraphQL [documentation](https://www.apollographql.com/docs/ios/) and [repository](https://github.com/apollographql/apollo-ios)
* [Blog post](https://troubled.pro/2019/02/graphql.html)
* Series of articles by Big Nerd Ranch. [Part 1](https://www.bignerdranch.com/blog/using-graphql-in-production-ios-applications-part-1/), [Part 2](https://www.bignerdranch.com/blog/using-graphql-in-production-ios-applications-part-2/) and [Part 3](https://www.bignerdranch.com/blog/using-graphql-in-production-ios-applications-part-3/)

### Videos

* CocoaHeads Stockholm [presentation](https://www.youtube.com/watch?v=ArMgdV-VwJ8)
* Swift Summit [presentation](https://www.skilled.io/u/swiftsummit/interfacing-with-graphql-in-swift)