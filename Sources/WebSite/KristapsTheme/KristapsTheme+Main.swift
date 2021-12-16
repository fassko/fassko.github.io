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
            .text("Mobile and fullstack developer.")
          ),
          .h2(
            .class("tagline"),
            .text("Startup founder. Conference speaker. Mentor.")
          ),
          .h2(
            .class("tagline"),
            .text("Passionate about building products, sustainability and Web 3.0.")
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
