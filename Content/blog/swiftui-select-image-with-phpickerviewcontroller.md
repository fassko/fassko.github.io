---
date: 2021-01-09 00:00
title: How to select images using PHPickerViewController with SwiftUI
description: Selecting images from our iPhone library is needed when changing a profile picture, posting an update, or sharing the photo of your pet. In this post, we are going to look into how to use `PHPickerViewController` with SwiftUI. Apple announced this view controller at WWDC2020.
tags: swift, apple, ios, swiftui, images
---

Selecting images from our iPhone library is needed when changing a profile picture, posting an update, or sharing the photo of your pet. In this post, we are going to look into how to use `PHPickerViewController` with SwiftUI. Apple announced this view controller at [WWDC2020](https://developer.apple.com/wwdc20/).

## What is PHPickerViewController?

`PHPickerViewController` is a view controller that gives way for our app users to pick assets from their photo library. It provides a well-known user interface, and we don’t need to bother about building that.

One nicety that comes with this approach is that we don’t need to worry about adding information to access our user’s photo library in `Info.plist` file. Users can decide to allow access either to all photo library or selectively grant access to particular photos. That solves privacy concerns where apps could read the whole library and even [track people](https://krausefx.com/blog/ios-privacy-detectlocation-an-easy-way-to-access-the-users-ios-location-data-without-actually-having-access).

### Creating a `PHPickerViewController`

To create a `PHPickerViewController` we need to initialize it by passing configuration, which is an instance of `PHPickerConfiguration`. For the configuration, we need to specify what type of pictures we want and set the selection limit.

For the `PHPickerViewController` itself, we set the delegate that needs to implement `PHPickerViewControllerDelegate` protocol. It has just one method that gives a signal when our user has selected photos.

## Integrate with SwiftUI

To use the `PHPickerViewController` in SwiftUI apps, we need to use the `UIViewControllerRepresentable` to represent an UIKit view controller. Let’s go over all the steps required in doing that.

### Setting up the UIKit view controller

`UIViewControllerRepresentable` is a protocol and requires to implement two methods:

* `makeUIViewController` - create and configure the view controller;
* `updateUIViewControoler` - update the state of the view controller.

We are going to create and configure the `PHPickerViewController` in the `makeUIViewController` method. We don’t need to update it, so we can leave the `updateUIViewControoler` empty.

```swift
struct PhotoPicker: UIViewControllerRepresentable {
  @Binding var pickerResult: [UIImage] // pass images back to the SwiftUI view
  @Binding var isPresented: Bool // close the modal view
  
  func makeUIViewController(context: Context) -> some UIViewController {
    var configuration = PHPickerConfiguration(photoLibrary: PHPhotoLibrary.shared())
    configuration.filter = .images // filter only to images
    configuration.selectionLimit = 0 // ignore limit
    
    let photoPickerViewController = PHPickerViewController(configuration: configuration)
    photoPickerViewController.delegate = context.coordinator // Use Coordinator for delegation
    return photoPickerViewController
  }
  
  func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) { }
}
```

### Coordinator

Now we can present the `PHPickerViewController`, but how can we transfer back the selected images? We need to use the `makeCoordinator` method and create the `Coordinator` class that implements the `PHPickerViewControllerDelegate` protocol. It is a thoughtful approach to how the SwiftUI can communicate with the UIKit delegation pattern idea.

```swift
struct PhotoPicker: UIViewControllerRepresentable {

  // ...

  func makeCoordinator() -> Coordinator {
    Coordinator(self)
  }
  
  // Create the Coordinator, in this case it is a way to communicate with the PHPickerViewController
  class Coordinator: PHPickerViewControllerDelegate {
    private let parent: PhotoPicker
    
    init(_ parent: PhotoPicker) {
      self.parent = parent
    }
    
    func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
    }
  }
}
```

## Using UIKit with SwiftUI

Let’s put it all together. We need to create a SwiftUI view to present the photo picker view and present it as a modal. You can read more about how to display a modal view in SwiftUI in my [previous post](/blog/swiftui-modal-view/).

```swift
.sheet(isPresented: $photoPickerIsPresented) {
  // Present the photo picker view modally
  PhotoPicker(pickerResult: $pickerResult,
              isPresented: $photoPickerIsPresented)
}
```

### Passing data from UIKit to SwiftUI

To get photos of what users have selected, let’s use `@State` variable and pass it to the `PhotoPicker` view using `@Binding` [property wrapper](https://swiftuipropertywrappers.com/#binding).

Now we can fully complete the `PHPickerViewControllerDelegate` protocol for our `Coordinator` class. 

```swift
func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
  parent.pickerResult.removeAll() // remove previous pictures from the main view
  
  // unpack the selected items
  for image in results {
    if image.itemProvider.canLoadObject(ofClass: UIImage.self) {
      image.itemProvider.loadObject(ofClass: UIImage.self) { [weak self] newImage, error in
        if let error = error {
          print("Can't load image \(error.localizedDescription)")
        } else if let image = newImage as? UIImage {
          // Add new image and pass it back to the main view
          self?.parent.pickerResult.append(image)
        }
      }
    } else {
      print("Can't load asset")
    }
  }
  
  // close the modal view
  parent.isPresented = false
}
```

What we are doing here is unpacking selected items from the photo library and set them to the parent’s `@Binding` variable. By doing so, we are transferring the data back to the main view.

### Present the selected images

To present the picked photos, we can iterate over and show them in a `ScrollView`.

```swift
ScrollView {
  ForEach(pickerResult, id: \.self) { uiImage in
    ImageView(uiImage: uiImage)
  }
}
```

An important fact is that the type of image is `UIImage`, but luckily SwiftUI provides a nice initializer for the `Image` view passing the `UIImage` type.

You can check out the full implementation [here](https://github.com/fassko/PHPickerViewController-SwiftUI).

## TL;DR

Selecting images and using them in our apps is an essential feature in modern iOS applications. Apple announced in WWDC2020 a new way to do it in a more secure and granular way - `PHPickerViewController`. Note that it is available only from iOS14 and later versions.

To use the `PHPickerViewController` with SwiftUI, we need to implement the `UIViewControllerRepresentable` protocol. It allows communicating from and to UIKit view controllers flawlessly.

## Links

* [Sample code](https://github.com/fassko/PHPickerViewController-SwiftUI)

* [PHPickerViewController documentation](https://developer.apple.com/documentation/photokit/phpickerviewcontroller)
* [iOS Privacy: detect.location - An easy way to access the user's iOS location data without actually having access](https://krausefx.com/blog/ios-privacy-detectlocation-an-easy-way-to-access-the-users-ios-location-data-without-actually-having-access)
* [Adopting the new PHPicker](https://www.kairadiagne.com/2020/11/04/adopting-the-new-photo-picker.html)
* [Checking out the new PHPickerViewController in iOS 14](https://nemecek.be/blog/30/checking-out-the-new-phpickerviewcontroller-in-ios-14-to-select-photos-or-videos)
* [Replacing UIImagePickerController with PHPickerViewController](https://ohmyswift.com/blog/2020/08/29/replacing-uiimagepickercontroller-with-phpickerviewcontroller/)
* [Using PHPickerViewController Images in a Memory-Efficient Way](https://christianselig.com/2020/09/phpickerviewcontroller-efficiently/)
