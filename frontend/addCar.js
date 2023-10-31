document.getElementById("carForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    // Получаем данные из формы
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;
    const transmission_type = document.getElementById("transmission_type").value;
    const fuel_type = document.getElementById("fuel_type").value;
    const day_price = parseFloat(document.getElementById("day_price").value); // Преобразуем в число

    // Создаем объект данных
    const data = {
        brand: brand,
        model: model,
        transmission_type: transmission_type,
        fuel_type: fuel_type,
        day_price: day_price
    };

    // Отправляем данные на сервер
    fetch('https://carrent-w2et2.ondigitalocean.app//api/car/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
