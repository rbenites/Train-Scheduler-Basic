/*jshint esversion: 6 */
window.onload = function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCBj7DNiTvM3MxbIkQ7NplJqnGpchOmMZ8",
        authDomain: "train-schedule-basic.firebaseapp.com",
        databaseURL: "https://train-schedule-basic.firebaseio.com",
        projectId: "train-schedule-basic",
        storageBucket: "train-schedule-basic.appspot.com",
        messagingSenderId: "341557802283"
    };
    firebase.initializeApp(config);
    // Create a variable to reference the database
    var database = firebase.database();

    //global values
    var trainName = "";
    var destination = "";
    var time = "";
    var frequency = 0;
    var nextArrival = 0;
    var minutesAway = 0;

    function newTrain(name, destination, frequency, time) {
        var newRow = $('<tr>');
        var newTrainName = $("<td>").text(name);
        var newDestination = $("<td>").text(destination);
        var newTime = $("<td>").text(time);
        var newFrequency = $("<td>").text(frequency);

        newRow.append(newTrainName);
        newRow.append(newDestination);
        newRow.append(newFrequency);
        newRow.append(newTime);

        $("#newTrains").append(newRow);
    }

    $("#submit").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var destination = $("#destinationName").val().trim();
        var time = parseInt($("#trainArrivalTime").val().trim());
        var frequency = parseInt($("#frequencyTime").val().trim());


        //code for handling the push
        database.ref().push({
            trainName: trainName,
            destination: destination,
            time: time,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        console.log("New train: " + trainName);
        console.log("New destination: " + destination);
        console.log("New Frequency: " + frequency);
        console.log("New Next Arrival: " + nextArrival);
        console.log("New minutes away: " + minutesAway);
    });

    // At the initial load and subsequent value changes, get a snapshot of the stored data.
    // This function allows you to update your page in real-time when the firebase database changes.

    database.ref().on("child_added", function (childSnapshot) {
        //if (snapshot.child("trainName").exists() && snapshot.child("destination").exists() && snapshot.child("frequency").exists() && snapshot.child("nextArrival").exists() && snapshot.child("minutesAway").exists()) {
        var dbTrainName = childSnapshot.val().trainName;
        var dbDestination = childSnapshot.val().destination;
        var dbTime = childSnapshot.val().time;
        var dbFrequency = childSnapshot.val().frequency;
 

    newTrain(dbTrainName, dbDestination, dbFrequency, dbTime);

    console.log("train name: " + trainName);
    console.log("destination: " + destination);
    console.log("Frequency: " + frequency);
    console.log("Arrival: " + nextArrival);
    console.log("Minutes away: " + minutesAway);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});


    /*
        // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    */

};