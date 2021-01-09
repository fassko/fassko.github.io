---
date: 2021-01-09 00:00
title: How to select images using PHPickerViewController with SwiftUI
description: 
tags: swift, apple, ios, swiftui, images
---

Selecting images from our iPhones is needed when for instance changing a profile picture, posting an update or sharing the picture of your pet. In this post we are going to look into how to use `PHPickerViewController` with SwiftUI. This controller was announced in WWDC2020.

## What is PHPickerViewController?

`PHPickerViewController` is a view controller that gives the way for our app users to select assets from their photo library. It provides a user interface and we don’t need to worry about building that.

One nicety that comes with this approach is that we don’t need to worry about adding information that we want to access our user’s photo library in `Info.plist` file. Users can select to allow either to all photo library ir selectively grant access to specific photos. This solves an issue with privacy where apps could read entire library and even [track people](https://krausefx.com/blog/ios-privacy-detectlocation-an-easy-way-to-access-the-users-ios-location-data-without-actually-having-access).

### Creating a `PHPickerViewController`

To create a `PHPickerViewController` we need to initalise it passing configuration which is an instance of `PHPickerConfiguration`. For the configuration we need to specify what type of images we want and selection limit.

For the `PHPickerViewController` itself we set the delegate which needs to implement `PHPickerViewControllerDelegate` protocol. It has just one method that gives a signal when photos have been picked by our user.

## Integrate with SwiftUI

To use the `PHPickerViewController` in SwiftUI apps we need to use the `UIViewControllerRepresentable` to represent an UIKit view controller. Let’s go over all the steps involved.

### Setting up the UIKit view controller

`UIViewControllerRepresentable` is a protocol and requires to implement two methods:

* `makeUIViewController` - create and configure the view controller;
* `updateUIViewControoler` - update the state of the view controller.

We are going to create and configure the `PHPickerViewController` in the `makeUIViewController` method. We don’t need to update it so we can leave the `updateUIViewControoler` empty.

```swift

Create PHPickerViewController in the UIViewrepresentable

```

### Coordinator

Now we can present the `PHPickerViewController` but how to inform back about the selected images? For that we need use the `makeCoordinator` method. For that we need to create the `Coordinator` class that implements the `PHPickerViewControllerDelegate` protocol. It is a clever way how SwiftUI can communicate with the UIKit delegation pattern approach.

```swift

Make coordinator

```

## Using UIKit with SwiftUI

Let’s put it all together. To do that let’s create a SwiftUI view where we can present the photo picker view. We can present it modally. You can read more about modal view in SwiftUI in my previous post !!!!!!!!

```swift

Present PhotoPicker modally

```

### Passing data from UIKit to SwiftUI

To get photos what user has selected let’s use `@State` variable and pass it to the `PhotoPicker` view using `@Binding` [property wrapper](https://swiftuipropertywrappers.com/#binding).

Now we need to fully implement the `PHPickerViewControllerDelegate` protocol for our `Coordinator` class. 

```swift

```

What we are doing here is unpacking selected items from the photo library and setting it to the parent’s `@Binding` variable. Just like that we can pass data back to the main view.

### Present the selected images

To present the selected images we can iterate over and show it in a `ScrollView`.

```swift
Scroll view
```

We need to be aware that the type of the images is `UIImage`. Gladly SwiftUI provides a nice initializer for the `Image` view passing the `UIImage` type in.

## TL;DR

Selecting images and using in our apps is a very important feature. Apple announced new way how to do it in a secure and more granular way - `PHPickerViewController`. It is available only from iOS14 and later versions.

To use the `PHPickerViewController` with SwiftUI we need to implement the `UIViewControllerRepresentable` protocol. It allows to communicate from and to UIKit view controllers.

## Links

* [iOS Privacy: detect.location - An easy way to access the user's iOS location data without actually having access](https://krausefx.com/blog/ios-privacy-detectlocation-an-easy-way-to-access-the-users-ios-location-data-without-actually-having-access)
* []()
* []()
