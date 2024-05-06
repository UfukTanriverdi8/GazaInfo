const totalElement = document.querySelector('.total');
const childrenElement = document.querySelector('.children');
const womenElement = document.querySelector('.women');
const pressElement = document.querySelector('.press');
const medicalPersonnelElement = document.querySelector('.medical_personnel');

function fetchAndUpdateData() {
  fetch('https://data.techforpalestine.org/api/v3/summary.min.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
    const killed_people = data.gaza.killed;
    totalElement.textContent += `${killed_people.total} şehit`;
    childrenElement.innerHTML += `${killed_people.children} çocuk`;
    womenElement.innerHTML += `${killed_people.women} kadın`;
    pressElement.innerHTML += `${killed_people.press} basın mensubu`;
    medicalPersonnelElement.innerHTML += `${killed_people.medical} tıbbi personel`;
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



// screen değiştirme
/*let currentScreenIndex = 0;
const screens = document.querySelectorAll('.screen');

function showNextScreen() {
  // Hide current screen
  screens[currentScreenIndex].classList.remove('active');
  
  // Move to the next screen
  currentScreenIndex = (currentScreenIndex + 1) % screens.length;

  // Show the next screen
  screens[currentScreenIndex].classList.add('active');
}

// Start the slideshow
setInterval(showNextScreen, 5000); */