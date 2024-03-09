// Write your helper functions here!

require("cross-fetch/polyfill");

const addDestinationInfo = (
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) => {
  // Here is the HTML formatting for our mission target div.
  /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */
};

const validateInput = (testInput) => {
  if (testInput.trim() === "") {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
};

const formSubmission = (document, pilot, copilot, fuelLevel, cargoLevel) => {
  // Validate inputs
  const pilotValidation = validateInput(pilot);
  const copilotValidation = validateInput(copilot);
  const fuelValidation = validateInput(fuelLevel);
  const cargoValidation = validateInput(cargoLevel);

  // Update shuttle requirements based on input values
  if (
    pilotValidation === "Empty" ||
    copilotValidation === "Empty" ||
    fuelValidation === "Empty" ||
    cargoValidation === "Empty"
  ) {
    // If any field is empty, display an alert and return
    alert("All fields are required!");
    return;
  }

  if (fuelValidation !== "Is a Number" || cargoValidation !== "Is a Number") {
    // If fuel level or cargo mass is not a number, display an alert and return
    alert("Invalid input! Fuel level and cargo mass must be numbers.");
    return;
  }

  // Update shuttle requirements
  document.getElementById(
    "pilotStatus"
  ).innerText = `Pilot ${pilot} is ready for launch.`;
  document.getElementById(
    "copilotStatus"
  ).innerText = `Co-pilot ${copilot} is ready for launch.`;

  if (fuelLevel < 10000) {
    // If fuel level is less than 10,000, update fuel status and show warning
    document.getElementById("fuelStatus").innerText =
      "Fuel level too low for launch";
    document.getElementById("launchStatus").innerText =
      "Shuttle not ready for launch";
    document.getElementById("launchStatus").style.color = "red";
  } else {
    // If fuel level is sufficient, update fuel status
    document.getElementById("fuelStatus").innerText =
      "Fuel level high enough for launch";
  }

  if (cargoLevel > 10000) {
    // If cargo mass is greater than 10,000, update cargo status and show warning
    document.getElementById("cargoStatus").innerText =
      "Cargo mass too high for launch";
    document.getElementById("launchStatus").innerText =
      "Shuttle not ready for launch";
    document.getElementById("launchStatus").style.color = "red";
  } else {
    // If cargo mass is within limits, update cargo status
    document.getElementById("cargoStatus").innerText =
      "Cargo mass low enough for launch";
  }

  if (fuelLevel >= 10000 && cargoLevel <= 10000) {
    // If both fuel level and cargo mass are within limits, update launch status
    document.getElementById("launchStatus").innerText =
      "Awaiting Information Before Launch";
    document.getElementById("launchStatus").style.color = "black";
  }
};

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch().then(function (response) {});

  return planetsReturned;
}

function pickPlanet(planets) {}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
