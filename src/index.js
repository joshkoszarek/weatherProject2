const weatherLocationsDropDownBtn = document.querySelector('.drop-down-btn');
const hiddenLocationsDropDownMenu = document.querySelector(
  '.saved-locations-drop-down'
);
weatherLocationsDropDownBtn.addEventListener('click', () => {
  hiddenLocationsDropDownMenu.classList.toggle('hidden');
});

const toggleBtn = document.querySelector('.toggle-btn-container');
const navFahrenheit = document.querySelector('.fahrenheit-container h5');
const navCelsius = document.querySelector('.celsius-container h5');

toggleBtn.addEventListener('click', () => {
  navFahrenheit.classList.toggle('selected');
  navCelsius.classList.toggle('selected');
  toggleBtn.classList.toggle('celsius');
});

// buttons for carousel

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

async function getWeatherData(city, state) {
  //make an API call to the Visual Crossing API
  //convert the json to an object
  // return the data as a js object
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}%2C%20${state}?unitGroup=us&key=2B8BEFV7ZKPJSVHZRL5ALNRP5&contentType=json`,
    { mode: 'cors' }
  );
  const weatherData = await response.json();

  return weatherData;
}

//need to have multiple async functions

// const waterfordWeather = getWeatherData('Waterford', 'WI');

// console.log(waterfordWeather);

//make an API call
//return the data object
//take the data object and construct a new object
//with what is needed for the display
// update the display using the object

async function addSearchFunctionality(city, state) {
  const allWeatherData = await getWeatherData(city, state);
  const necessaryWeatherData = filterWeatherData(allWeatherData);
  console.log(necessaryWeatherData);
  // displayWeatherData(necessaryWeatherData);
}

function filterWeatherData(allWeatherData) {
  const address = allWeatherData.address;
  const rightNowWeatherObject = getRightNowWeather(allWeatherData);
  const hourlyWeatherArrOfObjects = getHourlyWeather(allWeatherData);
  const weeklyWeatherArrOfObjects = getWeeklyWeather(allWeatherData);

  const filteredWeatherObject = {
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

function displayWeatherData(necessaryWeatherData) {
  // get all the query selectors
  // fill them with the right info
}

addSearchFunctionality('Waterford', 'WI');
