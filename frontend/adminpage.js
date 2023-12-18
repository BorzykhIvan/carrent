document.addEventListener("DOMContentLoaded", function () {
    var authToken = getCookie('authToken');

    if (authToken === undefined) {
        window.location.replace("/login");
        return;
    }
    fetch('https://carrent-w2et2.ondigitalocean.app/api/order/all/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`,
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error('Ошибка при получении данных заказах');
        }
        return response.json();
    }).then(ordersData => {
        const table = document.getElementById("table_body");
        ordersData.forEach(element => {
            console.log(element);
            let row = table.insertRow();
            let cell1 = row.insertCell();
            cell1.innerHTML = `${element.user.first_name} ${element.user.last_name}`;
            let cell2 = row.insertCell();
            cell2.innerHTML = `${element.car.brand} ${element.car.model}`;
            let cell3 = row.insertCell();
            cell3.innerHTML = `${element.start_date}`;
            let cell4 = row.insertCell();
            cell4.innerHTML = `${element.end_date}`;
            let cell5 = row.insertCell();
            cell5.innerHTML = `${element.amount}`;
        });

    })

    fetch('https://carrent-w2et2.ondigitalocean.app/api/messages/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`,
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error('Ошибка при получении данных заказах');
        }
        return response.json();
    }).then(ordersData => {
        const table = document.getElementById("table_body1");
        console.log(ordersData);
        ordersData.forEach(element => {
            console.log(element);
            let row = table.insertRow();
            let cell1 = row.insertCell();
            cell1.innerHTML = `${element.chat.user.first_name} ${element.chat.user.last_name}`;
            let cell2 = row.insertCell();
            cell2.innerHTML = `<a href="/reply?chat_id=${element.chat.id}">${element.content}</a>`;

        });
    })

});






