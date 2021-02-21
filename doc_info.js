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

$(document).ready(async function () {
  console.log(location.hash)
  const doctorId = decodeURI(location.hash.slice(1));
  console.log(doctorId);
  const doctorRef = await db.collection("doctor").doc(doctorId).get()
  const doctor = doctorRef.data();
  console.log(doctor);

  $(".name").text(`名前：${doctor.Name}`);
  $(".sex").text(`名前：${doctor.Sex}`);
  $(".age").text(`性別：${doctor.Age}`);
  $(".expert").text(`専門領域：${doctor.Age}`);
  $(".email").text(`メールアドレス：${doctor.Email}`);
  $(".place").text(`都道府県：${doctor.Place}`);
  $(".doctor_age").text(`医師年数：${doctor.Doctor_Age}`);
  $(".illness").text(`病気：${doctor.illness}`);
  $(".web").text(`名前：${doctor.web}`);
  $(".other").text(`その他：${doctor.other}`);

});

// -------------------------------------------------------------------

// jQuery(async function () {


//   let database = [];
//   let data = getParam();

//   let data_doctor = [];

//   const snapShot = await db.collection("doctor").where("Name", "==", data[0]).get()

//   db.collection("doctor")
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         const data1 = doc.data();
//         if (data1.Name === data[0]) {
//           database.push(data1.Name);
//           database.push(data1.Sex);
//           database.push(data1.expert);
//           database.push(data1.Place);
//           database.push(data1.Hospital);
//           database.push(data1.Email);
//           database.push(data1.Doctor_Age);
//           database.push(data1.illness);
//           database.push(data1.Web);
//           database.push(data1.other);
//           ;
//         };
//       });
//     });

//   console.log(data);
//   let comment_data = [];
//   let data_count = 0;
//   const Name = data[0];
//   $(document).ready(function () {
//     db.collection("evaluation").get().then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         if (data.Name == Name) { if (data.comment) { database.push(data.comment); }; }
//       });
//       for (let item of database) {
//         comment_data[data_count] = item;
//         data_count++;
//         if (data_count >= 10)
//           $("#output").append(`<p>${item}</P>`);
//       }
//       target1 = document.getElementById("doc_name");
//     })
//     //$("#output").append(`<li>${database[0].Name}</li>`);
//   })
// })