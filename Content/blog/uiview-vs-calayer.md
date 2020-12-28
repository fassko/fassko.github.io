---
date: 2019-05-03 00:00
title: UIView vs CALayer
tags: animations, Core Animation
description: Here's something useful to know - [UIView’s](https://developer.apple.com/documentation/uikit/uiview) are backed by [CALayer’s](https://developer.apple.com/documentation/quartzcore/calayer). Layers offer a lower-level interface to the visual content. When we need more flexibility or performance, we can go to layer level. 
---

Here's something useful to know - [UIView’s](https://developer.apple.com/documentation/uikit/uiview) are backed by [CALayer’s](https://developer.apple.com/documentation/quartzcore/calayer). Layers offer a lower-level interface to the visual content. When we need more flexibility or performance, we can go to layer level.

![Each UIView has an assigned layer](/assets/img/uiview-calayer.png)

One good example is animations. UIView animations are so called “stock” or "low cost" animations. When we need more flexibility we can go one level deeper to layers and use [Core Animation]() instead UIView animations.

To understand more about views and layers let’s see how they differ.

## UIView

Views have more complex hierarchy layouts. To lay them out on the screen we can use [Auto Layout](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/index.html).

They can receive user interactions like taps, pinches, cliks and more.

When you need to create custom views, you can subclass UIView or many other specialized types provided by [UIKit](https://developer.apple.com/documentation/uikit) or [AppKit](https://developer.apple.com/documentation/appkit). They are very flexible to do that.

Working with UIViews happens on the main thread, it means it is using CPU power.

## CALayer

Layers on other hand have simpler hierarchy. That means they are faster to resolve and quicker to draw on the screen.

There is no responder chain overhead unlike with views.

CALayer has no custom logic by default. It means that they are not so flexible and fewer classes to subclass for specific needs.

Layers are drawn directly on the GPU. It happens on a separate thread without burdening the CPU.

## TL;DR;

Each UIView is backed by CALayer which is one level deeper. Views are being drawn using CPU on the main thread. Drawing layers on other hand is on separate thread using GPU power. When you need more flexibility you can move one level down from UIView by using CALayer capabilities.

## Links

* [Ray Wenderlich](https://www.raywenderlich.com/402-calayer-tutorial-for-ios-getting-started)
* [iOS Brownbag: Views vs. Layers](https://dzone.com/articles/ios-brownbag-views-vs-layers)
* [View-Layer Synergy](https://www.objc.io/issues/12-animations/view-layer-synergy/)
* [UIView documentation](https://developer.apple.com/documentation/uikit/uiview)
* [CALayer documentation](https://developer.apple.com/documentation/quartzcore/calayer)
