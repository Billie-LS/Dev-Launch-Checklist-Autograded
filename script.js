window.addEventListener("load", function () {
  let listedPlanets;
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse.then(function (result) {
    listedPlanets = result;
    const selectedPlanet = pickPlanet(listedPlanets);
    addDestinationInfo(
      document,
      selectedPlanet.name,
      selectedPlanet.diameter,
      selectedPlanet.star,
      selectedPlanet.distance,
      selectedPlanet.moons,
      selectedPlanet.imageUrl
    );
  });

  function handleSubmit(event) {
    event.preventDefault();
    let pilotNameInput = document.querySelector("input[name=pilotName]");
    let copilotNameInput = document.querySelector("input[name=copilotName]");
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    let cargoMassInput = document.querySelector("input[name=cargoMass]");
    formSubmission(
      document,
      listedPlanets,
      pilotNameInput.value,
      copilotNameInput.value,
      fuelLevelInput.value,
      cargoMassInput.value
    );

    const launchStatus = document.getElementById("launchStatus");
    const faultyItems = document.getElementById("faultyItems");

    if (launchStatus.textContent !== "Shuttle is Ready for Launch") {
      // Show the faultyItems when there are issues with the launch
      faultyItems.style.visibility = "visible";
    } else {
      // Hide the faultyItems when everything is good to go
      faultyItems.style.visibility = "hidden";
    }
  }

  let form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
});
