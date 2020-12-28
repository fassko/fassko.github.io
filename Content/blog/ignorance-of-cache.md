---
date: 2020-01-18 00:00
title: Ignorance of the URLRequest cache
tags: cache, apple, ios, apollo
description: Caching and invalidating cache is one of the hardest things in computer science [according to](https://martinfowler.com/bliki/TwoHardThings.html) Martin Fowler.
Recently I was dealing with cache and invalidating it in three of my applications. I had some serious issues with that and wanted to dig deeper. This time we will discuss  `URLRequest` caching strategies and how to use it in your apps. I will share some of my learnings and problems that I found.
---

Caching and invalidating cache is one of the hardest things in computer science [according to](https://martinfowler.com/bliki/TwoHardThings.html) Martin Fowler.

Recently I was dealing with cache and invalidating it in three of my applications. I had some serious issues with that and wanted to dig deeper. This time we will discuss  `URLRequest` caching strategies and how to use it in your apps. I will share some of my learnings and problems that I found.

## Creating URLRequest with cache

Not so many of us use caching strategy when creating `URLRequest` and hitting the network. If the server you’re accessing doesn’t have caching strategy implemented then making network requests can cause data corruption in your apps.

I had these issues with just a simple request and getting new `JSON` data from the network. For some reason, `URLRequest` thought that nothing has changed and returned data from internal app cache rather than the network.

The reason for this is that `NSURLCache` is set for the application by default according to the [documentation](https://developer.apple.com/documentation/foundation/urlcache#//apple_ref/occ/clm/NSURLCache/setSharedURLCache:). The cache will be purged when the device runs low on disk space, but mostly this isn’t the case. You can control `NSURLCache` behavior when launching the app but let’s leave that for another post.

## Caching strategies

`NSURLRequest` has a [property](https://developer.apple.com/documentation/foundation/nsurlrequest/1407944-cachepolicy) `cachePolicy` which sets the caching strategy for the request you’re creating. It is an enum and has several [choices](https://developer.apple.com/documentation/foundation/nsurlrequest/cachepolicy) defined as constants:

* `case useProtocolCachePolicy`
> Use the caching logic defined in the protocol implementation, if any, for a particular URL load request.
* `case reloadIgnoringLocalCacheData`
> The URL load should be loaded only from the originating source.
* `case reloadIgnoringLocalAndRemoteCacheData`
> Ignore local cache data, and instruct proxies and other intermediates to disregard their caches so far as the protocol allows.
* `static var reloadIgnoringCacheData: NSURLRequest.CachePolicy`
> Replaced by NSURLRequest.CachePolicy.reloadIgnoringLocalCacheData
* `case returnCacheDataElseLoad`
> Use existing cache data, regardless of age or expiration date, loading from originating source only if there is no cached data.
* 	`case returnCacheDataDontLoad`
> Use existing cache data, regardless of age or expiration date, and fail if no cached data is available.
* `case reloadRevalidatingCacheData`
> Use cache data if the origin source can validate it; otherwise, load from the origin

If you just read the documentation then all of these constants look confusing and hard to choose the right now. Let’s try to understand which of the caching policy you need to choose for your `URLRequest` and when.

## Which one to choose?

The default policy for URL load requests is `useProtocolCachePolicy`. If a cached response does not exist then it is fetched from the originating source. Otherwise, if a response doesn’t tell to revalidate then a response is returned from the cache. For more detailed information you can go to [RFC 2616 detailed documentation](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html#sec13). Here is an image to illustrate how this policy works.

![How useProtocolCachePolicy works](/assets/img/cache/cache-determination.png)

Option `reloadIgnoringLocalCacheData` ignores the local cache and `reloadIgnoringLocalAndRemoteCacheData` ignores local and remote cache.

With `returnCacheDataElseLoad` you tell to use cache no matter how out of date it is. If the cached request doesn’t exist it will be loaded from the network.

Option `returnCacheDataDontLoad` is the most confusion one. It means offline mode. Only cached data will be used and it won’t load from the network.

But the story doesn’t end here, if we check `reloadRevalidatingCacheData` [documentation](https://developer.apple.com/documentation/foundation/nsurlrequest/cachepolicy/reloadrevalidatingcachedata) then we see that previous versions than macOS 15, iOS 13, watchOS 6, and tvOS 13 don’t implement this constant. [Mattt](https://twitter.com/mattt) was [warning](https://nshipster.com/nsurlcache/) us about that years ago. There is a [radar](http://openradar.appspot.com/radar?id=1755401) opened in May 2012.

So which one to choose? There isn’t a right or wrong answer, but the rule of thumb is - if you want partial cache with default settings then choose `useProtocolCachePolicy`. If you want to load a request without cache then choose either `reloadIgnoringLocalCacheData` or `reloadIgnoringLocalAndRemoteCacheData`.

## TL;DR

Handling cache and cache invalidation are one of the hardest topics in Computer Science. In iOS, macOS, tvOS and watchOS it isn’t easy and straight forward. The official documentation is confusing and isn’t clear how it works behind the scenes.

`URLRequest` has a [property](https://developer.apple.com/documentation/foundation/nsurlrequest/1407944-cachepolicy) `cachePolicy` which sets the caching strategy for the request.

For most of the cases default `useProtocolCachePolicy` option is what you want. If you want to avoid cache then one of `reloadIgnoringLocalCacheData` or `reloadIgnoringLocalAndRemoteCacheData` is the right one you have to choose.

## Links

* [URLRequest Cache Policy documentation](https://developer.apple.com/documentation/foundation/nsurlrequest/cachepolicy)
* [Article about NSURLCache by NSHipster](https://nshipster.com/nsurlcache)
* [Caching in HTTP](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html#sec13)
* [How to leverage HTTP cache in iOS](https://www.fabernovel.com/en/engineering/how-to-leverage-http-cache-in-ios)
* [Preventing NSURLConnection Cache Issues](https://codewithchris.com/preventing-nsurlconnection-cache-issues/)
