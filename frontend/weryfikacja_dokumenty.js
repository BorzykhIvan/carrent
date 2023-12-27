$(document).ready(function () {
    // Функция для получения и обновления адресов электронной почты
    function updateEmails() {
        // Получаем токен авторизации из куки
        var authToken = getCookie('authToken');

        // Выполняем AJAX-запрос с токеном авторизации
        $.ajax({
            type: 'GET',
            url: 'https://carrent-w2et2.ondigitalocean.app/auth/verify/',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`,
            },
            success: function (data) {
                // Проверяем, что есть данные и массив не пуст
                if (data) {
                    $('.dokumenty').empty();
                    $('.dokumenty').append(`<h3>Dokumenty</h3>`);
                    // Обновляем контент HTML для каждого электронного адреса в массиве
                    data.forEach(function (item) {
                        const email = item.user.email;
                        const userId = item.id; // Добавлено получение ID пользователя
                        // Создаем новый элемент DOM для каждого адреса
                        const emailElement = `<div class="weryfikacja">
                        <p class="email_weryfikacja">${email}</p>
                        <button class="weryfikuj" data-user-id="${userId}">Weryfikuj</button>
                        </div>`

                        // Добавляем элемент в контейнер
                        $('.dokumenty').append(emailElement);
                    });
                } else {
                    console.error('Ответ от сервера не содержит данных');
                }
            },
            error: function () {
                console.error('Ошибка при выполнении запроса');
            }
        });
    }

    // Вызываем функцию при загрузке страницы и, например, каждые 5 секунд
    updateEmails(); // Вызываем сразу после загрузки страницы
    setInterval(updateEmails, 5000); // Вызываем каждые 5000 миллисекунд (5 секунд)
});

function updateBonuses() {
    // Получаем токен авторизации из куки
    var authToken = getCookie('authToken');

    // Выполняем AJAX-запрос с токеном авторизации
    $.ajax({
        type: 'GET',
        url: 'https://carrent-w2et2.ondigitalocean.app/api/bonuses/',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`,
        },
        success: function (bonusesData) {
            // Проверяем, что есть данные и массив не пуст
            if (bonusesData) {
                $('.bonuses').empty();
                // Обновляем контент HTML для каждого бонуса в массиве
                bonusesData.forEach(function (bonus) {
                    const bonusType = bonus.bonus_type_id;
                    const userEmail = bonus.user.email;
                    // Создаем новый элемент DOM для каждого бонуса
                    const bonusElement = `<div class="weryfikacja">
                        <p class="nazwa_bonusu">${bonusType}</p>
                        <p class="bonus_weryfikacja">${userEmail}</p>
                        <button class="weryfikuj_bonus" data-bonus-id="${bonus.id}">Weryfikuj</button>
                    </div>`;

                    // Добавляем элемент в контейнер
                    $('.bonuses').append(bonusElement);
                });
            } else {
                console.error('Ответ от сервера не содержит данных о бонусах');
            }
        },
        error: function () {
            console.error('Ошибка при выполнении запроса для получения данных о бонусах');
        }
    });
}

// Вызываем функцию при загрузке страницы и, например, каждые 5 секунд
updateBonuses(); // Вызываем сразу после загрузки страницы
setInterval(updateBonuses, 5000); // Вызываем каждые 5000 миллисекунд (5 секунд)