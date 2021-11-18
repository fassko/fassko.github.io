import Foundation

import Files
import Yams

internal struct Talk: Decodable {
  let date: Date
  let title: String
  let event: String
  let video: String?
  let slides: String?
  let audio: URL?
  let image: String?
}

extension Talk {
  var dateString: String {
    date.short
  }
}

internal struct TalksProvider {
  func getTalks() -> [Talk] {
    let decoder = YAMLDecoder()
    do {
      let talks = try File(path: "./Content/talks.yml").readAsString().data(using: .utf8)!
    let decoded = try decoder.decode([Talk].self, from: talks)
    return decoded
    } catch {
      print("Can't decode talks")
      return []
    }
  }
}
