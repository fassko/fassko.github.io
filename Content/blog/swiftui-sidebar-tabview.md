---
date: 2021-11-21 00:00
title: Improve iPad sidebar navigation on the iPhone with SwiftUI
tags: swift, ios, swiftui, sidebar, ipad
description: 
---

We learned how to add a sidebar for iPad in the previous blog post, but this approach isn't that great for the iPhone. It looks pretty weird, and once we configure a default view, it automatically navigates to it once the iPhone app starts. This isn't partially great on the phone but makes total sense on the iPad. We can improve that by showing a sidebar for the iPad and a TabView on the iPhone.

## Checking if the device is an iPad

At first, we need to distinguish whether the app is running on the iPhone or the iPad. To do that, we should use the `UIUserInterfaceIdiom` enum. It can answer the question of what kind of device the app is running, starting with the phone and ending with the car within carplay.

This time we are interested in two enum cases:
* `phone` - interface for the iPhone or iPod touch;
* `pad` - interface for the iPad.

To get the current device interface, we need to access it from the UIDevice class that represents the current running device. To retrieve the user interface idiom, we need to get it from the existing class variable from the UIDevice class. Then from the `userInterfaceIdiom` variable, we get the current device idiom.

To access this in a bit nicer way, we can extend the `UIDevice` class and add a new static variable that would be a shorthand version of the process explained before.

```swift
extension UIDevice {
  static var idiom: UIUserInterfaceIdiom {
    UIDevice.current.userInterfaceIdiom
  }
}
```

To make it even more sugar-coated, we can add two static variables to see if the device is an iPhone or an iPad.

```swift
extension UIDevice {
static var isIpad: Bool {
    idiom == .pad
  }
  
  static var isiPhone: Bool {
    idiom == .phone
  }
}
```

## Dividing navigation

Now that we know what kind of device our app users are having, we can divide the navigation. That means we are going to use the `TabView` and for the iPad - sidebar for the iPhone.

After creating a new SwiftUI project with the Xcode, we could separate the navigation in the 'ContentView.swift` file. Then right in the `body` we can add the logical statement checking if the device is an iPad, and in another way, it can be a phone view.

```swift
struct ContentView: View {
  var body: some View {
    if UIDevice.isIpad {
     // iPad view
    } else {
	    // iPhone view
    }
  }
}
```

Now we need to populate both steps with the [sidebar for the iPad]() and [tabview for the iPhone](). We have looked into doing both of these tasks before, so we aren't doing that in-depth again. Complete code you can check in the [sample project]().

```swift
struct ContentView: View {
  var body: some View {
    if UIDevice.isIpad {
      NavigationView {
        List {
          NavigationLink(destination: DashboardView()) {
            Label("Dashboard", systemImage: "square.dashed")
          }

          // ...
        }
      
        DashboardView()
      }
    } else {
      TabView {
        DashboardView()
          .tabItem {
            Label("Dashboard", systemImage: "square.dashed")
          }

        // ...
      }
	  }
  }
}
```

What we can do is extract both steps to the struct variables to separate the concerns.

```swift
struct ContentView: View {
  var body: some View {
    if UIDevice.isIpad {
      sidebar
    } else {
      tabview
    }
  }
  
  private var sidebar: some View {
    NavigationView {
      List {
        NavigationLink(destination: DashboardView()) {
          Label("Dashboard", systemImage: "square.dashed")
        }
        // ...
    }
      
      DashboardView()
    }
  }
  
  private var tabview: some View {
    TabView {
      DashboardView()
        .tabItem {
          Label("Dashboard", systemImage: "square.dashed")
        }

      // ..
    }
  }
}
```

## Limitations

Life isn't just rainbows and butterflies. There are some limitations to this approach. iPhone tab view can hold up to five items. If there are more tabs, then it goes under the more tab.

![iPhone TabView More tab](/assets/swiftui-sidebar-tabview/iphone-tabview-more.png)

We need to consider this approach by showing the tab view instead of the navigation list for the iPhone. Another way could be to show a custom view that we aren't looking into in this article.

## TL;DR

Sidebar is a great way how to show quick navigation to multiple views on the iPad. Sadly, it looks wrong as a list on the iPhone and automatically navigates to the default view. We can improve that by showing a tab view for the iPhone and sidebar for the iPad user interfaces.  We need to remember that a tab view can hold up to five items on the iPhone.

## Links

* [Sample code](https://github.com/fassko/SwiftUISidebar)

* [UIUserInterfaceIdiom documentation](https://developer.apple.com/documentation/uikit/uiuserinterfaceidiom)
* [UIDevice documentation](https://developer.apple.com/documentation/uikit/uidevice/)
* [The hidden secrets of TabView in iOS with SwiftUI](https://kristaps.me/blog/swiftui-tabview/)
* [How Sidebar works on iPad with SwiftUI](https://kristaps.me/blog/swiftui-sidebar/)