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

function growNumber(target, number) {
  const currentNumber = Number(target.textContent);
  const difference = number - currentNumber;
  let currentStep = 0;

  const interval = setInterval(() => {
    target.textContent = currentNumber + currentStep;
    if (currentStep < difference + 100){
      currentStep += 100;
    }
    if (currentStep < difference + 10){
      currentStep += 10;
    }
    if (currentStep < difference + 3){
      currentStep += 3;
    }
    if (currentStep <= difference) {
      console.log("XXXXX")
      currentStep += 1;
    } 
    else {
      clearInterval(interval);
      console.log('number transition complete');
    }
  }, 1);
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