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
  var query = location.search;
  var value = query.split("=");
  var value1 = decodeURIComponent(value[1]);
  console.log(value1);

  //検索画面から来た値を切り分ける
  var comma = ",";
  var val = value1.split(comma);

  //検索画面から来た値一覧
  console.log("医者の名前：" + val[0]);
  console.log("病院名：" + val[1]);
  console.log("性別：" + val[2]);
  console.log("年齢：" + val[3]);
  console.log("医師勤務年数：" + val[4]);
  console.log("専門の診療分野：" + val[5]);
  console.log("勤務地：" + val[6]);
  console.log("コメント：" + val[7]);
  console.log("ハッシュタグ：" + val[8]);
  console.log("重視したい点：" + val[9]);

  let expert = val[5];
  let Name = val[0];
  let hospital = val[1];
  let sex = val[2];
  let age = val[3];
  let Place = val[6];
  let comment = val[8];

  const querySnapshot = await db.collection("evaluation").get();
  const evaluations = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  console.log(evaluations);

  console.log(expert);
  console.log(sex);
  console.log(Name);
  console.log(hospital);
  console.log(Place);
  console.log(comment);

  const filteredEvaluations = evaluations
    .map((x) => ({
      ...x,
      score: x.atmosphere * 2 + x.corresponds + x.comprehensibility + x.effect,
    }))
    .map((x, _, arr) => {
      const scores = arr.filter((y) => y.Name === x.Name).map((x) => x.score);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      return {
        ...x,
        avgScore,
      };
    })
    .filter((x) => (expert ? x.expert === expert : true))
    .filter((x) => (sex ? x.Sex === sex : true))
    .filter((x) => (age ? 10 * age <= x.Age && x.Age < 10 * (age + 1) : true))
    .filter((x) => (Name ? x.Name === Name : true))
    .filter((x) => (hospital ? x.Hospital === hospital : true))
    .filter((x) => (Place ? x.Place === Place : true))
    .filter((x) => (comment ? x.comment === comment : true))
    .filter((x, i, self) => self.findIndex((y) => x.Name === y.Name) === i)
    .sort((a, b) => (a.avgScore > b.avgScore ? 1 : -1));

  console.log(filteredEvaluations);

  filteredEvaluations.forEach((x, i) => {
    $("#doctor_list").append(`
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${x.Name}</td>
        <td>${x.Hospital}</td>
        <td>${x.expert}</td>
        <td>
          <a value="0" id="button" type="button" class="btn btn-primary" href="/evaluation.html#${
            x.doctor_id
          }">診察評価</a>
        </td>
        <td>
          <a value="0" id="button" type="button" class="btn btn-primary" href="/doc_info.html#${
            x.doctor_id
          }">医師情報</a>
        </td>
      </tr>
    `);
  });

  filteredEvaluations.forEach((x, i) => {
    $("#doc_list").append(`
                <div id="doc_item">
                    <div class="num">${i + 1}</div>
                    <div class="bottom">
                      <p>${x.Name}</p>
                      <p>${x.Hospital}</p>
                      <p>${x.expert}</p>
                </div>
                <div class="btn1">
                    <a value="0" id="button" type="button" class="btn btn-primary" href="/evaluation.html">診察予約</a>
                    <a value="0" id="button" type="button" class="btn btn-primary" href="/evaluation.html#${
                      x.doctor_id
                    }">診察評価</a>
                    <a value="0" id="button" type="button" class="btn btn-primary" href="/doc_info.html#${
                      x.doctor_id
                    }">医師情報</a>
                </div>
            </div>
            `);
  });
});
