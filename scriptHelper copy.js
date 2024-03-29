// Write your helper functions here!

require("cross-fetch/polyfill");

async function myFetch() {
  const response = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  );

  if (!response.ok) {
    console.error("Failed to fetch planets data");
    return [];
  }

  const planetsReturned = await response.json();
  return planetsReturned;
}

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
  if (pilot === "" || copilot === "" || fuelLevel === "" || cargoLevel === "") {
    alert("All fields are required!");
    return;
  }

  if (isNaN(fuelLevel) || isNaN(cargoLevel)) {
    alert("Please enter valid information for all fields!");
    return;
  }

  document.getElementById(
    "pilotStatus"
  ).innerHTML = `Pilot ${pilot} is ready for launch`;
  document.getElementById(
    "copilotStatus"
  ).innerHTML = `Co-pilot ${copilot} is ready for launch`;

  if (fuelLevel < 10000) {
    document.getElementById("faultyItems").style.visibility = "visible";
    document.getElementById("fuelStatus").innerHTML =
      "Fuel level too low for launch";
    document.getElementById("launchStatus").innerHTML =
      "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "red";
  } else {
    document.getElementById("fuelStatus").innerHTML =
      "Fuel level high enough for launch";
  }

  if (cargoLevel > 10000) {
    document.getElementById("faultyItems").style.visibility = "visible";
    document.getElementById("cargoStatus").innerHTML =
      "Cargo mass too heavy for launch";
    document.getElementById("launchStatus").innerHTML =
      "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "red";
  } else {
    document.getElementById("cargoStatus").innerHTML =
      "Cargo mass low enough for launch";
  }

  if (fuelLevel >= 10000 && cargoLevel <= 10000) {
    // Both fuel level and cargo level are within acceptable ranges
    document.getElementById("faultyItems").style.visibility = "hidden"; // Hide faulty items
    document.getElementById("launchStatus").innerHTML =
      "Shuttle is Ready for Launch";
    document.getElementById("launchStatus").style.color = "green";
  } else {
    // At least one condition is not met, so show the faulty items
    document.getElementById("faultyItems").style.visibility = "visible";
    document.getElementById("launchStatus").innerHTML =
      "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "red";
  }
};

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
