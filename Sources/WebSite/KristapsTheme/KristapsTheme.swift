import Foundation

import Plot
import Publish
import Ink

public extension Theme {
  static var kristapsTheme: Self {
    Theme(
      htmlFactory: KristapsHTMLFactory()
    )
  }
}

internal struct KristapsHTMLFactory<Site: Website>: HTMLFactory {
  func makeIndexHTML(for index: Index,
                     context: PublishingContext<Site>) throws -> HTML {
    HTML(
      .lang(context.site.language),
      .head(for: index, on: context.site),
      .body(
        .header(for: context, selectedSection: nil),
        .mainSection(),
        .divider(for: "about"),
        .aboutSection(),
        .divider(for: "projects"),
        .projectsSection(),
        .customFooter()
      )
    )
  }
  
  func makeSectionHTML(for section: Section<Site>,
                       context: PublishingContext<Site>) throws -> HTML {
    HTML(
      .lang(context.site.language),
      .head(for: section, on: context.site),
      .body(
        .header(for: context, selectedSection: section.id),
        .wrapper(
          .section(
            .class("blog-list"),
            .h1(
              .class("page-title"),
              .text(section.title)
            ),
            .itemList(for: section.items, on: context.site)
          )
        ),
        .customFooter()
      )
    )
  }
  
  func makeItemHTML(for item: Item<Site>,
                    context: PublishingContext<Site>) throws -> HTML {
    HTML(
      .lang(context.site.language),
      .head(for: item, on: context.site),
      .body(
        .header(for: context, selectedSection: item.sectionID),
        .wrapper(
          .section(
            .class("blog-list"),
            .div(
              .class("blog-item"),
              .h1(
                .a(
                  .class("blog-title"),
                  .href(item.path),
                  .text(item.title)
                )
              ),
              .div(
                .class("blog-date"),
                .tagList(for: item, on: context.site),
                .text(item.date.short)
              ),
              .div(
                .class("blog-content"),
                .contentBody(item.body)
              )
            )
          )
        ),
        .customFooter()
      )
    )
  }
  
  func makePageHTML(for page: Page,
                    context: PublishingContext<Site>) throws -> HTML {
    HTML(
      .lang(context.site.language),
      .head(for: page,
            on: context.site,
            refreshToPage: OldBlogPostsFactory.needRefresh(for: page.path.string)
      ),
      .body(
        .header(for: context, selectedSection: nil),
        .`if`(page.path == "talks", .talks()),
        .`if`(page.path == "about", .about()),
        .customFooter()
      )
    )
  }
  
  func makeTagListHTML(for page: TagListPage,
                       context: PublishingContext<Site>) throws -> HTML? {
    HTML(
      .lang(context.site.language),
      .head(for: page, on: context.site),
      .body(
        .header(for: context, selectedSection: nil),
        .wrapper(
          .section(
            .class("tags"),
            .h1(
              .class("page-title"),
              .text("Browse all tags")
            ),
            .ul(
              .class("all-tags"),
              .forEach(page.tags.sorted()) { tag in
                .li(
                  .class("tag"),
                  .a(
                    .href(context.site.path(for: tag)),
                    .text(tag.string)
                  )
                )
              }
            )
          )
        ),
        .customFooter()
      )
    )
  }
  
  func makeTagDetailsHTML(for page: TagDetailsPage,
                          context: PublishingContext<Site>) throws -> HTML? {
    HTML(
      .lang(context.site.language),
      .head(for: page, on: context.site),
      .body(
        .header(for: context, selectedSection: nil),
        .wrapper(
          .section(
            .class("tags"),
            .h1(
              .class("page-title"),
              .text("Tagged with "),
              .span(
                .class("tag-title"),
                .text(page.tag.string)
              )
            ),
            .a(
              .class("browse-all-tags"),
              .text("Browse all tags"),
              .href(context.site.tagListPath)
            ),
            .itemList(
              for: context.items(
                taggedWith: page.tag,
                sortedBy: \.date,
                order: .descending
              ),
              on: context.site)
          )
        ),
        .customFooter()
      )
    )
  }
}

extension Node where Context == HTML.BodyContext {
  static func wrapper(_ nodes: Node...) -> Node {
    .div(.class("wrapper"), .group(nodes))
  }
  
  static func header<T: Website>(
    for context: PublishingContext<T>,
    selectedSection: T.SectionID?
  ) -> Node {
    let sectionIDs = T.SectionID.allCases
    
    return .header(
      .class("header"),
      .div(
        .class("header-wrapper"),
        .div(
          .class("main-title"),
          .a(
            .href("/"),
            .text("Kristaps Grinbergs")
          )
        ),
        .nav(
          .class("nav-container"),
          .if(sectionIDs.count > 1,
              .nav(
                .ul(
                  .class("nav"),
                  .li(
                    .class("nav-item"),
                    .a(
                      .href("/"),
                      .text("home")
                    )
                  ),
                  .forEach(sectionIDs) { section in
                    .li(
                      .class("nav-item"),
                      .a(
                        .href(context.sections[section].path),
                        .text(context.sections[section].title.lowercased())
                      )
                    )
                  }
                )
              )
          )
        )
      )
    )
  }
  
  static func itemList<T: Website>(for items: [Item<T>], on site: T) -> Node {
    forEach(items) { item in
      .div(
        .class("blog-item"),
        .h2(
          .a(
            .class("blog-title"),
            .href(item.path),
            .text(item.title)
          )
        ),
        .div(
          .class("blog-date"),
          .tagList(for: item, on: site),
          .text(item.date.short)
        ),
        .div(
          .class("blog-content"),
          .raw(item.htmlDescription)
        ),
        .a(
          .class("blog-read-more"),
          .href(item.path),
          .text("Read more")
        )
      )
    }
  }
  
  static func textParagraph(_ text: String) -> Node {
    .p(
      .class("text-paragraph"),
      .text(text)
    )
  }
  
  static func textParagraph(_ members: Node...) -> Node {
    .p(
      .class("text-paragraph"),
      .group(members)
    )
  }
  
  static func divider(for title: String) -> Node {
    .div(
      .class("divider"),
      .div(
        .class("divider-wrapper"),
        .div(
          .class("divider-left-element")
        ),
        .div(
          .class("divider-title"),
          .text(title)
        ),
        .div(
          .class("divider-right-element")
        )
      )
    )
  }
}
