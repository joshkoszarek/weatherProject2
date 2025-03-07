// import { getWeatherData, filterWeatherData } from './dataFiltering.js';
// import { displayWeatherData } from './display.js';
import { displayWeather } from './display.js';
export { addSearchBarFunctionality };
// async function displayWeather(location) {
//   const allWeatherData = await getWeatherData(location);
//   const necessaryWeatherData = filterWeatherData(allWeatherData);
//   displayWeatherData(necessaryWeatherData);
// }

function addSearchBarFunctionality() {
  const searchBarForm = document.querySelector('.search-bar-container form');
  searchBarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputData = e.target.elements.searchBar.value;
    displayWeather(inputData);
    e.target.elements.searchBar.value = '';
    sessionStorage.clear();
    sessionStorage.setItem('currentLocation', inputData);
  });
}
