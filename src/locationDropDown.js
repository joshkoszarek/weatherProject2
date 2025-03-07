export { addLocationDropDownFunctionality };

function addLocationDropDownFunctionality() {
  const weatherLocationsDropDownBtn = document.querySelector('.drop-down-btn');
  const hiddenLocationsDropDownMenu = document.querySelector(
    '.saved-locations-drop-down'
  );
  weatherLocationsDropDownBtn.addEventListener('click', () => {
    hiddenLocationsDropDownMenu.classList.toggle('hidden');
  });
}
