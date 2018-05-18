// Initialize Firebase
var config = {
    apiKey: "AIzaSyB_A3J3kNscpdgV8udMECqjQOjrQe-8-XQ",
    authDomain: "idea-rai.firebaseapp.com",
    databaseURL: "https://idea-rai.firebaseio.com",
    projectId: "idea-rai",
    storageBucket: "idea-rai.appspot.com",
    messagingSenderId: "969840500645"
};
firebase.initializeApp(config);
var firebaseIdeasRef = firebase.database().ref().child('ideas');

var addButton = document.getElementById('add-button');
addButton.addEventListener('click',function(){
    var ideaInput = document.getElementById('idea-input');
    var idea = ideaInput.value;
    ideaInput.value='';

    firebaseIdeasRef.push().set(idea);
});

firebaseIdeasRef.on("child_added", function(snapshot) {
  var idea = snapshot.val();
  addIdea(idea, snapshot.key);
});

firebaseIdeasRef.on("child_removed", function(snapshot) {
  document.getElementById(snapshot.key).remove();
});

function addIdea(idea, key) {
  var newIdeaElement =document.createElement('p');
  newIdeaElement.textContent = idea;
  newIdeaElement.id = key;
  document.getElementById('ideas').appendChild(newIdeaElement);

  newIdeaElement.addEventListener('click', function(){
    var ideaRef = firebaseIdeasRef.child(this.id);
    ideaRef.remove();
  });
}