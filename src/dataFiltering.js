import { preRoundData, getCurrentHour, getHoursLeftInDay } from './utility.js';
export { getWeatherData, filterWeatherData };

async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=2B8BEFV7ZKPJSVHZRL5ALNRP5&contentType=json`,
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
    tempMax: preRoundData(currentDay.tempmax),
    tempMin: preRoundData(currentDay.tempmin),
    temp: preRoundData(currentDay.temp),
    feelsLike: preRoundData(currentDay.feelslike),
    icon: currentDay.icon,
  };
  return rightNowWeatherObject;
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
        currentTemp: preRoundData(currentDayHourlyArray[i + currentHour].temp),
        icon: currentDayHourlyArray[i + currentHour].icon,
        precipitationProb: currentDayHourlyArray[i + currentHour].precipprob,
        time: currentDayHourlyArray[i + currentHour].datetime,
        feelsLike: preRoundData(
          currentDayHourlyArray[i + currentHour].feelslike
        ),
      };
      hourlyWeatherArray.push(oneHourObj);
    } else {
      const oneHourObj = {
        currentTemp: preRoundData(nextDayHourlyArray[i - hoursLeftInDay].temp),
        icon: nextDayHourlyArray[i - hoursLeftInDay].icon,
        precipitationProb: nextDayHourlyArray[i - hoursLeftInDay].precipprob,
        time: nextDayHourlyArray[i - hoursLeftInDay].datetime,
        feelsLike: preRoundData(
          nextDayHourlyArray[i - hoursLeftInDay].feelslike
        ),
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
      highTemp: preRoundData(dailyWeather.tempmax),
      lowTemp: preRoundData(dailyWeather.tempmin),
      icon: dailyWeather.icon,
      precipProb: dailyWeather.precipprob,
      date: dailyWeather.datetime,
    };
    weeklyWeather.push(dailyWeatherObject);
  }
  return weeklyWeather;
}
