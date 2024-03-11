// Write your helper functions here!

require("cross-fetch/polyfill");

// Alert function to notify the user if any field is empty
function alertEmptyFields() {
  alert("All fields are required!");
}

// Alert function to notify the user if incorrect data is entered
function alertInvalidInput(field) {
  alert(`Invalid input for ${field}! Please enter valid data.`);
}

// Validate input function to check if input is empty, a number, or not a number
function validateInput(input) {
  if (input === "") {
    return "Empty";
  } else if (isNaN(input)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

// Form submission function
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  // Check if any field is empty
  if (
    validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoLevel) === "Empty"
  ) {
    alertEmptyFields();
    return;
  }

  // Check if pilot and copilot names are strings
  if (
    validateInput(pilot) !== "Is a Number" &&
    validateInput(copilot) !== "Is a Number"
  ) {
    // Proceed with form submission logic...
  } else {
    alertInvalidInput("pilot or copilot names");
    return;
  }

  // Check if fuel level and cargo mass are numbers
  if (!isNaN(parseFloat(fuelLevel)) && !isNaN(parseFloat(cargoLevel))) {
    // Proceed with form submission logic...

    let isFuelLow = false;
    let isCargoHeavy = false;

    // Update the shuttle requirements based on fuel level
    if (fuelLevel < 10000) {
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("fuelStatus").innerHTML =
        "Fuel level too low for launch"; // Corrected message
      isFuelLow = true;
    }

    // Update the shuttle requirements based on cargo mass
    if (cargoLevel > 10000) {
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("cargoStatus").innerHTML =
        "Cargo mass too heavy for launch";
      isCargoHeavy = true;
    }

    // Update launch status based on fuel and cargo conditions
    if (isFuelLow || isCargoHeavy) {
      document.getElementById("launchStatus").innerHTML =
        "Shuttle Not Ready for Launch";
      document.getElementById("launchStatus").style.color = "red";
      document.getElementById(
        "pilotStatus"
      ).innerHTML = `Pilot ${pilot} is ready for launch`;
      document.getElementById(
        "copilotStatus"
      ).innerHTML = `Co-pilot ${copilot} is ready for launch`;
      return;
    } else {
      // If everything is good to go, hide the faultyItems div
      if (!isFuelLow && !isCargoHeavy) {
        // Check if both fuel and cargo are good
        document.getElementById("faultyItems").style.visibility = "hidden";
      }

      // Update launch status
      document.getElementById("launchStatus").innerHTML =
        "Shuttle is Ready for Launch";
      document.getElementById("launchStatus").style.color = "green";
      document.getElementById(
        "pilotStatus"
      ).innerHTML = `Pilot ${pilot} is ready for launch`;
      document.getElementById(
        "copilotStatus"
      ).innerHTML = `Co-pilot ${copilot} is ready for launch`;
      return;
    }

    // Proceed with other form submission logic...
  } else {
    alertInvalidInput("fuel level or cargo mass");
    return;
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });

  return planetsReturned;
}

// Function to add destination information to the HTML
function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  // Construct HTML for displaying mission destination information
  const missionDestination = `
    <h2>Mission Destination</h2>
    <ol>
      <li>Name: ${name}</li>
      <li>Diameter: ${diameter}</li>
      <li>Star: ${star}</li>
      <li>Distance from Earth: ${distance}</li>
      <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}" alt="Mission Destination Image">
  `;

  // Update the HTML document with mission destination information
  document.getElementById("missionTarget").innerHTML = missionDestination;
}

// Function to pick a planet from the provided list of planets
function pickPlanet(planets) {
  // Logic to pick a planet from the list of planets
  // For simplicity, you can randomly select a planet from the list
  const randomIndex = Math.floor(Math.random() * planets.length);
  return planets[randomIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
