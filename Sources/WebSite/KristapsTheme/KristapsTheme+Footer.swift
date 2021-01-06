import Foundation

import Publish
import Plot

internal extension Node where Context == HTML.BodyContext {
  static func customFooter() -> Node {
    .footer(
      .class("footer"),
      .p("Copyright © Kristaps Grinbergs. \(Date().currentYear)."),
      .p(
        .a(
          .href("https://twitter.com/fassko"),
          .target(.blank),
          .text("Twitter")
        ),
        .footerDivider(),
        .a(
          .href(Path.defaultForRSSFeed),
          .text("RSS")
        ),
        .footerDivider(),
        .a(
          .href("/about"),
          .text("Contact")
        )
      )
    )
  }
  
  private static func footerDivider() -> Node {
    .text("•")
  }
}
