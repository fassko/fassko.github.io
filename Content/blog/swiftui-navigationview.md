---
date: 2021-05-25 00:00
title: 
description: How to make most of NavigationView with SwiftUI
tags: swift, ios, swiftui, navigationview
---

Navigation from a view to a another view or just showing title and buttons is one the most used building blocks of iOS applications. Almost every app has this feature included. SwiftUI brings some new approaches how do show Navigation view, set it's title and add buttons. So let's check it out.

## Showing Navigation View

To show a Navigation using SwiftUI we should use the `NavigationView` that is responsible for this purpose. It requires that we provide the `Content` that is a `View` type. It means we can pass anything starting from a text and ending with a scroll view.

To show a title for the navigation SwiftUI has a different approach. We should set it as a view modifier not for the `NavigationView` but for the `Content`.

```swift
var body: some View {
NavigationView {
  Text("Hello, world!")
    .navigationTitle("Test")
}
}
```

![Navigation View with a Title](navigation-title.png)

SwiftUI framework provides to specify the size of the `NavigationView`. To do that we need to use the `.navigationBarTitleDisplayMode` modifier for the `Content` and provide display mode. `DisplayMode` type is an enum that has three cases:

* `automatic` - it inherits from the previous navigation item;
* `inline` - shows the small navigation size;
* `large` - uses the large navigation size.

Let's see how to use in the code.

```swift
NavigationView {
      Text("Hello, world!")
        .navigationTitle("Title")
        .navigationBarTitleDisplayMode(.inline)
          
    }
```

![Small NavigationView](navigationview-small.png)

When we want to change it to large size then we exchange the `.inline` to `.large`.

```swift
NavigationView {
      Text("Hello, world!")
        .navigationTitle("Title")
        .navigationBarTitleDisplayMode(.large)
    }
```

## Add Navigation View Buttons

Now that we know how to show the `NavigationView` let's explore how to add buttons to it. I want to point that previously with SwiftUI we used the `.navigationBarItems` view modifier but now it is deprecated. Now we should us the `.toolbar` modifier and it comes in various ways.

### Add a single Button

Let's add a `Button` to the leading and trailing side of the `NavigationView`. To do that we need to use the `.toolbar` view modifier and add inside the `.ToolbarItem` view. To initialize the `.ToolbarItem` we should provide the placement and content. Placement parameter is a type of struct `ToolbarItemPlacement`. This time we will look into only two properties from this type: 

* `navigationBarLeading` - shows the button in the leading side of the navigation bar;
* `navigationBarTrailing` - shows the button in the trailing side of the navigation bar.

```swift
var body: some View {
    NavigationView {
      Text("Buttons Example")
        .navigationTitle("Buttons")
        .toolbar {
          ToolbarItem(placement: .navigationBarLeading) {
            Button(action: {
              print("Refresh")
            }) {
              Label("Send", systemImage: "paperplane.fill")
            }
          }
          ToolbarItem(placement: .navigationBarTrailing) {
            Button(action: {
              print("Refresh")
            }) {
              Label("Refresh", systemImage: "arrow.clockwise")
            }
          }
        }
    }
  }
```

![Single Button NavigationView](navigationview-single-button.png)

### Add multiple buttons

Now that we know how to add single button let's check out how to add multiple buttons. To do that we need to use the `ToolbarItemGroup` that represents a group of tool bar items.

```swift
.toolbar {
          ToolbarItemGroup(placement: .navigationBarLeading) {
            Button(action: {
              print("Send")
            }) {
              Label("Send", systemImage: "paperplane.fill")
            }
          }

          ToolbarItemGroup(placement: .navigationBarTrailing) {
            Button(action: {
              print("Refresh")
            }) {
              Label("Refresh", systemImage: "arrow.clockwise")
            }

            Button(action: {
              print("Edit")
            }) {
              Label("Edit", systemImage: "slider.horizontal.3")
            }
          }
        }
```

![Multiple Buttons NavigationView](navigationview-multiple-buttons.png)

Adding multiple buttons we shouldn't go wild because not only it is hard to use user interface but it can cover up the title of the navigation bar title.

## Change Navigation View Color

Right now SwiftUI hasn't option to change the color of the `NavigationView`. For that we need to turn back to UIKit and use the `UINavigationBarAppearance` to customize the navigation bar.

To change the color of the SwiftUI navigation bar we can add the `init` method to the SwiftUI view and change navigation bar appearance there.

```swift
init() {
    let coloredAppearance = UINavigationBarAppearance()
    coloredAppearance.configureWithOpaqueBackground()
    coloredAppearance.backgroundColor = .systemRed
    coloredAppearance.titleTextAttributes = [.foregroundColor: UIColor.white]
    coloredAppearance.largeTitleTextAttributes = [.foregroundColor: UIColor.white]
    
    UINavigationBar.appearance().standardAppearance = coloredAppearance
    UINavigationBar.appearance().compactAppearance = coloredAppearance
    UINavigationBar.appearance().scrollEdgeAppearance = coloredAppearance
    
    UINavigationBar.appearance().tintColor = .white
  }
  
  var body: some View {
    NavigationView {
      Text("Navigtion Bar with different color")
        .navigationTitle("Title")
    }
  }
```

We can see from the code that we should do multiple things like changing the background color and title text color. We can use either system colors or color from the assets catalog.

![Navigation Bar with cutom color](navigationview-custom-color.png)

## TL;DR



## Links

* [Sample code](https://github.com/fassko/SwiftUINavigationView)

* [https://www.hackingwithswift.com/articles/216/complete-guide-to-navigationview-in-swiftui]()
* [https://developer.apple.com/tutorials/swiftui/building-lists-and-navigation]()
* [https://www.simpleswiftguide.com/swiftui-navigationview-tutorial-with-examples/]()
* [https://youtu.be/kCJyhG8zjvY]()
* [https://swiftuirecipes.com/blog/navigation-bar-styling-in-swiftui]()
* [https://medium.com/@francisco.gindre/customizing-swiftui-navigation-bar-8369d42b8805]()
* [https://medium.com/swlh/custom-navigationview-bar-in-swiftui-4b782eb68e94]()
* [https://www.hackingwithswift.com/quick-start/swiftui/how-to-add-bar-items-to-a-navigation-view]()
* [https://medium.com/@francisco.gindre/customizing-swiftui-navigation-bar-8369d42b8805]()
