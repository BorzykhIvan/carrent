function chooseFile() {
    document.getElementById('fileInput').click();
}

document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    const authToken = getCookie('authToken');

    if (file) {
        // Создаем объект FormData
        var formData = new FormData();

        // Добавляем изображение и bonus_type_id в FormData
        formData.append('bonus_type_id', 1);
        formData.append('proof_image', file);

        // Создаем объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // Настраиваем запрос
        xhr.open('POST', 'https://carrent-w2et2.ondigitalocean.app/api/bonuses/', true);

        xhr.setRequestHeader('Authorization', `Token ${authToken}`);

        // Обработка события загрузки
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Success:', xhr.responseText);
                alert('Изображение успешно отправлено на сервер.');
            } else {
                console.error('Error:', xhr.status);
                alert('Произошла ошибка при отправке изображения на сервер.');
            }
        };

        // Отправляем запрос на сервер с FormData
        xhr.send(formData);
    } else {
        alert('Выберите файл изображения.');
    }
});



function chooseFile() {
    document.getElementById('fileInputt').click();
}

document.getElementById('fileInputt').addEventListener('change', function (event) {
    var file = event.target.files[0];
    const authToken = getCookie('authToken');

    if (file) {
        // Изменяем значение bonus_type_id на 2
        var bonusTypeId = 2;

        // Создаем объект FormData
        var formData = new FormData();

        // Добавляем изображение и bonus_type_id в FormData
        formData.append('bonus_type_id', bonusTypeId);
        formData.append('proof_image', file);

        // Создаем объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // Настраиваем запрос
        xhr.open('POST', 'https://carrent-w2et2.ondigitalocean.app/api/bonuses/', true);

        xhr.setRequestHeader('Authorization', `Token ${authToken}`);

        // Обработка события загрузки
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Success:', xhr.responseText);
                alert('Изображение успешно отправлено на сервер.');
            } else {
                console.error('Error:', xhr.status);
                alert('Произошла ошибка при отправке изображения на сервер.');
            }
        };

        // Отправляем запрос на сервер с FormData
        xhr.send(formData);
    } else {
        alert('Выберите файл изображения.');
    }
});