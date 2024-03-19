// Write your helper functions here!

// import necessary polyfill for fetch
require("cross-fetch/polyfill");

// function add destination information to document
function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  // Here is the HTML formatting for our mission target div.
  // Test: Mission target has the appropriate info.
  document.getElementById("missionTarget").innerHTML = `  
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
    `;
}

// function validate input fields
function validateInput(testInput) {
  if (testInput === "") {
    //alert("All fields are required!");
    //console.log("All fields are required!");
    return "Empty";
  }
  if (isNaN(parseInt(testInput))) {
    //alert("All fields are required!");
    //console.log("All fields are required!");
    return "Not a Number";
  } else {
    //alert("All fields are required!");
    //console.log("All fields are required!");
    return "Is a Number";
  }
}

// function handle form submission
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
  let launchStatusElem = document.getElementById("launchStatus");
  let pilotStatusElem = document.getElementById("pilotStatus");
  let copilotStatusElem = document.getElementById("copilotStatus");
  let fuelStatusElem = document.getElementById("fuelStatus");
  let cargoStatusElem = document.getElementById("cargoStatus");
  let readyToLaunch;

  // check any input field is empty
  if (
    validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoMass) === "Empty"
  ) {
    console.log("All fields are required!");
    alert("All fields are required!");
  } else if (
    // check if input fields contain invalid data
    validateInput(pilot) === "Is a Number" ||
    validateInput(copilot) === "Is a Number" ||
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoMass) === "Not a Number"
  ) {
    alert("Enter valid information for each field!");
  } else {
    // set pilot and copilot status
    pilotStatusElem.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatusElem.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    list.style.visibility = "visible";
    readyToLaunch = true;

    // check fuel level
    if (Number(fuelLevel) >= 10000) {
      fuelStatusElem.innerHTML = `Fuel level high enough for launch`;
    } else {
      fuelStatusElem.innerHTML = `Fuel level too low for launch`;
      launchStatusElem.innerHTML = "Shuttle Not Ready for Launch";
      launchStatusElem.style.color = `red`;
      readyToLaunch = false;
    }

    //  check cargo mass
    if (Number(cargoMass) <= 10000) {
      cargoStatusElem.innerHTML = "Cargo mass low enough for launch";
    } else {
      cargoStatusElem.innerHTML = `Cargo mass too heavy for launch`;
      launchStatusElem.innerHTML = "Shuttle Not Ready for Launch";
      launchStatusElem.style.color = `red`;
      readyToLaunch = false;
    }

    // update launch status on readiness
    if (readyToLaunch === true) {
      launchStatusElem.innerHTML = `Shuttle is Ready for Launch`;
      launchStatusElem.style.color = `green`;
    }
  }
}

// Test: fetching a list of planets from Planets URL
// function fetch list planets
async function myFetch() {
  let response = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  );

  let planetsReturned = await response.json();
  return planetsReturned;
}

//  Test: Select planets ar random.
// function select random planet from list
function pickPlanet(planets) {
  let randomPlanet = Math.floor(Math.random() * planets.length);
  // Get random number and get planet with that index.

  return planets[randomPlanet];
}

// export helper functions
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
