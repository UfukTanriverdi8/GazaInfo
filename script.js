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
    total_gaza.textContent += `${dataset_gaza.total} şehit`;
    children_gaza.innerHTML += `${dataset_gaza.children} çocuk`;
    women_gaza.innerHTML += `${dataset_gaza.women} kadın`;
    press_gaza.innerHTML += `${dataset_gaza.press} basın mensubu`;
    medical_gaza.innerHTML += `${dataset_gaza.medical} tıbbi personel`;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

fetchAndUpdateData();

// api call ile sitenin refreshlenmesi ayrılmalı bir şekilde !!
setInterval(()=>{
  location.reload();
}, 60000)


function showNextScreen() {

  let currentScreenIndex = 0;
  const screens = document.querySelectorAll('.screen');

  // Hide current screen
  screens[currentScreenIndex].classList.remove('active');
  
  // Move to the next screen
  currentScreenIndex = (currentScreenIndex + 1) % screens.length;

  // Show the next screen
  screens[currentScreenIndex].classList.add('active');
}

// Start the slideshow
// (showNextScreen, 2000);