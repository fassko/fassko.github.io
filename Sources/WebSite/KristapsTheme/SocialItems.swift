import Foundation

enum SocialItems: String, CaseIterable {
  case email
  case phone
  case linkedin
  case twitter
  case github
  case instagram
  case telegram
  
  var link: String {
    switch self {
    case .email:
      return "mailto:fassko@gmail.com"
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
    case .telegram:
      return "https://t.me/kristapsgrinbergs"
    }
  }
  
  var text: String {
    switch self {
    case .email:
      return "fassko@gmail.com"
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
    case .telegram:
      return "kristapsgrinbergs"
    }
  }
}
