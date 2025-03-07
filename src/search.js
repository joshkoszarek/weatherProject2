import { getWeatherData, filterWeatherData } from './dataFiltering.js';
import { displayWeatherData } from './display.js';
export { displayWeather };
async function displayWeather(location) {
  const allWeatherData = await getWeatherData(location);
  const necessaryWeatherData = filterWeatherData(allWeatherData);
  //   console.log(necessaryWeatherData);
  displayWeatherData(necessaryWeatherData);
}

const searchBarForm = document.querySelector('.search-bar-container form');
searchBarForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputData = e.target.elements.searchBar.value;
  console.log(inputData);
  //get search input into correct form for an API call
  // display weather with location as argument

  e.target.elements.searchBar.value = '';
});
