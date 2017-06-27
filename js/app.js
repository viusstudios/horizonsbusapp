    function initMap() {
        // LOCATIONS
        var freybergHS = {lat: -40.337483, lng: 175.6254343};
        var theSquare = {lat: -40.356301, lng: 175.611292};

        // MAP
        var palmyNth = new google.maps.Map(document.getElementById('map'), {
            center: freybergHS,
            zoom: 15
        });

        var freybergHSMarker = new google.maps.Marker({
            position: freybergHS,
            map: palmyNth
        });

        var theSquareMarker = new google.maps.Marker({
            position: theSquare,
            map: palmyNth
        })

    }
