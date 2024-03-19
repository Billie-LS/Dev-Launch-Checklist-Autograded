// Write your JavaScript code here!

// wait window load then execute the code
window.addEventListener("load", function () {
  // Retrieve form element (adjust the selector as needed)
  // const myForm = document.querySelector('form[name=myForm]');

  // Attach formSubmission to form submission
  let form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    // Prevent default form submission behavior
    event.preventDefault();
    let pilot = document.querySelector("input[name=pilotName]").value;
    let copilot = document.querySelector("input[name=copilotName]").value;
    let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
    let cargoMass = document.querySelector("input[name=cargoMass]").value;
    let list = document.getElementById("faultyItems");
    console.log("form listener triggered");

    formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
  });

  let listedPlanets;
  console.log("window loaded");
  //Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse
    .then(function (result) {
      listedPlanets = result;
      console.log(listedPlanets);
    })
    .then(function () {
      console.log(listedPlanets);
      // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
      let pickedPlanet = pickPlanet(listedPlanets);
      addDestinationInfo(
        document,
        pickedPlanet.name,
        pickedPlanet.diameter,
        pickedPlanet.star,
        pickedPlanet.distance,
        pickedPlanet.moons,
        pickedPlanet.image
      );
    })
    .catch(function (planetsFetchingError) {
      // Handle any errors that occur during the fetch operation
      console.error("Error fetching planets:", error);
    });
});
