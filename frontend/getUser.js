function getUser(token) {
    return fetch('https://carrent-w2et2.ondigitalocean.app/auth/users/me/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    })
        .then(response => response.json())
        .then(userData => {
            return userData;
        })
        .catch(error => {
            console.error('Błąd podczas pobierania danych o użytkowniku:', error);
            // Tutaj możesz dodać logikę obsługi błędu
        });
}