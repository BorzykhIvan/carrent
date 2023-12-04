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
            hintContent: 'Flota',
            balloonContent: 'Car 3 '
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