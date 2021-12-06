import Foundation

import Plot
import Publish

enum SocialItems: String, CaseIterable {
  case email
  case phone
  case linkedin
  case twitter
  case github
  case instagram
  
  var link: String {
    switch self {
    case .email:
      return "mailto:kristaps@hey.com"
    case .phone:
      return "tel:+37125660643"
    case .linkedin:
      return "https://www.linkedin.com/in/kristapsgrinbergs/"
    case .twitter:
      return "https://twitter.com/fassko"
    case .github:
      return "https://github.com/fassko"
    case .instagram:
      return "https://www.instagram.com/ios_nomad/"
    }
  }
  
  var text: String {
    switch self {
    case .email:
      return "kristaps@hey.com"
    case .phone:
      return "+371 25660643"
    case .linkedin:
      return "kristapsgrinbergs"
    case .twitter:
      return "@fassko"
    case .github:
      return "fassko"
    case .instagram:
      return "ios_nomad"
    }
  }
}

internal extension Node where Context == HTML.BodyContext {
  static func aboutSection() -> Node {
    .wrapper(
      .section(
        .class("about"),
        .div(
          .class("text"),
          .textParagraph(
            .text("Executed as co-founder at global scale company "),
            .a(
              .href("https://www.qminder.com"),
              .target(.blank),
              .text("Qminder")
            ),
            .text(" that serviced companies like Bolt, Uber, Lyft, The Olympic Games, and more. Lead Apple technology efforts and worked on technical sales, integrations, and AppStore marketing.")
          ),
          .textParagraph("Extensive knowledge of how and what to build on all Apple platforms - iOS, iPadOS, watchOS, tvOS, and MacOS. Knows web frontend technologies like ReactJS."),
          .textParagraph(
            .text("Active iOS community member. Running well-known newsletter "),
            .a(
              .href("https://swiftweekly.github.io/"),
              .target(.blank),
              .text("Swift Weekly Brief")
            ),
            .text(" that is read by thousands of developers. He writes a blog, speaking at conferences, teaching, and mentoring.")
          ),
          .textParagraph(
            .text("His interests are in Web 3.0, sustainability, and automating old and clunky processes.")
          )
        ),
        .div(
          .class("social-items"),
          .forEach(SocialItems.allCases, socialItem)
        )
      )
    )
    
  }
  
  static func socialItem(_ socialItem: SocialItems) -> Node {
    .a(
      .class("social-item-link"),
      .href(socialItem.link),
      .target(.blank),
      .img(
        .class("social-item-image"),
        .src("/images/\(socialItem.rawValue).svg")
      ),
      .text(socialItem.text)
    )
  }
}
