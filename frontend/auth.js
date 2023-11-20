document.addEventListener("DOMContentLoaded", function() {
    // Проверяем, авторизован ли пользователь
    var authToken = getCookie('authToken');
    if (authToken) {
      // Получаем имя пользователя (здесь предполагается, что имя пользователя также сохранено в куках)
      
    // Отправляем данные на сервер для аутентификации
    fetch('https://carrent-w2et2.ondigitalocean.app/auth/users/me/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`,
        },
        
    })
        .then(response => response.json())
        .then(authData => {
            let username = authData.email;
            console.log(username);
            if (username) {
                // Заменяем изображение на имя пользователя
                var loginLink = document.getElementById('loginLink');
                loginLink.innerHTML = '<a href="/kontoklient">' + username + '</a>';
              }
        })
        .catch(error => {
            console.error('Ошибка отправки данных на сервер:', error);
            // Здесь вы можете добавить логику обработки ошибки
        });
      
    }
  });
  
  // Функция для получения значения куки по имени
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }
  