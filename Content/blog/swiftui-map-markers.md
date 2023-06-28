---
date: 2023-06-25 00:00
title: Creating Interactive Maps with Custom Markers Using SwiftUI in iOS 17
tags: swift, swiftui, mapkit
description:
---

With the release of iOS 17, Apple introduces an exciting enhancement to SwiftUI that revolutionizes how we add markers on maps. With the new SwiftUI in iOS 17, you can easily customize markers to match your app's aesthetic and branding, allowing seamless integration with your overall user interface. This article describes how to add and style map markers in iOS 17 with SwiftUI. Keep in mind that this is still in beta and can change.

## Add map markers

In iOS 17, SwiftUI offers developers a range of versatile methods to add map markers. Let's check them out.

### The default way

The default and most straightforward way to add a marker on the map in iOS 17 with SwiftUI is by passing a title and coordinate. With just these two essential pieces of information, developers can quickly create a marker that identifies a specific location on the map.

```swift
Marker("Latvian Freedom Monument", coordinate: .marker)
```

![Placing marker the default way](/assets/swiftui-map-markers/default.png)

### Showing with a custom image

We can seamlessly place a marker on the map using a custom SVG image directly from the assets catalog. This enhanced functionality provides a convenient and organized approach to utilizing custom SVG images as map markers. Leveraging custom SVG images from the assets catalog empowers developers to create visually appealing and personalized map markers that effortlessly integrate with their app's overall design language, enabling a more cohesive and immersive user experience.

```swift
Marker("Latvian Freedom Monument", image: "monument", coordinate: .marker)
```

![Placing marker using custom label](/assets/swiftui-map-markers/custom-image.png)

### Using SF symbols

SwiftUI on iOS 17 enables placing a marker on the map by leveraging the built-in SF Symbols library. SF Symbols provides a vast collection of scalable and customizable icons seamlessly integrating with Apple's user interface guidelines. No external image assets are needed, so we can easily access and incorporate many visually consistent and recognizable icons, such as pins, landmarks, or directional arrows.

```swift
Marker("Latvian Freedom Monument", systemImage: "signpost.left.fill", coordinate: .marker)
```

![Placing marker using custom label](/assets/swiftui-map-markers/system-image.png)

### Using text monogram

In iOS 17 with SwiftUI, an intriguing option to place a marker on the map is by utilizing monogram text. This approach allows developers to create visually appealing and personalized markers using a maximum of three characters.

```swift
Marker("Latvian Freedom Monument", monogram: "LV", coordinate: .marker)
```

![Placing marker using monogram](/assets/swiftui-map-markers/monogram.png)

### Custom label

The SwiftUI Label view approach allows developers to design and customize markers with rich textual information and accompanying icons or images. By leveraging the Label view, developers can easily combine a text element and an optional image or icon, allowing the creation of markers.

```swift
Marker(coordinate: .marker) {
  Label("Latvian Freedom Monument", image: .monument)
}
```

![Placing marker using custom label](/assets/swiftui-map-markers/label.png)

## Change marker color

We have the flexibility to change the tint color of map markers, allowing enhanced customization and visual consistency within their apps. By modifying the tint color, developers can seamlessly integrate the markers with their app's overall color scheme, branding, or design language. With SwiftUI's declarative syntax, adjusting the tint color of map markers is straightforward.

```swift
.tint(.yellow)
```

## TL;DR

In iOS 17 with SwiftUI, developers have various options for adding markers on the map. We can pass a title and coordinate for a simple marker, utilize custom SVG images from the assets catalog for personalized markers, leverage built-in SF Symbols for standardized and customizable markers, use monogram text for elegant and compact markers, or employ custom labels for markers with rich textual information. Additionally, developers can style the markers' tint color, ensuring visual consistency and app customization. These features empower developers to create visually engaging and personalized map experiences seamlessly integrating with their app's design.

## Links

- [Sample code](https://github.com/fassko/ios17-swiftui-map-markers)

- [MapKit Marker documentation](https://developer.apple.com/documentation/mapkit/marker)
