import { displayWeather } from './display.js';
export { addSearchBarFunctionality };

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
