const total_gaza = document.getElementById('total_gaza');
const children_gaza = document.getElementById('children_gaza');
const women_gaza = document.getElementById('women_gaza');
const press_gaza = document.getElementById('press_gaza');
const medical_gaza = document.getElementById('medical_gaza');

function fetchAndUpdateData() {
  fetch('https://data.techforpalestine.org/api/v3/summary.min.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
    const dataset_gaza = data.gaza.killed;
    
    const totalNumber = document.getElementById('total_number');
    const childrenNumber = document.getElementById('children_number');
    const womenNumber = document.getElementById('women_number');
    const pressNumber = document.getElementById('press_number');
    const medicalNumber = document.getElementById('medical_number');

    growNumber(totalNumber, dataset_gaza.total);
    growNumber(childrenNumber, dataset_gaza.children);
    growNumber(womenNumber, dataset_gaza.women);
    growNumber(pressNumber, dataset_gaza.press);
    growNumber(medicalNumber, dataset_gaza.medical);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

fetchAndUpdateData();

function growNumber(targetElement, number) {
  var currentNumber = 0;
  var step = number / 60; // Dividing the target number by the number of steps (60 steps here)

  var interval = setInterval(function() {
    currentNumber += step;
    if (currentNumber >= number) {
      clearInterval(interval); // Stop the interval when reaching the target number
      currentNumber = number;
    }
    targetElement.textContent = Math.round(currentNumber); // Update the text content of the target element
  }, 1000 / 60); // 60 FPS
}


// api call ile sitenin refreshlenmesi ayrılmalı bir şekilde !!
setInterval(()=>{
  location.reload();
}, 60000)

let currentScreenIndex = 0;
const screens = document.querySelectorAll('.screen');

function showNextScreen() {

    // Hide current screen
  screens[currentScreenIndex].classList.remove('active');
  
  // Move to the next screen
  currentScreenIndex = (currentScreenIndex + 1) % screens.length;

  // Show the next screen
  screens[currentScreenIndex].classList.add('active');
}

// Start the slideshow (change interval set to 2000ms for testing purposes)
// setInterval(showNextScreen, 2000);