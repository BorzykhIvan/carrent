document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    // Получаем данные из формы
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    // Создаем объект данных
    const data = {
        email: email,
        password: password,

    };

    // Отправляем данные на сервер
    fetch('https://carrent-w2et2.ondigitalocean.app/auth/login/', {
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
