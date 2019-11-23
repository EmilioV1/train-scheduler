// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBxvO1hsYj-flOXCxjn3AljHzDDod-vgMU",
  authDomain: "train-scheduler-e8080.firebaseapp.com",
  databaseURL: "https://train-scheduler-e8080.firebaseio.com",
  projectId: "train-scheduler-e8080",
  storageBucket: "train-scheduler-e8080.appspot.com",
  messagingSenderId: "848339193631",
  appId: "1:848339193631:web:53c3b3ae6e6ad3ba366a2a"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var trainData = firebase.database();
console.log("firebase connected!");

$("#addTrainBtn").on("click", function(){
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
  var frequency = $("#frequencyInput").val().trim();
  
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  }

  trainData.ref().push(newTrain);

  alert("Train Added!");

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  return false;
});

trainData.ref().on("child_added", function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes, "m").format("hh:mm A");

  console.log(remainder);
  console.log(minutes);
  console.log(arrival);

  $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
  console.log("I have been appended!");
});