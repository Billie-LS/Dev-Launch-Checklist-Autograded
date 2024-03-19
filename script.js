/*
1. wait for window to load.
2. Attach submit event listener to a form.
3. when submission, prevent default behavior, retrieve form input values, and call formSubmission function with the values.
4. Log message to indicate form listener triggered.
5. Call asynchronous function myFetch() to fetch data.
6. Handle response of fetch operation:
    Log fetched data.
    Call pickPlanet function to select planet from fetched data.
    Call addDestinationInfo function to add planet information to document.
7. Handle fetch operation errors.
*/

// Write your JavaScript code here!

// wait window load then execute the code
window.addEventListener("load", () => {
  // Retrieve the form element
  let form = document.querySelector("form");

  // Attach an event listener for form submission
  form.addEventListener("submit", (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Retrieve input values from form fields
    let pilot = document.querySelector("input[name=pilotName]").value;
    let copilot = document.querySelector("input[name=copilotName]").value;
    let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
    let cargoMass = document.querySelector("input[name=cargoMass]").value;
    let list = document.getElementById("faultyItems");

    // Log a message indicating form listener is triggered
    console.log("form listener triggered");

    // Call formSubmission function with input values
    formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
  });

  // Variable to store the response from myFetch function
  let listedPlanets;

  // Log a message indicating the window is loaded
  console.log("window loaded");

  // Set listedPlanetsResponse to the promise returned by myFetch function
  let listedPlanetsResponse = myFetch();

  // After the promise is resolved, handle the result
  listedPlanetsResponse
    .then((result) => {
      // Store the result in the listedPlanets variable
      listedPlanets = result;
      console.log(listedPlanets);
    })
    .then(() => {
      console.log(listedPlanets);
      // Call pickPlanet function to select a planet from the list
      let pickedPlanet = pickPlanet(listedPlanets);

      // Call addDestinationInfo function to add planet information to the document
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
    .catch((planetsFetchingError) => {
      // Handle any errors that occur during the fetch operation
      console.error("Error fetching planets:", planetsFetchingError);
    });
});
