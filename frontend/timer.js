  // Устанавливаем дату, до которой идет обратный отсчет
    const countDownDate = new Date("Nov 30, 2023 00:00:00").getTime();

    // Обновляет таймер каждую секунду
    const x = setInterval(function() {

      // Получаем текущую дату и время
      const now = new Date().getTime();

      // Разница между текущей датой и временем и датой и временем, до которых идет обратный отсчет
      const distance = countDownDate - now;

      // Вычисляем оставшееся время в днях, часах, минутах и секундах
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Выводим результат в элемент с id="timer"
      document.getElementById("timer").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      // Если время вышло, выводим сообщение
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
      }
    }, 1000);