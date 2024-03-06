// Write your JavaScript code here!
window.addEventListener("load", () => {
  let listedPlanets;
  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse;
  listedPlanetsResponse
    .then((result) => {
      listedPlanets = result;
      console.log(listedPlanets);
    })
    .then(() => {
      console.log(listedPlanets);
      // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
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
  }

  // Event listener for form submission
  let form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
});
