// swift-tools-version:5.5

import PackageDescription

let package = Package(
  name: "WebSite",
  platforms: [.macOS(.v12)],
  products: [
    .executable(
      name: "WebSite",
      targets: ["WebSite"]
    )
  ],
  dependencies: [
    .package(name: "Publish", url: "https://github.com/johnsundell/publish.git", from: "0.9.0"),
    .package(name: "Yams", url: "https://github.com/jpsim/Yams.git", from: "5.0.1"),
    .package(name: "SplashPublishPlugin", url: "https://github.com/johnsundell/splashpublishplugin.git", from: "0.2.0")
  ],
  targets: [
    . executableTarget(name: "WebSite", dependencies: [
      "Publish",
                     "Yams",
                     "SplashPublishPlugin"
    ])
  ]
)
