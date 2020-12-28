---
date: 2020-07-27 00:00
title: Mapview with SwiftUI
tags: swiftui, swift, apple, ios
description: Finding places, navigating our way, or simply checking what's around - these are essential things that smartphones can help with. This year Apple added maps functionality to the SwiftUI framework. Let's check out how we can use it and what are the current problems.
---

Finding places, navigating our way, or simply checking what's around - these are essential things that smartphones can help with. This year Apple added maps functionality to the SwiftUI framework. Let's check out how we can use it and what are the current problems.

> I would like to point out that this covers Xcode 12 beta software and it can change in future releases.

## Present the MapView

To show MapView we need to use MapKit's structure `Map` that is specifically designed to use with SwiftUI. It is a view that displays an embedded map interface. We can use it to configure user-allowed interactions, show and track current location, and add annotations on the map.

It comes with several [initialize methods](https://developer.apple.com/documentation/mapkit/map). Let's see how to create a map specifying the map visible map region and add annotations.

The coordinate region defines the area that is visible on the map. It is a `Binding` that takes an `MKCoordinateRegion` object that is a combination of center coordinate and a coordinate span around it.

```swift
struct MapView: View {
  @State var coordinateRegion = MKCoordinateRegion(
    center: CLLocationCoordinate2D(latitude: 56.948889, longitude: 24.106389),
    span: MKCoordinateSpan(latitudeDelta: 0.2, longitudeDelta: 0.2))
  
  var body: some View {
    Map(coordinateRegion: $coordinateRegion)
      .edgesIgnoringSafeArea(.all)
  }
}
```

Now we have a map showing the capital city of Latvia - Riga. With this init method we can specify other things like interaction capabilities, showing user location, and more.

![SwiftUI Map view](/assets/img/swiftui-map/mapview.png)

## Add annotations on the map

If we want to add annotation on the map we need to use a different initializer method that takes `MKCoordinateRegion`, identifiable collection of annotations and block that creates returns `MapAnnotationProtocol` protocol object.

Right now MapKit offers three simple annotation views:

* `MapPin` - pin-shaped annotation
* `MapMarker` - balloon-shaped annotation
* `MapAnnoation` - custom view annoation

The simplest way is to use the first two annotation types, in this blog post we're going to look into `MapMarker` annotation type. To [initalize](https://developer.apple.com/documentation/mapkit/mapmarker/3601335-init) need to pass a coordinate and optional tint color.

```swift
MapMarker(coordinate: place.coordinate, tint: .green)
```

By putting it all together, we can show couple of annoations on the map like this:

```swift
struct MapViewWithAnnotations: View {
  let veganPlacesInRiga = [
    VeganFoodPlace(name: "Kozy Eats", latitude: 56.951924, longitude: 24.125584),
    VeganFoodPlace(name: "Green Pumpkin", latitude:  56.967520, longitude: 24.105760),
    VeganFoodPlace(name: "Terapija", latitude: 56.9539906, longitude: 24.13649290000000)
  ]
  
  @State var coordinateRegion = MKCoordinateRegion(
    center: CLLocationCoordinate2D(latitude: 56.948889, longitude: 24.106389),
    span: MKCoordinateSpan(latitudeDelta: 0.2, longitudeDelta: 0.2))
  
  var body: some View {
    Map(coordinateRegion: $coordinateRegion,
        annotationItems: veganPlacesInRiga) { place in
      MapMarker(coordinate: place.coordinate, tint: .green)
    }.edgesIgnoringSafeArea(.all)
  }
}
```

Let's not forget those collection elements should conform to `Identifiable` - provide `ID` value. The easiest way is to just use the `UUID` like this:

```swift
struct VeganFoodPlace: Identifiable {
  var id = UUID()
  let name: String
  let latitude: Double
  let longitude: Double
  
  var coordinate: CLLocationCoordinate2D {
    CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
  }
}
```

As we see that there is no way how to initialize an annotation with the title right now. For that, we need to use `MapAnnotation` that allows us to create custom map annotation.

## Current drawbacks

Adding Map view with SwiftUI is a very straight forward task, but current implementation lacks some important components. Let's discuss some of the drawbacks.

Adding a callout view for map annotation is one of the most essential things that is lacking with the current implementation.

After clicking on an annotation and showing a callout usually, there is the navigation or a modal view is presented. With a custom `MapAnnoation` we can partially do it, but for sure it is not a great solution.

Right now you can add only add annotations on the map. There isn't support for polyline or other elements.
  
## TL;DR

Adding Map view with SwiftUI is simple. It comes with ways to add binding to the map region, specify annotation list, track user's location, and more. Sadly with current Xcode Beta 3, it lacks features like showing titles for annotations, callout view, and SwiftUI way of navigation. Let's hope Apple will add it in the future.

## Links

* [https://developer.apple.com/documentation/mapkit/map](Map official documentation)
* [https://www.hackingwithswift.com/quick-start/swiftui/how-to-show-a-map-view](Hacking with Swift article)
* [https://github.com/fassko/RigaVeganMap](SwiftUI Map view implementation)
* [https://swiftwithmajid.com/2020/07/29/using-mapkit-with-swiftui/](Using MapKit with SwiftUI)
* [https://codakuma.com/swiftui-mapkit-fun/](Adventures in SwiftUI 2's MapKit support)
