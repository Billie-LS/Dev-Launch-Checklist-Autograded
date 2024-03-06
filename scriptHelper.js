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
  // Add the selected planet's information to the missionTarget div
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
}

const validateInput = (testInput) => {
  return testInput === ""
    ? "Empty"
    : !isNaN(testInput)
    ? "Is a Number"
    : "Not a Number";
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  // Validate input fields
  if (pilot === "" || copilot === "" || fuelLevel === "" || cargoLevel === "") {
    alert("All fields are required!");
    return;
  }

  if (isNaN(fuelLevel) || isNaN(cargoLevel)) {
    alert("Please enter valid information for all fields!");
    return;
  }

  // Update pilot status
  document.getElementById(
    "pilotStatus"
  ).innerHTML = `Pilot ${pilot} is ready for launch`;

  // Update copilot status
  document.getElementById(
    "copilotStatus"
  ).innerHTML = `Co-pilot ${copilot} is ready for launch`;

  // Check fuel level
  if (fuelLevel < 10000) {
    // Update faulty items list and display
    document.getElementById("faultyItems").style.visibility = "visible";
    document.getElementById("fuelStatus").innerHTML =
      "Fuel level too low for launch";

    // Update launch status
    document.getElementById("launchStatus").innerHTML =
      "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "red";
  } else {
    // Reset fuel status if fuel level is sufficient
    document.getElementById("fuelStatus").innerHTML =
      "Fuel level high enough for launch";
  }

  // Check cargo mass
  if (cargoLevel > 10000) {
    // Update faulty items list and display
    document.getElementById("faultyItems").style.visibility = "visible";
    document.getElementById("cargoStatus").innerHTML =
      "Cargo mass too heavy for launch";

    // Update launch status
    document.getElementById("launchStatus").innerHTML =
      "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "red";
  } else {
    // Reset cargo status if cargo mass is within limits
    document.getElementById("cargoStatus").innerHTML =
      "Cargo mass low enough for launch";
  }

  // Check if shuttle is ready for launch
  if (fuelLevel >= 10000 && cargoLevel <= 10000) {
    // Hide faulty items list
    document.getElementById("faultyItems").style.visibility = "hidden";

    // Update launch status
    document.getElementById("launchStatus").innerHTML =
      "Shuttle is Ready for Launch";
    document.getElementById("launchStatus").style.color = "green";
  }
}

async function myFetch() {
  let planetsReturned;
  // Fetch planetary JSON data
  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });
  return planetsReturned;
}

function pickPlanet(planets) {
  // Select a random planet from the list
  const randomIndex = Math.floor(Math.random() * planets.length);
  return planets[randomIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
