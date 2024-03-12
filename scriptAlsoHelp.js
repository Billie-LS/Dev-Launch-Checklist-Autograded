// Write your JavaScript code here!

const { myFetch, pickPlanet, addDestinationInfo } = require("./scriptHelper");

window.addEventListener("load", function () {
  myFetch().then(function (listedPlanets) {
    console.log(listedPlanets);
    // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
    const planet = pickPlanet(listedPlanets);

    addDestinationInfo(
      document,
      planet.name,
      planet.diameter,
      planet.star,
      planet.distance,
      planet.moon,
      planet.image
    );
  });

  const button = document.getElementById("formSubmit");

  button.addEventListener("click", function (e) {
    e.preventDefault();
    formSubmission(
      document,
      document.getElementById("faultyItems"),
      document.querySelector("input[name=pilotName]").value,
      document.querySelector("input[name=copilotName]").value,
      document.querySelector("input[name=fuelLevel]").value,
      document.querySelector("input[name=cargoMass]").value
    );
  });
});
