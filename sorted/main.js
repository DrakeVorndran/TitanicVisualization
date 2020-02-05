fetch('passengers.json', { mode: 'no-cors' })
  .then(res => res.json())
  .then(json => handleData(json))
  .catch(err => console.log(err.message))

function handleData(passengers) {
  sortOnSex(passengers)
  sortOnSurvived(passengers)
  sortOnEmbarked(passengers)
  sortOnSexSurvived(passengers)
  menOnly(passengers)
  womenOnly(passengers)
  firstClassOnly(passengers)
  secondClassOnly(passengers)
  thirdClassOnly(passengers)
  undefDepart(passengers)
}

function renderTo(passenger, div) {
  const newDiv = document.createElement("div")
  // newDiv.style.backgroundColor = passenger.fields.survived == "Yes" ? green : red
  newDiv.classList.add(passenger.fields.survived == "Yes" ? "survive" : "die")
  // newDiv.style.borderRadius = passenger.fields.sex == "male" ? "0%" : "50%"
  newDiv.classList.add(passenger.fields.sex)
  
  // newDiv.style.backgroundColor = passenger.fields.embarked == undefined ? red : colors[passenger.fields.embarked]
  newDiv.classList.add(passenger.fields.embarked == undefined? "undefined" : passenger.fields.embarked.toLowerCase())
  div.appendChild(newDiv)
}

function sortOnSex(passengers) {
  sexDiv = document.querySelector(".sex")
  sorted = [...passengers]
  sorted.sort((a, b) => {
    if (a.fields.sex == b.fields.sex) {
      return 0
    }
    if (a.fields.sex == "male") {
      return -1
    }
    return 1
  })
  sorted.forEach(passenger => renderTo(passenger, sexDiv))
  
}

function sortOnSurvived(passengers) {
  survivedDiv = document.querySelector(".survived")
  sorted = [...passengers]
  sorted.sort((a, b) => {
    if (a.fields.survived == b.fields.survived) {
      return 0
    }
    if (a.fields.survived == "Yes") {
      return -1
    }
    return 1
  })
  sorted.forEach(passenger => renderTo(passenger, survivedDiv))
  
  
}

function sortOnEmbarked(passengers) {
  embarkedDiv = document.querySelector(".embarked")
  sorted = [...passengers]
  sorted.sort((a, b) => a.fields.embarked == undefined? b.fields.embarked == undefined ? 0 : 1 : b.fields.embarked == undefined ? -1 : a.fields.embarked.charCodeAt(0) - b.fields.embarked.charCodeAt(0))
  sorted.forEach(passenger => renderTo(passenger, embarkedDiv))
  
}

function sortOnSexSurvived(passengers) {
  const male = passengers.filter(passenger => passenger.fields.sex == "male")
  const female = passengers.filter(passenger => passenger.fields.sex == "female")
  male.sort((a, b) => {
    if (a.fields.survived == b.fields.survived) {
      return 0
    }
    if (a.fields.survived == "Yes") {
      return -1
    }
    return 1
  })
  female.sort((a, b) => {
    if (a.fields.survived == b.fields.survived) {
      return 0
    }
    if (a.fields.survived == "Yes") {
      return -1
    }
    return 1
  })
  const sorted = [...male, ...female]
  const sexSurvivedDiv = document.querySelector(".sex-survived")
  sorted.forEach(passenger => renderTo(passenger, sexSurvivedDiv))
}

function menOnly(passengers) {
  const menDiv = document.querySelector(".men")
  const filtered = passengers.filter(passenger => passenger.fields.sex == "male")
  filtered.forEach(passenger => renderTo(passenger, menDiv))
}

function womenOnly(passengers) {
  const womenDiv = document.querySelector(".women")
  const filtered = passengers.filter(passenger => passenger.fields.sex == "female")
  filtered.forEach(passenger => renderTo(passenger, womenDiv))
}

function firstClassOnly(passengers) {
  const classDiv = document.querySelector(".class-1")
  const filtered = passengers.filter(passenger => passenger.fields.pclass == "1")
  filtered.forEach(passenger => renderTo(passenger, classDiv))
}

function secondClassOnly(passengers) {
  const classDiv = document.querySelector(".class-2")
  const filtered = passengers.filter(passenger => passenger.fields.pclass == "2")
  filtered.forEach(passenger => renderTo(passenger, classDiv))
}

function thirdClassOnly(passengers) {
  const classDiv = document.querySelector(".class-3")
  const filtered = passengers.filter(passenger => passenger.fields.pclass == "3")
  filtered.forEach(passenger => renderTo(passenger, classDiv))
}

function undefDepart(passengers) {
  const undefDiv = document.querySelector(".undef")
  const filtered = passengers.filter(passenger => passenger.fields.embarked == undefined)
  filtered.forEach(passenger => renderTo(passenger, undefDiv))
}

const openButton = document.querySelector(".floating-key > .open")
const floatingKey = document.querySelector(".floating-key")
let keyShowing = false

openButton.onclick = () => {
  floatingKey.classList.toggle("show")
  keyShowing = !keyShowing
  openButton.innerHTML = keyShowing ? "<p><</p>" : "<p>></p>"
}