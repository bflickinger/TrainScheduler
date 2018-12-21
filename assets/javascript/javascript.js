// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDSgbT2Q8vYilTRr-DZHDKV4Ra_Iay5BVM",
    authDomain: "traindb-01.firebaseapp.com",
    databaseURL: "https://traindb-01.firebaseio.com",
    projectId: "traindb-01",
    storageBucket: "",
    messagingSenderId: "663098385943"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();
  
    var newTrain = {
      name: trainName,
      destination: trainDest,
      starttime: trainTime,
      frequency: trainFreq
    };
  
    database.ref().push(newTrain);
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().starttime;
    var trainFreq = childSnapshot.val().frequency;

    console.log("START TIME: " + trainTime);  
    var trainTimeConverted = moment(trainTime,"HH:mm").subtract(1, "years");
    console.log("CONVERTED: " + trainTimeConverted);
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var timeRemainder = diffTime % trainFreq;
    console.log(timeRemainder);
    var minutesTillTrain = trainFreq - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextTrain = moment(nextTrain).format("hh:mm");
    
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(nextTrain),
      $("<td>").text(minutesTillTrain)
    );
  
    $("#train-table > tbody").append(newRow);
  });
  