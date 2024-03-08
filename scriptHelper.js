// Write your helper functions here!

require("cross-fetch/polyfill");

async function myFetch() {
  try {
    const response = await fetch(
      "https://handlers.education.launchcode.org/static/planets.json"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch planets data");
    }
    const planetsReturned = await response.json();
    return planetsReturned;
  } catch (error) {
    console.error("Error fetching planets data:", error.message);
    return [];
  }
}

function pickPlanet(planets) {
  const randomIndex = Math.floor(Math.random() * planets.length);
  return planets[randomIndex];
}

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
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

function validateInput(testInput) {
  return testInput === ""
    ? "Empty"
    : !isNaN(testInput)
    ? "Is a Number"
    : "Not a Number";
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
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

  const faultyItems = document.getElementById("faultyItems");
  const launchStatus = document.getElementById("launchStatus");

  if (fuelLevel < 10000 || cargoLevel > 10000) {
    faultyItems.style.visibility = "visible";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";

    if (fuelLevel < 10000) {
      document.getElementById("fuelStatus").innerHTML =
        "Fuel level too low for launch";
    } else {
      document.getElementById("fuelStatus").innerHTML =
        "Fuel level high enough for launch";
    }

    if (cargoLevel > 10000) {
      document.getElementById("cargoStatus").innerHTML =
        "Cargo mass too heavy for launch";
    } else {
      document.getElementById("cargoStatus").innerHTML =
        "Cargo mass low enough for launch";
    }
  } else {
    // Hide the faultyItems div when everything is good to go
    faultyItems.style.visibility = "hidden";
    launchStatus.innerHTML = "Shuttle is Ready for Launch";
    launchStatus.style.color = "green";
  }
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
