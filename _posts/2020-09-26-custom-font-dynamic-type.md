---
layout: post
title: ! "Use Custom Font with Dynamic Type in iOS apps"
categories: [swift, dynamic type]
tags: [dynamic type, swift, apple, ios]
---

A while back we [looked into](/embracing-dynamic-type/) how to embrace the dynamic type with system font. This time we are going to check out how to use dynamic type with custom font in our iOS apps. Apple provides us great APIs to make our apps accessible even if we're using custom font styles.

<!--more-->

## Add custom font to app

At first we need to add our custom font to the project. There are several steps involved.

We need to add font file to the Xcode app project. Currently True Type Font (.ttf) and Open Type Font (.otf) files are being supported. Just drag and drop files in your XCode project. Be careful and select targets you want to use this font.


picture dragging files to xcode project


After that is done head down to `Info.plist` file and add new entry with key “Fonts provided by application”. There we need to provide an array with all the font files we have been added to the project.

To check if the font files have been added and we can use this piece of code to print all available font families and it’s names.

```swift

UIFont.familyNames.sorted().forEach { fontFamily in
    print("Family: \(fontFamily)")
    
    UIFont.fontNames(forFamilyName: fontFamily).forEach { fontName in
        print("    name: \(fontName)")
    }
}

```

Just paste this code in your `AppDelegate` `didFinishLaunchingWithOptions` and when you run the app it will print font families and it’s names in the console.

## Use Custom Font with Dynamic type

To use Dynamic Type with custom fonts we need to use ``UIFontMetrics`. It is a utility object that helps to obtain custom fonts that scale accordingly to text size presences and accessibility settings.

To do it at first we need to initialize an instance of custom font with a concrete size. To determine specific size we can use the dynamic type sizes [table](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/) from human interface guidelines typography section.


Image with Dynamic Type Sizes table


Let’s say we have added a label that has a large title behavior, so it means we need to use 34 point size font. Then we use `UIFontMetrics` and initialize an instance for specific text style. In the end we set the font for our label using `scaledFont` function and providing our custom font.

```swift

guard let font = UIFont(name: "Proxima Nova-Regular", size: 34) else {
    fatalError("Can't find the custom font")
}

let fontMetrics = UIFontMetrics(forTextStyle: .largeTitle)
label.font = fontMetrics.scaledFont(for: font)

```

## Update upon Text Size changes

To test how everything works we can simply enable text size in  Xcode Environment Overrides.


image from xcode environment overrides

If you change it you can notice that nothing is happening in our app. To enable automatic change we need to set 	`adjustsFontForContentSizeCategory`. It indicates if the object should automatically update it’s font when device category changes.


```swift

  label.adjustsFontForContentSizeCategory = true
  
```

Now we can fully test and we should see that our label font adjusts according to the text size and accessibility settings.
  
## TL;DR

Supporting Dynamic Type with custom font might sound like a tricky task to do. Actually it is a quite straight forward task.
Using `UIFontMetrics` utility object we can scale our custom font according to what user has specified in text size or accessibility settings.

## Links

* [Building Apps with Dynamic Type](https://developer.apple.com/videos/play/wwdc2017/245/)
* [How to resize a custom font using UIFontMetrics](https://www.hackingwithswift.com/example-code/uikit/how-to-resize-a-custom-font-using-uifontmetrics)
* [Using A Custom Font With Dynamic Type](https://useyourloaf.com/blog/using-a-custom-font-with-dynamic-type/)
* [The iOS Font Size Guidelines](https://learnui.design/blog/ios-font-size-guidelines.html)
* [Adding a Custom Font to Your App](https://developer.apple.com/documentation/uikit/text_display_and_fonts/adding_a_custom_font_to_your_app)
* [Typography - Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/)
