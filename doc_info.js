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

function getParam() {
    var url = location.href
    parameters = url.split("?")
    params = parameters[1].split("&")
    var paramsArray = []
    for (it = 0; it < params.length; it++) {
        neet = params[it].split("=")
        paramsArray.push(decodeURIComponent(neet[1]));
        paramsArray.push(decodeURIComponent(neet[2]));
        //paramsArray.push(decodeURIComponent(neet[2]));
        //paramsArray.push(decodeURIComponent(neet[3]));
        // paramsArray.push(decodeURIComponent(neet[4]));
        // paramsArray.push(decodeURIComponent(neet[5]));
        // paramsArray.push(decodeURIComponent(neet[6]));
        // paramsArray.push(decodeURIComponent(neet[7]));
        // paramsArray.push(decodeURIComponent(neet[8]));
        // paramsArray.push(decodeURIComponent(neet[9]));
        // paramsArray.push(decodeURIComponent(neet[10]));
        // paramsArray.push(decodeURIComponent(neet[11]));
    }
    return paramsArray
}

// -------------------------------------------------------------------

jQuery(function () {


    let database = [];
    let data = getParam();

    // const snapshot = await firestore
    // .collection('doctor')
    // .where('Name','=',data[0])
    // .select('Age', 'Doctor_Age','Email','Hospital',
    //          'Name','Place','Sex','Web',"expert","illness","other")
    // .get();
    // const doc = snapshot.docs[0];
    // const data_field = doc.data();
    // console.dir(data_fiald);
    let data_doctor = [];
    db.collection("doctor")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data1 = doc.data();
                if (data1.Name === data[0]) {
                    database.push(data1.Name);
                    database.push(data1.Sex);
                    database.push(data1.expert);
                    database.push(data1.Place);
                    database.push(data1.Hospital);
                    database.push(data1.Email);
                    database.push(data1.Doctor_Age);
                    database.push(data1.illness);
                    database.push(data1.Web);
                    database.push(data1.other);
                    ;
                };
            });
        });

    console.log(database);
    //console.log(data2);
    // let field_name;
    // let view_Data=[];
    // let null_data=[];
    // let null_data_count=0;
    //let visible_item_count=0;
    // for(let i = 0;i<data.length;i++){
    //     if(data[i]=="undefined"||data[i]==" "){
    //          data[i]="";
    //          //view_Data.push(data[i]);
    //       }else{
    //        // visible_item_count++;
    //         view_Data.push(data[i]);
    //       }
    // }
    // let data_doc_count=0;
    // for(let item of database){
    //     data_doctor[data_doc_count]=item;
    //     data_doc_count++;
    // }
    console.log("database" + database);
    //if(data_doctor[0]){
    $("#output2").append(`
      <p>名前：${database[0]}</p>
      `);
    //}
    //if(database[1]){
    //console.log("True");
    $("#output2").append(`
    <p>性別：${database[1]}</p>
    `);
    //}
    if (database[2]) {
        //console.log("True");
        $("#output2").append(`
    <p>年齢：${database[2]}</p>
    `);
    }
    if (database[3]) {
        $("#output2").append(`
    <p>専門領域：${database[3]}</p>
    `);
    }
    if (database[4]) {
        $("#output2").append(`
    <p>メールアドレス：${database[4]}</p>
    `);
    }
    if (database[5]) {
        $("#output2").append(`
    <p>都道府県：${database[5]}</p>
    `);
    }

    if (database[6]) {
        $("#output2").append(`
    <p>医師年数：${database[6]}</p>
    `);
    }
    if (database[7]) {
        $("#output2").append(`
    <p>担当病気：${database[7]}</p>
    `);
        conmouseleave.log(true);
    }
    if (database[8]) {
        $("#output2").append(`
    <p>病院名：${database[8]}</p>
    `);
        console.log(true);
    }
    if (database[9]) {
        $("#output2").append(`
    <p>その他一言：${database[9]}</p>
    `);
        console.log(true);
    }

    // $("#output2").append(`
    //   <p><li>${data[0]}</li></p>
    //   <p><li>${data[1]}</li></p>
    //   <p><li>${data[2]+"歳"}</li></p>
    //   <p><li>${data[3]}</li></p>
    //   <p><li>${data[4]}</li></p>
    //   <p><li>${data[5]}</li></p>
    //   <p><li>${data[6]}</li></p>
    //   <p><li>${data[7]}</li></p>
    //   <p><li>${data[8]}</li></p>
    //   <p><li>${data[9]}</li></p>
    //   <p><li>${data[10]}</li></p>`);

    console.log(data);
    let comment_data = [];
    let data_count = 0;
    const Name = data[0];
    $(document).ready(function () {
        db.collection("evaluation").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.Name == Name) { if (data.comment) { database.push(data.comment); }; }
            });
            for (let item of database) {
                comment_data[data_count] = item;
                data_count++;
                if (data_count >= 10)
                    $("#output").append(`<p>${item}</P>`);
            }
            target1 = document.getElementById("doc_name");

        })
        //$("#output").append(`<li>${database[0].Name}</li>`);
    })
})





// //最も評価が高いデータを最初に入れる
// target1 = document.getElementById("doc_name");
// target2 = document.getElementById("hos_name");
// target3 = document.getElementById("exp_name");
// target1.innerText=doc_data[0][0];
// target2.innerText=doc_data[0][1];
// target3.innerText=doc_data[0][2];
// for(let i = doc_data.length-1; i > 0; i--){
// // 複製するHTML要素を取得
//     var content_area = document.getElementById("rslt");
//     // 複製
//     var clone_element = content_area.cloneNode(true);
//     // 複製した要素の属性を編集
//     clone_element.id = "content_area";
//     clone_element.querySelectorAll("p")[0].innerText=i+1;
//     clone_element.querySelectorAll("p")[7].innerText=doc_data[i][0];
//     clone_element.querySelectorAll("p")[8].innerText=doc_data[i][1];
//     clone_element.querySelectorAll("p")[9].innerText=doc_data[i][2];
//     console.log(clone_element.querySelectorAll("p")[7].innerText);
//     console.log(clone_element.querySelectorAll("p")[8].innerText);
//     console.log(clone_element.querySelectorAll("p")[9].innerText);
//     //console.log(clone_element.querySelectorAll("button"));
//     clone_element.querySelectorAll("button")[0].value=i;
//     clone_element.querySelectorAll("button")[1].value=i;
//     clone_element.querySelectorAll("button")[2].value=i;
//     // 複製したHTML要素をページに挿入
//     content_area.after(clone_element);