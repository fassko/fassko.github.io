---
title: Animating shapes in iOS
date: 2019-02-12 00:00
tags: animations, swift
description: Animating a UIBezierPath drawing is a pretty trivial task. But how to animate shape morphing, i.e. make one shape change into another? (For instance, morphing a triangle into a square.) To accomplish this, we need to use CAShapeLayer and animate its properties using Core Animation capabilities.
---

Animating a `UIBezierPath` drawing is a pretty trivial task. But how to animate shape morphing, i.e. make one shape change into another? (For instance, morphing a triangle into a square.) To accomplish this, we need to use `CAShapeLayer` and animate its properties using Core Animation capabilities.


First things first, let’s see which properties of `CAShapeLayer` can be animated with Core Graphics:

- Path
- Fill color
- Line dash phase
- Line width
- Miter limit
- Stroke color
- Stroke start and end.

## Shape morphing

To animate shape morphing, we need to change the `path` property. Keep in mind that both shapes need to have the same number of points that comprise them. Otherwise, the animation would end up looking clunky and unnatural.

![Ugly animation from square to triangle](/assets/img/ugly-animation-from-square-to-triangle.gif)

Even [Apple’s official documentation](https://developer.apple.com/documentation/quartzcore/cashapelayer/1521904-path?language=objc) is warning us about that.

> Paths will interpolate as a linear blend of the "on-line" points; ”off-line” points may be interpolated non-linearly (e.g. to preserve continuity of the curve's derivative). If the two paths have a different number of control points or segments the results are undefined. If the path extends outside the layer bounds it will not automatically be clipped to the layer, only if the normal layer masking rules cause that.

If we have same amount of points for both paths we can achieve much nicer animation.

![Nice animation from square to triangle](/assets/img/nice-animation-from-square-to-triangle.gif)

## Combining multiple animations

The next step is to combine multiple `CGPath` animations together. To accomplish this, we can use `CAAnimationGroup`, which allows multiple animations to be grouped and run concurrently.

Be aware that you need to set correct `beginTime` for each animation so that they would start one after another. Animation properties like `duration`, `autoReverses`, `repeatCount` and others need to be set on the animation group object.

````swift
let animationGroup = CAAnimationGroup()
animationGroup.animations = [...]
animationGroup.autoreverses = true
animationGroup.repeatCount = .greatestFiniteMagnitude
animationGroup.duration = 2.0
````

![Animation with multiple shapes](/assets/img/animation-multiple-shapes.gif)

## TL;DR

`CAAnimationGroup` is a powerful feature that allows for several uses, from Core Animation to grouping multiple `CABasicAnimation`s together. If you want to animate from one path to another, be aware that _from_ and _to_ paths should have the same amount of points. Otherwise, the animation would look off because the animation algorithms can’t interpolate these points correctly.

## Links

- [Apple's CAShapeLayer path documentation](https://developer.apple.com/documentation/quartzcore/cashapelayer/1521904-path)
- [CAShapeLayer in Depth](https://calayer.com/core-animation/2017/12/25/cashapelayer-in-depth-part-ii.html)
