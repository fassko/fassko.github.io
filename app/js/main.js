const SKILLS = [["Swift, Objective-C", 98],["Xcode, Cocoapods, Carthage", 97], ["iOS, tvOS, watchOS, macOS", 98], ["Buddybuild, Circle CI, Travis CI", 92],["RxSwift, MVVM", 90],["Javascript, Angular, jQuery", 82], ["HTML, CSS", 90], ["PostgreSQL, Oracle, MongoDB, SQlite", 84], ["Java, Ruby, Python, PHP", 72],["Sketch", 70]];

const SKILLS_CONT = document.getElementById("skills__section")

function renderSkilltoDOM(skill) {
  SKILLS_CONT.insertAdjacentHTML("beforeend",
    `<div class="skills__item">
      <span class="txt txt--dark skills__title">${skill[0]}</span>
      <div class="skills__bar">
        <div class="skills__progress" style="width:${skill[1]}%"></div>
      </div>
    </div>`
  );
}
  SKILLS.forEach((skill) => {
    renderSkilltoDOM(skill);
  });





// };
//
// items.forEach(function(item){
//   copy.push(item)
// });


// function logArrayElements(element, index, array) {
//   console.log('a[' + index + '] = ' + element);
// }
//
// array.forEach(function(currentValue, index, arr), thisValue);
//
// arr.forEach((num, index) => {
//     return arr[index] = num * 2;
// });
//
// data.messages.forEach((message) => {
//   const author = message.author;
//   const msg = message.content;
//   const time = message.created_at;
//   allMessages.insertAdjacentHTML("afterbegin",
//     `<li>
//     <span class="time">${time.substring(11, 16)}</span>
//     <span class="author">${author}:</span>
//     ${msg}
//     </li>`);
// });
// });
// }
