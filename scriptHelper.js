// Write your helper functions here!

//require('cross-fetch/polyfill');

//Adds destination information to the mission target element
let addDestinationInfo = (
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) => {
  let missionTarget = document.getElementById("missionTarget");

  // Set HTML content with provided data
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

// Validates input values
let validateInput = (testInput) => {
  if (testInput === "") {
    return "Empty";
  } else if (!isNaN(testInput)) {
    return "Is a Number";
  } else {
    return "Not a Number";
  }
};

// Handles form submission
let formSubmission = (document, list, pilot, copilot, fuelLevel, cargoMass) => {
  let pilotValidation = validateInput(pilot);
  let copilotValidation = validateInput(copilot);
  let fuelLevelValidation = validateInput(fuelLevel);
  let cargoMassValidation = validateInput(cargoMass);

  // if (pilot === "" || copilot === "" || fuelLevel === "" || cargoMass === "") {
  if (
    pilotValidation === "Empty" ||
    copilotValidation === "Empty" ||
    fuelLevelValidation === "Empty" ||
    cargoMassValidation === "Empty"
  ) {
    //console.log("All fields are required!");
    alert("All fields are required!");
    return;
  }

  // if (isNaN(fuelLevel) || isNaN(cargoMass)) {
  else if (
    pilotValidation === "Is a Number" ||
    copilotValidation === "Is a Number" ||
    fuelLevelValidation == "Not a Number" ||
    cargoMassValidation == "Not a Number"
  ) {
    // console.log("Please enter valid information for all fields!");
    alert("Please enter valid information for all fields!");
    return;
  } else {
    document.getElementById(
      "pilotStatus"
    ).innerHTML = `Pilot ${pilot} is ready for launch`;
    document.getElementById(
      "copilotStatus"
    ).innerHTML = `Co-pilot ${copilot} is ready for launch`;
    list.style.visibility = "visible";

    if (fuelLevel < 10000) {
      document.getElementById("fuelStatus").innerHTML =
        "Fuel level too low for launch";
      document.getElementById("launchStatus").innerHTML =
        "Shuttle Not Ready for Launch";
      document.getElementById("launchStatus").style.color = "red";
    } else {
      document.getElementById("fuelStatus").innerHTML =
        "Fuel level high enough for launch";
    }

    if (cargoMass > 10000) {
      document.getElementById("cargoStatus").innerHTML =
        "Cargo mass too heavy for launch";
      document.getElementById("launchStatus").innerHTML =
        "Shuttle Not Ready for Launch";
      document.getElementById("launchStatus").style.color = "red";
    } else {
      document.getElementById("cargoStatus").innerHTML =
        "Cargo mass low enough for launch";
    }

    if (fuelLevel >= 10000 && cargoMass <= 10000) {
      list.style.visible = "hidden";
      document.getElementById("launchStatus").innerHTML =
        "Shuttle is Ready for Launch";
      document.getElementById("launchStatus").style.color = "green";
    } else {
      document.getElementById("launchStatus").innerHTML =
        "Shuttle Not Ready for Launch";
      document.getElementById("launchStatus").style.color = "red";
    }
  }
};

// Picks a random planet from the provided array of planets
let pickPlanet = (planets) => {
  let randomIndex = Math.floor(Math.random() * planets.length);
  return planets[randomIndex];
};

// Fetches planetary data from the provided URL
async function myFetch() {
  let response = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  );

  if (!response.ok) {
    console.error("Failed to fetch planets data");
    return [];
  }

  let planetsReturned = await response.json();
  return planetsReturned;
}

// Export helper functions for use in other modules
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
