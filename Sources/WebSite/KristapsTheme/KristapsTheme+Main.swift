import Foundation

import Plot
import Publish

internal extension Node where Context == HTML.BodyContext {
  static func mainSection() -> Node {
    .wrapper(
      .section(
        .class("main"),
        .div(
          .class("main-titles"),
          .h1(
            .class("name-title"),
            .text("Kristaps Grinbergs")
          ),
          .h2(
            .class("tagline"),
            .text("iOS and Apple technology developer.\nStartup founder. Conference speaker.")
          )
        ),
        .img(
          .class("profile-picture"),
          .src("/images/kristaps.png")
        )
      )
    )
  }
}
