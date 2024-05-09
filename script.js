const total_gaza = document.getElementById('total_gaza');
const children_gaza = document.getElementById('children_gaza');
const women_gaza = document.getElementById('women_gaza');
const press_gaza = document.getElementById('press_gaza');
const medical_gaza = document.getElementById('medical_gaza');

let dataset;

function fetchData() {
  fetch('https://data.techforpalestine.org/api/v3/summary.min.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      dataset = data;
      updateData(dataset);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function updateData(data) {
  console.log(data.gaza.last_update);
  const dataset_gaza = data.gaza.killed;
    
  const total_number = document.getElementById('total_number');
  const children_number = document.getElementById('children_number');
  const women_number = document.getElementById('women_number');
  const press_number = document.getElementById('press_number');
  const medical_number = document.getElementById('medical_number');

  growNumber(total_number, dataset_gaza.total);
  growNumber(children_number, dataset_gaza.children);
  growNumber(women_number, dataset_gaza.women);
  growNumber(press_number, dataset_gaza.press);
  growNumber(medical_number, dataset_gaza.medical);
}
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


fetchData();

function growNumber(targetElement, number) {
  var currentNumber = 0;
  var step = number / 60; // Dividing the target number by the number of steps (60 steps here)

  var interval = setInterval(function() {
    currentNumber += step;
    if (currentNumber >= number) {
      clearInterval(interval); // Stop the interval when reaching the target number
      currentNumber = number;
    }
    
    targetElement.textContent = formatNumberWithCommas(Math.round(currentNumber)); // Update the text content of the target element
  }, 1000 / 60); // 60 FPS
}


// api call ile sitenin refreshlenmesi ayrılmalı bir şekilde !!
setInterval(()=>{
  location.reload();
}, 300000)

let currentScreenIndex = 0;
const screens = document.querySelectorAll('.screen');

function changeScreen() {

    // Hide current screen
  screens[currentScreenIndex].classList.remove('active_screen');
  
  // Move to the next screen
  currentScreenIndex = (currentScreenIndex + 1) % screens.length;

  // Show the next screen
  screens[currentScreenIndex].classList.add('active_screen');


  let current_page = document.querySelector('.active_screen');

  if (current_page.classList.contains('data_page')) {
    updateData(dataset);
  }else if(current_page.classList.contains('image_page')){
    const beforeContainers = current_page.querySelectorAll('.before-container');

    beforeContainers.forEach((container) => {
      const beforeImg = container.querySelector('.before');

      // Reset the animation
      beforeImg.style.animation = 'none';
      beforeImg.offsetHeight; // Trigger reflow
      beforeImg.style.animation = 'slide-out 3.5s ease-in-out forwards';
    });

  }
}


// Start the slideshow (change interval set to 2000ms for testing purposes)
setInterval(changeScreen, 5000);


