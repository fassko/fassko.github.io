---
layout: post
title: ! "Ignorance of cache"
categories: [cache, swift]
tags: [cache, apple, ios, apollo]
---

Caching and invalidating cache are one of the hardest thing in computer science [according to](https://martinfowler.com/bliki/TwoHardThings.html) Martin Fowler.

Recently I was dealing and had issues with cache and invalidating it in three of my applications. This time we will discuss about `URLRequest` caching strategies and how to use it in your apps. I will share some of my learnings and issues I had.

<!--more-->

## Creating URLRequest with cache

## Caching strategies

## Which one to choose?

Adding to the confusion is the fact that NSURLRequestReloadIgnoringLocalAndRemoteCacheData and NSURLRequestReloadRevalidatingCacheData aren’t even implemented! (Link to Radar).

## TL;DR


## Links

* https://developer.apple.com/documentation/foundation/nsurlrequest/cachepolicy
* https://stackoverflow.com/questions/33316705/same-properties-of-nsurlsessionconfiguration-and-nsurlrequest/33316897#33316897
* https://nshipster.com/nsurlcache

13 Caching in HTTP
https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html#sec13