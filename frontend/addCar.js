document.getElementById("carForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    // Получаем данные из формы
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;
    const transmission_type = document.getElementById("transmission_type").value;
    const fuel_type = document.getElementById("fuel_type").value;
    const day_price = parseFloat(document.getElementById("day_price").value); // Преобразуем в число
    const imageInput = document.getElementById("image");
    const image = imageInput.files[0]; // Получаем выбранный файл изображения
    const racetrack = document.getElementById("racetrack").checked;
    const events = document.getElementById("events").checked;
    const taxi = document.getElementById("taxi").checked;

    // Создаем объект данных
    const data = new FormData(); // Используем FormData для отправки изображения
    data.append('brand', brand);
    data.append('model', model);
    data.append('transmission_type', transmission_type);
    data.append('fuel_type', fuel_type);
    data.append('day_price', day_price);
    data.append('image', image);
    data.append('racetrack', racetrack);
    data.append('events', events);
    data.append('taxi', taxi);

    // Отправляем данные на сервер
    fetch('https://carrent-w2et2.ondigitalocean.app/api/cars/', {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log('Данные успешно отправлены на сервер:', data);
        // Здесь вы можете добавить логику обработки успешной отправки данных
    })
    .catch(error => {
        console.error('Ошибка отправки данных на сервер:', error);
        // Здесь вы можете добавить логику обработки ошибки
    });
});
