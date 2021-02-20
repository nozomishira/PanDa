//var array = ['banana', 'apple', 'orange', 'apple'];

var array = ["大変優しい先生でした．",
 "誠実な人柄の先生で好感が持てました", 
 "不愛想で居心地が悪かったです", 
 "診察時間が短く，悩みを相談しきれなかったです"
];

var tmp;
for(let i=0;i<5;i++){
  str = array[i];
  if(str.indexOf("悩み")>-1){
    console.log( i );
  }
}
/*
$(document).ready(function () {
  $("#button").on("click", () => {
    var input_message = document.getElementById("input_message").value;
    console.log( input_message );
  });
});

//var result = array.indexOf( "大変優しい先生でした．" );
 
//console.log( result );

/*
const firebaseConfig = {
  apiKey: "AIzaSyBCcHqzQOdcUq17a9ecaCeNz_k6mtOQwyQ",
  authDomain: "fujitsuhackathon-2498f.firebaseapp.com",
  projectId: "fujitsuhackathon-2498f",
  storageBucket: "fujitsuhackathon-2498f.appspot.com",
  messagingSenderId: "24195856437",
  appId: "1:24195856437:web:5684860ae356a1231b997c",
  measurementId: "G-5BRYYBXDWW",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

$(document).ready(function () {
  $("#button").on("click", () => {
    const lastName = $("#lastName").val();
    db.collection("users")
      .add({
        id: 1,
        firstName: "Yamada",
        lastName: lastName,
        age: 20,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        location.reload();
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  });

  db.collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        $("#users").append(`<li>${data.firstName} ${data.lastName}</li>`);
      });
    });
});
*/