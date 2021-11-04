import Foundation

import Plot
import Publish

struct Project {
  let title: String
  let description: String
  let image: String
  let link: String?
  
  internal init(title: String, description: String, image: String, link: String? = nil) {
    self.title = title
    self.description = description
    self.image = image
    self.link = link
  }
}

fileprivate var projects = [
  Project(title: "Sharentic iOS app",
          description: "Sharentic helps you to live lightly, without compromise. The app is built entirely with SwiftUI, and for backend is used Firebase. For payments, Stripe is being used.",
          image: "sharentic.png"),
  Project(title: "Qminder Apple TV app",
          description: "Qminder TV is native Apple TV app for the waiting list. It uses open sourced Qminder Swift API and latest Swift features such as codable and keypaths. App keeps active network connection using websockets and upates the UI using reactive approach and RxSwift.",
          image: "qminder-apple-tv.png"),
  Project(title: "Qminder iPad app",
          description: "Qminder Sign-In provides self-service sign-in for customers. It uses native and web. Native side interacts with the server using in-house built JavaScript bridge. Background animations are fully native and use GPU.",
          image: "qminder-sign-in.png"),
  Project(title: "Dodies.lv iOS app",
          description: "The idea behind Dodies.lv is to help plan one's outdoor activities in Latvia. In the map one can find Latvian nature trails, birdwatching towers, parks, campsites and picnic sites. Hiking trails in Latvia are usually shorter and marked, long distance trekking and hiking is not done on specific routes. Dodies.lv lists only marked hiking trails and paths, specifically targeted towards casual hikers.",
          image: "dodies.png",
          link: "https://itunes.apple.com/lv/app/dodies-lv/id1080800199?mt=8"),
  Project(title: "Augi & Draugi iOS app",
          description: "Augi & Draugi app gives the answer to the question: “Where should I eat today”? The map in the application serves as a guide for anyone interested in eating delicious plant-based dishes. Each location on the map serves multiple plant-based dishes, making sure everyone has a choice!",
          image: "augidraugi.png",
          link: "https://apps.apple.com/lv/app/augi-draugi/id1475145259"),
  Project(title: "Weather Latvia iOS app",
          description: "Weather Latvia shows current weather observations in Latvia. Data comes from Latvian Environment, Geology and Meteorology Centre and Latvian State Roads.",
          image: "weatherlatvia.png",
          link: "https://itunes.apple.com/lv/app/weather-latvia/id1350252673?mt=8"),
  Project(title: "Hashberg - easy hashtag manager",
          description: "Manage your hashtags in one place. Copy and use hashtags wherever you want. Group your hashtags by topic. Sync between all your devices using iCloud.",
          image: "hashberg.png",
          link: "https://apps.apple.com/us/app/hashberg-easy-hashtag-manager/id1549468659")
]

internal extension Node where Context == HTML.BodyContext {
  static func projectsSection() -> Node {
    .wrapper(
      .section(
        .class("projects"),
        .forEach(projects, projectItem)
      )
    )
  }
  
  static func projectItem(_ project: Project) -> Node {
    .div(
      .class("project-item"),
      .div(
        .class("project-title"),
        .text(project.title)
      ),
      .div(
        .class("project-description"),
        .text(project.description)
      ),
      .img(
        .class("project-image"),
        .src("/images/" + project.image)
      ),
      .`unwrap`(project.link, projectLink)
    )
  }
  
  static func projectLink(_ link: String) -> Node {
    .a(
      .href(link),
      .target(.blank),
      .img(.src("images/download-appstore.svg"))
    )
  }
}
