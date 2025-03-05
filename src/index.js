//saved location drop down menu functionality
function addLocationDropDownFunctionality() {
  const weatherLocationsDropDownBtn = document.querySelector('.drop-down-btn');
  const hiddenLocationsDropDownMenu = document.querySelector(
    '.saved-locations-drop-down'
  );
  weatherLocationsDropDownBtn.addEventListener('click', () => {
    hiddenLocationsDropDownMenu.classList.toggle('hidden');
  });
}

// unit changing functionality

const toggleBtn = document.querySelector('.toggle-btn-container');
const navFahrenheit = document.querySelector('.fahrenheit-container h5');
const navCelsius = document.querySelector('.celsius-container h5');

toggleBtn.addEventListener('click', () => {
  navFahrenheit.classList.toggle('selected');
  navCelsius.classList.toggle('selected');
  toggleBtn.classList.toggle('celsius');
});

// Carousel functionality
// Hourly has 24 hours to be displayed
// Weekly has 7 days to be displayed
// This only controls the movement of carousels via the chevrons
// The inner information cards have a structure and updated independently

const leftChevronBtn = document.querySelector('.left-chevron svg');
const rightChevronBtn = document.querySelector('.right-chevron svg');
const allHoursContainer = document.querySelector('.all-hours-container');

function addCarouselSliderFunctionality() {
  let currentPosition = 0;

  rightChevronBtn.addEventListener('click', () => {
    const carouselInfoObj = calculateCarouselInfo(100, 10, 24, 600);
    const moveRight = currentPosition + carouselInfoObj.slideSize;
    if (moveRight < carouselInfoObj.maxPosition) {
      allHoursContainer.style.right = `${moveRight}px`;
      currentPosition = moveRight;
    }
  });

  leftChevronBtn.addEventListener('click', () => {
    const carouselInfoObj = calculateCarouselInfo(100, 10, 24, 600);
    const moveLeft = currentPosition - carouselInfoObj.slideSize;
    if (moveLeft > 0) {
      allHoursContainer.style.right = `${moveLeft}px`;
      currentPosition = moveLeft;
    }
  });
}

function calculateCarouselInfo(cardSize, gapSize, numOfCards, viewSize) {
  const lengthOfBin = cardSize * numOfCards + gapSize * numOfCards;
  const cardsCanFit = Math.floor(viewSize / cardSize);
  const cardsToJump = Math.floor(cardsCanFit / 2);
  const slideSize = cardsToJump * (gapSize + cardSize);
  const maxPosition = slideSize * Math.floor(lengthOfBin / slideSize);
  return { lengthOfBin, cardsCanFit, cardsToJump, slideSize, maxPosition };
}

function getNumberFromString(str) {
  console.log(str);
  let matches = str.match(/(\d+)/);
  return matches;
}

addCarouselSliderFunctionality();

// Getting the weather data from an API call
// Filtering the data into an object only containing
// info that is going to be displayed

async function addSearchFunctionality(city, state) {
  const allWeatherData = await getWeatherData(city, state);
  const necessaryWeatherData = filterWeatherData(allWeatherData);
  displayWeatherData(necessaryWeatherData);
}

