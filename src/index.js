import { addSearchBarFunctionality } from './search.js';
import { addUnitToggleButtonFunctionality } from './unitToggle.js';
import { buildBoilerPlate, displayWeather } from './display.js';
// import './style.css';
function main() {
  // buildBoilerPlate();
  //something to do with Local Storage adding saved cities
  //local storage has saved cities and currently viewing city
  buildBoilerPlate();
  displayWeather('Waterford, WI');
  addSearchBarFunctionality();
  addUnitToggleButtonFunctionality();
}

main();
