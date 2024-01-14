function deleteCarFromServer(carId, carElement) {
  fetch(`https://carrent-w2et2.ondigitalocean.app/api/cars/${carId}`, {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
    }
  })
    .then(response => {
      if (response.ok) {
        carList.removeChild(carElement);
      } else {
        console.error('РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР° РїСЂРё СѓРґР°Р»РµРЅРёРё Р°РІС‚РѕРјРѕР±РёР»СЏ.');
      }
    })
    .catch(error => {
      console.error('РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР° РїСЂРё РІС‹РїРѕР»РЅРµРЅРёРё Р·Р°РїСЂРѕСЃР°:', error);
    });
}

function fetchDataAndPopulatePage(cars) {
  const carList = document.getElementById('carList');
  carList.innerHTML = '';

  cars.forEach(car => {
    const eventsCheckbox = car.events ? '<div class="events"><div><img class="checked" src="https://fra1.digitaloceanspaces.com/carrentbucket/static/done.svg"></div><p class="checked_text">okazja</p></div>' : '';
    const taxiCheckbox = car.taxi ? '<div class="events"><div><img class="checked" src="https://fra1.digitaloceanspaces.com/carrentbucket/static/done.svg"></div><p class="checked_text">taxi</p></div>' : '';
    const racetrackCheckbox = car.racetrack ? '<div class="events"><div><img class="checked" src="https://fra1.digitaloceanspaces.com/carrentbucket/static/done.svg"></div><p class="checked_text">tor</p></div>' : '';

    const carElement = document.createElement('div');
    carElement.classList.add('car');
    carElement.innerHTML = `
      <div class="events_column">
        ${eventsCheckbox}
        ${taxiCheckbox}
        ${racetrackCheckbox}
      </div>
      <div class="carimg">
        <img class="carimgg" src="${car.image_url}" data-car-id="${car.id}">
        <div class="brandcar">
          <p class="brand">${car.brand}</p>
          <p class="model">${car.model}</p>
        </div>
      </div>
      <div class="cartype">
        <a class="transmision_logo"><img class="transmision_logoo" src="https://fra1.digitaloceanspaces.com/carrentbucket/static/manual-transmission_6500196%201.png"></a>
        <p class="transmision_type">${car.transmission_type}</p>
        <a class="fuel_logo"><img class="fuel_logoo" src="https://fra1.digitaloceanspaces.com/carrentbucket/static/gas-station.png"></a>
        <p class="fuel_type">${car.fuel_type}</p>
        <a class="day_logo"><img class="day_logoo" src="https://fra1.digitaloceanspaces.com/carrentbucket/static/one.png"></a>
        <p class="price">${car.day_price} ZЕЃ</p>
      </div>
      <div class="carbutton" data-car-id="${car.id}">
        <p class="deleteCar" data-car-id="${car.id}">ZAREZERWUJ</p> <!-- Р—РґРµСЃСЊ С‚РµРєСЃС‚ "ZAREZERWUJ" -->    
      </div>
    `;

    const deleteButton = carElement.querySelector('.deleteCar');
    deleteButton.addEventListener('click', () => {
      const carId = deleteButton.getAttribute('data-car-id');
      if (deleteButton.textContent === 'USUN') {
        deleteCarFromServer(carId, carElement);
      }
    });

    carList.appendChild(carElement);
  });
}

function editButtonHandler() {
  const carButtons = document.querySelectorAll('.carbutton p.deleteCar');
  carButtons.forEach(button => {
    if (button.textContent === 'ZAREZERWUJ') {
      button.textContent = 'USUN';
    }
  });
}



document.addEventListener("DOMContentLoaded", function () {
  // РћР±СЂР°Р±РѕС‚С‡РёРє СЃРѕР±С‹С‚РёСЏ РґР»СЏ РєРЅРѕРїРєРё "UsuЕ„"
  let editButton = document.querySelector('.editbutton a');
  editButton.addEventListener('click', editButtonHandler);

  get_cars().then((cars) => {
    fetchDataAndPopulatePage(cars);
  })

  let transmission = document.getElementById('transmissionFilter');
  let fuel = document.getElementById('fuelFilter');
  let minPrice = document.getElementById('priceMin');
  let maxPrice = document.getElementById('priceMax');
  let racetrack = document.getElementById('racetrackFilter');
  let taxi = document.getElementById('taxiFilter');
  let events = document.getElementById('eventsFilter');
  document.querySelector('.filterForm').addEventListener('change', function (event) {
    get_cars(transmission.value, fuel.value, minPrice.value, maxPrice.value, taxi.checked, events.checked, racetrack.checked).then((cars) => {
      fetchDataAndPopulatePage(cars);
    })
  })
});

