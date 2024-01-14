document.addEventListener('DOMContentLoaded', function () {
    
    // Добавляем обработчик событий для клика по кнопке
    const authToken = getCookie('authToken');
    let popupDiv;

    document.addEventListener('click', function (event) {
        // Проверяем, что клик произошел на кнопке с классом 'weryfikuj'
        if (event.target.classList.contains('weryfikuj')) {
            // Получаем информацию о пользователе из атрибута data-user
            var userId = event.target.closest('.weryfikuj').dataset.userId; // Изменение здесь
            // Выполняем AJAX-запрос для получения информации о пользователе по его ID
            $.ajax({
                type: 'GET',
                url: `https://carrent-w2et2.ondigitalocean.app/auth/verify/${userId}/`, // Изменение здесь
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
                success: function (userData) {
                    // Создаем элемент div для всплывающего окна
                    popupDiv = document.createElement('div');
                    popupDiv.className = 'popup';
                    popupDiv.style.display = 'flex';

                    // Формируем HTML-содержимое всплывающего окна
                    let popupContent = `
                        <p>IMIĘ: &nbsp ${userData.user.first_name}</p>
                        <p>NAZWISKO: &nbsp${userData.user.last_name}</p>
                        <p>NUMER TELEFONU: &nbsp ${userData.user.phone_number}</p>
                        <p>ADDRESS: &nbsp${userData.user.address.city}, ${userData.user.address.street} ${userData.user.address.building}, ${userData.user.address.zip_code}</p>
                        <button class="close-weryf"><img class="close_weryf" src="https://fra1.digitaloceanspaces.com/carrentbucket/static/icon%20_cancel.svg"></button>
                        <div id="change-data">
                        
                        `;
                    if (userData.change_data.phone_number) {
                        popupContent += `<p>NUMER TELEFONU:&nbsp${userData.change_data.phone_number}</p>`
                    }
                    if (userData.change_data.address) {
                        popupContent += `<p>ADDRESS: &nbsp${userData.change_data.address.city}, ${userData.change_data.address.street} ${userData.change_data.address.building}, ${userData.change_data.address.zip_code}</p>`
                    }
                    if (userData.change_data.pesel) {
                        popupContent += `<p>PESEL:&nbsp${userData.change_data.pesel}</p>`
                    }
                    if (userData.change_data.birth_date) {
                        popupContent += `<p>DATA URODZENIA:&nbsp${userData.change_data.birth_date}</p>`
                    }
                    popupContent += `</div>
                    <div class="decision">
                    <button id="accept">TAK</button>
                    <button id="decline">NIE</button>
                    </div>
                    `

                    // Добавляем содержимое во всплывающее окно
                    popupDiv.innerHTML = popupContent;

                    // Добавляем div в body
                    document.body.appendChild(popupDiv);

                    let accept = document.getElementById('accept');

                    accept.addEventListener('click', function () {
                        fetch(`https://carrent-w2et2.ondigitalocean.app/auth/verify/${userData.id}/accept/`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${authToken}`
                            },
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                document.body.removeChild(popupDiv);
                            })
                    });

                    let decline = document.getElementById('decline');

                    decline.addEventListener('click', function () {
                        fetch(`https://carrent-w2et2.ondigitalocean.app/auth/verify/${userData.id}/decline/`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${authToken}`
                            },
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                document.body.removeChild(popupDiv);

                            })
                    });
                    // Добавляем обработчик событий для кнопки закрытия
                    const closeButton = popupDiv.querySelector('.close-weryf');
                    closeButton.addEventListener('click', function () {
                        // Закрываем всплывающее окно
                        document.body.removeChild(popupDiv);
                    });
                },
                error: function () {
                    console.error('Ошибка при выполнении запроса');
                }
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const authToken = getCookie('authToken');
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('weryfikuj_bonus')) {
            var bonusId = event.target.closest('.weryfikuj_bonus').dataset.bonusId;
            $.ajax({
                type: 'GET',
                url: `https://carrent-w2et2.ondigitalocean.app/api/bonuses/${bonusId}/`,
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
                success: function (bonusData) {
                    const bonusPopupDiv = document.createElement('div');
                    bonusPopupDiv.className = 'popup';
                    bonusPopupDiv.style.display = 'flex';

                    const bonusPopupContent = `
                        <img class="bonuss_img" src="${bonusData.proof_image_url}" alt="Bonus Proof Image">
                        <p>Imię: ${bonusData.user.first_name}</p>
                        <p>Nazwisko: ${bonusData.user.last_name}</p>
                        <p>Email: ${bonusData.user.email}</p>
                        <button class="close-weryf-bonus"><img class="close_weryf" src="https://fra1.digitaloceanspaces.com/carrentbucket/static/icon%20_cancel.svg"></button>
                        </div>
                        <div class="decision">
                        <button id="acceptt">TAK</button>
                        <button id="declinee">NIE</button>
                         </div>
                        `;


                    bonusPopupDiv.innerHTML = bonusPopupContent;

                    document.body.appendChild(bonusPopupDiv);

                    let accept = document.getElementById('acceptt');

                    accept.addEventListener('click', function () {
                        fetch(`https://carrent-w2et2.ondigitalocean.app/api/bonuses/${bonusId}/accept/`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${authToken}`
                            },
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                document.body.removeChild(bonusPopupDiv);
                            })
                    });

                    let decline = document.getElementById('declinee');

                    decline.addEventListener('click', function () {
                        fetch(`https://carrent-w2et2.ondigitalocean.app/api/bonuses/${bonusId}/decline/`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${authToken}`
                            },
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                document.body.removeChild(bonusPopupDiv);

                            })
                    });

                    const bonusCloseButton = bonusPopupDiv.querySelector('.close-weryf-bonus');
                    bonusCloseButton.addEventListener('click', function () {
                        document.body.removeChild(bonusPopupDiv);
                    });
                },
                error: function () {
                    console.error('Ошибка при выполнении запроса для получения данных о бонусе');
                }
            });
        }
    });
});