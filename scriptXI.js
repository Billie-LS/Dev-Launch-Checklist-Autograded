// Write your JavaScript code here!

window.addEventListener("load", () => {
  let listedPlanets;
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse
    .then(function (result) {
      listedPlanets = result;
      console.log(listedPlanets);
    })
    .then(function () {
      console.log(listedPlanets);
      // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
      const randomPlanet = pickPlanet(listedPlanets);
      addDestinationInfo(
        document,
        randomPlanet.name,
        randomPlanet.diameter,
        randomPlanet.star,
        randomPlanet.distance,
        randomPlanet.moons,
        randomPlanet.image
      );
    });

  // Add event listener for form submission
  const form = document.querySelector('form[data-testid="testForm"]');
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Check if any field is empty
    const pilotName = document.getElementById("pilotName").value;
    const copilotName = document.getElementById("copilotName").value;
    const fuelLevel = document.getElementById("fuelLevel").value;
    const cargoMass = document.getElementById("cargoMass").value;

    if (
      pilotName === "" ||
      copilotName === "" ||
      fuelLevel === "" ||
      cargoMass === ""
    ) {
      console.error("All fields are required!"); // Replaced alert with console.error
      return;
    }

    // Check if fuel level and cargo mass are numeric
    if (isNaN(Number(fuelLevel)) || isNaN(Number(cargoMass))) {
      console.error(
        "Invalid input! Fuel level and cargo mass must be numbers!"
      ); // Replaced alert with console.error
      return;
    }

    // Call formSubmission function with form field values
    formSubmission(document, pilotName, copilotName, fuelLevel, cargoMass);

    // Add your code for handling form submission here
  });
});

// Update the list of shuttle requirements and launch status
const updateShuttleRequirements = (
  pilotName,
  copilotName,
  fuelLevel,
  cargoMass
) => {
  const fuelStatusElement = document.getElementById("fuelStatus");
  const launchStatusElement = document.getElementById("launchStatus");
  const faultyItemsElement = document.getElementById("faultyItems");
  const pilotStatusElement = document.getElementById("pilotStatus");
  const copilotStatusElement = document.getElementById("copilotStatus");
  const cargoStatusElement = document.getElementById("cargoStatus");

  // Update pilot and copilot status
  pilotStatusElement.textContent = `Pilot ${pilotName} is ready for launch.`;
  copilotStatusElement.textContent = `Co-pilot ${copilotName} is ready for launch.`;

  // Check if fuel level is too low
  if (fuelLevel < 10000) {
    fuelStatusElement.textContent = "Fuel level too low for launch";
    launchStatusElement.textContent = "Shuttle not ready for launch";
    launchStatusElement.style.color = "red";
    faultyItemsElement.style.visibility = "visible";
  }

  // Check if cargo mass is too large
  if (cargoMass > 10000) {
    cargoStatusElement.textContent = "Cargo mass too high for launch";
    launchStatusElement.textContent = "Shuttle not ready for launch";
    launchStatusElement.style.color = "red";
    faultyItemsElement.style.visibility = "visible";
  }

  // Check if shuttle is ready to launch
  if (fuelLevel >= 10000 && cargoMass <= 10000) {
    launchStatusElement.textContent = "Shuttle is ready for launch";
    launchStatusElement.style.color = "green";
  }
};
