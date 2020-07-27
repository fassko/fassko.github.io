---
layout: post
title: ! "Mapview with SwiftUI"
categories: [swift, swiftui]
tags: [swiftui, swift, apple, ios]
---

Finding places, navigating our way or just checking what's around are essential things nowadays that smartphones can help. This year Apple added maps functionality to the SwiftUI framework. Let's check out how we can use and what are the current problems with it.

> I would like to point out that this covers Xcode 12 beta software and it can changed in future releases.

<!--more-->

## Present the MapView

To show MapView we need to use MapKit's structure `Map` that is specifically designed to use with SwiftUI. It is a view that displays an embedded map interface. We can use it to configure user-allowed interactions, show and track current location, and add annotations on the map.

It comes with several [initialize methods](https://developer.apple.com/documentation/mapkit/map). Let's see how how to create a map specifying the map visible map region and add annotations.

Coordinate region defines the area what is visible on the map. It is a `Binding` that takes a `MKCoordinateRegion` object that is a combination of center coordinate and a coordinate span around it.

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

Now we have a map showing capital city of Latvia Riga. With this init method we can specify other things like interaction capabilities, showing user location and more.

## Add annotations on the map

If we want to add annotation on the map we need to use a different initilizer method that takes `MKCoordinateRegion`, identifiable collection of annoations and block that creates returns `MapAnnotationProtocol` protocol object.

Right now MapKit offers three simple annoation views:

* `MapPin` - pin shaped annotation
* `MapMarker` - ballon shaped annoation
* `MapAnnoation` - custom view annoation

Simplest way is to use first two annotation types, in this blog post we're going to look into `MapMarker` annoation type. To [initalize](https://developer.apple.com/documentation/mapkit/mapmarker/3601335-init) it we need to pass a coordinate and optional tint color.

```swift
  MapMarker(coordinate: place.coordinate, tint: .green)
```

Putting it all together we can show couple of annoations on the map like this:

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

Let's not forget that collection elements should conform to `Identifiable` that means it should provide `ID` value. The easiest way is to just use the `UUID` like this:

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

As we see that there is no way how to initialize an annoation with title right now. For that we need to use `MapAnnoation` that allows us to create custom map annoation.

## Current drawbacks




* No Callout view
* struggle with navigation
* no support for polyline

  
## TL;DR



## Links

* https://developer.apple.com/documentation/mapkit/map
* https://www.hackingwithswift.com/quick-start/swiftui/how-to-show-a-map-view
* https://www.hackingwithswift.com/books/ios-swiftui/advanced-mkmapview-with-swiftui