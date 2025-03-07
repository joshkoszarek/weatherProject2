import {
  getSVGToAppend,
  clearChildElements,
  militaryTimeToRegularTime,
  getDayFromDate,
} from './utility.js';
import {
  addHourlyCarouselSliderFunctionality,
  addWeeklyCarouselSliderFunctionality,
} from './carousels.js';
import { addLocationDropDownFunctionality } from './locationDropDown.js';
import { getWeatherData, filterWeatherData } from './dataFiltering.js';
export {
  displayWeatherData,
  buildBoilerPlate,
  displayWeather,
  displayInitialWeather,
};

async function displayWeather(location) {
  const allWeatherData = await getWeatherData(location);
  const necessaryWeatherData = filterWeatherData(allWeatherData);
  displayWeatherData(necessaryWeatherData);
}

function displayInitialWeather() {
  // if session storage has a city display it
  if (sessionStorage.getItem('currentLocation')) {
    displayWeather(sessionStorage.getItem('currentLocation'));
  } else if (JSON.parse(localStorage.getItem('cities')).length > 0) {
    displayWeather(JSON.parse(localStorage.getItem('cities'))[0]);
  } else {
    displayWeather('New York City, NY');
  }
  // else if local Storage has cities, display the first one
  // else display New York City, NY
}
function displayWeatherData(necessaryWeatherData) {
  updateTopLocationDisplay(necessaryWeatherData);
  updateRightNowWeatherDisplay(necessaryWeatherData);
  updateHourlyWeatherDisplay(necessaryWeatherData);
  updateWeeklyWeatherDisplay(necessaryWeatherData);
}

function createTopLocationDisplayElements(necessaryWeatherData) {
  const dropDownBtn = document.createElement('button');
  dropDownBtn.classList.add('drop-down-btn');
  const dropDownIcon = getSVGToAppend('drop-down-btn');
  dropDownBtn.appendChild(dropDownIcon);

  const currentTown = document.createElement('div');
  currentTown.classList.add('current-town');
  currentTown.textContent = necessaryWeatherData.address;

  const currentWeatherIcon = getSVGToAppend(
    necessaryWeatherData.hourly[0].icon
  );

  const currentTempContainer = document.createElement('div');
  currentTempContainer.classList.add('current-temp-container');
  const degrees = document.createElement('p');
  degrees.classList.add('temp');
  degrees.textContent = Math.round(necessaryWeatherData.hourly[0].currentTemp);
  const degreeSymbol = document.createElement('div');
  degreeSymbol.classList.add('degree');
  degreeSymbol.textContent = '°';
  const units = document.createElement('p');
  units.classList.add('units');
  units.textContent = 'F';

  currentTempContainer.appendChild(degrees);
  currentTempContainer.appendChild(degreeSymbol);
  currentTempContainer.appendChild(units);

  let arrOfElementsToAppend = [
    dropDownBtn,
    currentTown,
    currentWeatherIcon,
    currentTempContainer,
  ];
  return arrOfElementsToAppend;
}

