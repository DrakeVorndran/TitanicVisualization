fetch('passengers.json', { mode: 'no-cors' })
		.then(res => res.json())
		.then(json => handleData(json))
		.catch(err => console.log(err.message))

function handleData(passengers) {

  const classes = {
    1: 0,
    2: 0,
    3: 0,
  }
  passengers.forEach((passenger) => {
    if (passenger.fields.pclass) {
      classes[passenger.fields.pclass] += 1
    }
  })

  const genderSurvival = { 
    1: {male: 0, female: 0},
    2: {male: 0, female: 0},
    3: {male: 0, female: 0},
  }

  passengers.forEach((passenger) => {
    if (passenger.fields.pclass) {
      genderSurvival[passenger.fields.pclass][passenger.fields.sex] += 1
    }
  })
  
  Object.keys(genderSurvival).forEach(key => {
    const gDiv = document.querySelector(`.gender .class:nth-of-type(${key})`)
    const pDiv = document.querySelector(`.per-gender .class:nth-of-type(${key})`)
    Object.keys(genderSurvival[key]).forEach(gender => {
      const genderDiv = gDiv.querySelector(`.${gender}`)
      const perGenderDiv = pDiv.querySelector(`.${gender}`)
      const genderText = document.createElement("p")
      const perGenderText = document.createElement("p")
      genderText.innerHTML = gender
      perGenderText.innerHTML = gender
      genderDiv.innerHTML = genderSurvival[key][gender]
      genderDiv.style.height = `${genderSurvival[key][gender] / 350 * 100}%`
      perGenderDiv.innerHTML = `${(genderSurvival[key][gender] / classes[key] * 100).toFixed(2)}%`
      perGenderDiv.style.height = `${genderSurvival[key][gender] / classes[key] * 100}%`
      genderDiv.appendChild(genderText)
      perGenderDiv.appendChild(perGenderText)
    })

  })

  const ageSurvival = {}
  passengers.forEach((passenger) => {
    if(passenger.fields.age in ageSurvival) {
      ageSurvival[passenger.fields.age].push(passenger.fields.survived == "Yes") 
    }
    else {
      ageSurvival[passenger.fields.age] = [passenger.fields.survived == "Yes"]
    }
  })

  delete ageSurvival[undefined]
  
  const agesDiv = document.querySelector(".ages")
  Object.keys(ageSurvival).forEach(age => {
    ageSurvival[age].sort((a, b) => a == b? 0 : a ? -1 : 1)
    const ageDiv = document.createElement("div")
    const ageP = document.createElement("p")
    ageP.innerHTML = age
    ageDiv.appendChild(ageP)
    ageDiv.classList.add("age")
    ageSurvival[age].forEach(person => {
      const personDiv = document.createElement("div")
      personDiv.classList.add("person")
      personDiv.classList.add(person)
      ageDiv.appendChild(personDiv)
    })
    agesDiv.appendChild(ageDiv)
  })
  

  



  // console.log("First Passenger: ")
  // console.log(passengers[0].fields.name)
  // console.log(" ")
  
  // console.log("Total Passengers: ")
  // console.log(passengers.length)
  // console.log(" ")
  
  
  const numSurvived = passengers.reduce((r, passenger) => passenger.fields.survived == "Yes" ? r + 1 : r, 0)
  // console.log("number survived: ")
  // console.log(numSurvived)
  // console.log(" ")
  
  // console.log("number died: ")
  // console.log(passengers.length - numSurvived)
  // console.log(" ")
  
  
  // console.log("people per class: ")
  // console.log(classes)
  // console.log(" ")
  
  const classSurvived = {
    1: {
      lived: 0,
      died: 0
    },
    2: {
      lived: 0,
      died: 0
    },
    3: {
      lived: 0,
      died: 0
    },
  }
  passengers.forEach((passenger) => {
    if (passenger.fields.pclass) {
      if (passenger.fields.survived == "Yes") {
        classSurvived[passenger.fields.pclass].lived += 1
      }
      else {
        classSurvived[passenger.fields.pclass].died += 1
      }
    }
  })
  
  // console.log("survived / died per class: ")
  // console.log(classSurvived)
  // console.log(" ")
  
  const ages = passengers.map((passenger) => passenger.fields.age).filter((age) => age !== undefined)
  // console.log("avg age: ")
  // console.log(ages.reduce((r, age) => r + age) / ages.length)
  // console.log(" ")
  
  // console.log("Total Passengers embarked from Queenstown: ")
  // console.log(passengers.filter((passenger) => passenger.fields.embarked == "Q").length)
  // console.log(" ")
  
  // console.log("Total children traveling with a nanny: ")
  // console.log(passengers.filter((passenger) => passenger.fields.parch == 0 && passenger.fields.age < 18).length)
  // console.log(" ")
  
  let minAge = Number.POSITIVE_INFINITY;
  let maxAge = 0;
  
  ages.forEach(age => {
    if (age > maxAge) {
      maxAge = age
    }
    if (age < minAge) {
      minAge = age
    }
  })
  // console.log("min and max age: ")
  // console.log(`min: ${minAge} | max: ${maxAge}`)
  // console.log(" ")
  
  let minFare = Number.POSITIVE_INFINITY;
  let maxFare = 0;
  
  passengers.forEach((passenger) => {
    if (passenger.fields.fare !== undefined) {
      if (passenger.fields.fare > maxFare) {
        maxFare = passenger.fields.fare
      }
      if (passenger.fields.fare < minFare) {
        minFare = passenger.fields.fare
      }
    }
  })
  // console.log("min and max fare: ")
  // console.log(`min: ${minFare} | max: ${maxFare}`)
  // console.log(" ")
  
  
  const numSibs = passengers.filter((passenger) => passenger.fields.sibsp > 0).length
  const numSibsSurvived = passengers.filter((passenger) => passenger.fields.sibsp > 0 && passenger.fields.survived == "Yes").length
  // console.log("Total Number of siblings: ")
  // console.log(numSibs)
  // console.log(" ")
  
  // console.log("Total Number of siblings survived: ")
  // console.log(numSibsSurvived)
  // console.log(" ")
  
  // console.log("Ratio of siblings survived")
  // console.log(numSibsSurvived / numSibs)
  
  // console.log("Ratio of only children survived")
  // console.log((numSurvived - numSibsSurvived) / (passengers.length - numSibs))
  
  // console.log("Total Ages estimated: ")
  // console.log(passengers.filter((passenger) => Math.round(passenger.fields.age) == passenger.fields.age && passenger.fields.age > 1).length)
  // console.log(" ")
}

