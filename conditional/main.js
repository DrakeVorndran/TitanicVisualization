const survivedButton = document.getElementById("button-survived")
const genderButton = document.getElementById("button-gender")
const embarkedButton = document.getElementById("button-embarked")
const sortDiv = document.getElementsByClassName("sort-box")[0]
const dataDiv = document.querySelector(".data")
const passengerDiv = document.querySelector(".passenger")
const resetButton = document.getElementById("reset")

const divArray = []
let passengersList = []
let orignalPassengers = []

let showSurvived = false
let showGender = false
let showEmbarked = false

const colorOff = "black"
const colorOn = "white"

resetButton.onclick = () => {
  passengersList = [...orignalPassengers]
  renderData()
}

const addElement = (name, value) => {
  const nameP = document.createElement("p")
  const pSpan = document.createElement("span")
  const nameSpan = document.createElement("span")
  pSpan.style.fontWeight = "bold"
  pSpan.innerHTML = `${name}: `
  nameSpan.innerHTML = value
  nameSpan.style.fontStyle = "italic"
  nameP.appendChild(pSpan)
  nameP.appendChild(nameSpan)

  passengerDiv.appendChild(nameP)
}

dataDiv.onclick = (e) => {
  const p = passengersList[e.target.dataset.index].fields
  passengerDiv.innerHTML = ""
  passengerDiv.style.display = "inline-block"
  
  addElement("Name", p.name)
  addElement("Age", p.age)
  addElement("Survived", p.survived)
  addElement("Gender", p.sex)
  addElement("Embarked", p.embarked)
  addElement("Fare", p.fare)
}



sortDiv.onclick = (e) => {
  if (e.target.nodeName === "BUTTON") {
    sortDiv.querySelectorAll("button").forEach(button => changeButton(button, false))
    changeButton(e.target, true)

    if (e.target.id == "age") {
      passengersList.sort((a, b) => a.fields.age == b.fields.age ? 0 : a.fields.age == undefined ? 1 : b.fields.age == undefined ? -1 : a.fields.age - b.fields.age)
    }

    if (e.target.id == "embarked") {
      passengersList.sort((a, b) => a.fields.embarked == undefined? b.fields.embarked == undefined ? 0 : 1 : b.fields.embarked == undefined ? -1 : a.fields.embarked.charCodeAt(0) - b.fields.embarked.charCodeAt(0))
    }

    if (e.target.id == "sex") {
      passengersList.sort((a, b) => a.fields.sex == b.fields.sex? 0 : a.fields.sex == "male"? 1 : -1)
    }

    if (e.target.id == "survived") {
      passengersList.sort((a, b) => a.fields.survived == b.fields.survived ? 0 : a.fields.survived == "Yes"? -1 : 1)
    }

    renderData()
  }
}

survivedButton.onclick = e => {
  showSurvived = !showSurvived
  changeButton(e.target, showSurvived)
}

genderButton.onclick = e => {
  showGender = !showGender
  changeButton(e.target, showGender)
}

embarkedButton.onclick = e => {
  showEmbarked = !showEmbarked
  changeButton(e.target, showEmbarked)
}

const changeButton = (button, state) => {
  renderData()
  button.style.color = state ? colorOn : colorOff
  button.style.background = state ? colorOff : colorOn
}

const renderData = () => {
  divArray.forEach((div, i) => {
    div.className = ""
    if (showSurvived) {
      div.classList.add(passengersList[i].fields.survived == "Yes")
    }

    if (showGender) {
      div.classList.add(passengersList[i].fields.sex)
    }

    if (showEmbarked) {
      div.classList.add(String(passengersList[i].fields.embarked).toLowerCase())
    }

  })
}


fetch('passengers.json', { mode: 'no-cors' })
  .then(res => res.json())
  .then(json => handleData(json))
  .catch(err => console.log(err.message))

function handleData(passengers) {
  passengersList = passengers
  orignalPassengers = [...passengers]
  const dataDiv = document.querySelector(".data")
  passengers.forEach((passenger, i) => {
    const passengerDiv = document.createElement("div")
    passengerDiv.dataset.index = i
    passengerDiv.dataset.index == i
    divArray.push(passengerDiv)
    dataDiv.appendChild(passengerDiv)
  })
}