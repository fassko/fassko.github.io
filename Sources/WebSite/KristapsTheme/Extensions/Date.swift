import Foundation

extension Date {
  var short: String {
    let formatter = DateFormatter()
    formatter.dateStyle = .medium
    return formatter.string(from: self)
  }
  
  var currentYear: String {
    let format = DateFormatter()
    format.dateFormat = "yyyy"
    return format.string(from: self)
  }
}
