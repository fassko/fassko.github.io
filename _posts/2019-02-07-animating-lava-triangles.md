---
layout: post
title: ! "Animating shapes in iOS"
categories: [swift, animations]
tags: [animations, CABasicAnimation, UIBezierPath, CAShapeLayer, CAAnimationGroup]
---

Animating `UIBezierPath` drawing is quite trivial task. But how to animate from one shape to another? For instance animating from a triangle to a square. To accomplish that we need to use `CAShapeLayer` and animate it’s properties using Core Animation capabilities.

<!--more-->

## Animating from one shape to another

At first let’s see which `CAShapeLayer`‘s properties can be animated with Core Graphics:

- Path
- Fill color
- Line dash phase
- Line width
- Miter limit
- Stroke color
- Stroke start and end

To animate from one shape to another we need to change the `path` property. Keep in mind that both shapes need to have same count of points they consist of. Otherwise we can get quite ugly animation. 

/// ugly animation gif

Even Apple’s official documentation is warning about that.

> Paths will interpolate as a linear blend of the "on-line" points; ”off-line” points may be interpolated non-linearly (e.g. to preserve continuity of the curve's derivative). If the two paths have a different number of control points or segments the results are undefined. If the path extends outside the layer bounds it will not automatically be clipped to the layer, only if the normal layer masking rules cause that.

If we have same amount of points for both paths we can achieve much nicer animation.

/// gif with nice animation

## Combining multiple animations

Next step is to combine multiple `CGPath` animations together.  For that we can use the `CAAnimationGroup`. That allows multiple animations to be grouped and run concurrently.

Be aware that you need to set correctly `beginTime` for each animation so they start one after another. Animation properties like `duration`, `autoReverses`, `repeatCount` and others need to set on animation group object.

````swift
let animationGroup = CAAnimationGroup()
animationGroup.animations = [...]
animationGroup.autoreverses = true
animationGroup.repeatCount = .greatestFiniteMagnitude
animationGroup.duration = 2.0
````

/// gif with animation group animation

## TL;DR

`CAAnimationGroup` is a powerful feature from Core Animation to group multiple `CABasicAnimation`s together. If you want to animate from one path to another be aware that from and to paths should have same amount of points. Otherwise animation would look off because animation algorithm can’t interpolate these points correctly.


## Links

- https://developer.apple.com/documentation/quartzcore/cashapelayer/1521904-path
- https://calayer.com/core-animation/2017/12/25/cashapelayer-in-depth-part-ii.html