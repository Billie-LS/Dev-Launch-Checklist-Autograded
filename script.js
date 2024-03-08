// Write your JavaScript code here!
window.addEventListener("load", function () {
  let listedPlanets;
  let listedPlanetsResponse = myFetch(); // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  listedPlanetsResponse.then(function (result) {
    listedPlanets = result;
    const selectedPlanet = pickPlanet(listedPlanets); // Select a planet at random from listedPlanets
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
    formSubmission(
      document,
      listedPlanets,
      pilotNameInput.value,
      copilotNameInput.value,
      fuelLevelInput.value,
      cargoMassInput.value
    );
    // Check if everything is good to go
    const launchStatus = document.getElementById("launchStatus");
    console.log("Launch Status:", launchStatus.textContent);
    if (launchStatus.textContent !== "Shuttle is Ready for Launch") {
      const faultyItems = document.getElementById("faultyItems");
      faultyItems.style.visibility = "visible"; // Show the element
      console.log("faultyItems visibility:", faultyItems.style.visibility);
    }
  }

  // Event listener for form submission
  let form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
});
