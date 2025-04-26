# CarRent System

![CarRent Screenshot](screenshot.jpg)

## Funkcje główne
- Przegląd dostępnych samochodów
- System rezerwacji terminów
- Panel administracyjny (CRUD pojazdów)
- Zarządzanie klientami
- Historia wypożyczeń

## Wymagania techniczne
- PHP 7.4+
- MySQL 5.7+
- Apache/Nginx

## Instalacja
1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/BorzykhIvan/carrent.git
   ```
2. Importuj bazę danych z pliku `database/carrent.sql`
3. Skonfiguruj połączenie w `includes/config.php`

## Struktura projektu
- `/admin` - Panel administracyjny
- `/assets` - CSS/JS/obrazy
- `/includes` - Logika systemu
- `/sql` - Skrypty bazy danych

## Licencja
MIT
