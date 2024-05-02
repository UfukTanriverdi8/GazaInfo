
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
      //console.log(data);
      const killed_people = data.gaza.killed;
      totalElement.textContent = killed_people.total;
      childrenElement.textContent = `Children: ${killed_people.children}`;
      womenElement.textContent = `Women: ${killed_people.women}`;
      pressElement.textContent = `Press: ${killed_people.press}`;
      medicalPersonnelElement.textContent = `Medical Personnel: ${killed_people.medical}`;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// Initial call
fetchAndUpdateData();

// Schedule the API request to occur every hour (in milliseconds)
setInterval(fetchAndUpdateData, 60 * 60 * 1000);
