// Write your JavaScript code here!
window.addEventListener("load", function () {
  let listedPlanetsResponse = myFetch(); // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  listedPlanetsResponse.then(function (result) {
    const selectedPlanet = pickPlanet(result); // Select a planet at random from the fetched planets
    addDestinationInfo(
      document,
      selectedPlanet.name,
      selectedPlanet.diameter,
      selectedPlanet.star,
      selectedPlanet.distance,
      selectedPlanet.moons,
      selectedPlanet.imageUrl
    ); // Add the selected planet's information to the missionTarget div
  });

  // Helper function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    let pilotNameInput = document.querySelector("input[name=pilotName]");
    let copilotNameInput = document.querySelector("input[name=copilotName]");
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    let cargoMassInput = document.querySelector("input[name=cargoMass]");
    myFetch().then(function (result) {
      formSubmission(
        document,
        result,
        pilotNameInput.value,
        copilotNameInput.value,
        fuelLevelInput.value,
        cargoMassInput.value
      );
    });
  }

  // Event listener for form submission
  let form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
});
