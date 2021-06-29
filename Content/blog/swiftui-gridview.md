---
date: 2021-05-25 00:00
title: How to master grid layout in iOS with SwiftUI
description: 
tags: swift, ios, swiftui, gridview
---

Grid layouts help us to show views in a grid that expands either vertically or horizontally. We all have seen it for instance in iOS Photos application. Those who have worked with UIKit might know it as [UICollectionView](https://developer.apple.com/documentation/uikit/uicollectionview).

SwiftUI provides us with two nice options - `LazyVGrid` and `LazyHGrid`. This time we will dig deeper and understand how we can use these components. Great thing about these two components is that using them views are loaded lazily, it means when those appear on the screen.

I would like to note that `HStack` and `VStack` are available from iOS 14 and up. If you want to use grid layout in iOS 13 you should look into `HStack` and `VStack`, but drawback is that those don't support lazy loading.

## Creating a grid layout

To create a grid layout we need to go over three steps - have data set to show, configure the grid system and initialize the grid layout itself. We are going to look into the last two. How to provide the data is a much broader topic and out of scope of this post.

## Configure the grid layout

When initializing the grid layout we need to specify how it would look like - rows for vertical style and columns for horizontal style grid layout.

SwiftUI has a component to describe a single grid item `GridItem`. Grid item is either row or column.

When initializing the `GridItem` we need to provide three parameters:

* `size` - size of the item;
* `spacing` - spacing between the items;
* `alignment` - alignment when placing each grid item.

### Grid item size

We have three options to specify the size of the grid item:

* `flexible(minimum: CGFloat, maximum: CGFloat)` - single flexible item in available space with optional parameters for min and max size;
* `adaptive(minimum: CGFloat, maximum: CGFloat)` - multiple items in available space;
* `fixed(CGFloat)` - single item with a fixed size in available space.

Let's see how each of this case works in practice.

#### Flexible

With the flexible grid item size we can provide minimum and maximum but it works great even without that. The item size is calculated by dividing available space by item count.

```swift
[
  GridItem(.flexible()),
  GridItem(.flexible()),
  GridItem(.flexible()),
  GridItem(.flexible())
]
```

![Flexible LazyVGrid](/assets/swiftui-grid-layout/flexible-lazyvgrid.png)

#### Adaptive

Adaptive grid layout size is the most convenient `GridItem` size. We just need to provide the minimum and optionally maximum size and the SwiftUI layout guide will take all the heavy duty work away from us.

```swift
[
  GridItem(.adaptive(minimum: 50))
]
```

![Adaptive LazyVGrid](/assets/swiftui-grid-layout/adaptive-lazyvgrid.png)

#### Fixed

Fixed `GridItem` layout size is meant to use when we know the item size and it is constant.

```swift
[
      GridItem(.fixed(100)),
      GridItem(.fixed(100)),
      GridItem(.fixed(100))
    ]
```

![Fixed LazyVGrid](/assets/swiftui-grid-layout/fixed-lazyvgrid.png)

### Create the grid layout

* It is lazy and creates only when needed - test it with code
* Pinnable views - .sectionHeaders and .sectionFooters, need to use in combination with Section initializer

## TL;DR


## Links

* [Sample code]()

* []()
* []()
* []()
* []()
* []()
* []()
* https://developer.apple.com/documentation/swiftui/lazyvgrid

https://www.hackingwithswift.com/quick-start/swiftui/how-to-position-views-in-a-grid-using-lazyvgrid-and-lazyhgrid

https://swiftwithmajid.com/2020/07/08/mastering-grids-in-swiftui/

https://swiftui-lab.com/impossible-grids/

https://developer.apple.com/documentation/swiftui/section