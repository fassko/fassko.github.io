import Foundation

import Plot
import Publish

internal struct OldBlogPostsFactory {
  static var links = [
    "animating-shapes-in-ios",
    "apple-passkit",
    "clearing-subscriptions",
    "custom-font-dynamic-type",
    "dark-side-appstore",
    "different-flavors-of-websockets-vapor",
    "embracing-dynamic-type",
    "graphql-advances-with-swift",
    "graphql-ios-swift",
    "graphql-subscriptions",
    "ignorance-of-cache",
    "index",
    "nstimer-vs-cadisplaylink",
    "swiftui-launch-screen",
    "swiftui-mapview",
    "swiftui-modal-view",
    "uiview-vs-calayer",
    "websockets-ios-13-swift",
    "websockets-swift",
    "what-is-animation-core-animation",
    "wwdc-2019"
  ]
  
  static var pages: [Page] {
    links.map {
      Page(path: Path($0), content: Content())
    }
  }
  
  static func needRefresh(for path: String) -> String? {
    links.contains(path) ? "/blog/\(path)" : nil
  }
}
