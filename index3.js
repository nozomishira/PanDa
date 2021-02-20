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
    const Name = $("#Name").val();
    const Sex = $("#Sex").val();
    const Age = $("#Age").val();
    const expert = $("#expert").val();
    const Email = $("#Email").val();
    const Place = $("#Place").val();
    const Doctor_Age = $("#Doctor_Age").val();
    const illness = $("#illness").val();
    const Hospital = $("#Hospital").val();
    const Web =$("#Web").val();
    const other = $("#other").val();
    if(Name&&Sex&&Age&&expert&&Email&&Place
        &&Doctor_Age&&illness&&Hospital){
    if(window.confirm("この内容で登録しますか？")){
    db.collection("doctor")
      .add({
        Name: Name,
        Sex: Sex,
        Age: Age,
        expert: expert,
        Email: Email,
        Place: Place,
        Doctor_Age:Doctor_Age,
        illness:illness,
        Hospital:Hospital,
        Web:Web,
        other:other
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        location.reload();
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    }else{;}
    }else{window.alert("全て入力してください");}
  });

  db.collection("doctor")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
      });
    });
});
