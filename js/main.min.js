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
