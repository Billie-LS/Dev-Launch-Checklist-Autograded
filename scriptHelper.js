// Write your helper functions here!

// Import the necessary polyfill for making fetch requests
require("cross-fetch/polyfill");

// Define a function to add destination information to the DOM
const addDestinationInfo = (
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) => {
  // Get the mission target element from the DOM
  const missionTarget = document.getElementById("missionTarget");

  // Set the HTML content of the mission target element with the provided destination information
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
};

// Define a function to validate input (empty, number, or string)
const validateInput = (testInput) => {
  // Check if the input is empty
  if (testInput === "") {
    return "Empty";
  }
  // Check if the input is not a number
  else if (isNaN(testInput)) {
    return "Not a Number";
  }
  // Check if the input is a number
  else if (!isNaN(testInput)) {
    return "Is a Number";
  }
};

// Define a function to handle form submission and perform input validation
const formSubmission = (
  document,
  list,
  pilot,
  copilot,
  fuelLevel,
  cargoLevel
) => {
  // Validate if any of the required fields are empty
  if (
    validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoLevel) === "Empty"
  ) {
    alert("All fields are required!");
    return;
  }

  // Validate if pilot and copilot inputs are strings
  if (
    validateInput(pilot) === "Is a Number" ||
    validateInput(copilot) === "Is a Number"
  ) {
    alert("Pilot AND copilot inputs must be strings");
    return;
  }

  // Validate if fuelLevel and cargoLevel inputs are numbers
  if (
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoLevel) === "Not a Number"
  ) {
    alert("Fuel AND cargo level must be number inputs");
    return;
  }

  // Get references to DOM elements for displaying status messages
  const pilotStatus = document.getElementById("pilotStatus");
  const copilotStatus = document.getElementById("copilotStatus");
  const fuelStatus = document.getElementById("fuelStatus");
  const cargoStatus = document.getElementById("cargoStatus");
  const launchStatus = document.getElementById("launchStatus");

  // Update pilot and copilot status messages
  pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
  copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

  // Update fuelStatus message based on fuelLevel input
  if (fuelLevel < 10000) {
    list.style.visibility = "visible";
    fuelStatus.innerHTML = "Fuel level too low for launch";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
  } else {
    fuelStatus.innerHTML = "Fuel level high enough for launch";
  }

  // Update cargoStatus message based on cargoLevel input
  if (cargoLevel > 10000) {
    list.style.visibility = "visible";
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
  } else {
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
  }

  // If all validation passes, set launch status to ready
  if (
    fuelStatus.innerHTML === `Fuel level high enough for launch` &&
    cargoStatus.innerHTML === `Cargo mass low enough for launch`
  ) {
    list.style.visibility = `visible`;
    launchStatus.innerHTML = `Shuttle is Ready for Launch`;
    launchStatus.style.color = `green`;
  }
};

// Define an asynchronous function to fetch planet data from a remote endpoint
const myFetch = async () => {
  let planetsReturned;

  // Fetch planet data from a remote JSON file
  const response = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  );

  // Extract and parse the JSON data from the response
  planetsReturned = await response.json();

  // Return the fetched planet data
  return planetsReturned;
};

// Define a function to pick a random planet from the provided list of planets
const pickPlanet = (planets) => {
  // Generate a random index within the range of the planets array
  let index = Math.floor(Math.random() * planets.length);

  // Return the planet at the randomly generated index
  return planets[index];
};

// Export helper functions for use in other modules
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
