---
layout: post
title: ! "What is (Core) Animation"
categories: [swift, animations]
tags: [animations, Core Animation]
---

Animation has been an important part of the Mac OS X user interface since the very beginning. You’ve probably seen the Genie effect, which occurs when you minimize an application, so many times that you hardly notice it anymore.

Apple integrates animation into its operating systems and applications, and it is becoming so commonplace that users are starting to expect it.

Core Animation is a group of features that makes it easy to build animated user interfaces for the Apple ecosystem devices like iPhone, iPad, Apple TV, and Mac.

<!--more-->

![Cat animation](/assets/img/cat-animation.gif)

## What is Animation?

Animation is a change of value or state over time. If we look closer at the cat animation above, it consists of two animations. Firstly, cat slides from left to right, which is a value change of X axis coordinate over time. Secondly, picture fades out, and that is a state value change.

We always need to think about value or state we would like to change, end time (when we want this animation to finish), and sometimes begin time if we want to delay the animation.

## What is Core Animation?

Core Animation is a graphics compositing framework provided by Apple to build animated user interfaces. The project's initial codename was Layer Kit, and it first appeared in Mac OS X Leopard on 7 August 2006. It was created by John Harper.

![Core Animation](/assets/img/core-animation-logo.png)

Core Animation was introduced with the first iPhone on 9 January 2007. Steve Jobs explained that it runs adapted version of Mac OS X, and that included Core Animation framework as well.

Core Animation provides high frame rates and smooth animations without burdening the CPU and slowing down your app, according to Apple documentation.

## TL;DR

Core Animation's developer-focused marketing slogan is "Render, compose, and animate visual elements". This shows us that Apple wants us to use Core Animation for more sophisticated UI tasks, when using UIView animations is not enough.

## Links

- [Core Animation documentation](https://developer.apple.com/documentation/quartzcore)
- [Core Animation Programming Guide](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/Introduction/Introduction.html)
- [Core Animation for Mac OS X and the iPhone](https://pragprog.com/book/bdcora/core-animation-for-mac-os-x-and-the-iphone)
