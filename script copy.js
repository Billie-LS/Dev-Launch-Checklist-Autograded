// Event listener for when the window loads
// Loading planets data and handling promise correctly
window.addEventListener("load", async () => {
  try {
    // Fetching planets data
    const listedPlanets = await myFetch();

    // Picking a random planet
    const selectedPlanet = pickPlanet(listedPlanets);

    // Adding destination information to the document
    addDestinationInfo(
      document,
      selectedPlanet.name,
      selectedPlanet.diameter,
      selectedPlanet.star,
      selectedPlanet.distance,
      selectedPlanet.moons,
      selectedPlanet.image
    );
  } catch (error) {
    // Handling errors if fetching planets data fails
    console.error("Error fetching planets data:", error);
  }

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    let pilotNameInput = document.querySelector("input[name=pilotName]");
    let copilotNameInput = document.querySelector("input[name=copilotName]");
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    let cargoMassInput = document.querySelector("input[name=cargoMass]");

    // Handling form submission
    formSubmission(
      document,
      listedPlanets,
      pilotNameInput.value,
      copilotNameInput.value,
      fuelLevelInput.value,
      cargoMassInput.value
    );

    // Updating launch status and faulty items visibility
    const launchStatus = document.getElementById("launchStatus");
    const faultyItems = document.getElementById("faultyItems");

    if (launchStatus.textContent !== "Shuttle is Ready for Launch") {
      faultyItems.style.visibility = "visible";
    } else {
      faultyItems.style.visibility = "hidden";
    }
  };

  // Adding event listener to the form
  let form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
});
