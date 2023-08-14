import Foundation

import Plot
import Publish

internal extension Node where Context == HTML.BodyContext {
  static func hireSection() -> Node {
    .wrapper(
      .section(
        .class("hire"),
        .div(
          .class("text"),
          .textParagraph("Hire me to assist with CTO roles, as well as product development in full-stack, mobile, and blockchain projects. Please reach out for more details and to discuss how I can contribute to your venture.")
        )
      )
    )
    
  }
}
