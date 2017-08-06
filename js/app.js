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

function loadTimes(val) {

    if (originList.value === destinationList.value) {
        alert("You cannot depart and arrive at the same stop.");
    }

    else {
        originIndex = originDOM.selectedIndex;
        destinationIndex = destinationDOM.selectedIndex + 1; // add one, because one array element is spliced out due to invalidity (see lines 97 and 99)

        date = new Date();
        hours = date.getHours();
        minutes = date.getMinutes();
        dateConverted = hours + "." + minutes; // converts date into hh.mm form, to compare with integer values in array

        day = 5;

        selectedBus = eval(userValue).busTimesMonFri;

        // THE BELOW HAS BEEN COMMENTED OUT, BECAUSE SOME BUS OBJECTS DO NOT HAVE DATA FOR BUS TIMES FRIDAY, SATURDAY AND SUNDAY. HOWEVER, THE CODE HAS BEEN TESTED, AND WILL WORK IF DATA FOR FRIDAY, SATURDAY AND SUNDAY IS PROVIDED.


        /* if (day === 5) {
            selectedBus = eval(userValue).busTimesFriOnly;
        }

        else if (day === 6) {
            selectedBus = eval(uservalue).busTimesSat;
        }

        else if (day === 0) {
            selectedBus = eval(userValue).busTimesSun;
        }

        else {
            selectedBus = eval(userValue).busTimesMonFri;
        }*/

        for(i = 0; i < selectedBus.length; i++) { // loops over array

            selectedTime = selectedBus[i][originIndex];
            destinationTime = selectedBus[i][destinationIndex];

            if (i === selectedBus.length-1) {
                alert("No buses available for today.");
                break;
            }



            else if (dateConverted > selectedTime) {
                console.log("Origin Time: " + selectedTime.toFixed(2));
                console.log("Destination Time: " + destinationTime.toFixed(2)); // list times until next available bus in array
                console.log(i);
            }

//            else  if (i === selectedBus.busTimesMonFri.length) {
//
//            }

            else {
                originIndex + 1;
                destinationIndex+1;
                // adds one more integer to originIndex and destinationIndex, to locate the next available bus from array

                document.getElementById("nextbusvalue").innerHTML = selectedTime.toFixed(2);
                document.getElementById("arrivaltimevalue").innerHTML = destinationTime.toFixed(2);

                document.getElementById("timeoverlay").style.display = "block";

                break;
            }

        }
    }

}
