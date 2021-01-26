---
date: 2021-01-24 00:00
title: How to show text inside a circle with SwiftUI
description: This time, we will check out several ways to show a text label inside a circle using SwiftUI. We will dig deeper into three different ways using the `ZStack` view and `.background` and `.overlay` modifiers. As a small bonus, we will check out how to present a text label over a circle using the `.clipShape` modifier.
tags: swift, circle, ios, swiftui, images
---

This time, we will check out several ways to show a text label inside a circle using SwiftUI. We will dig deeper into three different ways using the `ZStack` view and `.background` and `.overlay` modifiers. As a small bonus, we will check out how to present a text label over a circle using the `.clipShape` modifier.

We want to achieve something like this:

![Text inside a circle](/assets/text-inside-circle-swiftui/text-inside-circle-swiftui.png)

Let's go over all of these approaches separately.

## Layout out with `ZStack`

`ZStack` in SwiftUI is a unique view that shows all its children on top of each other. Let's try to put a `Circle` view and then `Text` on top. To now allow the `Circle` to fill the whole screen, we need to set a view width and height.

```swift
ZStack {
  Circle()
    .stroke(circleColor, lineWidth: 4)
  
  Text("13")
}
.frame(width: 40, height: 40)
```

## Setting as background

Let's check out using the `.background` modifier. Sadly Apple has not provided us with documentation, so we need to understand it ourselves.

```swift
func background<Background>(_ background: Background, alignment: Alignment = .center) -> some View where Background : View
```

By applying this modifier, we need to pass in a `View` and optionally specify the alignment in both axes. Let's set it for our `Text` field. To nicely have a gap between the number and the circle, we need to use the `.padding()` modifier, so it has some room to breathe.

```swift
Text("13")
  .padding()
  .background(
    Circle()
      .stroke(circleColor, lineWidth: 4)
      .padding(6)
  )
```

## Untangling `overlay` modifier

```swift
func overlay<Overlay>(_ overlay: Overlay, alignment: Alignment = .center) -> some View where Overlay : View
```

This time Apple also hasn't provided documentation explanation. But the `.overlay` modifier works similarly to the `.background` modifier. It places the view on top of it. As well we should use the `.padding()` modifier to have a gap between the number and the circle. We need to exchange `background` to `overlay,` and that's it.

```swift
Text("13")
  .padding()
  .overlay(
    Circle()
      .stroke(circleColor, lineWidth: 4)
      .padding(6)
  )
```

This approach comes in handy if we would like to show an interactable view on top. Let's say we would like to present a tappable button on top. I wouldn't specifically advise doing so, but it explains the idea.

## Bonus: Clipping as Shape

As a bonus tip, let's check out how we can use the `.clipShape` modifier to show a text field inside the circle filled with a color. The `.clipShape` clips the view to a specific shape. We could use a couple of shapes provided by Apple like circles, capsules, rectangles, and [more](https://developer.apple.com/documentation/swiftui/shape). Or we can draw a shape ourselves with the help of the `Path`. Drawing custom shapes we are leaving out of the scope of this blog post.

```swift
Text("13")
  .padding()
  .background(circleColor)
  .clipShape(Circle())
```

![Text on top of a circle](/assets/text-inside-circle-swiftui/text-on-circle-swiftui.png)

## TL;DR


## Links

* [Sample code](https://github.com/fassko/text-in-circle-swiftui)

* [`ZStack` documentation](https://developer.apple.com/documentation/swiftui/zstack)
* [`clipShape` documentation](https://developer.apple.com/documentation/swiftui/view/clipshape(_:style:))
* [Shape documentation](https://developer.apple.com/documentation/swiftui/shape)
* [Drawing Paths and Shapes tutorial](https://developer.apple.com/tutorials/swiftui/drawing-paths-and-shapes)
* [Path documentation](https://developer.apple.com/documentation/swiftui/path)
* [SwiftUI masks and overlays](https://ordinarycoding.com/articles/swiftui-masks-and-overlays/)