function createRightNowWeatherElements(necessaryWeatherData) {
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container');
  titleContainer.textContent = 'Right Now';

  const currentWeatherCard = document.createElement('div');
  currentWeatherCard.classList.add('current-weather-card');

  const weatherIconContainer = document.createElement('div');
  weatherIconContainer.classList.add('weather-icon-container');
  const weatherIconSvg = getSVGToAppend(necessaryWeatherData.hourly[0].icon);
  weatherIconContainer.appendChild(weatherIconSvg);

  const mainWeatherDetailsContainer = document.createElement('div');
  mainWeatherDetailsContainer.classList.add('main-weather-details-container');

  const currentTempContainer = document.createElement('div');
  currentTempContainer.classList.add('current-temp-container');

  const degree = document.createElement('h3');
  degree.textContent = Math.round(necessaryWeatherData.hourly[0].currentTemp);
  degree.classList.add('temp');
  const degreeSymbol = document.createElement('div');
  degreeSymbol.classList.add('degrees');
  const units = document.createElement('div');
  units.classList.add('units');
  units.textContent = 'F';

  const realFeel = document.createElement('div');
  realFeel.classList.add('real-feel');
  realFeel.textContent = `Real Feel ${Math.round(
    necessaryWeatherData.hourly[0].feelsLike
  )}°`;

  currentTempContainer.appendChild(degree);
  currentTempContainer.appendChild(degreeSymbol);
  currentTempContainer.appendChild(units);

  mainWeatherDetailsContainer.appendChild(currentTempContainer);
  mainWeatherDetailsContainer.appendChild(realFeel);

  currentWeatherCard.appendChild(weatherIconContainer);
  currentWeatherCard.appendChild(mainWeatherDetailsContainer);
  let arrOfElementsToAppend = [titleContainer, currentWeatherCard];
  return arrOfElementsToAppend;
}

function createHourlyWeatherDisplayElements(necessaryWeatherData) {
  const title = document.createElement('div');
  title.classList.add('title');
  title.textContent = 'Today';

  const carousel = createHourlyWeatherCarousel(necessaryWeatherData);
  let arrOfElementsToAppend = [title, carousel];
  return arrOfElementsToAppend;
}

function createWeeklyWeatherDisplayElements(necessaryWeatherData) {
  const title = document.createElement('div');
  title.classList.add('title');
  title.textContent = 'Coming up';

  const carousel = createWeeklyWeatherCarousel(necessaryWeatherData);
  let arrOfElementsToAppend = [title, carousel];
  return arrOfElementsToAppend;
}

function createHourlyWeatherCarousel(necessaryWeatherData) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const leftChevron = document.createElement('div');
  leftChevron.classList.add('left-chevron');
  const leftChevronSvg = getSVGToAppend('left-chevron');
  leftChevron.appendChild(leftChevronSvg);

  const rightChevron = document.createElement('div');
  rightChevron.classList.add('right-chevron');
  const rightChevronSvg = getSVGToAppend('right-chevron');
  rightChevron.appendChild(rightChevronSvg);

  const currentViewFrame = document.createElement('div');
  currentViewFrame.classList.add('current-view-frame');

  const allHoursContainer = document.createElement('div');
  allHoursContainer.classList.add('all-hours-container');

  const hourlyWeatherDataArray = necessaryWeatherData.hourly;

  hourlyWeatherDataArray.forEach((hourlyWeatherObj) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const mainDetailsContainer = document.createElement('div');
    mainDetailsContainer.classList.add('main-details-container');

    const weatherIcon = document.createElement('div');
    weatherIcon.classList.add('weather-icon');
    const weatherSvg = getSVGToAppend(hourlyWeatherObj.icon);
    weatherIcon.appendChild(weatherSvg);

    const tempContainer = document.createElement('div');
    tempContainer.classList.add('temp-container');

    const temp = document.createElement('div');
    temp.classList.add('temp');
    temp.textContent = Math.round(hourlyWeatherObj.currentTemp);
    const degrees = document.createElement('div');
    degrees.classList.add('degrees');
    const units = document.createElement('div');
    units.classList.add('units');
    units.textContent = 'F';

    tempContainer.appendChild(temp);
    tempContainer.appendChild(degrees);
    tempContainer.appendChild(units);

    const precipitationContainer = document.createElement('div');
    precipitationContainer.classList.add('precipitation-container');
    const waterIcon = document.createElement('div');
    waterIcon.classList.add('water-icon');
    const waterSvg = getSVGToAppend('water-drop');
    waterIcon.appendChild(waterSvg);

    const percentChance = document.createElement('div');
    percentChance.classList.add('percent-chance');
    percentChance.textContent = `${hourlyWeatherObj.precipitationProb}%`;

    precipitationContainer.appendChild(waterIcon);
    precipitationContainer.appendChild(percentChance);

    mainDetailsContainer.appendChild(weatherIcon);
    mainDetailsContainer.appendChild(tempContainer);
    mainDetailsContainer.appendChild(precipitationContainer);

    const cardLabel = document.createElement('div');
    cardLabel.classList.add('card-label');
    const time = document.createElement('div');
    time.classList.add('time');
    time.textContent = militaryTimeToRegularTime(hourlyWeatherObj.time);
    cardLabel.appendChild(time);

    card.appendChild(mainDetailsContainer);
    card.appendChild(cardLabel);

    allHoursContainer.appendChild(card);
  });

  currentViewFrame.appendChild(allHoursContainer);

  carouselContainer.appendChild(leftChevron);
  carouselContainer.appendChild(currentViewFrame);
  carouselContainer.appendChild(rightChevron);

  return carouselContainer;
}

