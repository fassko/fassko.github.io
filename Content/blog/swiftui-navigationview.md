---
date: 2021-05-25 00:00
title: 
description: How to make most of NavigationView with SwiftUI
tags: swift, ios, swiftui, navigationview
---

Navigation from a view to another or just showing title and buttons is one the most used building blocks of iOS applications. Almost every app has this feature included. SwiftUI brings some new approaches how to show Navigation view, set its title, and add buttons. So let's check it out.

## Showing Navigation View

To show a Navigation using SwiftUI, we should use the `NavigationView` that is responsible for this purpose. It requires that we provide the `Content` that is a `View` type. It means we can pass anything starting from a text and ending with a scroll view.

To show a title for the navigation, SwiftUI has a different approach. We should set it as a view modifier not for the `NavigationView` but the `Content`.

```swift
var body: some View {
NavigationView {
  Text("Hello, world!")
    .navigationTitle("Test")
}
}
```

![Navigation View with a Title](navigation-title.png)

SwiftUI framework provides to specify the size of the `NavigationView`. We need to use the `.navigationBarTitleDisplayMode` modifier for the `Content` and provide display mode. `DisplayMode` type is an enum that has three cases:

* `automatic` - it inherits from the previous navigation item;
* `inline` - shows the small navigation size;
* `large` - uses the large navigation size.

Let's see how to use it in the code.

```swift
NavigationView {
      Text("Hello, world!")
        .navigationTitle("Title")
        .navigationBarTitleDisplayMode(.inline)
          
    }
```

![Small NavigationView](navigationview-small.png)

When we want to change it to a large size, we exchange the `.inline` to `.large`.

```swift
NavigationView {
      Text("Hello, world!")
        .navigationTitle("Title")
        .navigationBarTitleDisplayMode(.large)
    }
```

## Add Navigation View Buttons

Now that we know how to show the `NavigationView` let's explore how to add buttons. I want to the point that previously with SwiftUI, we used the `.navigationBarItems` view modifier, but now it is deprecated. Now we should call the `.toolbar` modifier, and it comes in various ways.

### Add a Single Button

Let's add a `Button` to the leading and trailing side of the `NavigationView`. We need to use the `.toolbar` view modifier and add it inside the `.ToolbarItem` view. To initialize the `.ToolbarItem`, we should provide the placement and content. Placement parameter is a type of struct `ToolbarItemPlacement`. This time we will look into only two properties from this type: 

* `navigationBarLeading` - shows the button on the leading side of the navigation bar;
* `navigationBarTrailing` - shows the button on the trailing side of the navigation bar.

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

Now that we know how to add a single button, let's check out how to add multiple buttons. We need to use the `ToolbarItemGroup` that represents a group of toolbar items.

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

Adding multiple buttons, we shouldn't go wild because it is hard to use the user interface because it can cover up the title of the navigation bar title.

## Change Navigation View Color

Right now, SwiftUI hasn't the option to change the color of the `NavigationView`. We need to turn back to UIKit and use the `UINavigationBarAppearance` to customize the navigation bar.

To change the color of the SwiftUI navigation bar, we can add the `init` method to the SwiftUI view and change the navigation bar appearance there.

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

We can see from the code that we should do multiple things like changing the background color and title text color. We can use either system colors or colors from the assets catalog.

![Navigation Bar with custom color](navigationview-custom-color.png)

## TL;DR

Navigation Bar is a very critical element of modern iOS and iPadOS applications. Usually, our apps have more than one screen, and our users have to navigate back and forth.

SwiftUI comes with a new view, `NavigationView`, and we need to completely shift our thinking about how we use it compared with UIKit.

With SwiftUI, it is very straightforward to add it on the screen, change the title and add buttons to the Navigation Bar. If we want to, for instance, change the color, we should go back to the UIKit. But I hope that will change quite soon.

## Links

* [Sample code](https://github.com/fassko/SwiftUINavigationView)

* [The Complete Guide to NavigationView in SwiftUI](https://www.hackingwithswift.com/articles/216/complete-guide-to-navigationview-in-swiftui)
* [SwiftUI NavigationView tutorial with examples](https://www.simpleswiftguide.com/swiftui-navigationview-tutorial-with-examples/)
* [Navigation Bar Styling in SwiftUI](https://youtu.be/kCJyhG8zjvY)
* [Navigation bar styling in SwiftUI](https://swiftuirecipes.com/blog/navigation-bar-styling-in-swiftui)
* [Customizing SwiftUI Navigation Bar](https://medium.com/@francisco.gindre/customizing-swiftui-navigation-bar-8369d42b8805)
* [Custom NavigationView Bar in SwiftUI](https://medium.com/swlh/custom-navigationview-bar-in-swiftui-4b782eb68e94)
* [https://www.hackingwithswift.com/quick-start/swiftui/how-to-add-bar-items-to-a-navigation-view](https://www.hackingwithswift.com/quick-start/swiftui/how-to-add-bar-items-to-a-navigation-view)
* [Customizing SwiftUI Navigation Bar](https://medium.com/@francisco.gindre/customizing-swiftui-navigation-bar-8369d42b8805)