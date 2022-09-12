import Foundation

import Publish
import Plot

internal extension Node where Context == HTML.BodyContext {
  static func about() -> Node {
    .wrapper(
      .section(
        .class("about-me"),
        .aboutDescription,
        .socialItems,
        .myPictures
      )
    )
  }
  
  private static var aboutDescription: Node {
    .div(
      .class("about-me-text"),
      .h1(
        .class("page-title"),
        .text("About")
      ),
      .p("Kristaps has extensive knowledge in Web3, iOS, and other Apple technologies, frontend, and databases."),
      .p("He is an active Web3 and iOS community member. He writes blog posts about Web3 and mobile development and regularly speaks at conferences and meetups. In addition, he teaches and mentors."),
      .p("He writes a mobile development blog, regularly speaks at conferences, teaches, and mentors."),
      .p("His interests are in Web 3.0, sustainability, and automating old and clunky processes."),
      .p(
        .text("Kristaps is an active volunteer in organizations like "),
        .a(
          .href("http://www.rigatechgirls.com/"),
          .target(.blank),
          .text("Riga Tech Girls")
        ),
        .text(", "),
        .a(
          .href("https://www.dzivniekubriviba.lv/"),
          .target(.blank),
          .text("Animal Freedom ")
        ),
        .text(", and many more.")
        ),
      .p("His hobbies are orienteering sport, cycling, and cooking.")
    )
  }
  
  private static var socialItems: Node {
    .div(
      .class("about-me-social-items"),
      .forEach(SocialItems.allCases, socialItem)
    )
  }
  
  private static var aboutEmail: Node {
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
  
  private static var myPictures: Node {
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
