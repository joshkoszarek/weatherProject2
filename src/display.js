import {
  fahrenheitToCelsius,
  celsiusToFahrenheit,
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

export { displayWeatherData };

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

  const carousel = createHourlyWeatherCarousel(necessaryWeatherData);
  let arrOfElementsToAppend = [title, carousel];
  return arrOfElementsToAppend;
}
function createWeeklyWeatherDisplayElements(necessaryWeatherData) {
  const title = document.createElement('div');
  title.classList.add('title');

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
