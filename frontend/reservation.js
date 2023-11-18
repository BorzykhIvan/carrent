document.addEventListener("DOMContentLoaded", function () {
  const carList = document.getElementById('carList');

  carList.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('carbutton') || (target.classList.contains('deleteCar') && target.textContent === 'ZAREZERWUJ')) {
      const carElement = target.closest('.car');
      const carId = target.getAttribute('data-car-id');
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
              <div class="price_r">539 ZŁ</div>
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