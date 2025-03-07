import { addSearchBarFunctionality } from './search.js';
import { addUnitToggleButtonFunctionality } from './unitToggle.js';
import {
  buildBoilerPlate,
  displayWeather,
  displayInitialWeather,
} from './display.js';
// import './style.css';

function main() {
  buildBoilerPlate();
  displayInitialWeather();
  addSearchBarFunctionality();
  addUnitToggleButtonFunctionality();
}

main();
