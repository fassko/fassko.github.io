---
date: 2021-08-25 00:00
title: Exploring SwiftUI map custom annotations
tags: swift, ios, swiftui, localization
description: 
---

A while back, we [explored](https://kristaps.me/blog/swiftui-mapview/) the Mapview in SwiftUI. This time, we will look into creating custom map annotations, the limitations, and how to overcome some of them.

Placing annotations on the map, like marking a specific place, is one of the most critical tasks when showing a map in our iOS applications.

## MapAnnotation protocol

In SwiftUI working with custom map annotations, we need to look into the [MapAnnotation](https://developer.apple.com/documentation/mapkit/mapannotation). It is a map annotation that we can customize how we want and then place on the map.

As a reminder, to show annotations on the map we need a list of places that conform to the `Identifiable` protocol and then use it when initializing the `Map` view in an array.

```swift
struct Place: Identifiable {
  let id = UUID()
  var name: String
  var coordinate: CLLocationCoordinate2D
}

struct ContentView: View {
  @State private var region = MKCoordinateRegion(center: CLLocationCoordinate2D(latitude: 40.748433, longitude: -73.985656), span: MKCoordinateSpan(latitudeDelta: 0.01, longitudeDelta: 0.01))
  
  var empireStateBuilding =
  Place(name: "Empire State Building", coordinate: CLLocationCoordinate2D(latitude: 40.748433, longitude: -73.985656))
  
  var body: some View {
    Map(coordinateRegion: $region,
        annotationItems: [empireStateBuilding]
    ) { place in
      // ... create a custom MapAnnotation
    }
  }
}
```

Now is the time to create a custom map annotation. Let's make a custom view so we could reuse it. We can use the map circle with fill from the SFSymbols and place a pin on the bottom to show the exact location precisely.

```swift
struct PlaceAnnotationView: View {
  var body: some View {
    VStack(spacing: 0) {
      Image(systemName: "mappin.circle.fill")
        .font(.title)
        .foregroundColor(.red)
      
      Image(systemName: "arrowtriangle.down.fill")
        .font(.caption)
        .foregroundColor(.red)
        .offset(x: 0, y: -5)
    }
  }
}
```

![Custom map pin view](/assets/swiftui-custom-map-annotations/map-pin.png)

Now we can use it in our 'Map' closure block.

```Swift
	Map(coordinateRegion: $region,
        annotationItems: [empireStateBuilding]
    ) { place in
      MapAnnotation(coordinate: place.coordinate) {
        PlaceAnnotationView()
      }
    }
```

![Empire State Building custom annotation](/assets/swiftui-custom-map-annotations/empire-state-building-annotation.png)

When we zoom in or out, we can see that annotation is placed precisely where the Empire State Building is located.

Now that we have the annotation on the map, we would like to somehow interact with it. We will see how to show an annotation title and navigate when clicking on it in the following sections.

## Show and hide the annotation title

To show (and hide) the annotation title, we need to include it in the custom annotation view because we are constructing it manually.

We can add the title in the `PlaceAnnotationView` `VStack` and show or hide when a user taps on it.

```swift
struct PlaceAnnotationView: View {
  @State private var showTitle = true
  
  let title: String
  
  var body: some View {
    VStack(spacing: 0) {
      Text(title)
        .font(.callout)
        .padding(5)
        .background(Color(.white))
        .cornerRadius(10)
        .opacity(showTitle ? 0 : 1)
      
      Image(systemName: "mappin.circle.fill")
        .font(.title)
        .foregroundColor(.red)
      
      Image(systemName: "arrowtriangle.down.fill")
        .font(.caption)
        .foregroundColor(.red)
        .offset(x: 0, y: -5)
    }
    .onTapGesture {
      withAnimation(.easeInOut) {
        showTitle.toggle()
      }
    }
  }
}
```

To make it appear and disappear with animation, we could use the view state variable and change the opacity accordingly. It would give that nice additional touch.

![Show and hide custom annotation title](/assets/swiftui-custom-map-annotations/show-hide-annotation-title.gif)

Another option is to show the annotation title all the time. In that case, our app users would understand what this place is without tapping on it.

```swift
struct PlaceAnnotationView: View {
  let title: String
  
  var body: some View {
    VStack(spacing: 0) {
      Text(title)
        .font(.callout)
        .padding(5)
        .background(Color(.white))
        .cornerRadius(10)
      
      Image(systemName: "mappin.circle.fill")
        .font(.title)
        .foregroundColor(.red)
      
      Image(systemName: "arrowtriangle.down.fill")
        .font(.caption)
        .foregroundColor(.red)
        .offset(x: 0, y: -5)
    }
  }
}
```

## Navigation from map annotation

When a user taps on the annotation, we would like to navigate to a different view and show extra information about this place on the map. To do so, we can put the custom annotation view inside the `NavigationLink` and then navigate to the location details view.

```swift
MapAnnotation(coordinate: place.coordinate) {
  NavigationLink {
    LocationDetailsView(place: place)
  } label: {
    PlaceAnnotationView(title: place.name)
  }
}
```

Now when a user taps on the annotation, they will be brought to the details screen. That's it!

![Navigate from the custom annotation](/assets/swiftui-custom-map-annotations/navigate.gif)

## TL;DR

Marking a place on the map with annotation is a significant feature when using a map view in iOS apps. In many cases, we want to do it with a custom annotation view.

With SwiftUI, we can create custom annotations and show them on the map in a straightforward manner. Using this approach is very nice because we have all the SwiftUI features at our disposal, like stacks, navigation, and more.

## Links

* [Sample code](https://github.com/fassko/SwiftUIMapCustomAnnotations)

* [MapAnnotation documentation](https://developer.apple.com/documentation/mapkit/mapannotation)
* [MapAnnotationProtocol documentation](https://developer.apple.com/documentation/mapkit/mapannotationprotocol)
* [Adding Annotations to Map in SwiftUI](https://www.youtube.com/watch?v=vfWxwDfX30I)
* [Map with Annotations in SwiftUI](https://swiftuirecipes.com/blog/map-with-annotations-in-swiftui)
* [How to show annotations in a Map view](https://www.hackingwithswift.com/quick-start/swiftui/how-to-show-annotations-in-a-map-view)
* [How to Work with SwiftUI Maps and Annotations](https://www.appcoda.com/swiftui-map/)