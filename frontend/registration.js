document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    // Получаем данные из формы
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const miasto = document.getElementById("miasto").value;
    const kod = document.getElementById("kod").value;
    const adres = document.getElementById("adres").value;
    const mieszkanie = document.getElementById("mieszkanie").value;
    const numertel = document.getElementById("numertel").value;
    const password = document.getElementById("password").value;
    const passwordrep = document.getElementById("passwordrep").value;

    if (password != passwordrep) {
        return;
    }
    // Создаем объект данных
    const data = {
        first_name: name,
        last_name: surname,
        adres: adres,
        email: email,
        city: miasto,
        postal: kod,
        apartment: mieszkanie,
        phone_number: numertel,
        password: password

    };

    // Отправляем данные на сервер
    fetch('https://carrent-w2et2.ondigitalocean.app/auth/users/', {
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