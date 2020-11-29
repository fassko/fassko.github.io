---
layout: post
title: ! "How to deal with modal views (a.k.a. sheets) with SwiftUI"
categories: [swift, swiftui]
tags: [swift, apple, ios, swiftui, modal, sheet]
---

Showing a modal view is one of the essential things to present a piece of little extra information. By doing that, we are not sacrificing the user interface to our users. With UIKit we can do it with `presentViewController:animated:completion:` [function](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621380-presentviewcontroller).

Using SwiftUI, we need to twist our thinking towards using view or app state, and the modal view is called a sheet. Now let’s check it out in detail.

<!--more-->

## Open modal view a.k.a. sheet

SwiftUI sheets help us show a modal view to our users. `sheet` is an instance method to the [View Presentation](https://developer.apple.com/documentation/swiftui/view-presentation). It describes how we can show our SwiftUI views on specific user journey scenarios.

Let’s say we want to present information about our app to the users. 

Firstly, we need to bind with Bool value whether the app should show the modal view. The keyword here “should” because once we dismiss the presented view value is set back to false. This value can be decorated with `@State` property wrapper or could come from `ObservableObject` ViewModel. For simlicity reasons we’re not going to talk about ViewModels in this post.

Secondly, we need to change the view or in some cases app state. Once we are using the `@State` property wrapper we can just set it to `true` and SwiftUI will do the rest to present the modal view.

Let’s look how we can do it in the code:

```swift

```

When we run the app we can now open the modal view and see the detailed information.

IMAGE IMAGE IMAGE IMAGE

## Close modal view programmatically

Our app users can simply slide the modal view down and it will hide with a nice animation. If we want to hide it from the main or let’s call it responsible showing modal view one we just set the state to false. 

Now is the question how to do it from the modal view itself? We have two options on our disposal:

* using `@Environment` property `presentationMode`
* passing the state to the modal view as a binding

Let’s see how we can us both of these options.

### Using Environment

Property wrapper `@Environment` allows us to read and change the values of the view environment state. To hide the modal view we need to change the `presentationMode` property. At first we need to define in our view struct that we are going to use it. To do it we should add it to the modal view properties:

```swift
struct ModalView: View {
  @Environment(\.presentationMode) var presentationMode

// ...
}
```

Now we can dismiss the modal view by altering the presentation mode wrapped value:

```swift
presentationMode.wrappedValue.dismiss()
```

This is quite cumbersome and dealing with environment properties can cause unexpected issues that are very hard to track down and debug.

### Using a binding

By using a binding between the view that is presenting modal view and the modal view itself is another way how we can hide it from the code.

First, we need to add a new property to modal view struct using `@Binding` property wrapper. It describes that this value comes from somewhre else outside the view scope.

```swift

struct ModalView: View {
  @Binding var isPresented: Bool
  
  // ...
}
```

Now when we are initializing the `ModalView` we need to pass the  `isPresented` in.

```swift
.sheet(isPresented: $isModalViewPresented) {
  ModalView(isPresented: $isModalViewPresented)
}
```

Using this approach we are sure that this variable belongs only to these two views. It is much easier to test and debug.

## Multiple sheets on one page

Now we know how to present a modal view, but how can we show multiple modal views. Let’s say we want to show from the main app view information about the app and the settings view.

We can do it using these two approaches:

* using multiple sheet presenting functions
* using `Identifiable` enum to keep state of currently presented sheet

### Multiple sheet functions

We can attach `sheet` function to any SwiftUI view or control, for instance to the `Button`:

```swift

Button(....
.sheet(...

```

If we have two buttons it can be fine, but let’s say we have more than that. It can get quite messy and we should deal with multiple `@State` variables.

### Using enum of all modal views

If we head down to Apple official documentation there is another [function](https://developer.apple.com/documentation/swiftui/view/actionsheet(item:content:)) to show a sheet using the item that is a data source for the sheet’s content. Let’s try to use it.

At first we need to define our enum with all modal view types:

```swift

enum Sheet: Identifiable {
case info
case settings
}

```

Now we can use in the SwiftUI view. For that we need new `@State` variable with optional type `Sheet` and use it to determine which modal view we would like to present.

```swift

struct MainView: View {
@State var activeSheet: Sheet?

// ...

```

One caviat with this approach is that we need to change a bit our approch hiding the view from the code. To do that we just set it to `nil`.

This approach is much safer because we are using enumeration type and keeping everything well organized elsewhere in the code.

## TL;DR

Modal views in SwiftUI are presented using sheet modifier on a view or control. The simplest way is to have `@State` property to indicate when it should be visible.
To hide modal view we can use environment parameter or pass a binding to the modal view object.
Showing multiple sheets can be achieved either with multiple sheet modifiers of using object with all sheet enumerations. As well keeping active sheet state.

## Links

* []()


https://www.hackingwithswift.com/quick-start/swiftui/how-to-present-a-new-view-using-sheets

https://www.hackingwithswift.com/quick-start/swiftui/how-to-present-a-full-screen-modal-view-using-fullscreencover
https://swiftwithmajid.com/2019/07/24/alerts-actionsheets-modals-and-popovers-in-swiftui/
https://developer.apple.com/documentation/swiftui/view/sheet(ispresented:ondismiss:content:)https://masilotti.com/multiple-sheets-swiftui/
https://www.simpleswiftguide.com/how-to-present-sheet-modally-in-swiftui/
https://stackoverflow.com/questions/58837007/multiple-sheetispresented-doesnt-work-in-swiftui