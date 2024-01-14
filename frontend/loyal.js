

document.addEventListener("DOMContentLoaded", function() {
    var circles = document.querySelectorAll('.unit');
    var levelText = document.querySelector('.level_text');
    var levelDescriptionText = document.querySelector('.level_text .level_description');
    var additionalDescriptionText = document.querySelector('.level_text .additional_description');
    var datathirdDescriptionText = document.querySelector('.level_text .data-third-description');
    var datalastDescriptionText = document.querySelector('.level_text .data-last-description');

    circles.forEach(function(circle, index) {
        circle.addEventListener('mouseover', function() {
            var level = circles.length - index;
            var description = circle.getAttribute('data-description');
            var additionalDescription = circle.getAttribute('data-additional-description');
            var datathirdDescription = circle.getAttribute('data-third-description');
            var datalastDescription = circle.getAttribute('data-last-description');
            var circleColor = circle.getAttribute('data-color');

            levelText.querySelector('.level').textContent = 'POZIOM ' + level;
            levelDescriptionText.textContent = description;
            additionalDescriptionText.textContent = additionalDescription;
            datathirdDescriptionText.textContent = datathirdDescription;
            datalastDescriptionText.textContent = datalastDescription;
            levelText.style.display = 'flex';
            levelText.style.backgroundColor = circleColor;
        });

        circle.addEventListener('mouseout', function() {
            levelText.style.display = 'none';
        });
    });
});

// Получаем токен из куки
const cookies = document.cookie.split('; ');
const authTokenCookie = cookies.find(cookie => cookie.startsWith('authToken='));
const storedToken = authTokenCookie ? authTokenCookie.split('=')[1] : null;

// Функция для выполнения GET-запроса с токеном
async function fetchDataWithToken() {
    try {
        const response = await fetch('https://carrent-w2et2.ondigitalocean.app/api/referral/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${storedToken}`
            },
        });

        if (!response.ok) {
            throw new Error('Не удалось получить данные из базы.');
        }

        const data = await response.json();

        // Выводим только значение токена на странице
        document.getElementById('copy-target').innerText = data.token;
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('copy-target').innerText = 'Произошла ошибка при получении данных из базы.';
    }
}

// Вызываем функцию при загрузке страницы
fetchDataWithToken();