function createWeeklyWeatherCarousel(necessaryWeatherData) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const leftChevron = document.createElement('div');
  leftChevron.classList.add('left-chevron', 'weekly');
  const leftChevronSvg = getSVGToAppend('left-chevron');
  leftChevron.appendChild(leftChevronSvg);

  const rightChevron = document.createElement('div');
  rightChevron.classList.add('right-chevron', 'weekly');
  const rightChevronSvg = getSVGToAppend('right-chevron');
  rightChevron.appendChild(rightChevronSvg);

  const currentViewFrame = document.createElement('div');
  currentViewFrame.classList.add('current-view-frame');

  const allDaysContainer = document.createElement('div');
  allDaysContainer.classList.add('all-days-container');

  const weeklyWeatherDataArray = necessaryWeatherData.weekly;

  weeklyWeatherDataArray.forEach((weeklyWeatherObj) => {
    const card = document.createElement('div');
    card.classList.add('card', 'weekly');
    const mainDetailsContainer = document.createElement('div');
    mainDetailsContainer.classList.add('main-details-container', 'weekly');

    const weatherIcon = document.createElement('div');
    weatherIcon.classList.add('weather-icon', 'weekly');
    const weatherSvg = getSVGToAppend(weeklyWeatherObj.icon);
    weatherIcon.appendChild(weatherSvg);

    const tempContainer = document.createElement('div');
    tempContainer.classList.add('temp-container');

    const highTempContainer = document.createElement('div');
    highTempContainer.classList.add('high-temp-container');
    const highTemp = document.createElement('div');
    highTemp.classList.add('temp');
    highTemp.textContent = Math.round(weeklyWeatherObj.highTemp);
    const highTempDegreeSymbol = document.createElement('div');
    highTempDegreeSymbol.classList.add('degrees');

    highTempContainer.appendChild(highTemp);
    highTempContainer.appendChild(highTempDegreeSymbol);

    const lowTempContainer = document.createElement('div');
    lowTempContainer.classList.add('low-temp-container');
    const lowTemp = document.createElement('div');
    lowTemp.classList.add('temp');
    lowTemp.textContent = Math.round(weeklyWeatherObj.lowTemp);
    const lowTempDegreeSymbol = document.createElement('div');
    lowTempDegreeSymbol.classList.add('degrees');

    lowTempContainer.appendChild(lowTemp);
    lowTempContainer.appendChild(lowTempDegreeSymbol);

    tempContainer.appendChild(highTempContainer);
    tempContainer.appendChild(lowTempContainer);

    const precipitationContainer = document.createElement('div');
    precipitationContainer.classList.add('precipitation-container', 'weekly');
    const waterIcon = document.createElement('div');
    waterIcon.classList.add('water-icon', 'weekly');
    const waterSvg = getSVGToAppend('water-drop');
    waterIcon.appendChild(waterSvg);

    const percentChance = document.createElement('div');
    percentChance.classList.add('percent-chance', 'weekly');
    percentChance.textContent = `${weeklyWeatherObj.precipProb}%`;

    precipitationContainer.appendChild(waterIcon);
    precipitationContainer.appendChild(percentChance);

    mainDetailsContainer.appendChild(weatherIcon);
    mainDetailsContainer.appendChild(tempContainer);
    mainDetailsContainer.appendChild(precipitationContainer);

    const cardLabel = document.createElement('div');
    cardLabel.classList.add('card-label');
    const time = document.createElement('div');
    time.classList.add('time');
    time.textContent = getDayFromDate(weeklyWeatherObj.date);
    cardLabel.appendChild(time);

    card.appendChild(mainDetailsContainer);
    card.appendChild(cardLabel);

    allDaysContainer.appendChild(card);
  });

  currentViewFrame.appendChild(allDaysContainer);

  carouselContainer.appendChild(leftChevron);
  carouselContainer.appendChild(currentViewFrame);
  carouselContainer.appendChild(rightChevron);

  return carouselContainer;
}
function updateTopLocationDisplay(necessaryWeatherData) {
  const currentWeatherLocationContainer = document.querySelector(
    '.current-weather-location-container'
  );
  clearChildElements(currentWeatherLocationContainer);
  const elementsToAppend =
    createTopLocationDisplayElements(necessaryWeatherData);
  elementsToAppend.forEach((element) => {
    currentWeatherLocationContainer.appendChild(element);
  });
  addLocationDropDownFunctionality();
}
function updateSavedLocationDropDown() {
  const weatherLocationContainer = document.querySelector(
    '.weather-location-container'
  );
  const oldSavedLocationsDropDown = document.querySelector(
    '.saved-locations-drop-down'
  );
  clearChildElements(oldSavedLocationsDropDown);
  weatherLocationContainer.removeChild(oldSavedLocationsDropDown);

  const savedLocationsDropDown = buildSavedLocationsDropDown();
  weatherLocationContainer.appendChild(savedLocationsDropDown);
  addLocationDropDownFunctionality();
}
function updateRightNowWeatherDisplay(necessaryWeatherData) {
  const currentWeatherContainer = document.querySelector(
    '.current-weather-container'
  );
  clearChildElements(currentWeatherContainer);
  const rightNowWeatherElements =
    createRightNowWeatherElements(necessaryWeatherData);
  currentWeatherContainer.appendChild(rightNowWeatherElements[0]);
  currentWeatherContainer.appendChild(rightNowWeatherElements[1]);
  return currentWeatherContainer;
}
function updateHourlyWeatherDisplay(necessaryWeatherData) {
  const hourlyWeatherContainer = document.querySelector(
    '.hourly-weather-container'
  );
  clearChildElements(hourlyWeatherContainer);
  const elementsToAppend =
    createHourlyWeatherDisplayElements(necessaryWeatherData);
  hourlyWeatherContainer.appendChild(elementsToAppend[0]);
  hourlyWeatherContainer.appendChild(elementsToAppend[1]);

  addHourlyCarouselSliderFunctionality();
}
function updateWeeklyWeatherDisplay(necessaryWeatherData) {
  const weeklyWeatherContainer = document.querySelector(
    '.weekly-weather-container'
  );
  clearChildElements(weeklyWeatherContainer);
  const elementsToAppend =
    createWeeklyWeatherDisplayElements(necessaryWeatherData);
  weeklyWeatherContainer.appendChild(elementsToAppend[0]);
  weeklyWeatherContainer.appendChild(elementsToAppend[1]);

  addWeeklyCarouselSliderFunctionality();
}

