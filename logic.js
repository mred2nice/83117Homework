
var config = {
    apiKey: "AIzaSyCZLIMP5mzDasDRFqgWhRRuH2MYgDw7xjc",
    authDomain: "homework-7f64b.firebaseapp.com",
    databaseURL: "https://homework-7f64b.firebaseio.com",
    projectId: "homework-7f64b",
    storageBucket: "",
    messagingSenderId: "832997652405"
}

firebase.initializeApp(config);
var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  //***********
  // User input
  //***********
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainStart = $("#start-input").val().trim();
  var trainFreq = $("#freq-input").val().trim();
  //**********************************
  // Convert before saving to firebase
  //**********************************
  trainStart = moment(trainStart, 'HH:mm').format('hh:mm');
  //********************
  //Object for new Train
  //********************
  var newTrain = {
    train: trainName,
    dest: trainDest,
    start: trainStart,
    freq: trainFreq
  };
  //***************************
  // Send new Train to firebase
  //***************************
  database.ref().push(newTrain);
  //*****************************
  // Clears all of the text-boxes
  //*****************************
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#freq-input").val("");
});
  //**********
  // Add train
  //**********
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  //******************************
  // Put train info into variables
  //******************************
  var trainName = childSnapshot.val().train;
  var trainDest = childSnapshot.val().dest;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().freq;
  //***********************
  // Calculate Next Arrival
  //***********************
  trainStart = moment(trainStart, "hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(trainStart), "minutes");
  var tRemainder = diffTime % trainFreq;
  var trainMinsAway = trainFreq - tRemainder;
  var trainNextArr = moment().add(trainMinsAway, "minutes");
  trainNextArr = moment(trainNextArr).format("hh:mm A");
  //*************************************
  // Add each train's data into the table
  //*************************************
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + trainNextArr
  + "</td><td>" + trainMinsAway + "</td></tr>");
});