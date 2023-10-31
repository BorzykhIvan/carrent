document.addEventListener("DOMContentLoaded", function () {
  // Создайте функцию для получения данных и обновления страницы
  function fetchDataAndPopulatePage() {
    fetch('https://carrentapp-xj9ak.ondigitalocean.app/api/car/', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'X-CSRFToken': 'Kz0N97DK68pqHJ5qGPpq6cy8UjpXJFkTRWdw7EAYg5talf5tHbikTQVYZJpvqiwO',
      }
    })
      .then(response => response.json())
      .then(data => {
        // Очистите текущий список автомобилей
        const carList = document.getElementById('carList');
        carList.innerHTML = '';

        // Обновите содержимое элемента на странице с данными из API
        data.forEach(car => {
          const carElement = document.createElement('div');
          carElement.classList.add('car');
          carElement.innerHTML = `
            <div class="carimg">
              <img class="carimgg" src="img/image 1.png">
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
              <p>ZAREZERWUJ</p>
              </div>
          `;
          carList.appendChild(carElement);
        });
      })
      .catch(error => {
        console.error('Произошла ошибка при выполнении запроса:', error);
      });
  }

  // Вызовите функцию для получения данных и обновления страницы при загрузке документа
  fetchDataAndPopulatePage();
});