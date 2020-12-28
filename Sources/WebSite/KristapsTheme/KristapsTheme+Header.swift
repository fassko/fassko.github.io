import Foundation

import Plot
import Publish

extension Node where Context == HTML.DocumentContext {
  static func head<T: Website>(
    for location: Location,
    on site: T,
    titleSeparator: String = " | ",
    stylesheetPaths: [Path] = ["/styles.css"],
    rssFeedPath: Path? = .defaultForRSSFeed,
    rssFeedTitle: String? = nil,
    refreshToPage: String? = nil
  ) -> Node {
    var title = location.title
    
    if title.isEmpty {
      title = site.name
    } else {
      title.append(titleSeparator + site.name)
    }
    
    var description = location.description
    
    if description.isEmpty {
      description = site.description
    }
    
    return .head(
      .encoding(.utf8),
      .siteName(site.name),
      .url(site.url(for: location)),
      .title(title),
      .`unwrap`(refreshToPage) { link in
        .selfClosedElement(named: "meta", attributes: [
          .init(name: "http-equiv", value: "refresh"),
          .init(name: "content", value: "0; url=\(link)")
        ])
      },
      .meta(.name("author"), .content(site.name)),
      .meta(.name("og:site_name"), .content(site.description)),
      .meta(.name("og:title"), .content(site.description)),
      .meta(.name("og:description"), .content(site.description)),
      .meta(.name("og:image"), .content("linkedin.png")),
      .meta(.name("og:type"), .content("website")),
      .meta(.name("og:url"), .content(site.url.absoluteString)),
      .meta(.name("twitter:card"), .content("summary")),
      .meta(.name("twitter:site"), .content("@fassko")),
      .meta(.name("twitter:title"), .content(site.name)),
      .meta(.name("twitter:description"), .content(site.description)),
      .meta(.name("twitter:image"), .content("fb-og.png")),
      .selfClosedElement(named: "link", attributes: [
        .init(name: "href", value: "https://fonts.gstatic.com"),
        .init(name: "rel", value: "preconnect")
      ]),
      .selfClosedElement(named: "link", attributes: [
        .init(name: "href", value: "https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"),
        .init(name: "rel", value: "stylesheet")
      ]),
      .selfClosedElement(named: "link",
                         attributes: [
                          .init(name: "rel", value: "apple-touch-icon-precomposed"),
                          .init(name: "sizes", value: "120x120"),
                          .init(name: "href", value: "apple-touch-icon-120x120.png")
                         ]),
      .description(description),
      .twitterCardType(location.imagePath == nil ? .summary : .summaryLargeImage),
      .forEach(stylesheetPaths, { .stylesheet($0) }),
      .viewport(.accordingToDevice),
      .unwrap(rssFeedPath) { path in
        let title = rssFeedTitle ?? "Subscribe to \(site.name)"
        return .rssFeedLink(path.absoluteString, title: title)
      }
    )
  }
  
  static func head<T: Website>(
    for location: Location,
    on site: T,
    titleSeparator: String = " | ",
    stylesheetPaths: [Path] = ["/styles.css"],
    rssFeedPath: Path? = .defaultForRSSFeed,
    rssFeedTitle: String? = nil
  ) -> Node {
    var title = location.title
    
    if title.isEmpty {
      title = site.name
    } else {
      title.append(titleSeparator + site.name)
    }
    
    var description = location.description
    
    if description.isEmpty {
      description = site.description
    }
    
    return .head(
      .encoding(.utf8),
      .siteName(site.name),
      .url(site.url(for: location)),
      .title(title),
      .description(description),
      .meta(.name("og:site_name"), .content(site.description)),
      .meta(.name("og:title"), .content(site.description)),
      .meta(.name("og:description"), .content(site.description)),
      .meta(.name("og:image"), .content("linkedin.png")),
      .meta(.name("og:type"), .content("website")),
      .meta(.name("og:url"), .content(site.url.absoluteString)),
      .meta(.name("twitter:card"), .content("summary")),
      .meta(.name("twitter:site"), .content("@fassko")),
      .meta(.name("twitter:title"), .content(site.name)),
      .meta(.name("twitter:description"), .content(site.description)),
      .meta(.name("twitter:image"), .content("fb-og.png")),
      .selfClosedElement(named: "link", attributes: [
        .init(name: "href", value: "https://fonts.gstatic.com"),
        .init(name: "rel", value: "preconnect")
      ]),
      .selfClosedElement(named: "link", attributes: [
        .init(name: "href", value: "https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"),
        .init(name: "rel", value: "stylesheet")
      ]),
      .selfClosedElement(named: "link",
                         attributes: [
                          .init(name: "rel", value: "apple-touch-icon-precomposed"),
                          .init(name: "sizes", value: "120x120"),
                          .init(name: "href", value: "apple-touch-icon-120x120.png")
                         ]),
      .twitterCardType(location.imagePath == nil ? .summary : .summaryLargeImage),
      .forEach(stylesheetPaths, { .stylesheet($0) }),
      .viewport(.accordingToDevice),
      .unwrap(site.favicon, { .favicon($0) }),
      .unwrap(rssFeedPath, { path in
        let title = rssFeedTitle ?? "Subscribe to \(site.name)"
        return .rssFeedLink(path.absoluteString, title: title)
      }),
      .unwrap(location.imagePath ?? site.imagePath, { path in
        let url = site.url(for: path)
        return .socialImageLink(url)
      })
    )
  }
}
