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
    var frequency = 0;
    var nextArrival = 0;
    var minutesAway = 0;



    // At the initial load and subsequent value changes, get a snapshot of the stored data.
    // This function allows you to update your page in real-time when the firebase database changes.
    database.ref().on("value", function (snapshot) {
        if (snapshot.child("trainName").exists() && snapshot.child("destination").exists() && snapshot.child("frequency").exists() && snapshot.child("nextArrival").exists() && snapshot.child("minutesAway").exists()) {
            trainName = snapshot.val().trainName;
            destination = snapshot.val().destination;
            frequency = parseInt(snapshot.val().frequency);
            nextArrival = parseInt(snapshot.val().nextArrival);
            minutesAway = parseInt(snapshot.val().minutesAway);
        }
        console.log(trainName);
        console.log(destination);
        console.log(frequency);
        console.log(nextArrival);
        console.log(minutesAway);

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    $("#submit").on("click",function(){
        var newTrainName = $("#bidder-name").val().trim();
        var newDestination = $("#bidder-name").val().trim();
        var newFrequency = parseInt($("#bidder-price").val().trim());
        var newNextArrival = parseInt($("#bidder-price").val().trim());
        var newMinutesAway = parseInt($("#bidder-price").val().trim());
        console.log(newTrainName);
        console.log(newDestination);
        console.log(newFrequency);
        console.log(newNextArrival);
        console.log(newMinutesAway);

    });


};