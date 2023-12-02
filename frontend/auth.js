document.addEventListener("DOMContentLoaded", function() {
  // Проверяем, авторизован ли пользователь
  var authToken = getCookie('authToken');
  if (authToken) {
      // Отправляем запрос на сервер для получения данных о пользователе
      fetch('https://carrent-w2et2.ondigitalocean.app/auth/users/me/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${authToken}`,
          },
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Ошибка при получении данных о пользователе');
          }
          return response.json();
      })
      .then(authData => {
          let username = authData.email;
          let isAdmin = authData.is_staff;

          if (username) {
              // Заменяем изображение на имя пользователя
              var loginLink = document.getElementById('loginLink');
              loginLink.innerHTML = '<a href="/kontoklient">' + username + '</a>';
          }

          // Получаем элементы, которые нужно скрыть/показать
          const addBtn = document.querySelector('.addbutton');
          const editBtn = document.querySelector('.editbutton');

          // Проверяем статус пользователя и скрываем/показываем элементы
          if (isAdmin) {
              addBtn.style.display = 'flex';
              editBtn.style.display = 'flex';
          } else {
              addBtn.style.display = 'none';
              editBtn.style.display = 'none';
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
