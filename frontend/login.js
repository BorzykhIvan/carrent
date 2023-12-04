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
    // Отправляем данные на сервер для аутентификации
    fetch('https://carrent-w2et2.ondigitalocean.app/auth/token/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(authData => {
            console.log('Данные успешно отправлены на сервер:', authData);
            const authToken = authData.auth_token;
            document.cookie = `authToken=${authToken}; path=/; SameSite=Strict; Secure`;

            
            if (authToken === undefined) {
                alert("Invalid information");
                return;
                
            } else if (email === "admin@admin.com")  {
                window.location.replace("/adminpage"); 
                
            } else 
            window.location.replace("/kontoklient");


        })
        .catch(error => {
            console.error('Ошибка отправки данных на сервер:', error);
            // Здесь вы можете добавить логику обработки ошибки
        });
});