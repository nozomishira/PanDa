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
    var value = query.split('=');
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

    let database = [];
    let output = [];
    let expert = val[5];//data1[1];
    let important = val[9];//data1[2];
    let Name = val[0];//data1[3];
    let hospital = val[1];//data1[4]; 
    let sex = val[2];//data1[5];
    let age = val[3];//Number(data1[6]);
    let Place = val[6];//data1[7];
    let comment = val[8];//data1[8];

    const querySnapshot = await db.collection("evaluation").get();
    const evaluations = querySnapshot.docs.map((doc) => doc.data());

    console.log(evaluations);

    console.log(expert);
    console.log(sex);
    console.log(Name);
    console.log(hospital);
    console.log(Place);
    console.log(comment);

    const filteredEvaluations = evaluations
        .map(x => ({
            ...x,
            score: (x.atmosphere * 2) + x.corresponds + x.comprehensibility + x.effect
        }))
        .map((x, i, arr) => {
            const scores = arr.filter(y => y.Name === x.Name).map(x => x.score);
            const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
            return ({
                ...x,
                avgScore,
            });
        })
        .filter(x => x.expert === expert)
        .filter(x => sex ? x.Sex === sex : true)
        .filter(x => age ? ((10 * age <= x.Age) && (x.Age < 10 * (age + 1))) : true)
        .filter(x => Name ? x.Name === Name : true)
        .filter(x => hospital ? x.Hospital === hospital : true)
        .filter(x => Place ? x.Place === Place : true)
        .filter(x => comment ? x.comment === comment : true)
        .filter(
            (x, i, self) =>
                self.findIndex(y => x.Name === y.Name) === i
        )
        .sort((a, b) => a.avgScore > b.avgScore ? 1 : -1);

    console.log(filteredEvaluations);

    filteredEvaluations.forEach((x, i) => {
        $('#doc_list').append(`
                <div id="doc_item">
                    <div class="num">${i + 1}</div>
                    <div class="bottom">
                    <p id="doc_name">${x.Name}</p>
                    <p id="hos_name">${x.Hospital}</p>
                    <p id="exp_name">${x.expert}</p>
                </div>
                <div class="btn1">
                    <button value="0" id="button" type="button" class="btnbtn-primary" onclick="onClick1(value)">診察予約</button>
                    <button value="0" id="button" type="button" class="btnbtn-primary" onclick="onClick2(value)">診察評価</button>
                    <a value="0" id="button" type="button" class="btn btn-primary" href="/doc_info.html#${x.doctor_id}">医師情報</a>
                </div>
            </div>
            `);
    });

    function onClick1(val) {//診察予約ページに移動
        console.log("val=" + val);
        //ソート済みデータを取得
        //var doc_data = getDocData();
        var access = doc_data[val][3];
        window.open("evaluation.html", '_blank');
        //window.location.href = access;
    }

    function onClick2(val) {//医者評価ページに移動
        //console.log(val)
        //var all = doc_data[val][0] + ","+ doc_data[val][1];//医者の名前と病院名
        console.log("val=" + val);
        // 要素への参照を取得
        var content_area = document.getElementById("content_area" + val);
        var p_element = content_area.querySelectorAll("p");
        // コンソールにテキストを表示
        console.log(p_element);

        var doc_name = content_area.querySelectorAll("p")[7].innerText;//医師名
        var hos_name = content_area.querySelectorAll("p")[8].innerText;//病院名

        console.log(doc_name);
        console.log(hos_name);

        var all = doc_name + "," + hos_name;
        //window.open("evaluation.html", '_blank');
        location.href = '/evaluation.html?name=' + encodeURIComponent(all);
    }

});
