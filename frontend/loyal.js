document.addEventListener('DOMContentLoaded', function () {
    const arrow = document.getElementById('arrow');
    
    // Устанавливаем начальный угол поворота стрелки
    arrow.style.transformOrigin = 'right'; // Устанавливаем точку вращения в левый конец стрелки
    arrow.style.transform = 'rotate(180deg)';
    
    // Задаем параметры анимации для стрелки
    const animationParams = {
        fromAngle: 0,
        toAngle: 180,
        duration: 2000, // Продолжительность анимации в миллисекундах (в данном случае 2 секунды)
        startTime: Date.now(),
    };

    // Функция анимации стрелки
    function animateArrow() {
        const currentTime = Date.now();
        const progress = (currentTime - animationParams.startTime) / animationParams.duration;

        if (progress < 1) {
            // Продолжаем анимацию, если не достигнут конечный угол
            const currentAngle = animationParams.fromAngle + (animationParams.toAngle - animationParams.fromAngle) * progress;
            arrow.style.transform = `rotate(${currentAngle}deg)`;
            requestAnimationFrame(animateArrow);
        } else {
            // Анимация завершена
            arrow.style.transform = `rotate(${animationParams.toAngle}deg)`;
        }
    }

    // Запускаем анимацию при загрузке страницы
    animateArrow();
});


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

  // Функция для отправки POST-запроса
  function sendPostRequest() {
    // Создаем объект с данными для отправки
    var data = {
        "token": "string"
    };

    // Преобразуем объект в JSON строку
    var jsonData = JSON.stringify(data);

    // Отправляем POST-запрос с использованием Fetch API
    fetch('https://carrent-w2et2.ondigitalocean.app/api/referral/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': '6ZCxr7RZbpZkreMr40aThSr9CNDORR8EEDgbXly51iZFd4mHbPhpdwmsY6L5P4om'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        // Выводим результат на странице
        document.getElementById('result').innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = 'Произошла ошибка при отправке POST-запроса.';
    });
}

// Вызываем функцию при загрузке страницы
sendPostRequest();