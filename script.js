// Write your JavaScript code here!

// wait window load then execute the code
window.addEventListener("load", () => {
  // call myFetch function to fetch data asynchronously
  myFetch().then((listedPlanets) => {
    // log data to console for debug
    console.log(listedPlanets);
    // random pick planet from fetched list of planets
    const planet = pickPlanet(listedPlanets);
    // add destination data to the DOM using selected planet data
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

  // Get the button element with the id "formSubmit"
  const button = document.getElementById("formSubmit");

  // Add a click event listener to the button
  button.addEventListener("click", (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Call the formSubmission function with input values when the button is clicked
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