function buildBoilerPlate() {
  const body = document.querySelector('body');
  const nav = buildNavBoilerPlate();
  const mainContentContainer = buildMainContentContainerBoilerPlate();
  body.appendChild(nav);
  body.appendChild(mainContentContainer);
}

function buildNavBoilerPlate() {
  const nav = document.createElement('nav');

  const mainNavContentContainer = document.createElement('div');
  mainNavContentContainer.classList.add('main-nav-content-container');
  const weatherLocationContainer = document.createElement('div');
  weatherLocationContainer.classList.add('weather-location-container');
  const currentWeatherLocationContainer = document.createElement('div');
  currentWeatherLocationContainer.classList.add(
    'current-weather-location-container'
  );
  // const savedLocationsDropDown = document.createElement('div');
  // savedLocationsDropDown.classList.add('saved-locations-drop-down', 'hidden');
  const savedLocationsDropDown = buildSavedLocationsDropDown();

  weatherLocationContainer.appendChild(currentWeatherLocationContainer);
  weatherLocationContainer.appendChild(savedLocationsDropDown);

  const unitChangingContainer = document.createElement('div');
  unitChangingContainer.classList.add('unit-changing-container');
  const fahrenheitContainer = document.createElement('div');
  fahrenheitContainer.classList.add('fahrenheit-container');
  const fahrenheit = document.createElement('h5');
  fahrenheit.classList.add('selected');
  fahrenheit.textContent = '°F';
  const toggleBtnContainer = document.createElement('button');
  toggleBtnContainer.classList.add('toggle-btn-container');
  const innerToggle = document.createElement('div');
  innerToggle.classList.add('inner-toggle');

  const celsiusContainer = document.createElement('div');
  celsiusContainer.classList.add('celsius-container');
  const celsius = document.createElement('h5');
  celsius.textContent = '°C';

  fahrenheitContainer.appendChild(fahrenheit);
  toggleBtnContainer.appendChild(innerToggle);
  celsiusContainer.appendChild(celsius);

  unitChangingContainer.appendChild(fahrenheitContainer);
  unitChangingContainer.appendChild(toggleBtnContainer);
  unitChangingContainer.appendChild(celsiusContainer);

  const searchBarContainer = document.createElement('div');
  searchBarContainer.classList.add('search-bar-container');
  const searchForm = document.createElement('form');
  searchForm.setAttribute('action', '');
  searchForm.classList.add('search-bar');
  const searchSubmitBtn = document.createElement('button');
  searchSubmitBtn.setAttribute('type', 'submit');
  searchSubmitBtn.classList.add('search-bar-icon');
  const searchBarIcon = getSVGToAppend('search-bar');
  const searchBarLabel = document.createElement('label');
  searchBarLabel.setAttribute('for', 'searchBar');
  const searchBarInput = document.createElement('input');
  searchBarInput.setAttribute('type', 'text');
  searchBarInput.setAttribute('name', 'searchBar');
  searchBarInput.setAttribute('id', 'searchBar');

  searchSubmitBtn.appendChild(searchBarIcon);

  searchForm.appendChild(searchSubmitBtn);
  searchForm.appendChild(searchBarLabel);
  searchForm.appendChild(searchBarInput);

  searchBarContainer.appendChild(searchForm);

  mainNavContentContainer.appendChild(weatherLocationContainer);
  mainNavContentContainer.appendChild(unitChangingContainer);
  mainNavContentContainer.appendChild(searchBarContainer);

  nav.appendChild(mainNavContentContainer);

  return nav;
}

