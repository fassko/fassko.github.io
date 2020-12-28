import Foundation
import Publish
import Plot
import SplashPublishPlugin

// This type acts as the configuration for your website.
struct WebSite: Website {
  enum SectionID: String, WebsiteSectionID {
    // Add the sections that you want your website to contain here:
    case blog
    case talks
    case about
  }
  
  struct ItemMetadata: WebsiteItemMetadata {
    // Add any site-specific metadata that you want to use here.
  }
  
  // Update these properties to configure your website:
  var url = URL(string: "https://kristaps.me")!
  var name = "Kristaps Grinbergs"
  var description = "Kristaps Grinbergs - iOS and Apple technology developer. Startup founder. Conference speaker."
  var language: Language { .english }
  var imagePath: Path? { nil }  
}

// This will generate your website using the built-in Foundation theme:
try WebSite().publish(
  withTheme: .kristapsTheme,
  deployedUsing: .gitHub("fassko/fassko.github.io"),
  additionalSteps: [
    .addPages(in: OldBlogPostsFactory.pages)
  ],
  plugins: [
    .splash(withClassPrefix: "")
  ]
)
