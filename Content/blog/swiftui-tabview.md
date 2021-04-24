---
date: 2021-04-22 00:00
title: The hidden secrets of TabView in iOS with SwiftUI
description: 
tags: swift, ios, swiftui, tabview
---

TabBar is a very important component of the iOS and has been from iOS 2.0. This element appears at the bottom of the iOS and iPadOS device and allows for our app users to switch between different views or functions quickly.

It is an extremely major element of Apple's own apps like Music, Podcasts and App Store itself.

![SwiftUI DisclosureGroup](/assets/swiftui-tabview/appstore-tabview.png)

In SwiftUI we have new element name `TabView` instead of `UITabBar` in UIKit. In this post we will look into in ways how to use it, especially a way that the `TabView` can be used to show page indicators.

## Ways to initialize TabView in SwiftUI

Right we have two options to create a tab view with SwiftUI. We can either take the control of the selected tab or avoid that's whatsoever. Let's look into both of these approaches.

### Create the TabView with SwiftUI

To create a `TabView` element we need to pass the `Content` that is a list of SwiftUI views. To mark this view as tab bar item we need to use the 	`tabItem` view modifier passing inside a `Label`  that describes a title and image.

Let's now put all this together in the code.

```
TabView {
  Text("The First Tab")
    .tabItem {
      Label("First", systemImage: "1.square.fill")
    }
  
  Text("The Second Tab")
    .tabItem {
      Label("Second", systemImage: "2.square.fill")
    }
  
  Text("The Third Tab")
    .tabItem {
      Label("Third", systemImage: "3.square.fill")
    }
}
```

Now we can unpack the code above. Each tab is just a `Text` view and the tab item is a `Label` with a title and system image that is a SF Symbol.

![SwiftUI DisclosureGroup](/assets/swiftui-tabview/swiftui-tabview.gif)

### Control the selected tab programmatically

If we want to control the selected tab programmatically we need to use the second approach to initialise method where besides the content we need to pass a state variable that keeps the current selected tab. Another important step is to mark each tab with a `tag` modifier with a value that conforms to the `Hashable` protocol. This is how SwiftUI layout engine differs between the tabs and can understand the uniqueness.

```
TabView(selection: $selectedTab) {
  VStack {
    Button("Move to Second Tab") {
      selectedTab = 2
    }
  }
  .tabItem {
    Label("First", systemImage: "1.square.fill")
  }
  .tag(1)
  
  VStack {
    Button("Move to Third Tab") {
      selectedTab = 3
    }
  }
  .tabItem {
    Label("Second", systemImage: "2.square.fill")
  }
  .tag(2)
  
  VStack {
    Button("Move to First Tab") {
      selectedTab = 1
    }
  }
  .tabItem {
    Label("Third", systemImage: "3.square.fill")
  }
  .tag(3)
}
```

Let's go over the code above step by step.

Firstly we are using the `VStack` views with a `Button` inside that will select the next tab or the last the first accordingly.

Then we are using the `tag` modifier for each of the tab items. We are using `Int` value type to keep track of the current selected tab. We are not limited to the `Int` value type which conforms to `Hashable` protocol, but we can use our own type if we want to. For sake of simplicity we are using the `Int` this time.

![Select current tab programmatically](/assets/swiftui-tabview/swiftui-tabview-selected-programmatically.gif)

## Customize TabView

Sadly there isn't much how we can customize the `TabView` in SwiftUI. We can change the image and title for the tabs but that is quite understandable.

We can change the default accent color. Let's change it to the purple color.

```
TabView {
 // ...
}
.accentColor(.purple)
```

![SwiftUI TabView with accentColor](/assets/swiftui-tabview/swiftui-tabview-accentcolor.png)

## TabView styles in SwiftUI

In SwiftUI we are not limited to the regular tab bar style. Right now we have three ways how to change the `TabView` styles:

* `DefaultTabViewStyle	` - regular style that we all know;
* `PageTabViewStyle` - scrolling pages with the page indicator;
* `CarouselTabViewStyle` - specific style for watchOS that we're not going to look into in this post.

### Create scrolling pages

To create scrolling pages with the `TabView` in SwiftUI we just need to call the view modifier `tabViewStyle	` and pass instance of `	PageTabViewStyle` style.

```
TabView {
      Color.gray
      Color.green
      Color.blue
    }
    .tabViewStyle(PageTabViewStyle())
```

If we want to hide the page indicator we specify the `indexDisplayMode` parameter for the `PageTabViewStyle` instance and specify it to `.never`.

```
TabView {
}
.tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
```

![SwiftUI TabView with scrolling pages](/assets/swiftui-tabview/swiftui-tabview-scrolling-pages.gif)

## TL;DR

* apple is using a lot
* initialize + control the selection
* page indicator type

## Links

* [Sample code](https://github.com/fassko/)

* [](https://developer.apple.com/design/human-interface-guidelines/ios/bars/tab-bars/)
* [](https://developer.apple.com/documentation/swiftui/tabview)
* [](https://www.iosapptemplates.com/blog/swiftui/tabview-swiftui)
* [](https://www.hackingwithswift.com/quick-start/swiftui/adding-tabview-and-tabitem)
* [](https://www.hackingwithswift.com/quick-start/swiftui/how-to-embed-views-in-a-tab-bar-using-tabview)
* [](https://www.appcoda.com/swiftui-tabview/)