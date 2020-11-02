---
layout: post
title: ! "Launch screen with SwiftUI"
categories: [swift, swiftui]
tags: [swift, apple, ios, swiftui]
---

Launch  Screen is the first interaction that users see when using our apps. That's why investing time in making our app launch screens feel responsive and visually appealing is important. We are playing with the perceived time and it can be a great first impression.

Apple in the last WWDC 2020 introduced a new way how to implement launch screen for SwiftUI apps in iOS 14 using Xcode 12. When we create a new SwiftUI app, this is the new way to make launch screens. We can still use the old way with the Storyboard launch screen with our existing apps.

<!--more-->

## Launch Screen in Info.plist

All the setup is done in the Info.plist file. We can see that there is an empty key `Launch Screen` with the Dictionary type. When we press the plus button there are a couple of options.

![Info.plist Launch Screen Dictionary options](/assets/img/swiftui-launch-screen/launch-screen-info.plist.png)

Now let's go over all of these options and learn how we can use them to set up our Launch Screens.

## Background color

At first, we can change the launch screen background color. It is a `String` value of the color name from the Asset catalog. By default, iOS is using the `systemBackground` color.

Let's add a new Color Set in our Assets catalog and name it `launchScreenBackground`:

![Color in Assets Catalog](/assets/img/swiftui-launch-screen/color-assets-catalog.png)

Then we can add a new key `launchScreenBackground` to the `Launch Screen` dictionary in the Info.plist file. Now when we run the app we'll see this color background on the launch screen.

## Background Image

After the background color is set let's show an image in front of it. There are two options we can use to configure that:

* `Image Name` is an image name from the Assets catalog.
* `Image respects safe area insets` is a `Boolean` describing if the image needs to respect the safe area, respectively it won't go outside the safe area borders.

Let's say we have a Swift logo in the Assets catalog which is an SVG file. In Xcode 12 SVG images are fully supported (finally). The name for this image is `swift`:

![Swift logo in Assets Catalog](/assets/img/swiftui-launch-screen/swift-logo-assets.png)

Now we can add the image in the Info.plist in the `Launch Screen` dictionary using the key `Image Name`. By setting the `Image respects safe area insets` option to `true` we are sure that it scales correctly and does not go outside the safe area. The image is in SVG file format and scales perfectly without sacrificing the image quality.

Now when launching the app we can see the background color and the Swift logo on top of it.

![Swift logo on the Launch Screen](/assets/img/swiftui-launch-screen/launch-screen-swift-logo.png)

## Extra options

There are a couple of options more we can use to configure the Launch Screen:

* `Show Navigation bar` - show the navigation bar with an image.
* `Show Tab bar` - show the tab ar with an image.
* `Show Toolbar` - show the toolbar with an image.

This time we won't look more into these options, because most of the time the launch screen would consist of background color and image.

## TL;DR

Launch screen "perceived time" should feel fast for the user.

In WWDC 2020 Apple introduced a new way for SwiftUI apps on how to create the launch screens by using Info.plist and Assets catalog capabilities.

The old way with storyboard launch screens still works fine, but we can assume that in the future it may be deprecated.

## Links

* [Launch Screens and the SwiftUI App Life Cycle on iOS 14](https://danielbernal.co/creating-a-launch-screen-with-swift-ui/)
* [Customize your app’s Launch Screen using its Info Plist](https://wwdcbysundell.com/2020/launch-screen-info-plist/)
* [Launch screens in Xcode: All the options explained](https://www.avanderlee.com/xcode/launch-screen/)
* [Human Interface Guidelines - Launch Screen](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/launch-screen/)
* [Dropping launch storyboards](https://useyourloaf.com/blog/dropping-launch-storyboards/)
