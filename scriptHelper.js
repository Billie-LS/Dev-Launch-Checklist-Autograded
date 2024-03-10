// Write your helper functions here!

require("cross-fetch/polyfill");

const myFetch = async () => {
  const response = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  );

  if (!response.ok) {
    console.error("Failed to fetch planets data");
    return [];
  }

  const planetsReturned = await response.json();
  return planetsReturned;
};

const pickPlanet = (planets) => {
  const randomIndex = Math.floor(Math.random() * planets.length);
  return planets[randomIndex];
};

const addDestinationInfo = (
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) => {
  const missionTargetDiv = document.getElementById("missionTarget");
  missionTargetDiv.innerHTML = `
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
};

const validateInput = (testInput) => {
  return testInput === ""
    ? "Empty"
    : !isNaN(testInput)
    ? "Is a Number"
    : "Not a Number";
};

const formSubmission = (
  document,
  list,
  pilot,
  copilot,
  fuelLevel,
  cargoLevel
) => {
  // DOM elements
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let launchStatus = document.getElementById("launchStatus");
  let cargoStatus = document.getElementById("cargoStatus");

  // Reset previous changes
  list.style.visibility = "hidden";

  // Check if all fields are filled
  if (
    validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoLevel) === "Empty"
  ) {
    alert("All fields are required");
    return;
  }

  // Check if fuelLevel and cargoLevel are numbers and pilot and co-pilot are strings
  if (
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoLevel) === "Not a Number"
  ) {
    alert("Please enter numerical values for Fuel Level and Cargo Mass");
    return;
  }

  if (
    validateInput(pilot) === "Is a Number" ||
    validateInput(copilot) === "Is a Number"
  ) {
    alert("Please do not enter numbers for the pilot or co-pilot names");
    return;
  }

  // Update pilot/copilot status
  pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
  copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

  // Check fuel levels and update faulty items
  if (Number(fuelLevel) < 10000) {
    fuelStatus.innerHTML = `Fuel level too low for launch`;
    list.style.visibility = "visible";
    launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
    launchStatus.style.color = `red`;
  } else {
    fuelStatus.innerHTML = `Fuel level high enough for launch`;
  }

  // Check cargo levels and update faulty items
  if (Number(cargoLevel) > 10000) {
    cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
    list.style.visibility = `visible`;
    launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
    launchStatus.style.color = `red`;
  } else {
    cargoStatus.innerHTML = `Cargo mass low enough for launch`;
  }

  // Check if everything is fine
  if (
    fuelStatus.innerHTML === `Fuel level high enough for launch` &&
    cargoStatus.innerHTML === `Cargo mass low enough for launch`
  ) {
    // Hide the list if everything is fine
    list.style.visibility = `hidden`; // Make sure the list is hidden
    launchStatus.innerHTML = `Shuttle is Ready for Launch`;
    launchStatus.style.color = `green`;
  } else {
    // If there are any issues, show the list
    list.style.visibility = `visible`;
    launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
    launchStatus.style.color = `red`;
  }
};

module.exports.myFetch = myFetch;
module.exports.pickPlanet = pickPlanet;
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
