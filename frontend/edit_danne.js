function fetchData(authToken) {
    fetch('https://carrent-w2et2.ondigitalocean.app/auth/users/me/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Обновляем данные на странице
            document.getElementById('address').innerHTML = `${data.address.city}, ${data.address.street}, ${data.address.building}, ${data.address.zip_code}` || 'Адрес не указан';
            document.getElementById('phone_number').innerHTML = data.phone_number || 'Номер телефона не указан';
            document.getElementById('pesel').innerHTML = data.pesel || 'Brak pesel';
            document.getElementById('birth_date').innerHTML = data.birth_date || 'Brak daty';
        })
        .catch(error => console.error('Ошибка:', error.message));
}

// Получаем токен
let cookies = document.cookie.split('; ');
let authTokenCookie = cookies.find(cookie => cookie.startsWith('authToken='));
let storedToken = authTokenCookie ? authTokenCookie.split('=')[1] : null;

fetchData(storedToken);


function editContent(elementId) {
    const element = document.getElementById(elementId);

    const starttext = element.innerText;
    // Замените содержимое тега <p> на input для внесения изменений
    element.innerHTML = `<input type="text" id="${elementId}_input" value="${element.innerText}">`;

    // Добавьте обработчик событий для отслеживания нажатия Enter
    const inputElement = document.getElementById(`${elementId}_input`);
    inputElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            // При нажатии Enter сохраните изменения и отправьте запрос на сервер
            const updatedValue = inputElement.value;

            // Обновите содержимое элемента соответственно
            element.innerText = starttext;

            // Отправьте запрос PATCH на сервер с обновленными данными
            sendPatchRequest(elementId, updatedValue);
        }
    });
}

function sendPatchRequest(field, updatedValue) {
    // Получите токен аутентификации
    let cookies = document.cookie.split('; ');
    let authTokenCookie = cookies.find(cookie => cookie.startsWith('authToken='));
    let storedToken = authTokenCookie ? authTokenCookie.split('=')[1] : null;

    // Если поле - адрес, разбейте введенные данные по запятой
    const updatedData = {};
    if (field === 'address') {
        const addressParts = updatedValue.split(',');
        updatedData['address'] = {
            city: addressParts[0].trim(),
            street: addressParts[1].trim(),
            building: addressParts[2].trim(),
            zip_code: addressParts[3].trim()
        };
    } else {
        // В противном случае, обновите поле как есть
        updatedData[field] = updatedValue;
    }
    console.log(JSON.stringify(updatedData));
    // Отправьте PATCH-запрос на сервер
    fetch('https://carrent-w2et2.ondigitalocean.app/auth/users/me/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${storedToken}`
        },
        body: JSON.stringify(updatedData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Данные успешно обновлены:', data);
        })
        .catch(error => console.error('Ошибка при обновлении данных:', error.message));
}