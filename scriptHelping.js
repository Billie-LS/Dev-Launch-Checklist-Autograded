// Write your helper functions here!
require("cross-fetch/polyfill");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  const missionTarget = document.getElementById("missionTarget");

  // Here is the HTML formatting for our mission target div.
  missionTarget.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">`;
}

//function to determine if testInput is empty, a number, or string
function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else if (!isNaN(testInput)) {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  // first three if statements are validating fields - no point in running rest of code if these do not pass

  // make sure all inputs are not empty
  if (
    validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoLevel) === "Empty"
  ) {
    //alert("All fields are required!");
    return;
  }

  // make sure pilot & copilot are strings
  if (
    validateInput(pilot) === "Is a Number" ||
    validateInput(copilot) === "Is a Number"
  ) {
    //alert("Pilot AND copilot inputs must be strings");
    return;
  }

  // make sure fuelLevel & cargoLevel inputs are numbers
  if (
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoLevel) === "Not a Number"
  ) {
    //alert("Fuel AND cargo level must be number inputs");
    return;
  }

  // grabbing elements from the DOM - no point in initializing if validation fails
  const pilotStatus = document.getElementById("pilotStatus");
  const copilotStatus = document.getElementById("copilotStatus");
  const fuelStatus = document.getElementById("fuelStatus");
  const cargoStatus = document.getElementById("cargoStatus");
  const launchStatus = document.getElementById("launchStatus");

  // after validation, pilot info text should change
  pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
  copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

  // update fuelStatus depending on fuelLevel input
  if (fuelLevel < 10000) {
    list.style.visibility = "visible";
    fuelStatus.innerHTML = "Fuel level too low for launch";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
  } else {
    fuelStatus.innerHTML = "Fuel level high enough for launch";
  }

  // update cargoStatus depending on cargoLevel input
  if (cargoLevel > 10000) {
    list.style.visibility = "visible";
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
  } else {
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
  }

  // if every field passes all above checks, should be ready to launch
  if (
    fuelStatus.innerHTML === `Fuel level high enough for launch` &&
    cargoStatus.innerHTML === `Cargo mass low enough for launch`
  ) {
    list.style.visibility = `visible`;
    launchStatus.innerHTML = `Shuttle is Ready for Launch`;
    launchStatus.style.color = `green`;
  }
}

async function myFetch() {
  let planetsReturned;
  // this is what chatgpt is saying to use. why does this work and above doesnt?
  const response = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  );
  planetsReturned = await response.json();
  return planetsReturned;
}

function pickPlanet(planets) {
  let index = Math.floor(Math.random() * planets.length);
  return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
