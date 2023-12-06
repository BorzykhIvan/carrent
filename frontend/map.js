ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [50.668326, 17.933012],
            zoom: 13
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Flota',
            balloonContent: 'Car 1'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'https://fra1.digitaloceanspaces.com/carrentbucket/static/CarMarker.svg',
            // Размеры метки.
            iconImageSize: [30, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38],
            
        }),
        myPieChart = new ymaps.Placemark([
            50.669066, 17.940001
        ], {
            hintContent: 'Flota',
            balloonContent: 'Car 2, '
        },{
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'https://fra1.digitaloceanspaces.com/carrentbucket/static/CarMarker.svg',
            // Размеры метки.
            iconImageSize: [30, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38],
            
        }),
        myPieChart2 = new ymaps.Placemark([
            50.652567, 17.905578
        ], {
            // Зададим содержимое заголовка балуна.
        balloonContentHeader: '<img src="https://fra1.digitaloceanspaces.com/carrentbucket/static/CarMarker.svg" height="40" width="60">   50.652567, 17.905578<br/>MERCEDES MAYBACH</br> OP2565 ',
    // Зададим содержимое основной части балуна.
    balloonContentBody: '<img src="https://fra1.digitaloceanspaces.com/carrentbucket/static/manual-transmission_6500196%201.png" height="20" width="20">AUTOMAT<img src="https://fra1.digitaloceanspaces.com/carrentbucket/static/gas-station.png" height="20" width="20"> PB95',
    // Зададим содержимое нижней части балуна.
    balloonContentFooter: '<div class="submit-button"> <input type="submit" value="ZAREZERWUJ" ></div>',
    
   
    // Зададим содержимое всплывающей подсказки.
    hintContent: 'MERCEDES MAYBACH OP2565'
        },{
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'https://fra1.digitaloceanspaces.com/carrentbucket/static/CarMarker.svg',
            // Размеры метки.
            iconImageSize: [30, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38],
            
        });
            
            
            
        
            

       

    myMap.geoObjects
        .add(myPlacemark)
        .add(myPieChart)
        .add(myPieChart2)
        .add(myPlacemarkWithContent);

        
        
});