// Write your JavaScript code here!

// Event listener for when the window loads
// Function to initialize the form
const initializeForm = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let pilot = document.querySelector("input[name=pilotName]").value;
    let copilot = document.querySelector("input[name=copilotName]").value;
    let fuelLevel = parseFloat(
      document.querySelector("input[name=fuelLevel]").value
    );
    let cargoMass = parseFloat(
      document.querySelector("input[name=cargoMass]").value
    );
    console.log("form listener triggered");
    let list = document.getElementById("faultyItems");

    formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
  });
};

// Event listener for when the window loads
window.addEventListener("load", () => {
  // Initialize the form
  initializeForm();
});

// Function to handle form submission
const handleFormSubmit = async () => {
  // Retrieve form inputs
  const pilot = document.querySelector("input[name=pilotName]").value;
  const copilot = document.querySelector("input[name=copilotName]").value;
  const fuelLevel = parseFloat(
    document.querySelector("input[name=fuelLevel]").value
  );
  const cargoMass = parseFloat(
    document.querySelector("input[name=cargoMass]").value
  );
  const list = document.getElementById("faultyItems");

  // Reset previous changes
  list.style.visibility = "hidden";

  // Use formSubmission to validate and update list
  formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);

  // Check if everything is fine
  if (list.style.visibility !== "visible") {
    // Hide the list if everything is fine
    list.style.visibility = "hidden";
  }
};

// Event listener for when the window loads
window.addEventListener("load", async () => {
  try {
    // Fetching planets data
    const {
      myFetch,
      pickPlanet,
      addDestinationInfo,
    } = require("./scriptHelper.js");

    const listedPlanetsResponse = await myFetch(); // Fetching planets data
    const listedPlanets = await listedPlanetsResponse; // Wait for the response

    // Initialize form
    initializeForm();

    // Picking a random planet
    const selectedPlanet = pickPlanet(listedPlanets);

    // Adding destination information to the document
    addDestinationInfo(
      document,
      selectedPlanet.name,
      selectedPlanet.diameter,
      selectedPlanet.star,
      selectedPlanet.distance,
      selectedPlanet.moons,
      selectedPlanet.image
    );
  } catch (error) {
    // Handling errors if fetching planets data fails
    console.error("Error fetching planets data:", error);
  }
});
