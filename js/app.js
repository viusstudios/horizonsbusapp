/* ***********************
 * BUS OBJECTS
 * ***********************/

// BUS CONSTRUCTOR

class Bus {
    constructor(busName,busStops,busTimesMonFri,busTimesFriOnly,busTimesSat,busTimesSun) {
        this.busName = busName;
        this.busStops = busStops;
        this.busTimesMonFri = busTimesMonFri;
        this.busTimesFriOnly = busTimesFriOnly;
        this.busTimesSat = busTimesSat;
        this.busTimesSun = busTimesSun;
    }
}

// BUS OBJECTS

var awapuniBus = new Bus('Awapuni',awapuniStops,awapuniTimesMonFri,awapuniTimesFriOnly,awapuniTimesSat,awapuniTimesSun);

var rugbyBus = new Bus('Rugby',rugbyStops,rugbyTimesMonFri,rugbyTimesSat,rugbyTimesSun);

var highburyBus = new Bus('Highbury',highburyStops,highburyTimesMonFri,highburyTimesFriOnly,/* highburyTimesSat,highburyTimesSun (// TODO: Add these upon completion of Highbury weekends) */);

var takaroBus = new Bus('Takaro',takaroStops,takaroTimesMonFri,takaroTimesFriOnly,takaroTimesSat,takaroTimesSun);

var cloverleaBus = new Bus('Cloverlea',cloverleaStops,cloverleaTimesMonFri,cloverleaTimesFriOnly,cloverleaTimesSat,cloverleaTimesSun);

var milsonBus = new Bus('Milson',milsonStops,milsonTimesMonFri,milsonTimesFriOnly,milsonTimesSat,milsonTimesSun);

var rhodesBus = new Bus('Rhodes',rhodesStops,rhodesTimesMonFri/* //TODO: Include rhodesTimesFriOnly*/,rhodesTimesSat,rhodesTimesSun);

var roslynBus = new Bus('Roslyn',roslynStops,roslynTimesMonFri,roslynTimesFriOnly,roslynTimesSat,roslynTimesSun);

var rangioraBus = /* TODO: Include Rangiora Bus Information */null;

var brightwaterBus = new Bus('Brightwater',brightwaterStops,brightwaterTimesMonFri,brightwaterTimesFri,brightwaterTimesSat,brightwaterTimesSun);

var fernleaBus = new Bus('Fernlea',fernleaStops,fernleaTimesMonFri,fernleaTimesFriOnly,fernleaTimesSat/*TODO: Check if Fernlea Bus has Sunday timetable*/);

var heightsBus = new Bus('Heights',heightsStops,heightsTimesMonFri,heightsTimesFriOnly,heightsSat/*TODO: Check if Heights Bus has Sunday timetable*/);

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

// DOMS

var routeSelectionDOM = document.getElementById("routelist");
var originDOM = document.getElementById("originList");
var destinationDOM = document.getElementById("destinationList");
var userValue = "";

function getRoute(val) {

//    for (eval(val.toLowerCase).stops.length)
//    content = ''
//    content += "<option>"+ stops[i] + </option>

    userValue = val.toLowerCase() + "Bus";

    var i = 0;

    var originList = document.getElementById("originList");
    var destinationList = document.getElementById("destinationList");

    var origins = '';
    var destinations = '';

    while (i < eval(userValue).busStops.length) {
        origins += "<option>" + eval(userValue).busStops[i] + "</option>";
        destinations += "<option>" + eval(userValue).busStops[i] + "</option>";
        i++;
    }

    originList.innerHTML = origins;
    originList.remove(8); // removes invalid option (can't depart from Arrive MST)
    destinationList.innerHTML = destinations;
    destinationList.remove(0); // removes invalid option (can't arrive at Depart MST)
}

function checkStops(val) {
    if (originList.value === destinationList.value) {
        alert("You cannot depart and arrive at the same stop.");
    }

    else {
        originIndex = originDOM.selectedIndex;
        destinationIndex = destinationDOM.selectedIndex;
        loadTimes();
    }
}

var originIndex = "";
var destinationIndex = "";

var selectedBus = "";
var dateConverted = "";

function loadTimes(val) {

    if (originList.value === destinationList.value) {
        alert("You cannot depart and arrive at the same stop.");
    }

    else {
        originIndex = originDOM.selectedIndex;
        destinationIndex = destinationDOM.selectedIndex;

        document.getElementById("timeoverlay").style.display = "block";

        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        dateConverted = hours + "." + minutes; // converts date into hh.mm form, to compare with integer values in array

        selectedBus = eval(userValue);

        for(i = 0; i < selectedBus.busTimesMonFri.length; i++) { // loops over array

            var selectedTime = selectedBus.busTimesMonFri[i][originIndex];

            if (dateConverted > selectedTime) {
                console.log(selectedTime.toFixed(2)); // list times until next available bus in array
            }

            else {
                i + 1; // adds one more integer to index, to locate the next available bus from array
                console.log(selectedTime.toFixed(2));
                document.getElementById("nextbusvalue").innerHTML = selectedTime.toFixed(2);

//                if (selectedTime < 12) {
//                    document.getElementById("time1").innerHTML = "AM";
//                }
//
//                else {
//                    document.getElementById("time1").innerHTML = "PM";
//                }

                break;
            }

        }
    }

}
