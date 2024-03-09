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

    if (launchStatus.textContent === "Shuttle is Ready for Launch") {
      faultyItems.style.visibility = "hidden";
    } else {
      faultyItems.style.visibility = "visible";
    }
  }

  let form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);

  const launchStatus = document.getElementById("launchStatus");
  if (launchStatus.textContent === "Shuttle is Ready for Launch") {
    const faultyItems = document.getElementById("faultyItems");
    faultyItems.style.visibility = "hidden";
  }
});
