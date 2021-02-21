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
  const doctorId = decodeURI(location.hash.slice(1));
  console.log(doctorId);

  const doctorRef = await db.collection("doctor").doc(doctorId).get();
  const doctor = doctorRef.data();
  console.log(doctor);

  $("#button1").on("click", async () => {
    const atmosphere = Number($("#atmosphere").val());
    const corresponds = Number($("#corresponds").val());
    const comprehensibility = Number($("#comprehensibility").val());
    const effect = Number($("#effect").val());
    const comment = $("#comment").val();

    console.log(atmosphere);
    console.log(corresponds);
    console.log(comprehensibility);
    console.log(effect);
    console.log(comment);

    if (!atmosphere | !corresponds | !comprehensibility | !effect | !comment) {
      alert("評価が入力されていません");
      return;
    }

    const data = {
      doctor_id: doctorId,
      Name: doctor.Name,
      Sex: doctor.Sex,
      Age: doctor.Age,
      expert: doctor.expert,
      Place: doctor.Place,
      Hospital: doctor.Hospital,
      Email: doctor.Email,
      Doctor_Age: doctor.Doctor_Age,
      illness: doctor.illness,
      web: doctor.Web,
      other: doctor.other,
      atmosphere: atmosphere,
      corresponds: corresponds,
      comprehensibility: comprehensibility,
      effect: effect,
      comment: comment,
    };

    try {
      const ref = await db.collection("evaluation").add(data);
      console.log("Document written with ID: ", ref.id);
      alert("評価を登録しました");
      location.href = `/doc_info.html#${doctorId}`;
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("エラーが発生しました");
    }
  });
});
