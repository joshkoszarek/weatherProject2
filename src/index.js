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
