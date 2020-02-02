fetch('passengers.json', { mode: 'no-cors' })
		.then(res => res.json())
		.then(json => handleData(json))
    .catch(err => console.log(err.message))

function handleData(passengers) {
  const dots = document.getElementById("dots")
  console.log(dots)
  passengers = passengers.filter(passenger => passenger.fields.age !== undefined)
  passengers.sort((a, b) => a.fields.age - b.fields.age)
  const body = document.querySelector("body")
  console.log(body)
  const maxFare = passengers.reduce((r, passenger) => passenger.fields.fare > r ? passenger.fields.fare : r, 0)
  passengers.forEach(passenger => {
    const div = document.createElement("div")
    div.style.transform = passenger.fields.sex == "male" ? "rotate(0) " : "rotate(45deg) "
    div.style.backgroundColor = passenger.fields.survived == "Yes" ? "green" : "red"
    div.style.transform +=`scale(${(passenger.fields.fare / maxFare) + .2})` 
    div.style.borderRadius = `${passenger.fields.pclass <= 1? "50%" : "0%"} ${passenger.fields.pclass - 1 <= 1? "50%" : "0%"} 0% ${passenger.fields.pclass - 2 <= 1? "50%" : "0%"}`
    dots.appendChild(div)

  })
}

