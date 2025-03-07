import { addSearchBarFunctionality } from './search.js';
import { addUnitToggleButtonFunctionality } from './unitToggle.js';
import { buildBoilerPlate, displayWeather } from './display.js';
// import './style.css';
function main() {
  buildBoilerPlate();
  displayWeather('Waterford, WI');
  addSearchBarFunctionality();
  addUnitToggleButtonFunctionality();
}

main();
