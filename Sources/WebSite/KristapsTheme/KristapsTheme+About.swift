import Foundation

import Plot
import Publish

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
            .text(" that serviced companies like Bolt, Uber, Lyft, The Olympic Games")
          ),
          .textParagraph("He has extensive knowledge and expertise in building projects across full-stack, mobile, and blockchain domains."),
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
