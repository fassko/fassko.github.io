---
date: 2021-10-20 00:00
title: How Sidebar works on iPad with SwiftUI
tags: swift, ios, swiftui, sidebar, ipad
description: Starting with iPadOS 14, Apple has redesigned the iPad sidebar by making it easier to navigate within an app. They are explaining that in the [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/bars/sidebars/). They are already using that in apps such as Photos, Files, Notes, Calendar, and more. This time let's check out how we can build a sidebar for iPad using SwiftUI. Currently, sidebar element is available only for iPads in landscape mode.
---

Starting with iPadOS 14, Apple has redesigned the iPad sidebar by making it easier to navigate within an app. They are explaining that in the [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/bars/sidebars/). They are already using that in apps such as Photos, Files, Notes, Calendar, and more. This time let's check out how we can build a sidebar for iPad using SwiftUI. Currently, sidebar element is available only for iPads in landscape mode.

## Creating a Sidebar

To create a sidebar for the iPad with SwiftUI, we need to create a `List` view where we would have all the sections and wrap it in a `NavigationView`. In the list we need to add a `Label` element for each section.

The most crucial step here is to tell SwiftUI that the list should be rendered as the sidebar list type. To do so, we need to set the list style to `SidebarListStyle`.

```swift
NavigationView {
  List {
    Label("About", systemImage: "info.circle")
    Label("Settings", systemImage: "gear")
  }
  .listStyle(SidebarListStyle())
}
```

![iPad sidebar with SwiftUI](/assets/swiftui-sidebar/ipad-sidebar.png)

Now that we have the Sidebar, let's add a title that would represent the global name. Developers usually choose to put the app name, or, for instance, the Apple Notes app has **Folders** to mean what the Sidebar holds.

```swift
NavigationView {
  List {
    Label("About", systemImage: "info.circle")
    Label("Settings", systemImage: "gear")
  }
  .listStyle(SidebarListStyle())
  .navigationTitle("Sidebar")
}
```

![iPad sidebar with name](/assets/swiftui-sidebar/ipad-sidebar-name.png)

## Navigation from the Sidebar

Now that we have the Sidebar, let's implement navigation for events after user taps on the section. To do that, we need to wrap the `Label` in the `NavigationLink` and provide a destination SwiftUI view.

For instance, if we would add About section in the app, it could look like this:

```swift
NavigationLink {
  AboutView()
} label: {
  Label("About", systemImage: "info.circle")
}
```

![iPad sidebar selection](/assets/swiftui-sidebar/ipad-sidebar-navigation.png)

## Default Home Screen

When a user launches the app, they see an empty view until they select something from the Sidebar.

![](/assets/swiftui-sidebar/ipad-sidebar-empty-default-screen.png)

To avoid this misleading behavior, we should tell the SwiftUI layout engine to render a default or call it a home screen. The trick is to add another view inside the `NavigationView` and it will be the default screen when the app is launched for the first time.

```swift
NavigationView {
  List {
    // ...
  }
  .listStyle(SidebarListStyle())
  .navigationTitle("Sidebar")
  
  Text("Please select section")
    .font(.largeTitle)
}
```

A good home screen would be a dashboard, frequently used features, or similar functionality.

![Default home screen](/assets/swiftui-sidebar/default-home-screen.png)

## iPhone and iPad portrait mode

We have only looked at how it would look like in the iPad in landscape mode. But how about in portrait mode or on the iPhone?

### iPad portrait mode

Currently, a sidebar on the iPad in portrait mode is rendered off the screen. To show it, we need to press either the back button or swipe from the left side of the device.

![iPad sidebar in portrait mode](/assets/swiftui-sidebar/ipad-sidebar-portrait.gif)

### iPhone

On the iPhone, the Sidebar is rendered as the default home screen with a navigation list.

![iPhone rendering sidebar](/assets/swiftui-sidebar/iphone-sidebar.gif)

Usually, this isn't what we would want, so in this case, we might need to consider changing it on the iPad size devices. This is out of the scope of this post.

## TL;DR

Sidebar is a great way how to divide different parts of the app into iPad apps. Currently, it is rendered on the iPad in landscape mode and partly in portrait mode. After adding a list of the app sections, we should remember to provide a default home screen. Otherwise, our users will see an empty screen. Apple has implemented this approach in their apps as well in macOS.

## Links

* [Sample code](https://github.com/fassko/SwiftUISidebar)

* [Human Interface Guidelines - Sidebars](https://developer.apple.com/design/human-interface-guidelines/ios/bars/sidebars/)
* [Sidebar official documentation](https://developer.apple.com/documentation/swiftui/sidebarliststyle)
* [Learn how to create a Sidebar navigation for iOS, iPadOS and macOS](https://designcode.io/swiftui-handbook-sidebar)
* [Sidebar navigation in SwiftUI](https://swiftwithmajid.com/2020/07/21/sidebar-navigation-in-swiftui/)
* [How to show and hide a sidebar in a SwiftUI macOS app](https://sarunw.com/posts/how-to-toggle-sidebar-in-macos/)
* [https://betterprogramming.pub/using-sidebar-in-swiftui-without-a-navigationview-94f4181c09b](https://betterprogramming.pub/using-sidebar-in-swiftui-without-a-navigationview-94f4181c09b)
* [How to Make a Sidebar Menu in SwiftUI](https://dev.to/tprezioso/how-to-make-a-sidebar-menu-in-swiftui-ejl)
* [Implementing Three Column Navigation in SwiftUI](https://serialcoder.dev/text-tutorials/swiftui/implementing-three-column-navigation-in-swiftui/)