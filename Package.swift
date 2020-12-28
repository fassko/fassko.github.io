// swift-tools-version:5.2

import PackageDescription

let package = Package(
  name: "WebSite",
  products: [
    .executable(
      name: "WebSite",
      targets: ["WebSite"]
    )
  ],
  dependencies: [
    .package(name: "Publish", url: "https://github.com/johnsundell/publish.git", from: "0.7.0"),
    .package(name: "Yams", url: "https://github.com/jpsim/Yams.git", from: "4.0.3"),
    .package(name: "SplashPublishPlugin", url: "https://github.com/johnsundell/splashpublishplugin.git", from: "0.1.0")
  ],
  targets: [
    .target(
      name: "WebSite",
      dependencies: ["Publish",
                     "Yams",
                     "SplashPublishPlugin"]
    )
  ]
)
