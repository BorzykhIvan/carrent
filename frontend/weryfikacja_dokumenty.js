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
                if (data && data.length > 0) {
                    $('.dokumenty').empty();
                    $('.dokumenty').append(`<h3>Dokumenty</h3>`);
                    // Обновляем контент HTML для каждого электронного адреса в массиве
                    data.forEach(function (item) {
                        var email = item.user.email;

                        // Создаем новый элемент DOM для каждого адреса
                        var emailElement = `<div class="weryfikacja">
                        <p class="email_weryfikacja">${email}</p>
                        <button class="weryfikuj">Weryfikuj</button>
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