function buildMainContentContainerBoilerPlate() {
  const mainContentContainer = document.createElement('div');
  mainContentContainer.classList.add('main-content-container');
  const rightNowWeatherContainer = buildRightNowWeatherContainerBoilerPlate();
  const hourlyWeatherContainer = buildHourlyWeatherContainerBoilerPlate();
  const weeklyWeatherContainer = buildWeeklyWeatherContainerBoilerPlate();

  mainContentContainer.appendChild(rightNowWeatherContainer);
  mainContentContainer.appendChild(hourlyWeatherContainer);
  mainContentContainer.appendChild(weeklyWeatherContainer);
  return mainContentContainer;
}

function buildRightNowWeatherContainerBoilerPlate() {
  const currentWeatherContainer = document.createElement('section');
  currentWeatherContainer.classList.add('current-weather-container');
  return currentWeatherContainer;
}

function buildHourlyWeatherContainerBoilerPlate() {
  const hourlyWeatherContainer = document.createElement('section');
  hourlyWeatherContainer.classList.add('hourly-weather-container');
  return hourlyWeatherContainer;
}

function buildWeeklyWeatherContainerBoilerPlate() {
  const weeklyWeatherContainer = document.createElement('section');
  weeklyWeatherContainer.classList.add('weekly-weather-container');
  return weeklyWeatherContainer;
}

