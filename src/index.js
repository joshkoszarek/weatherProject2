import { addSearchFunctionality } from './search.js';
import { addUnitToggleButtonFunctionality } from './unitToggle.js';
// import './style.css';
function main() {
  // buildBoilerPlate();
  //something to do with Local Storage adding saved cities
  //local storage has saved cities and currently viewing city
  addSearchFunctionality('Waterford', 'WI');
  addUnitToggleButtonFunctionality();
}

main();
