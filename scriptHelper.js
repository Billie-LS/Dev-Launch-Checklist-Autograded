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
  pilotNameInput,
  copilot,
  fuelLevel,
  cargoMass
) => {
  // Update pilot/copilot status
  document.getElementById(
    "pilotStatus"
  ).innerHTML = `Pilot ${pilotNameInput} is ready for launch`;
  document.getElementById(
    "copilotStatus"
  ).innerHTML = `Co-pilot ${copilot} is ready for launch`;

  // Show the list
  list.style.visibility = "visible";

  // Check fuel levels and update faulty items
  if (fuelLevel < 10000) {
    document.getElementById("fuelStatus").innerHTML =
      "Fuel level too low for launch";
    document.getElementById("launchStatus").innerHTML =
      "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "red";
    // document.getElementById("faultyItems").style.visibility = "visible"; // Show the list if there's an issue
  } else {
    document.getElementById("fuelStatus").innerHTML =
      "Fuel level high enough for launch";
  }

  // Check cargo levels and update faulty items
  if (cargoMass > 10000) {
    document.getElementById("cargoStatus").innerHTML =
      "Cargo mass too heavy for launch";
    document.getElementById("launchStatus").innerHTML =
      "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "red";
    // document.getElementById("faultyItems").style.visibility = "visible"; // Show the list if there's an issue
  } else {
    document.getElementById("cargoStatus").innerHTML =
      "Cargo mass low enough for launch";
  }

  // Check if everything is fine
  if (fuelLevel >= 10000 && cargoMass <= 10000) {
    document.getElementById("faultyItems").style.visibility = "hidden"; // Hide the list when everything is fine
    document.getElementById("launchStatus").innerHTML =
      "Shuttle is Ready for Launch";
    document.getElementById("launchStatus").style.color = "green";
  } else {
    document.getElementById("faultyItems").style.visibility = "visible"; // Show the list if there are issues
    document.getElementById("launchStatus").innerHTML =
      "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "red";
  }
};

module.exports.myFetch = myFetch;
module.exports.pickPlanet = pickPlanet;
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
