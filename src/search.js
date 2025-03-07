import { getWeatherData, filterWeatherData } from './dataFiltering.js';
import { displayWeatherData } from './display.js';
export { addSearchFunctionality };
async function addSearchFunctionality(city, state) {
  const allWeatherData = await getWeatherData(city, state);
  const necessaryWeatherData = filterWeatherData(allWeatherData);
  console.log(necessaryWeatherData);
  displayWeatherData(necessaryWeatherData);
}
