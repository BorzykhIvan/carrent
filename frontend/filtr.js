function applyFilters() {
  const transmissionSelect = document.getElementById('transmissionFilter');
  const fuelSelect = document.getElementById('fuelFilter');
  const priceMinInput = document.getElementById('priceMin');
  const priceMaxInput = document.getElementById('priceMax');
  const taxiCheckbox = document.getElementById('taxiFilter');
  const eventsCheckbox = document.getElementById('eventsFilter');
  const racetrackCheckbox = document.getElementById('racetrackFilter');

  const selectedTransmission = transmissionSelect.value;
  const selectedFuel = fuelSelect.value;
  const minPrice = parseFloat(priceMinInput.value);
  const maxPrice = parseFloat(priceMaxInput.value);

  const carElements = document.querySelectorAll('.car');

  carElements.forEach(carElement => {
    const carTransmission = carElement.querySelector('.transmision_type').textContent;
    const carFuel = carElement.querySelector('.fuel_type').textContent;
    const carPrice = parseFloat(carElement.querySelector('.price').textContent);
    const carTaxi = carElement.querySelector('.taxi');
    const carEvents = carElement.querySelector('.events');
    const carRacetrack = carElement.querySelector('.racetrack');

    const meetsTransmission = !selectedTransmission || carTransmission === selectedTransmission;
    const meetsFuel = !selectedFuel || carFuel === selectedFuel;
    const meetsPrice = (!minPrice || carPrice >= minPrice) && (!maxPrice || carPrice <= maxPrice);
    const meetsTaxi = !taxiCheckbox.checked || carTaxi;
    const meetsEvents = !eventsCheckbox.checked || carEvents;
    const meetsRacetrack = !racetrackCheckbox.checked || carRacetrack;

    if (meetsTransmission && meetsFuel && meetsPrice && meetsTaxi && meetsEvents && meetsRacetrack) {
      carElement.style.display = 'flex';
    } else {
      carElement.style.display = 'none';
    }
  });
}

// Слушатели событий для селектов фильтров, ввода цены и чекбоксов
const transmissionSelect = document.getElementById('transmissionFilter');
const fuelSelect = document.getElementById('fuelFilter');
const priceMinInput = document.getElementById('priceMin');
const priceMaxInput = document.getElementById('priceMax');
const taxiCheckbox = document.getElementById('taxiFilter');
const eventsCheckbox = document.getElementById('eventsFilter');
const racetrackCheckbox = document.getElementById('racetrackFilter');

transmissionSelect.addEventListener('change', applyFilters);
fuelSelect.addEventListener('change', applyFilters);
priceMinInput.addEventListener('input', applyFilters);
priceMaxInput.addEventListener('input', applyFilters);
taxiCheckbox.addEventListener('change', applyFilters);
eventsCheckbox.addEventListener('change', applyFilters);
racetrackCheckbox.addEventListener('change', applyFilters);
