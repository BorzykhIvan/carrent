document.addEventListener("DOMContentLoaded", function () {
  const carList = document.getElementById('carList');

  carList.addEventListener('click', function (event) {
      const target = event.target;

      // Проверяем, была ли нажата кнопка "carbutton" или текст "ZAREZERWUJ"
      if (target.classList.contains('carbutton') || (target.classList.contains('deleteCar') && target.textContent === 'ZAREZERWUJ')) {
          const carElement = target.closest('.car');
          const carId = target.getAttribute('data-car-id');
          const imageUrl = carElement.querySelector('.carimgg').getAttribute('src');
          const brand = carElement.querySelector('.brand').textContent;
          const model = carElement.querySelector('.model').textContent;

          // Проверяем, существует ли уже блок с классом "reservation"
          if (!document.querySelector('.reservation')) {
              showReservationInfo(imageUrl, brand, model);
          }
      }
  });


    function showReservationInfo(imageUrl, brand, model) {
        // Создаем блок для отображения информации о машине
        const reservationDiv = document.createElement('div');
        reservationDiv.classList.add('reservation');

        reservationDiv.innerHTML = `
        <div class="reservation_container">
          <div class="carimg">
            <img class="carimgg_reservation" src="${imageUrl}" alt="Car Image">
          </div>
          <div class="brandmodel">
            <p class="brand">${brand}</p>
            <p class="model">${model}</p>
          </div>

          <div class="reserv_part1">
            <div class="start_date_reservation"><p>Data początku rezerwacji</p></div>
            <div class="start_date_reservation1"><p>WYBIERZ</p></div>
          </div>
          <div class="reserv_part2">
            <div class="end_date_reservation"><p>Data końca rezerwacji</p></div>
            <div class="end_date_reservation1"><p>WYBIERZ</p></div>
          </div>
          <div class="reserv_loyal">
            <div class="level_reservation"><p>Poziom stałego klienta</p></div>
            <div class="level_reservation1"><p>POZIOM 4</p></div>
          </div>
          <div class="promo_reservation">
            <div class="kod_reservation"><p>Kod promocyjny</p></div>
            <div class="kod_reservation1"><p>Wpisz...</p></div>
          </div>
          
          <div class="price_reservation">
            <div class="price_reservation_text">Koszt wynajmu wynosi:</div>
            <div class="price_reservation1">
            <div class="price_r">539 ZŁ</div>
            <div class="price_button">Oblicz</div>
            </div>
          </div>
          <div class="carbutton_reservation">
          <p >ZAREZERWUJ</p>  
        </div>
        <button class="close-button"><img class="close_button" src="https://fra1.digitaloceanspaces.com/carrentbucket/static/icon%20_cancel.svg"></button>
        </div>
      `;

        // Добавляем блок в body
        document.body.appendChild(reservationDiv);

        // Добавляем обработчик события для кнопки закрытия
        const closeButton = reservationDiv.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            // Удаляем блок при нажатии на кнопку закрытия
            document.body.removeChild(reservationDiv);
        });
    }
});