async function getWeatherData(city, state) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}%2C%20${state}?unitGroup=us&key=2B8BEFV7ZKPJSVHZRL5ALNRP5&contentType=json`,
    { mode: 'cors' }
  );
  const weatherData = await response.json();
  return weatherData;
}

function filterWeatherData(allWeatherData) {
  const address = allWeatherData.address;
  const rightNowWeatherObject = getRightNowWeather(allWeatherData);
  const hourlyWeatherArrOfObjects = getHourlyWeather(allWeatherData);
  const weeklyWeatherArrOfObjects = getWeeklyWeather(allWeatherData);

  const filteredWeatherObject = {
    address: address,
    dayOverview: rightNowWeatherObject,
    hourly: hourlyWeatherArrOfObjects,
    weekly: weeklyWeatherArrOfObjects,
  };
  return filteredWeatherObject;
}

function getRightNowWeather(allWeatherDataObj) {
  const currentDay = allWeatherDataObj.days[0];
  const rightNowWeatherObject = {
    tempMax: currentDay.tempmax,
    tempMin: currentDay.tempmin,
    temp: currentDay.temp,
    feelsLike: currentDay.feelslike,
    icon: currentDay.icon,
  };
  return rightNowWeatherObject;
}

function getHoursLeftInDay() {
  const now = new Date();
  const currentHour = now.getHours();
  const hoursLeftInDay = 24 - currentHour;
  return hoursLeftInDay;
}

function getCurrentHour() {
  const now = new Date();
  const currentHour = now.getHours();
  return currentHour;
}
function getHourlyWeather(allWeatherDataObj) {
  const currentDayHourlyArray = allWeatherDataObj.days[0].hours;
  const nextDayHourlyArray = allWeatherDataObj.days[1].hours;
  const currentHour = getCurrentHour();
  const hoursLeftInDay = getHoursLeftInDay();

  const hourlyWeatherArray = [];
  for (let i = 0; i < 24; i++) {
    if (hoursLeftInDay > i) {
      const oneHourObj = {
        currentTemp: currentDayHourlyArray[i + currentHour].temp,
        icon: currentDayHourlyArray[i + currentHour].icon,
        precipitationProb: currentDayHourlyArray[i + currentHour].precipprob,
        time: currentDayHourlyArray[i + currentHour].datetime,
      };
      hourlyWeatherArray.push(oneHourObj);
    } else {
      const oneHourObj = {
        currentTemp: nextDayHourlyArray[i - hoursLeftInDay].temp,
        icon: nextDayHourlyArray[i - hoursLeftInDay].icon,
        precipitationProb: nextDayHourlyArray[i - hoursLeftInDay].precipprob,
        time: nextDayHourlyArray[i - hoursLeftInDay].datetime,
      };
      hourlyWeatherArray.push(oneHourObj);
    }
  }
  return hourlyWeatherArray;
}

function getWeeklyWeather(allWeatherDataObj) {
  const weeklyWeather = [];
  for (let i = 0; i < 7; i++) {
    const dailyWeather = allWeatherDataObj.days[i];
    const dailyWeatherObject = {
      highTemp: dailyWeather.tempmax,
      lowTemp: dailyWeather.tempmin,
      icon: dailyWeather.icon,
      precipProb: dailyWeather.precipprob,
    };
    weeklyWeather.push(dailyWeatherObject);
  }
  return weeklyWeather;
}

///Everything having to do with taking weather data and displaying it correctly

function displayWeatherData(necessaryWeatherData) {
  updateTopLocationDisplay(necessaryWeatherData);
  // updateRightNowWeatherDisplay(necessaryWeatherData);
  //display hourly weather
  //display weekly weather
}

function clearChildElements(parentElement) {
  // main content container
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
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
    necessaryWeatherData.dayOverview.icon
  );

  const currentTempContainer = document.createElement('div');
  currentTempContainer.classList.add('current-temp-container');
  const degrees = document.createElement('p');
  degrees.textContent = necessaryWeatherData.dayOverview.temp;
  const degreeSymbol = document.createElement('div');
  degreeSymbol.classList.add('degree');
  degreeSymbol.textContent = '°';
  const units = document.createElement('p');
  units.classList.add('units');
  units.textContent = 'C';

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
  const weatherIconSvg = getSVGToAppend(necessaryWeatherData.dayOverview.icon);
  weatherIconContainer.appendChild(weatherIconSvg);

  const mainWeatherDetailsContainer = document.createElement('div');
  mainWeatherDetailsContainer.classList.add('main-weather-details-container');

  const currentTempContainer = document.querySelector('div');
  currentTempContainer.classList.add('current-temp-container');

  const degree = document.createElement('h3');
  degree.textContent = necessaryWeatherData.dayOverview.temp;
  const degreeSymbol = document.createElement('div');
  degreeSymbol.classList.add('degrees');
  const units = document.createElement('div');
  units.classList.add('units');
  units.textContent = 'C';

  const realFeel = document.createElement('div');
  realFeel.classList.add('real-feel');
  realFeel.textContent = `Real Feel ${necessaryWeatherData.dayOverview.realFeel}°`;

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
function updateHourlyWeatherDisplay(necessaryWeatherData, appendTo) {}
function updateWeeklyWeatherDisplay(necessaryWeatherData, appendTo) {}

function getSVGToAppend(iconName) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('height', '24px');
  svg.setAttribute('width', '24px');
  svg.setAttribute('viewBox', '0 -960 960 960');
  svg.setAttribute('fill', '#e3e3e3');

  const path = document.createElementNS(svgNS, 'path');

  //switch case on the path

  switch (iconName) {
    case 'snow' || 'snow-showers-day' || 'snow-showers-night':
      path.setAttribute(
        'd',
        'M260-200q-21 0-35.5-14.5T210-250q0-21 14.5-35.5T260-300q21 0 35.5 14.5T310-250q0 21-14.5 35.5T260-200ZM380-80q-21 0-35.5-14.5T330-130q0-21 14.5-35.5T380-180q21 0 35.5 14.5T430-130q0 21-14.5 35.5T380-80Zm120-120q-21 0-35.5-14.5T450-250q0-21 14.5-35.5T500-300q21 0 35.5 14.5T550-250q0 21-14.5 35.5T500-200Zm240 0q-21 0-35.5-14.5T690-250q0-21 14.5-35.5T740-300q21 0 35.5 14.5T790-250q0 21-14.5 35.5T740-200ZM620-80q-21 0-35.5-14.5T570-130q0-21 14.5-35.5T620-180q21 0 35.5 14.5T670-130q0 21-14.5 35.5T620-80ZM300-360q-91 0-155.5-64.5T80-580q0-83 55-145t136-73q32-57 87.5-89.5T480-920q90 0 156.5 57.5T717-719q69 6 116 57t47 122q0 75-52.5 127.5T700-360H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-744l-10 24h-25q-57 2-97.5 42.5T160-580q0 58 41 99t99 41Zm180-100Z'
      );
      break;
    case 'thunder-rain' || 'thunder-showers-day' || 'thunder-showers-night':
      path.setAttribute(
        'd',
        'm300-40 36-100h-76l50-140h100l-43 100h83L340-40h-40Zm270-40 28-80h-78l43-120h100l-35 80h82L610-80h-40ZM300-320q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z'
      );
      break;
    case 'rain' || 'showers-day' || 'showers-night':
      path.setAttribute(
        'd',
        'M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z'
      );
      break;
    case 'fog':
      path.setAttribute(
        'd',
        'M720-200q-17 0-28.5-11.5T680-240q0-17 11.5-28.5T720-280q17 0 28.5 11.5T760-240q0 17-11.5 28.5T720-200ZM280-80q-17 0-28.5-11.5T240-120q0-17 11.5-28.5T280-160q17 0 28.5 11.5T320-120q0 17-11.5 28.5T280-80Zm-40-120q-17 0-28.5-11.5T200-240q0-17 11.5-28.5T240-280h360q17 0 28.5 11.5T640-240q0 17-11.5 28.5T600-200H240ZM400-80q-17 0-28.5-11.5T360-120q0-17 11.5-28.5T400-160h280q17 0 28.5 11.5T720-120q0 17-11.5 28.5T680-80H400ZM300-320q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z'
      );
      break;
    case 'wind':
      path.setAttribute(
        'd',
        'M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z'
      );
      break;
    case 'cloudy':
      path.setAttribute(
        'd',
        'M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z'
      );
      break;
    case 'partly-cloudy-day':
      path.setAttribute(
        'd',
        'M440-760v-160h80v160h-80Zm266 110-56-56 113-114 56 57-113 113Zm54 210v-80h160v80H760Zm3 299L650-254l56-56 114 112-57 57ZM254-650 141-763l57-57 112 114-56 56Zm-14 450h180q25 0 42.5-17.5T480-260q0-25-17-42.5T421-320h-51l-20-48q-14-33-44-52.5T240-440q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T40-320q0-83 58.5-141.5T240-520q60 0 109.5 32.5T423-400q58 0 97.5 43T560-254q-2 57-42.5 95.5T420-120H240Zm320-134q-5-20-10-39t-10-39q45-19 72.5-59t27.5-89q0-66-47-113t-113-47q-60 0-105 39t-53 99q-20-5-41-9t-41-9q14-88 82.5-144T480-720q100 0 170 70t70 170q0 77-44 138.5T560-254Zm-79-226Z'
      );
      break;
    case 'partly-cloudy-night':
      path.setAttribute(
        'd',
        'M504-425Zm20 385H420l20-12.5q20-12.5 43.5-28t43.5-28l20-12.5q81-6 149.5-49T805-285q-86-8-163-43.5T504-425q-61-61-97-138t-43-163q-77 43-120.5 118.5T200-444v12l-12 5.5q-12 5.5-26.5 11.5T135-403.5l-12 5.5q-2-11-2.5-23t-.5-23q0-146 93-257.5T450-840q-18 99 11 193.5T561-481q71 71 165.5 100T920-370q-26 144-138 237T524-40Zm-284-80h180q25 0 42.5-17.5T480-180q0-25-17-42.5T422-240h-52l-20-48q-14-33-44-52.5T240-360q-50 0-85 34.5T120-240q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T40-240q0-83 58.5-141.5T240-440q60 0 109.5 32.5T423-320q57 2 97 42.5t40 97.5q0 58-41 99t-99 41H240Z'
      );
      break;
    case 'clear-day':
      path.setAttribute(
        'd',
        'M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z'
      );
      break;
    case 'clear-night':
      path.setAttribute(
        'd',
        'M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-146 93-257.5T410-880q-18 99 11 193.5T521-521q71 71 165.5 100T880-410q-26 144-138 237T484-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T464-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T160-484q0 135 94.5 229.5T484-160Zm-20-305Z'
      );
      break;
    case 'drop-down-btn':
      path.setAttribute('d', 'M480-360 280-560h400L480-360Z');
      break;
  }
  svg.appendChild(path);
  return svg;
}

addSearchFunctionality('Waterford', 'WI');
