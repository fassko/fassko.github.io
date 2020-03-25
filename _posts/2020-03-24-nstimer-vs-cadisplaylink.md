---
layout: post
title: ! "NSTimer vs CADisplayLink"
categories: [swift]
tags: [nstimer, cadisplaylink, apple, ios]
---

`NSTimer` or just `Timer` in Swift world is a commonly used way to execute something repeatedly with an interval. For instance, a countdown timer is a perfect example or update data every 5 seconds.

Not so well known hidden gem is `CADisplayLink` a special flavor of timer that is linked to the device screen refresh rate. Usually, it is 60 frames per second, but in new iPads, it is 120 frames per second.

<!--more-->

## What is (NS)Timer?

With [Timer](https://developer.apple.com/documentation/quartzcore/cadisplaylink) you can line up one or multiple tasks in the future. You can specify if the timer needs to repeat.

```swift

  let timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { timer in
    print("1 second passed")
  }
```

In the example above timer fill fire every 1 second indefinitely.

To stop a timer need to invalidate it.

```swift

  timer.invalidate()

```

Timers are fired on the main thread. If the app is UI heavy timers won’t fire. To fix that you can either attach to non-default `RunLoop` mode like common mode. It will allow a timer to fire even UI (main thread) is busy.

```swift

  RunLoop.current.add(timer, forMode: .common)

```

Or you can synchronize with your screen updates with `CADisplayLink`.

## What is CADisplayLink?

`CADisplayLink` is a special flavor of Timer that lets your apps run a piece of code every time right after the screen has refreshed. Usually, it is 60 frames per second, but in selective devices like new iPads, it is 120 frames per second.

It is a perfect way to create smooth animations and calculate the next frame because in this way you have perfect timing between frames. Unlike regular `Timer` is not guaranteed to fire the exact time when the screen is refreshing.

```swift

  class DisplayLink {
    @objc func displayRefreshed(displayLink: CADisplayLink) {
      print(displayLink.timestamp)
    }

  init() {
    let displayLink = CADisplayLink(target: self, selector: #selector(displayRefreshed(displayLink:)))
      displayLink.add(to: .main, forMode: .default)
    }
  }

```

When you create a `DisplayLink` it should be linked to an object and specified an `objc` function as a selector. This function will be fired as soon as redraw on the screen happens. We can see it by printing out the timestamp.

```

  ...
  93095.013681187
  93095.11224511401
  93095.12891178101
  93095.145578448
  93095.162245115
  93095.178911782
  93095.19557844901
  93095.21224511601
  ...

```

`CADisplayLink` has a property `preferredFramesPerSecond` that lets you specify a callback rate calculated in frames per second. It means you can specify your refresh rate when you want to fire. It is a perfect way if you don’t need to execute your code every time screen refreshes.

## Timer vs CADisplayLink

`Timer` and `CADisplayLink` both are ways to fire piece of code with an interval. These two approaches are different.

`Timer` is perfect when you just want to execute something let’s say every 5 seconds without tied to screen redrawing.

Unless `CADisplayLink` is tied to screen refresh rate which is either 60 or 120 frames per second. It is fired right after screen redraws and you have maximum amount of time to execute  the code before next screen refresh. This approach shines if you need to create seamless animations or in game development where you can’t avoid any screen refresh drops.

## TL;DR

We all might now `NSTimer` (or just `Timer`) which is good for executing piece of code after an interval with or without repeating it.

In some cases it’s worth to consider `CADisplayLink` especially if you want to work with animations and get most of the time between screen redraws itself.

## Links

* [NSTimer official documentation](https://developer.apple.com/documentation/foundation/nstimer?language=objc)
* [CADisplayLink official documentation](https://developer.apple.com/documentation/quartzcore/cadisplaylink)
* [Timer tutorial](https://www.raywenderlich.com/113835-ios-timer-tutorial)
* [How to use Timer](https://www.hackingwithswift.com/articles/117/the-ultimate-guide-to-timer)
* [How to use CADisplayLink](https://www.hackingwithswift.com/example-code/system/how-to-synchronize-code-to-drawing-using-cadisplaylink)
* [In depth article about CADisplayLink](https://medium.com/@dmitryivanov_54099/cadisplaylink-and-its-applications-bfafb760d738?source=linkShare-edb1354ca2c4-1583337923)
* [Discussion about CADisplayLink and animations](https://stackoverflow.com/questions/30955847/ios-animation-cadisplaylink-vs-cashapelayer)
