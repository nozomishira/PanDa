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
  console.log(location.hash);
  const doctorId = decodeURI(location.hash.slice(1));
  console.log(doctorId);
  const doctorRef = await db.collection("doctor").doc(doctorId).get();
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

  console.log(doctorId);

  const querySnapshot = await db
    .collection("evaluation")
    .where("doctor_id", "==", doctorId)
    .get();

  const evaluations = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  console.log(evaluations);

  evaluations.forEach((x) => {
    $(".comment").append(`<li class="list-group-item">${x.comment}</li>`);
  });
});
