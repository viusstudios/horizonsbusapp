var routeSelectionDOM = document.getElementById("routelist"); // for HTML to interact with DOM

// GET ROUTE FUNCTION

function getRoute(val) {

    userValue = val.toLowerCase() + "Bus"; // forms bus object name in the correct format

    var originList = document.getElementById("originList");
    var destinationList = document.getElementById("destinationList");

    var origins = '';
    var destinations = '';

    // loop to generate required set of options in the 'origin' and 'destination' menus

    for (i=0; i < eval(userValue).busStops.length; i++) {
        origins += "<option>" + eval(userValue).busStops[i] + "</option>";
        destinations += "<option>" + eval(userValue).busStops[i] + "</option>";
    }

    originList.innerHTML = origins;
    originList.remove(8); // removes invalid option (can't depart from Arrive MST)
    destinationList.innerHTML = destinations;
    destinationList.remove(0); // removes invalid option (can't arrive at Depart MST)
}

var originIndex = "";
var originValue = "";
var destinationIndex = "";
var destinationValue = "";

function loadTimes(val) {

    // Checks for duplicate stops

    if (originList.value === destinationList.value) {
        alert("You cannot depart and arrive at the same stop.");
    }

    // Checks if origin point is set to a value after the selected destination point

    else if (originList.selectedIndex > destinationList.selectedIndex) {
        alert("You cannot depart from a later stop than the destination.");
    }

    else {
        originIndex = originList.selectedIndex;
        originValue = originList.value;
        destinationIndex = destinationList.selectedIndex + 1; // add one, because one array element is spliced out due to invalidity (see lines 23 and 25)
        destinationValue = destinationList.value;

        date = new Date();
        hours = date.getHours();
        minutes = date.getMinutes();
        dateConverted = hours + "." + minutes; // converts date into hh.mm form, to compare with integer values in array

        selectedBus = eval(userValue).busTimesMonFri;

        // THE BELOW HAS BEEN COMMENTED OUT, BECAUSE SOME BUS OBJECTS DO NOT HAVE DATA FOR BUS TIMES FRIDAY, SATURDAY AND SUNDAY. HOWEVER, THE CODE HAS BEEN TESTED, AND WILL WORK IF DATA FOR FRIDAY, SATURDAY AND SUNDAY IS PROVIDED (see bus-stops-and-times-final.js).

        /* day = date.getDay();

        if (day === 5) {
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

            // loop through array

            if (dateConverted > selectedTime) {
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
                document.getElementById("arrivaltimevalue").innerHTML = destinationTime.toFixed(2); // prints time as HH.MM, as a string rather than an integer.

                document.getElementById("timeoverlay").style.display = "block"; // triggers overlay

                break;
            }
        }

        // if loop has been executed fully and no available buses have been found

        if (i === selectedBus.length) {
            alert("No buses available for today.");
        }
    }
}

// function to display all times for origin and destination stops

var timeOverlay = document.getElementById("timeoverlay");
var allTimes = document.getElementById("alltimes");

function viewAllTimes() {

    timeOverlay.style.display = "none";
    allTimes.style.display = "block";

    timeContentOrigin = "<h4 id='originHeading'>" + originValue + "</h4>";
    timeContentDestination = "<h4 id='originHeading'>" + destinationValue + "</h4>"; //this changes titles of time lists according to origin and destination options in originList & destinationList

    // loop compiles list of times underneath each heading

    for(var x = 0; x < selectedBus.length; x++) {
        timeContentOrigin += '<li>' + selectedBus[x][originIndex].toFixed(2) + '</li>';
        timeContentDestination += '<li>' + selectedBus[x][destinationIndex].toFixed(2) + '</li>';
    }

    // loads data into DOM

    document.getElementById("timelist1").innerHTML = timeContentOrigin;
    document.getElementById("timelist2").innerHTML = timeContentDestination;

}

// function to exit overlay with next bus info

function exitOverlay() {
    timeOverlay.style.display = "none";
}

// function to exit overlay with all times info

function exitTimeList() {
    allTimes.style.display = "none";
    timeOverlay.style.display = "block";
}

// function to exit new routes page completely

function backtomenu_onclick() {
    window.location.href = "index.html";
}
