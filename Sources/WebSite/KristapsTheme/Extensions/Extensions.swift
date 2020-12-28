import Foundation

import Ink
import Publish
import Plot

extension Item {
  var htmlDescription: String {
    let parser = MarkdownParser()
    return parser.html(from: description)
  }
}
