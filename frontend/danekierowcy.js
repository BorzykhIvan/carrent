function getUserInfo() {
    // Pobierz token z ciasteczka
    let cookies = document.cookie.split('; ');
    let authTokenCookie = cookies.find(cookie => cookie.startsWith('authToken='));
    let storedToken = authTokenCookie ? authTokenCookie.split('=')[1] : null;

    fetch('https://carrent-w2et2.ondigitalocean.app/auth/users/me/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${storedToken}`
        },
    })
        .then(response => response.json())
        .then(userData => {
            const loggedInUser = userData;

            // Zaktualizuj treść elementów HTML danymi użytkownika
            const firstNameElement = document.querySelector('.first_name');
            const emailElement = document.querySelector('.email');

            if (firstNameElement) {
                firstNameElement.textContent = `${loggedInUser.first_name} ${loggedInUser.last_name}`;
            }

            if (emailElement) {
                emailElement.textContent = loggedInUser.email;
            }
        })
        .catch(error => {
            console.error('Błąd podczas pobierania danych o użytkowniku:', error);
            // Tutaj możesz dodać logikę obsługi błędu
        });
}

// Wywołaj funkcję, aby uzyskać informacje o użytkowniku
getUserInfo();