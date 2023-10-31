function checkSessionIDCookie() {
    var sessionIDCookie = getCookie('csrftoken');
    var resultElement = document.getElementById('result');
    var loginButton = document.getElementById('loginButton');

    if (sessionIDCookie) {
        resultElement.innerHTML = 'Cookie sessionid найден. Пользователь авторизован.';

        // Заменяем кнопку на картинку
        loginButton.innerHTML = '<img src="img/Vector.svg">';
    } else {
        resultElement.innerHTML = 'Cookie sessionid не найден. Пользователь не авторизован.';
    }
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}