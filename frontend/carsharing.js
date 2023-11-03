document.addEventListener("DOMContentLoaded", function () {
  // Создайте функцию для получения данных и обновления страницы
  function fetchDataAndPopulatePage() {
    const carList = document.getElementById('carList');
    carList.innerHTML = '';
    
    fetch('https://carrent-w2et2.ondigitalocean.app/api/cars/', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'X-CSRFToken': 'Kz0N97DK68pqHJ5qGPpq6cy8UjpXJFkTRWdw7EAYg5talf5tHbikTQVYZJpvqiwO',
      }
    })
      .then(response => response.json())
      .then(data => {
        data.forEach(car => {
          const eventsCheckbox = car.events ? '<div class="events"><div><img class="checked" src="img/free-png 1.svg"></div><p class="checked_text">okazja</p></div>' : '';
          const taxiCheckbox = car.taxi ? '<div class="events"><div><img class="checked" src="img/free-png 1.svg"></div><p class="checked_text">taxi</p></div>' : '';
          const racetrackCheckbox = car.racetrack ? '<div class="events"><div><img class="checked" src="img/free-png 1.svg"></div><p class="checked_text">tor</p></div>' : '';

          const carElement = document.createElement('div');
          carElement.classList.add('car');
          carElement.innerHTML = `
            <div class="events_column">
              ${eventsCheckbox}
              ${taxiCheckbox}
              ${racetrackCheckbox}
            </div>
            <div class="carimg">
              <img class="carimgg" src="${car.image_url}">
              <div class="brandcar">
                <p class="brand">${car.brand}</p>
                <p class="model">${car.model}</p>
              </div>
            </div>
            <div class="cartype">
              <a class="transmision_logo"><img class="transmision_logoo" src="img/manual-transmission_6500196 1.png"></a>
              <p class="transmision_type">${car.transmission_type}</p>
              <a class="fuel_logo"><img class="fuel_logoo" src="img/gas-station_9415189.png"></a>
              <p class="fuel_type">${car.fuel_type}</p>
              <a class="day_logo"><img class="day_logoo" src="img/one_8459026.png"></a>
              <p class="price">${car.day_price} ZŁ</p>
            </div>
            <div class="carbutton">
              <p class="deleteCar" data-car-id="${car.id}">ZAREZERWUJ</p> <!-- Здесь текст "ZAREZERWUJ" -->
            </div>
          `;

          const deleteButton = carElement.querySelector('.deleteCar');
          deleteButton.addEventListener('click', () => {
            const carId = deleteButton.getAttribute('data-car-id'); // Получите идентификатор автомобиля

            if (deleteButton.textContent === 'ZAREZERWUJ') {
              // Измените текст на "USUN" после нажатия
              deleteButton.textContent = 'USUN';
            } else {
              // Вызовите функцию удаления автомобиля с сервера
              deleteCarFromServer(carId, carElement);
            }
          });

          carList.appendChild(carElement);
        });
      })
      .catch(error => {
        console.error('Произошла ошибка при выполнении запроса:', error);
      });
  }

  // Функция для удаления автомобиля с сервера
  function deleteCarFromServer(carId, carElement) {
    fetch(`https://carrent-w2et2.ondigitalocean.app/api/cars/${carId}`, {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'X-CSRFToken': 'Kz0N97DK68pqHJ5qGPpq6cy8UjpXJFkTRWdw7EAYg5talf5tHbikTQVYZJpvqiwO',
      }
    })
      .then(response => {
        if (response.ok) {
          carList.removeChild(carElement); // Удалите родительский элемент автомобиля
        } else {
          console.error('Произошла ошибка при удалении автомобиля.');
        }
      })
      .catch(error => {
        console.error('Произошла ошибка при выполнении запроса:', error);
      });
  }

  // Обработчик события для кнопки "Usuń"
  const editButton = document.querySelector('.editbutton a');
  editButton.addEventListener('click', () => {
    // Измените текст в "carbutton" на "USUN"
    const carButtons = document.querySelectorAll('.carbutton p.deleteCar');
    carButtons.forEach(button => {
      if (button.textContent === 'ZAREZERWUJ') {
        button.textContent = 'USUN';
      }
    });
  });

  fetchDataAndPopulatePage();
});


