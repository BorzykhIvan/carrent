function get_cars(transmission, fuel, minPrice, maxPrice, taxi, events, racetrack) {
    let queryParams = new URLSearchParams();
    let kwargs = {
        transmission: transmission,
        fuel: fuel,
        price_min: minPrice,
        price_max: maxPrice,
        taxi: taxi,
        events: events,
        racetrack: racetrack
    };
    Object.entries(kwargs).forEach(([key, val]) => {
        if (val) {
            queryParams.append(key, val);
        }
    });
    let url = "https://carrent-w2et2.ondigitalocean.app/api/cars?" + queryParams
    let response = fetch(url, {
        headers: {
            "content-type": "application/json"
        },
    }).then((resp) => resp.json())

    return response
}


