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
var originValue = "";
var destinationIndex = "";
var destinationValue = "";

function loadTimes(val) {

    if (originList.value === destinationList.value) {
        alert("You cannot depart and arrive at the same stop.");
    }

    else {
        originIndex = originDOM.selectedIndex;
        originValue = originDOM.value;
        destinationIndex = destinationDOM.selectedIndex + 1; // add one, because one array element is spliced out due to invalidity (see lines 97 and 99)
        destinationValue = destinationDOM.value;

        date = new Date();
        hours = date.getHours();
        minutes = date.getMinutes();
        dateConverted = 12.00; // converts date into hh.mm form, to compare with integer values in array

        day = date.getDay();

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

function viewAllTimes() {

    document.getElementById("timeoverlay").style.display = "none";
    document.getElementById("alltimes").style.display = "block";

    timeContentOrigin = "<h4 id='originHeading'>" + originValue + "</h4>";
    timeContentDestination = "<h4 id='originHeading'>" + destinationValue + "</h4>";

    for(var x = 0; x < selectedBus.length; x++) {
        timeContentOrigin += '<li>' + selectedBus[x][originIndex].toFixed(2) + '</li>';
        timeContentDestination += '<li>' + selectedBus[x][destinationIndex].toFixed(2) + '</li>';
    }

    document.getElementById("timelist1").innerHTML = timeContentOrigin;
    document.getElementById("timelist2").innerHTML = timeContentDestination;

}

function exitOverlay() {
    document.getElementById("timeoverlay").style.display = "none";
}

function exitTimeList() {
    document.getElementById("alltimes").style.display = "none";
    document.getElementById("timeoverlay").style.display = "block";
}
