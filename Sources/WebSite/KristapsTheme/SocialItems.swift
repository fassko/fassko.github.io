import Foundation

enum SocialItems: String, CaseIterable {
  case email
  case phone
  case linkedin
  case twitter
  case github
  case instagram
  
  var link: String {
    switch self {
    case .email:
      return "mailto:kristaps@hey.com"
    case .phone:
      return "tel:+37125660643"
    case .linkedin:
      return "https://www.linkedin.com/in/kristapsgrinbergs/"
    case .twitter:
      return "https://twitter.com/fassko"
    case .github:
      return "https://github.com/fassko"
    case .instagram:
      return "https://www.instagram.com/fassko/"
    }
  }
  
  var text: String {
    switch self {
    case .email:
      return "kristaps@hey.com"
    case .phone:
      return "+371 25660643"
    case .linkedin:
      return "kristapsgrinbergs"
    case .twitter:
      return "@fassko"
    case .github:
      return "fassko"
    case .instagram:
      return "fassko"
    }
  }
}
