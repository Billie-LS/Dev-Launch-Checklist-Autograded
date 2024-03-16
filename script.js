// Write your JavaScript code here!

// wait window load then execute the code
window.addEventListener("load", function () {
  let form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    // Prevent default form submission behavior
    event.preventDefault();
    // event.stopPropagation();

    let pilot = document.querySelector("input[name=pilotName]").value;
    let copilot = document.querySelector("input[name=copilotName]").value;
    let fuelLevel = parseFloat(
      document.querySelector("input[name=fuelLevel]").value
    );
    let cargoMass = parseFloat(
      document.querySelector("input[name=cargoMass]").value
    );
    let list = document.getElementById("faultyItems");
    console.log("form listener");

    //formSubmission(document, list, faultyItems, pilot, copilot, fuelLevel, cargoMass)
    formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
  });

  //Task 3
  let listedPlanets;
  console.log("window loaded");
  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse
    .then(function (result) {
      listedPlanets = result;
      let randomPlanet = pickPlanet(listedPlanets);
      addDestinationInfo(
        document, //could switch lines 26 - 54 with form listener
        randomPlanet.name,
        randomPlanet.diameter,
        randomPlanet.star,
        randomPlanet.distance,
        randomPlanet.moons,
        // randomPlanet.imageUrl
        randomPlanet.image
      );
      //console.log(listedPlanets);
      // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
    })
    .then(function () {
      console.log(listedPlanets);
    })
    .catch(function (error) {
      // Handle any errors that occur during the fetch operation
      console.error("Error fetching planets:", error);

      //formSubmission(document, faultyItems, pilot, copilot, fuelLevel, cargoLevel)
    });
});
