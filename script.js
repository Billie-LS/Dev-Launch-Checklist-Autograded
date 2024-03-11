// Write your JavaScript code here!

const {
  alertEmptyFields,
  alertInvalidInput,
  formSubmission,
  myFetch,
  pickPlanet,
  addDestinationInfo,
} = require("./scriptHelper.js");

window.addEventListener("load", function () {
  let listedPlanets;
  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse.then(function (result) {
    listedPlanets = result;
    // Pick a random planet from the list
    const selectedPlanet = pickPlanet(listedPlanets);
    // Add destination information to the HTML
    addDestinationInfo(
      document,
      selectedPlanet.name,
      selectedPlanet.diameter,
      selectedPlanet.star,
      selectedPlanet.distance,
      selectedPlanet.moons,
      selectedPlanet.image
    );
  });
});

// Adding event listener to the form submission
document
  .getElementById("launchForm")
  .addEventListener("submit", function (event) {
    // Prevent default form submission
    event.preventDefault();

    // Check if any field is empty
    const pilotName = document.querySelector("input[name=pilotName]");
    const copilotName = document.querySelector("input[name=copilotName]");
    const fuelLevel = document.querySelector("input[name=fuelLevel]");
    const cargoMass = document.querySelector("input[name=cargoMass]");

    if (
      pilotName.value === "" ||
      copilotName.value === "" ||
      fuelLevel.value === "" ||
      cargoMass.value === ""
    ) {
      alertEmptyFields();
      return;
    }

    // Proceed with form submission logic...
    formSubmission(
      document,
      document.getElementById("faultyItems"),
      pilotName.value,
      copilotName.value,
      fuelLevel.value,
      cargoMass.value
    );
  });
