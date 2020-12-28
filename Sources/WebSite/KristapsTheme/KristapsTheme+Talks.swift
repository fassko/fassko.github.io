import Foundation

import Publish
import Plot

internal extension Node where Context == HTML.BodyContext {
  static func talks() -> Node {
    .wrapper(
      .section(
        .class("talks"),
        .h1(
          .class("page-title"),
          .text("Talks")
        ),
        .forEach(TalksProvider().getTalks(), talkItem)
      )
    )
  }
  
  static func talkItem(_ talk: Talk) -> Node {
    .div(
      .class("talk-item"),
      .h2(
        .class("talk-title"),
        .text(talk.title)
      ),
      .div(
        .class("talk-date"),
        .text("\(talk.dateString) | \(talk.event)")
      ),
      .`if`(talk.video != nil, .h3("Video")),
      .`unwrap`(talk.video) { video in
        .div(
          .class("talk-media"),
          .videoIframe(src: video)
        )
      },
      .`if`(talk.slides != nil, .h3("Slides")),
      .`unwrap`(talk.slides) { slides in
        .div(
          .class("talk-media"),
          .slidesScript(dataId: slides)
        )
      },
      .`if`(talk.audio != nil, .h3("Audio")),
      .`unwrap`(talk.audio) { audio in
        .div(
          .class("talk-media"),
          .talkAudio(with: audio)
        )
      }
    )
  }
  
  static func videoIframe(src: String) -> Node {
    .element(named: "iframe", attributes: [
      .init(name: "class", value: "talk-vide-iframe"),
      .init(name: "src", value: src),
      .init(name: "frameborder", value: "0"),
      .init(name: "allow", value: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"),
      .init(name: "allowfullscreen", value: "1")
    ])
  }
  
  static func slidesScript(dataId: String) -> Node {
    .element(named: "script", attributes: [
      .init(name: "async", value: "", ignoreIfValueIsEmpty: false),
      .init(name: "class", value: "speakerdeck-embed"),
      .init(name: "data-id", value: dataId),
      .init(name: "data-ratio", value: "1.77777777777778"),
      .init(name: "src", value: "//speakerdeck.com/assets/embed.js")
    ])
  }
  
  static func talkAudio(with url: URL) -> Node {
    .audioPlayer(for: Audio(url: url), showControls: true)
  }
}
