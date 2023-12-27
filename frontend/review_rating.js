let stars =
    document.getElementsByClassName("star");
let output =
    document.getElementById("output");

// Funtion to update rating 
function gfg(n) {
    remove();
    for (let i = 0; i < n; i++) {
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        stars[i].className = "star " + cls;
    }
    output.innerText = "Rating is: " + n + "/5";
}

// To remove the pre-applied styling 
function remove() {
    let i = 0;
    while (i < 5) {
        stars[i].className = "star";
        i++;
    }
}

function submitReview() {
    // Получение значения комментария
    let comment = document.getElementById("comment").value;

    // Получение значения рейтинга
    let rating = parseInt(output.innerText.split(":")[1].trim());

    // Подготовка данных для отправки на сервер
    let postData = {
        content: comment,
        rating: rating
    };
    const authToken = getCookie('authToken');

    // Отправка данных на сервер с использованием AJAX
    fetch('https://carrent-w2et2.ondigitalocean.app/api/comments/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        // Обработка ответа от сервера, если необходимо
        console.log('Success:', data);

        // После успешной отправки обновим список комментариев
        updateComments();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Функция для обновления списка комментариев
function updateComments() {
    fetch('https://carrent-w2et2.ondigitalocean.app/api/comments/')
        .then(response => response.json())
        .then(data => {
            // Вызываем функцию для отображения обновленного списка комментариев
            displayComments(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Вызываем функцию для получения и отображения комментариев при загрузке страницы
getComments();


function getComments() {
    fetch('https://carrent-w2et2.ondigitalocean.app/api/comments/')
        .then(response => response.json())
        .then(data => {
            // Вызываем функцию для отображения комментариев
            displayComments(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Функция для отображения комментариев на странице
function displayComments(comments) {
    // Получаем элемент, в который будем добавлять комментарии
    let commentList = document.getElementById('commentList');

    // Очищаем содержимое элемента перед добавлением новых комментариев
    commentList.innerHTML = '';

    // Проходим по массиву комментариев и добавляем их на страницу
    comments.forEach(comment => {
        let commentItem = document.createElement('div');
        commentItem.className = 'comment-item';

        // Создаем HTML-разметку для комментария
        commentItem.innerHTML = `
        <div class="opin_main">
            <div class="opin_kom">
            <p>${comment.content}</p>
            </div>
            <div class="opin_kom">
            <p>Ocena: ${comment.rating}/5</p>
            </div>
            <div class="opin_kom">
            <p>${comment.user.first_name} ${comment.user.last_name}</p>
            </div>
        </div>
        `;

        // Добавляем комментарий к списку
        commentList.insertBefore(commentItem, commentList.firstChild);
    });
}

// Вызываем функцию для получения и отображения комментариев при загрузке страницы
getComments();