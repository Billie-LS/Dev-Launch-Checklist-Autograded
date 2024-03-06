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
      "There is not enough fuel for the journey";

    // Update launch status
    document.getElementById("launchStatus").innerHTML =
      "Shuttle not ready for launch";
    document.getElementById("launchStatus").style.color = "red";
  }

  // Check cargo mass
  if (cargoLevel > 10000) {
    // Update faulty items list and display
    document.getElementById("faultyItems").style.visibility = "visible";
    document.getElementById("cargoStatus").innerHTML =
      "There is too much mass for the shuttle to take off";

    // Update launch status
    document.getElementById("launchStatus").innerHTML =
      "Shuttle not ready for launch";
    document.getElementById("launchStatus").style.color = "red";
  }

  // Check if shuttle is ready for launch
  if (fuelLevel >= 10000 && cargoLevel <= 10000) {
    // Hide faulty items list
    document.getElementById("faultyItems").style.visibility = "hidden";

    // Update launch status
    document.getElementById("launchStatus").innerHTML =
      "Shuttle is ready for launch";
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
