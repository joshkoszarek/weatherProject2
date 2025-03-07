import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  updateRealFeelMessage,
} from './utility.js';
export { addUnitToggleButtonFunctionality };

// unit changing functionality
function addUnitToggleButtonFunctionality() {
  const toggleBtn = document.querySelector('.toggle-btn-container');
  const navFahrenheit = document.querySelector('.fahrenheit-container h5');
  const navCelsius = document.querySelector('.celsius-container h5');

  toggleBtn.addEventListener('click', () => {
    navFahrenheit.classList.toggle('selected');
    navCelsius.classList.toggle('selected');
    toggleBtn.classList.toggle('celsius');

    const tempElementNodeList = document.querySelectorAll('.temp');
    const unitElementNodeList = document.querySelectorAll('.units');
    const realFeelMessageElement = document.querySelector('.real-feel');

    if (toggleBtn.classList.contains('celsius')) {
      tempElementNodeList.forEach((e) => {
        e.textContent = fahrenheitToCelsius(+e.textContent);
      });
      unitElementNodeList.forEach((e) => {
        e.textContent = 'C';
      });
      realFeelMessageElement.textContent = updateRealFeelMessage(
        realFeelMessageElement.textContent,
        'celsius'
      );
    } else {
      tempElementNodeList.forEach((e) => {
        e.textContent = celsiusToFahrenheit(+e.textContent);
      });
      unitElementNodeList.forEach((e) => {
        e.textContent = 'F';
      });
      realFeelMessageElement.textContent = updateRealFeelMessage(
        realFeelMessageElement.textContent,
        'fahrenheit'
      );
    }
  });
}
