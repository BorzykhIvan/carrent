document.addEventListener("DOMContentLoaded", function () {
    let authToken = getCookie("authToken");

    fetch("https://carrent-w2et2.ondigitalocean.app/api/order/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        },
    }).then(response => response.json()).then(ordersData => {
        let orderCarousel = document.getElementById("carousel-content");
        ordersData.forEach(order => {
            orderCarousel.innerHTML += `<div class="item">
            <div class="slide-content">
              <div class="model_klient">${order.car.brand} ${order.car.model}</div>
              <div class="date">${order.start_date} - ${order.end_date}</div>
              <div class="status">
                <div class="status-box green"></div>
                <div class="status-box red">${order.amount}</div>
              </div>
            </div>
          </div>`
        });
    })
});