const savedCities = (function getSavedCities() {
  // let testArrOfCities = [];
  // let strOfArrOfCities = JSON.stringify(testArrOfCities);
  // localStorage.setItem('cities', strOfArrOfCities);

  const deleteCity = function (cityToFilter) {
    const arrOfCities = getCities();
    const remainingCitiesArr = arrOfCities.filter(
      (city) => city !== cityToFilter
    );
    localStorage.setItem('cities', JSON.stringify(remainingCitiesArr));
  };
  const addCity = function (cityName) {
    let arrOfCities = getCities();
    arrOfCities.push(cityName);
    localStorage.setItem('cities', JSON.stringify(arrOfCities));
  };
  const getCities = function () {
    let arrOfCitiesStr = localStorage.getItem('cities');
    if (arrOfCitiesStr) {
      let arrOfCities = JSON.parse(arrOfCitiesStr);
      console.log(arrOfCities);
      return arrOfCities;
    }
  };
  return { deleteCity, addCity, getCities };

  //keep the methods but need to have an array of cities updated and retrieved via local storage
})();

function buildSavedLocationsDropDown() {
  const savedCitiesArr = savedCities.getCities();
  const savedLocationDropDown = document.createElement('div');
  savedLocationDropDown.classList.add('saved-locations-drop-down', 'hidden');
  savedCitiesArr.forEach((city) => {
    const newCityLocationContainer = buildNewLocationContainer(city);
    savedLocationDropDown.appendChild(newCityLocationContainer);
  });

  const cityContainer = document.createElement('div');
  cityContainer.classList.add('city-container');
  cityContainer.setAttribute('id', 'add-new-city-btn');
  const cityName = document.createElement('h3');
  cityName.classList.add('city-name');
  cityName.textContent = 'Add to saved';
  const addToSavedCitiesBtn = document.createElement('button');
  addToSavedCitiesBtn.classList.add('add-to-saved-cities-btn');
  addToSavedCitiesBtn.textContent = '+';

  cityContainer.appendChild(cityName);
  cityContainer.appendChild(addToSavedCitiesBtn);

  cityContainer.addEventListener('click', (e) => {
    const currentCity = document.querySelector('.current-town');
    const currentCityName = currentCity.textContent;
    if (!savedCitiesArr.includes(currentCityName)) {
      savedCities.addCity(currentCityName);
      updateSavedLocationDropDown();
    }
  });

  savedLocationDropDown.appendChild(cityContainer);

  return savedLocationDropDown;
}

function buildNewLocationContainer(city) {
  const cityContainer = document.createElement('div');
  cityContainer.classList.add('city-container');
  const cityName = document.createElement('h3');
  cityName.classList.add('city-name');
  cityName.textContent = city;
  const deleteCityBtn = document.createElement('button');
  deleteCityBtn.classList.add('delete-city-btn');
  deleteCityBtn.textContent = '-';

  cityContainer.appendChild(cityName);
  cityContainer.appendChild(deleteCityBtn);

  cityName.addEventListener('click', (e) => {
    const location = e.target.textContent;
    displayWeather(location);
    //add location to session storage
    // sessionStorage.clear();
    // sessionStorage.setItem('currentLocation', location);
  });
  deleteCityBtn.addEventListener('click', (e) => {
    const cityName = e.target.previousSibling.textContent;
    savedCities.deleteCity(cityName);
    updateSavedLocationDropDown();
  });

  return cityContainer;
}
