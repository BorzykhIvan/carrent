function chooseFile(bonusTypeId) {
    document.getElementById(`fileInput${bonusTypeId}`).click();
}

document.getElementById('fileInput1').addEventListener('change', function(event) {
    handleFileInputChange(event, 1);
});

document.getElementById('fileInput2').addEventListener('change', function(event) {
    handleFileInputChange(event, 2);
});

function handleFileInputChange(event, bonusTypeId) {
    let file = event.target.files[0];
    const authToken = getCookie('authToken');

    if (file) {
        // Создаем объект FormData
        let formData = new FormData();

        // Добавляем изображение и bonus_type_id в FormData
        formData.append('bonus_type_id', bonusTypeId);
        formData.append('proof_image', file);

        // Создаем объект XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Настраиваем запрос
        xhr.open('POST', 'https://carrent-w2et2.ondigitalocean.app/api/bonuses/', true);

        xhr.setRequestHeader('Authorization', `Token ${authToken}`);

        // Обработка события загрузки
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Success:', xhr.responseText);
                alert('Zdjecie wyslane.');
            } else {
                console.error('Error:', xhr.status);
                alert('Bląd.');
            }
        };

        // Отправляем запрос на сервер с FormData
        xhr.send(formData);
    } else {
        alert('Выберите файл изображения.');
    }
}
