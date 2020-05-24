---
layout: post
title: ! "Taking in consideration Dynamic Type"
categories: [swift]
tags: [dynamic type, accessibility, apple, ios]
---

Every year third Thursday of May is the Global Accessibility Awareness Day (GAAD). This time I want to focus on Dynamic Type in iOS, iPadOS and macOS projects. Implementing font scaling we can improve lives for more than one billion people with disabilities and impairments.

<!--more-->

More than 40% of users have changed font size to non default one. It isn’t just bigger font size. Quite large chunk of folks have set it to smaller just because more information fits on the screen.

We should take in account how users want to interact with apps we build. Apple which is a huge accessibility advocate has written in Human Interface Guidelines that we should use text styles that provides flexibility and adaptability by default.

## What is Dynamic Type

Dynamic Type is a feature to help developers to trigger and change text size according to user’s text settings. This feature is available from iOS 7. It means it has been a while and we should embrace it.

Users can change text size in Settings app > General > Accessibility > Larger Text. By default text size slider is in the center.

[image of settings app]

## How to support Dynamic Type

The easiest way to support Dynamic Type in your apps is to use system provided text styles. By using this option you get Dynamic Type for free. For our disposal there are many text styles for titles, body, captions and more.

Starting from iOS 11 you can implement scaling for custom fonts with UIFontMetrics. During this post we won’t look into that.

Let’s see how we can use system text styles using UIKit and SwiftU I.

### UIKit

With good old UIKit we can use Dynamic Text styles either with  Storyboard or programmatically. We will not start a battle which is better. :)

#### Storyboard

In Storyboard let’s say you have a Label view. In Inspector view you need to check the Dynamic Type checkbox.

[image with checkbox]

Once that is done then just change font by selecting one of the provided Text Style.

[image text style]

#### Programmatically

If you like to create the user interface from code then you need to use `preferredFont(forTextStyle:)` and set `adjustsFontForContentSizeCategory` to true. Basically it does the same what we saw with Storyboard approach.

```swift

Code

```

### SwiftUI

SwiftUI supports font scaling out of the box. But once we want to set custom font we can use Dynamic Text Style. For that we need to use `.font` directive passing a text style.

```swift

struct TextView: View {
    let text: String

    var body: some View {
        VStack(alignment: .leading) {
            Text(text)
                .font(.headLine)
        }
    }
}

```
	
## How to test Dynamic Type

When developing apps you can test Dynamic Type support in two ways - changing font size using Environment Overrides or Accessibility inspector. Both options can give quick and rapid feedback when developing apps.

![run conf image]

When running your app either in Simulator or on the device you can change environment variables from Debug Men. That allows quickly change text size and more.

[accesability inspector image]

Second option is to use Accessibility Inspector tool. This option is tailored to check how your apps support accessibility features and quickly enable, disable or change each of them.
	
## TL;DR

Accessibility has been an important topic lately in last WWDC and overall in technology. By making our apps and solutions accessible we not only help our current users but we can tackle new users who previously couldn’t use our apps.

Dynamic Type is an iOS feature that scales font according to user’s settings. More than 40% of users have changed default system font size. Both larger and smaller. 

The easiest way to support Dynamic Type is to use System Font Styles either from Storyboard or programmatically with UIKit. If you are using SwiftUI font scaling comes out of the box, but sure enough you can use System Styles let’s say for titles and captions.

## Links

* https://developer.apple.com/documentation/uikit/uifont/scaling_fonts_automatically
* https://developer.apple.com/videos/play/wwdc2017/245/
* https://fluffy.es/introduction-to-dynamic-type/
* https://pspdfkit.com/blog/2018/improving-dynamic-type-support/
* https://swiftwithmajid.com/2019/10/09/dynamic-type-in-swiftui/
* https://www.hackingwithswift.com/quick-start/swiftui/how-to-use-dynamic-type-with-a-custom-font