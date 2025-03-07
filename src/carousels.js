export {
  addHourlyCarouselSliderFunctionality,
  addWeeklyCarouselSliderFunctionality,
};

function addHourlyCarouselSliderFunctionality() {
  let currentPosition = 0;
  const leftChevronBtn = document.querySelector(
    '.hourly-weather-container .left-chevron svg'
  );
  const rightChevronBtn = document.querySelector(
    '.hourly-weather-container .right-chevron svg'
  );
  const allHoursContainer = document.querySelector('.all-hours-container');

  rightChevronBtn.addEventListener('click', () => {
    console.log('clicked');
    const carouselInfoObj = calculateCarouselInfo(100, 10, 24, 600);
    const moveRight = currentPosition + carouselInfoObj.slideSize;
    if (moveRight < carouselInfoObj.maxPosition) {
      allHoursContainer.style.right = `${moveRight}px`;
      currentPosition = moveRight;
    }
  });

  leftChevronBtn.addEventListener('click', () => {
    console.log('clicked');
    const carouselInfoObj = calculateCarouselInfo(100, 10, 24, 600);
    const moveLeft = currentPosition - carouselInfoObj.slideSize;
    if (moveLeft >= 0) {
      allHoursContainer.style.right = `${moveLeft}px`;
      currentPosition = moveLeft;
    }
  });
}
function addWeeklyCarouselSliderFunctionality() {
  let currentPosition = 0;
  const leftChevronBtn = document.querySelector(
    '.weekly-weather-container .left-chevron svg'
  );
  const rightChevronBtn = document.querySelector(
    '.weekly-weather-container .right-chevron svg'
  );
  const allDaysContainer = document.querySelector('.all-days-container');

  rightChevronBtn.addEventListener('click', () => {
    console.log('clicked');
    const carouselInfoObj = calculateCarouselInfo(100, 10, 7, 600);
    const moveRight = currentPosition + carouselInfoObj.slideSize;
    if (moveRight < carouselInfoObj.maxPosition) {
      allDaysContainer.style.right = `${moveRight}px`;
      currentPosition = moveRight;
    }
  });

  leftChevronBtn.addEventListener('click', () => {
    console.log('clicked');
    const carouselInfoObj = calculateCarouselInfo(100, 10, 7, 600);
    const moveLeft = currentPosition - carouselInfoObj.slideSize;
    if (moveLeft >= 0) {
      allDaysContainer.style.right = `${moveLeft}px`;
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
