// Write your helper functions here!

require("cross-fetch/polyfill");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  // Here is the HTML formatting for our mission target div.
  /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */
}

const validateInput = (testInput) => {
  return testInput === ""
    ? "Empty"
    : !isNaN(testInput)
    ? "Is a Number"
    : "Not a Number";
};

// const validateInput = (testInput) => {
//   if (testInput === "") {
//     return "Empty";
//   }
//   if (!isNaN(testInput)) {
//     return "Is a Number";
//   }
//   return "Not a Number";
// };

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let pilotValidation = validateInput(pilot);
  let copilotValidation = validateInput(copilot);
  let fuelValidation = validateInput(fuelLevel);
  let cargoValidation = validateInput(cargoLevel);

  if (
    pilotValidation === "Empty" ||
    copilotValidation === "Empty" ||
    fuelValidation === "Empty" ||
    cargoValidation === "Empty"
  ) {
    alert("All fields are required!");
    return;
  }

  if (
    pilotValidation !== "Is a Number" ||
    copilotValidation !== "Is a Number" ||
    fuelValidation !== "Is a Number" ||
    cargoValidation !== "Is a Number"
  ) {
    alert("Please enter valid information for all fields!");
    return;
  }

  // rest of form submission logic
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch().then(function (response) {});

  return planetsReturned;
}

function pickPlanet(planets) {}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
