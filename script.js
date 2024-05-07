const total_gaza = document.getElementById('total_gaza');
const children_gaza = document.getElementById('children_gaza');
const women_gaza = document.getElementById('women_gaza');
const press_gaza = document.getElementById('press_gaza');
const medical_gaza = document.getElementById('medical_gaza');


function fetchData() {
  fetch('https://data.techforpalestine.org/api/v3/summary.min.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      updateData(data);

    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function updateData(data) {
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

fetchData();

/* yarım kalan kısım, sayfalar arası geçişlerde sayıların büyümesi efekti yenilenmeli 

if the active screen is class="data_page", then call the update Data function 

let current_page = document.querySelector('.active_screen');

if (current_page.classList.contains('data_page')) {
  fetchData();
  updateData(data);
} 
*/



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
  screens[currentScreenIndex].classList.remove('active_screen');
  
  // Move to the next screen
  currentScreenIndex = (currentScreenIndex + 1) % screens.length;

  // Show the next screen
  screens[currentScreenIndex].classList.add('active_screen');
}

// Start the slideshow (change interval set to 2000ms for testing purposes)
setInterval(showNextScreen, 5000);