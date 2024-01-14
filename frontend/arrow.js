document.addEventListener('DOMContentLoaded', function () {
    const arrow = document.getElementById('arrow');
    let loyaltyLevel; // Переменная loyaltyLevel объявлена на уровне верхнего блока

    // Устанавливаем начальный угол поворота стрелки
    arrow.style.transformOrigin = 'right'; // Устанавливаем точку вращения в левый конец стрелки
    arrow.style.transform = 'rotate(0deg)'; // Изменено начальное положение на 0 градусов
    const angles = [20, 56, 92, 128, 164, 200];

    // Функция установки угла поворота стрелки в зависимости от уровня лояльности
    function setArrowRotation(level) {
        const angle = angles[level] || 0;
        arrow.style.transform = `rotate(${angle}deg)`;
    }

    // Задаем параметры анимации для стрелки
    const animationParams = {
        fromAngle: 0,
        toAngle: 255,
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
            // Запускаем анимацию возврата в положение level
            setArrowRotation(loyaltyLevel);
            // Обновляем параметры анимации для возврата
            animationParams.fromAngle = animationParams.toAngle;
            animationParams.toAngle = angles[loyaltyLevel] || 0;
            animationParams.startTime = Date.now();
            // Запускаем анимацию возврата
            animateReturn();
        }
    }

    // Функция анимации возврата стрелки в положение level
    function animateReturn() {
        const currentTime = Date.now();
        const progress = (currentTime - animationParams.startTime) / animationParams.duration;

        if (progress < 1) {
            // Продолжаем анимацию возврата, если не достигнут конечный угол
            const currentAngle = animationParams.fromAngle + (animationParams.toAngle - animationParams.fromAngle) * progress;
            arrow.style.transform = `rotate(${currentAngle}deg)`;
            requestAnimationFrame(animateReturn);
        } else {
            // Анимация возврата завершена
            arrow.style.transform = `rotate(${animationParams.toAngle}deg)`;
        }
    }
    // Запрос к серверу для получения данных
    fetch('https://carrent-w2et2.ondigitalocean.app/auth/users/me/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Token ${storedToken}`
        },
    })
    .then(response => response.json())
    .then(data => {
        // Получаем значение уровня лояльности из ответа сервера
        loyaltyLevel = data.loyalty_level ? data.loyalty_level.level : 0;

        arrow.style.transform = 'rotate(180deg)';

        // Запускаем анимацию после установки угла
        animateArrow();
    })
    .catch(error => console.error('Error fetching data:', error));
});
