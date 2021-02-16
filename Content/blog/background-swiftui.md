---
date: 2020-12-27 00:00
title: Background Color with SwiftUI
tags: swift, apple, ios, swiftui
description: Once you create a SwiftUI view, it has the default background color. White for light mode and black for dark mode respectively. But how to change it to something different? Let's look into that today.
---

Once you create a SwiftUI view, it has the default background color. White for light mode and black for dark mode respectively. But how to change it to something different? Let's look into that today.

In this article, we will talk about different techniques that we can use to change the default background for our SwiftUI views.

## Using modifier

First approach that comes in mind is using `.background()` [modifier](http://apple.co/3mSzqar). Sadly Apple hasn't provided documentation for this. It takes in a view that is set as a background for the view we are adding this modifier to.

In this case, we want to change the background color. We can pass in, for instance, `Color.gray`.

```swift
Text("Hello, world!")
  .background(Color.gray)
```

![Text background color](/assets/swiftui-background-color/text-background-color.png)

We see that it sets the background color only for the text view. That is how SwiftUI works. We want to set it for the whole screen. We could approach it using `VStack`, `HStack`, and a couple of `Spacer()` views.

```swift
VStack {
  Spacer()
  HStack {
    Spacer()
    Text("Test")
    Spacer()
  } 
  Spacer()
}.background(Color.gray)
```

![Text background color not extending safe area](/assets/swiftui-background-color/text-background-safearea.png)

It looks a bit better, but we want to set it for the whole screen, ignoring the safe area. We can do it using `.edgesIgnoringSafeArea` [modifier](http://apple.co/38HHk1c). Using this modifier, we can tell the SwiftUI layout engine to extend outside the screen's safe area. It takes in a parameter that defines which edges we can expand. In this case, we will pass in `.all`.

```swift
.background(Color.gray.edgesIgnoringSafeArea(.all))
```

![Text background color fullscreen](/assets/swiftui-background-color/text-background-color-fullscreen.png)

It looks exactly how we wanted. The issue is that the code is quite cumbersome and has a lot of nesting views and spacers. Let's look at it in another way.
​
## Using `ZStack`

We could dramatically improve the code readability and complexity is to utilize the `ZStack` [view](https://developer.apple.com/documentation/swiftui/zstack). Using this view, we can layer multiple views on top of each other. Our approach would be to add the background color and then the content on top of it.

```swift
ZStack {
  Color.gray
    .edgesIgnoringSafeArea(.all)
  
  Text("Hello, world!")
}
```

The code looks much cleaner now, and we have a gray background and text on top of it. The best part of this approach is that we ignore the safe area only for the background color view. Other views won't extend outside the safe area.

![Background color with ZStack](/assets/swiftui-background-color/zstack-color.png)

> [Dimi Chakarov](https://twitter.com/gimly) [posted](https://twitter.com/gimly/status/1347300659691999233) about how to create [a `ViewModifier` to apply to a view](https://gist.github.com/dchakarov/d841e709ccb0bcc961302b2a248912ec).

## Multiple colors

Now that we know how to change background color to one single color, how about setting it to two colors vertically and horizontally? 
​
We could achieve that by using the approach with `ZStack` and wrapping colors in a `VStack` [view](https://developer.apple.com/documentation/swiftui/vstack) for vertical alignment or `HStack` [view](https://developer.apple.com/documentation/swiftui/hstack) for vertical alignment.

### Vertical alignment

Let's use two colors - gray and black. By wrapping them in `VStack` view and using `ZStack` we can split the screen in half vertically. One of them is filled with gray and the other with black color.

```swift
ZStack {
  VStack(spacing: 0) {
    Color.gray
    Color.black
  }
  .edgesIgnoringSafeArea(.all)
}
```

![Vertical alignment background colors](/assets/swiftui-background-color/vertical-alignment-background-colors.png)

### Horizontal alignment

By changing the `VStack` to `HStack` we can fill the screen horizontally with gray and black colors.

```swift
ZStack {
  HStack(spacing: 0) {
    Color.gray
    Color.black
  }
  .edgesIgnoringSafeArea(.all)
}
```

![Horizontal alginment background colors](/assets/swiftui-background-color/horizontal-alignment-background-colors.png)

### Chess table background

Let's do something a bit crazy by building a background that would look like a chess table. We can iterate a couple of times the previous example with multiple colors vertically and horizontally.

```swift
ZStack {
  VStack(spacing: 0) {
    ForEach((1...10).reversed(), id: \.self) { i in
      HStack(spacing: 0) {
        ForEach((1...5).reversed(), id: \.self) { i in
          Color.gray
          Color.black
        }
      }
      HStack(spacing: 0) {
        ForEach((1...5).reversed(), id: \.self) { i in
          Color.black
          Color.gray
        }
      }
    }
  }.edgesIgnoringSafeArea(.all)
}
```

Here we see the power of the SwiftUI layout engine and Swift code combined.

![Chess table background](/assets/swiftui-background-color/chess-background.png)

## TL;DR

SwiftUI views come with default background color - white on light mode and black in dark mode. In many cases, we would like to change it to something else. The first way would be to use the `.background` modifier and pass `Color`which is a view in SwiftUI. The second approach would be using `ZStack` and add one color or multiple colors wrapped in `VStack` for vertical and `HStack` for horizontal layout.
​
If you have other ideas about changing the background color for a SwiftUI view, let me know. Thank you for reading.

## Links

* [Sample code](https://github.com/fassko/swiftui-view-background-color)

* [Colors and frames](https://www.hackingwithswift.com/books/ios-swiftui/colors-and-frames)
* [SwiftUI Background Color Tutorial](https://www.ioscreator.com/tutorials/swiftui-background-color-tutorial)
* [`.background` modifier](http://apple.co/3mSzqar)
