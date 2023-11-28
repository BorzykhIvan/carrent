document.addEventListener("DOMContentLoaded", function () {
  const carList = document.getElementById('carList');
  let selectedCarId;

  carList.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('carbutton') || (target.classList.contains('deleteCar') && target.textContent === 'ZAREZERWUJ')) {
      const carElement = target.closest('.car');
      selectedCarId = target.getAttribute('data-car-id'); // сохраняем carId в переменной selectedCarId
      const imageUrl = carElement.querySelector('.carimgg').getAttribute('src');
      const brand = carElement.querySelector('.brand').textContent;
      const model = carElement.querySelector('.model').textContent;

      if (!document.querySelector('.reservation')) {
        showReservationInfo(imageUrl, brand, model);
      }
    }
  });

  function showReservationInfo(imageUrl, brand, model) {
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
            <div class="kod_reservation1"><input type="text" class="kod_reservation_text" placeholder="Wpisz..." maxlength="8"></div>      
          </div>

          <div class="price_reservation">
            <div class="price_reservation_text">Koszt wynajmu wynosi:</div>
            <div class="price_reservation1">
              <div class="price_r">0 ZŁ</div>
              <div class="price_button">Oblicz</div>
            </div>
          </div>
          <div class="carbutton_reservation">
            <p >ZAREZERWUJ</p>  
          </div>
          <button class="close-button"><img class="close_button"src="https://fra1.digitaloceanspaces.com/carrentbucket/static/icon%20_cancel.svg"></button>
        </div>
      `;
    document.body.appendChild(reservationDiv);
    
    const priceButton = reservationDiv.querySelector('.price_button');
    if (priceButton) {
      priceButton.addEventListener('click', () => {
        const startDate = fpStart.selectedDates[0].toISOString().split('T')[0];
        const endDate = fpEnd.selectedDates[0].toISOString().split('T')[0];
  
        // Вызываем функцию для отправки данных на бекенд
        sendReservationData(startDate, endDate, selectedCarId); // используем selectedCarId
      });
    }

    const startDatePicker = reservationDiv.querySelector('.start_date_reservation1');
    const endDatePicker = reservationDiv.querySelector('.end_date_reservation1');

    const fpStart = flatpickr(startDatePicker, {
      enableTime: false,
      dateFormat: "Y-m-d",
      minDate: "today",  // Ограничение для выбора только сегодняшней даты и позднее
      locale: {
        firstDayOfWeek: 1,
        months: {
          shorthand: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
          longhand: [
            "Styczeń",
            "Luty",
            "Marzec",
            "Kwiecień",
            "Maj",
            "Czerwiec",
            "Lipiec",
            "Sierpień",
            "Wrzesień",
            "Październik",
            "Listopad",
            "Grudzień"
          ],
        },
        weekdays: {
          shorthand: ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"],
          longhand: [
            "Niedziela",
            "Poniedziałek",
            "Wtorek",
            "Środa",
            "Czwartek",
            "Piątek",
            "Sobota"
          ],
        },
      },
      onClose: function (_, dateStr) {
        updateStartDateText(startDatePicker, dateStr);
        const selectedStartDate = fpStart.selectedDates[0];

        // Если выбрана дата в startDatePicker, устанавливаем ее в качестве минимальной для endDatePicker
        if (selectedStartDate) {
          fpEnd.set("minDate", selectedStartDate);
        }
      }
    });

    const fpEnd = flatpickr(endDatePicker, {
      enableTime: false,
      dateFormat: "Y-m-d",
      minDate: "today",  // Ограничение для выбора только сегодняшней даты и позднее
      locale: {
        firstDayOfWeek: 1,
        months: {
          shorthand: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
          longhand: [
            "Styczeń",
            "Luty",
            "Marzec",
            "Kwiecień",
            "Maj",
            "Czerwiec",
            "Lipiec",
            "Sierpień",
            "Wrzesień",
            "Październik",
            "Listopad",
            "Grudzień"
          ],
        },
        weekdays: {
          shorthand: ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"],
          longhand: [
            "Niedziela",
            "Poniedziałek",
            "Wtorek",
            "Środa",
            "Czwartek",
            "Piątek",
            "Sobota"
          ],
        },
      },
      onClose: function (_, dateStr) {
        updateEndDateText(endDatePicker, dateStr);

        // Получаем массив выбранных дат для endDatePicker
        const selectedEndDate = fpEnd.selectedDates[0];

        // Если выбрана дата в endDatePicker, устанавливаем ее в качестве максимальной для startDatePicker
        if (selectedEndDate) {
          fpStart.set("maxDate", selectedEndDate);
        }
      }
    });

    function updateStartDateText(element, dateStr) {
      element.textContent = dateStr || "WYBIERZ";
    }

    function updateEndDateText(element, dateStr) {
      element.textContent = dateStr || "WYBIERZ";
    }

    // Добавляем обработчик события для кнопки закрытия
    const closeButton = reservationDiv.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      // Удаляем блок при нажатии на кнопку закрытия
      document.body.removeChild(reservationDiv);
    });
  }
});

function sendReservationData(start_date, end_date, car_id) {
  const baseUrl = 'https://carrent-w2et2.ondigitalocean.app/api/calculator/';
  const url = new URL(baseUrl);

  // Добавляем параметры запроса к URL
  url.searchParams.append('start_date', start_date);
  url.searchParams.append('end_date', end_date);
  url.searchParams.append('car', car_id);

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': 'Kz0N97DK68pqHJ5qGPpq6cy8UjpXJFkTRWdw7EAYg5talf5tHbikTQVYZJpvqiwO',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Ответ от бекенда:', data);
      // Обновите DOM или выполните другие действия с полученными данными

       // Получите элемент с классом price_r
       const priceElement = document.querySelector('.price_r');

       // Предполагая, что data.total содержит новое значение
       const newPrice = data.total + ' ZŁ';
 
       // Обновите текст элемента price_r
       priceElement.textContent = newPrice;

       

    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}
