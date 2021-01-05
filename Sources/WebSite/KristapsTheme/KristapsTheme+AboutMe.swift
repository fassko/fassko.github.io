import Foundation

import Publish
import Plot

internal extension Node where Context == HTML.BodyContext {
  static func about() -> Node {
    .wrapper(
      .section(
        .class("about-me"),
        .aboutDescription(),
        .aboutEmail(),
        .myPictures()
      )
    )
  }
  
  fileprivate static func aboutDescription() -> Node {
    .div(
      .class("about-me-text"),
      .h1(
        .class("page-title"),
        .text("About")
      ),
      .p("Kristaps has extensive knowledge of all Apple platforms - iOS, iPadOS, watchOS, tvOS, and MacOS. He is an active iOS community member."),
      .p(
        .text("He is running a well-known newsletter "),
        .a(
          .href("https://swiftweekly.github.io"),
          .target(.blank),
          .text("Swift Weekly Brief")
        ),
        .text(" that is read by thousands of developers.")
      ),
      .p("He writes a mobile development blog, speaks at conferences, teaches and mentors.")
    )
  }
  
  fileprivate static func aboutEmail() -> Node {
    .a(
      .class("about-email"),
      .href("mailto:kristaps@hey.com"),
      .img(
        .class("about-email-img"),
        .src("/images/email.svg")
      ),
      .text("kristaps@hey.com")
    )
  }
  
  fileprivate static func myPictures() -> Node {
    .div(
      .class("about-me-images"),
      .img(
        .src("/assets/speaking/kristaps-grinbergs-appbuilders.jpeg")
      ),
      .img(
        .src("/assets/speaking/kristaps-grinbergs-mobile-era.jpg")
      ),
      .img(
        .src("/assets/speaking/kristaps-grinbergs-shareit.jpg")
      )
    )
  }
}
