var doc_data;

var A = 0;

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




function proc(){ //画面遷移と同時に開始
    var query = location.search;
    var value = query.split('=');
    var value1 = decodeURIComponent(value[1]);
    console.log(value1);

    //検索画面から来た値を切り分ける
    var comma = ",";
    var val = value1.split(comma);

    //検索画面から来た値一覧
    console.log("医者の名前："+ val[0]);
    console.log("病院名："+ val[1]);
    console.log("性別："+ val[2]);
    console.log("年齢："+ val[3]);
    console.log("医師勤務年数："+ val[4]);
    console.log("専門の診療分野："+ val[5]);
    console.log("勤務地："+ val[6]);
    console.log("コメント："+ val[7]);
    console.log("ハッシュタグ："+ val[8]);
    console.log("重視したい点："+ val[9]);

    
    

    // -------------------------------------------------------------------
    jQuery(function()
    {
    A=10;
    console.log("A="+A);
    //const data1 = getParam();
    console.log("val="+val);
        let database=[];
        let output=[];
        let expert = val[5];//data1[1];
        let important = val[9];//data1[2];
        let Name = val[0];//data1[3];
        let hospital = val[1];//data1[4]; 
        let sex = val[2] ;//data1[5];
        let age = val[3] ;//Number(data1[6]);
        let Place = val[6] ;//data1[7];
        let comment = val[8] ;//data1[8];

        
        db.collection("evaluation").get().then((querySnapshot) => {
            const evaluations = querySnapshot.docs.map((doc) => doc.data());
            console.log(evaluations);
            if(important==1){
                const filteredEvaluations = evaluations
                .map(x => ({
                    ...x,
                    score: (x.atmosphere * 2) + x.corresponds + x.comprehensibility + x.effect
                }))
                .map((x, i, arr) => {
                    const scores = arr.filter(y => y.Name === x.Name).map(x => x.score);
                    const avgScore= scores.reduce((a, b) => a + b, 0) / scores.length;
                    return ({
                        ...x,
                        avgScore,
                    });
                })
                .filter(x => x.expert === expert)
                .filter(x => sex ? x.Sex === sex : true)
                // .filter(x => age ? ((10*age<= Number(x.Age))&&(Number(x.Age)< 10* (age+1))) : true)
                .filter(x => age ? (( 10 * age <= x.Age ) &&( x.Age < 10 * ( age + 1 ) )) : true)
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
                console.log(filteredEvaluations.length);
                console.log(filteredEvaluations[0].Name);
                    

                console.log("important==1");

                var document_data = [[]];

                for(let i=0 ; i<filteredEvaluations.length;i++){
                    document_data.push(filteredEvaluations[i].Name,
                        filteredEvaluations[i].Hospital,filteredEvaluations[i].expert);
                }
                
                console.log(document_data);
                console.log(document_data[1]);


            
                    //最も評価が高いデータを最初に入れる
                    target1 = document.getElementById("doc_name");
                    target2 = document.getElementById("hos_name");
                    target3 = document.getElementById("exp_name");
                    target1.innerText=document_data[1];
                    target2.innerText=document_data[2];
                    target3.innerText=document_data[3];
            
                    for(let i = filteredEvaluations.length-1; i > 0; i--){
                    // 複製するHTML要素を取得
                        var content_area = document.getElementById("content_area0");
            
                        // 複製
                        var clone_element = content_area.cloneNode(true);
            
            
                        // 複製した要素の属性を編集
                        clone_element.id = "content_area"+i;
                        console.log(clone_element.id);
                        clone_element.querySelectorAll("p")[0].innerText=i+1;
                        clone_element.querySelectorAll("p")[7].innerText=document_data[i*3+1];
                        clone_element.querySelectorAll("p")[8].innerText=document_data[i*3+2];
                        clone_element.querySelectorAll("p")[9].innerText=document_data[i*3+3];
                        console.log(clone_element.querySelectorAll("p")[7].innerText);
                        console.log(clone_element.querySelectorAll("p")[8].innerText);
                        console.log(clone_element.querySelectorAll("p")[9].innerText);
            
            
                        //console.log(clone_element.querySelectorAll("button"));
                        clone_element.querySelectorAll("button")[0].value=i;
                        clone_element.querySelectorAll("button")[1].value=i;
                        clone_element.querySelectorAll("button")[2].value=i;
            
                        // 複製したHTML要素をページに挿入
                        content_area.after(clone_element);
            
            
            
                    }


                

               
                for(let l of filteredEvaluations){
                    $("#output").append(`<li>${l.Name}${l.Sex}${l.Age}${l.expert}${l.Email}${l.Place}${l.Doctor_Age}${l.illness}${l.Hospital}${l.web}${l.other}
                    <button id="button5" type="button" >評価</button><button id="button6" type="button" >詳細</button></li>`);
                  
                 }
              

            ;}
            if(important==2){
                const filteredEvaluations = evaluations
                .map(x => ({
                    ...x,
                    score: (x.atmosphere * 2) + x.corresponds + x.comprehensibility + x.effect
                }))
                .map((x, i, arr) => {
                    const scores = arr.filter(y => y.Name === x.Name).map(x => x.score);
                    const avgScore= scores.reduce((a, b) => a + b, 0) / scores.length;
                    return ({
                        ...x,
                        avgScore,
                    });
                })
                .filter(x => x.expert === expert)
                .filter(x => sex ? x.Sex === sex : true)
                // .filter(x => age ? ((10*age<= Number(x.Age))&&(Number(x.Age)< 10* (age+1))) : true)
                .filter(x => age ? (( 10 * age <= x.Age ) &&( x.Age < 10 * ( age + 1 ) )) : true)
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
                console.log("important==2");

                var document_data = [[]];

                for(let i=0 ; i<filteredEvaluations.length;i++){
                    document_data.push(filteredEvaluations[i].Name,
                        filteredEvaluations[i].Hospital,filteredEvaluations[i].expert);
                }
                
                console.log(document_data);
                console.log(document_data[1]);


            
                    //最も評価が高いデータを最初に入れる
                    target1 = document.getElementById("doc_name");
                    target2 = document.getElementById("hos_name");
                    target3 = document.getElementById("exp_name");
                    target1.innerText=document_data[1];
                    target2.innerText=document_data[2];
                    target3.innerText=document_data[3];
            
                    for(let i = filteredEvaluations.length-1; i > 0; i--){
                    // 複製するHTML要素を取得
                        var content_area = document.getElementById("content_area0");
            
                        // 複製
                        var clone_element = content_area.cloneNode(true);
            
            
                        // 複製した要素の属性を編集
                        clone_element.id = "content_area"+i;
                        console.log(clone_element.id);
                        clone_element.querySelectorAll("p")[0].innerText=i+1;
                        clone_element.querySelectorAll("p")[7].innerText=document_data[i*3+1];
                        clone_element.querySelectorAll("p")[8].innerText=document_data[i*3+2];
                        clone_element.querySelectorAll("p")[9].innerText=document_data[i*3+3];
                        console.log(clone_element.querySelectorAll("p")[7].innerText);
                        console.log(clone_element.querySelectorAll("p")[8].innerText);
                        console.log(clone_element.querySelectorAll("p")[9].innerText);
            
            
                        //console.log(clone_element.querySelectorAll("button"));
                        clone_element.querySelectorAll("button")[0].value=i;
                        clone_element.querySelectorAll("button")[1].value=i;
                        clone_element.querySelectorAll("button")[2].value=i;
            
                        // 複製したHTML要素をページに挿入
                        content_area.after(clone_element);
            
            
            
                    }




               
                for(let l of filteredEvaluations){
                    $("#output").append(`<li>${l.Name}${l.Sex}${l.Age}${l.expert}${l.Email}${l.Place}${l.Doctor_Age}${l.illness}${l.Hospital}${l.web}${l.other}
                    <button id="button5" type="button" >評価</button><button id="button6" type="button" >詳細</button></li>`);
                }


            ;}
                
            if(important==3){
                const filteredEvaluations = evaluations
                .map(x => ({
                    ...x,
                    score: (x.atmosphere * 2) + x.corresponds + x.comprehensibility + x.effect
                }))
                .map((x, i, arr) => {
                    const scores = arr.filter(y => y.Name === x.Name).map(x => x.score);
                    const avgScore= scores.reduce((a, b) => a + b, 0) / scores.length;
                    return ({
                        ...x,
                        avgScore,
                    });
                })
                .filter(x => x.expert === expert)
                .filter(x => sex ? x.Sex === sex : true)
                // .filter(x => age ? ((10*age<= Number(x.Age))&&(Number(x.Age)< 10* (age+1))) : true)
                .filter(x => age ? (( 10 * age <= x.Age ) &&( x.Age < 10 * ( age + 1 ) )) : true)
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


                document_data = filteredEvaluations;
                console.log("important==3");

                var document_data = [[]];

                for(let i=0 ; i<filteredEvaluations.length;i++){
                    document_data.push(filteredEvaluations[i].Name,
                        filteredEvaluations[i].Hospital,filteredEvaluations[i].expert);
                }
                
                console.log(document_data);
                console.log(document_data[1]);


            
                    //最も評価が高いデータを最初に入れる
                    target1 = document.getElementById("doc_name");
                    target2 = document.getElementById("hos_name");
                    target3 = document.getElementById("exp_name");
                    target1.innerText=document_data[1];
                    target2.innerText=document_data[2];
                    target3.innerText=document_data[3];
            
                    for(let i = filteredEvaluations.length-1; i > 0; i--){
                    // 複製するHTML要素を取得
                        var content_area = document.getElementById("content_area0");
            
                        // 複製
                        var clone_element = content_area.cloneNode(true);
            
            
                        // 複製した要素の属性を編集
                        clone_element.id = "content_area"+i;
                        console.log(clone_element.id);
                        clone_element.querySelectorAll("p")[0].innerText=i+1;
                        clone_element.querySelectorAll("p")[7].innerText=document_data[i*3+1];
                        clone_element.querySelectorAll("p")[8].innerText=document_data[i*3+2];
                        clone_element.querySelectorAll("p")[9].innerText=document_data[i*3+3];
                        console.log(clone_element.querySelectorAll("p")[7].innerText);
                        console.log(clone_element.querySelectorAll("p")[8].innerText);
                        console.log(clone_element.querySelectorAll("p")[9].innerText);
            
            
                        //console.log(clone_element.querySelectorAll("button"));
                        clone_element.querySelectorAll("button")[0].value=i;
                        clone_element.querySelectorAll("button")[1].value=i;
                        clone_element.querySelectorAll("button")[2].value=i;
            
                        // 複製したHTML要素をページに挿入
                        content_area.after(clone_element);
            
            
            
                    }


                
                for(let l of filteredEvaluations){
                    $("#output").append(`<li>${l.Name}${l.Sex}${l.Age}${l.expert}${l.Email}${l.Place}${l.Doctor_Age}${l.illness}${l.Hospital}${l.web}${l.other}
                    <button id="button5" type="button" >評価</button><button id="button6" type="button" >詳細</button></li>`);
                }

            ;}
            
             if(important==4){
                const filteredEvaluations = evaluations
                .map(x => ({
                    ...x,
                    score: (x.atmosphere * 2) + x.corresponds + x.comprehensibility + x.effect
                }))
                .map((x, i, arr) => {
                    const scores = arr.filter(y => y.Name === x.Name).map(x => x.score);
                    const avgScore= scores.reduce((a, b) => a + b, 0) / scores.length;
                    return ({
                        ...x,
                        avgScore,
                    });
                })
                .filter(x => x.expert === expert)
                .filter(x => sex ? x.Sex === sex : true)
                // .filter(x => age ? ((10*age<= Number(x.Age))&&(Number(x.Age)< 10* (age+1))) : true)
                .filter(x => age ? (( 10 * age <= x.Age ) &&( x.Age < 10 * ( age + 1 ) )) : true)
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

                console.log("important==4");

                var document_data = [[]];

                for(let i=0 ; i<filteredEvaluations.length;i++){
                    document_data.push(filteredEvaluations[i].Name,
                        filteredEvaluations[i].Hospital,filteredEvaluations[i].expert);
                }
                
                console.log(document_data);
                console.log(document_data[1]);


            
                    //最も評価が高いデータを最初に入れる
                    target1 = document.getElementById("doc_name");
                    target2 = document.getElementById("hos_name");
                    target3 = document.getElementById("exp_name");
                    target1.innerText=document_data[1];
                    target2.innerText=document_data[2];
                    target3.innerText=document_data[3];
            
                    for(let i = filteredEvaluations.length-1; i > 0; i--){
                    // 複製するHTML要素を取得
                        var content_area = document.getElementById("content_area0");
            
                        // 複製
                        var clone_element = content_area.cloneNode(true);
            
            
                        // 複製した要素の属性を編集
                        clone_element.id = "content_area"+i;
                        console.log(clone_element.id);
                        clone_element.querySelectorAll("p")[0].innerText=i+1;
                        clone_element.querySelectorAll("p")[7].innerText=document_data[i*3+1];
                        clone_element.querySelectorAll("p")[8].innerText=document_data[i*3+2];
                        clone_element.querySelectorAll("p")[9].innerText=document_data[i*3+3];
                        console.log(clone_element.querySelectorAll("p")[7].innerText);
                        console.log(clone_element.querySelectorAll("p")[8].innerText);
                        console.log(clone_element.querySelectorAll("p")[9].innerText);
            
            
                        //console.log(clone_element.querySelectorAll("button"));
                        clone_element.querySelectorAll("button")[0].value=i;
                        clone_element.querySelectorAll("button")[1].value=i;
                        clone_element.querySelectorAll("button")[2].value=i;
            
                        // 複製したHTML要素をページに挿入
                        content_area.after(clone_element);
            
            
            
                    }

               
                for(let l of filteredEvaluations){
                    $("#output").append(`<li>${l.Name}${l.Sex}${l.Age}${l.expert}${l.Email}${l.Place}${l.Doctor_Age}${l.illness}${l.Hospital}${l.web}${l.other}
                    <button id="button5" type="button" >評価</button><button id="button6" type="button" >詳細</button></li>`);
                  
                }
                
                
       
            ;}

            


            console.log("filteredEvaluations="+document_data); 
            
        });






        




        
        //a+=1;
    //}else{
        //window.alert("選択を解除してください")
        //;}
/*
        //ソート済みのデータを取得 0番目の要素が最も評価が高い
        doc_data=[
        ["山田太郎","富士通1病院","内科","https://www.yahoo.co.jp/"],
        ["山田次郎","富士通2病院","外科","https://shopping.yahoo.co.jp/?sc_e=ytc"],
        ["山田三郎","富士通3病院","泌尿器科","https://weather.yahoo.co.jp/weather/"],
        ["山田四郎","富士通4病院","精神科","https://transit.yahoo.co.jp/"],
        ["山田五郎","富士通5病院","美容系","https://news.yahoo.co.jp/"],
        ["山田太郎","富士通1病院","内科","https://www.yahoo.co.jp/"],
        ["山田次郎","富士通2病院","外科","https://shopping.yahoo.co.jp/?sc_e=ytc"],
        ["山田三郎","富士通3病院","泌尿器科","https://weather.yahoo.co.jp/weather/"],
        ["山田四郎","富士通4病院","精神科","https://transit.yahoo.co.jp/"],
        ["山田五郎","富士通5病院","美容系","https://news.yahoo.co.jp/"]
        ]


        //最も評価が高いデータを最初に入れる
        target1 = document.getElementById("doc_name");
        target2 = document.getElementById("hos_name");
        target3 = document.getElementById("exp_name");
        target1.innerText=doc_data[0][0];
        target2.innerText=doc_data[0][1];
        target3.innerText=doc_data[0][2];

        for(let i = 10-1; i > 0; i--){
        // 複製するHTML要素を取得
            var content_area = document.getElementById("content_area0");

            // 複製
            var clone_element = content_area.cloneNode(true);


            // 複製した要素の属性を編集
            clone_element.id = "content_area"+i;
            console.log(clone_element.id);
            clone_element.querySelectorAll("p")[0].innerText=i+1;
            clone_element.querySelectorAll("p")[7].innerText=doc_data[i][0];
            clone_element.querySelectorAll("p")[8].innerText=doc_data[i][1];
            clone_element.querySelectorAll("p")[9].innerText=doc_data[i][2];
            console.log(clone_element.querySelectorAll("p")[7].innerText);
            console.log(clone_element.querySelectorAll("p")[8].innerText);
            console.log(clone_element.querySelectorAll("p")[9].innerText);


            //console.log(clone_element.querySelectorAll("button"));
            clone_element.querySelectorAll("button")[0].value=i;
            clone_element.querySelectorAll("button")[1].value=i;
            clone_element.querySelectorAll("button")[2].value=i;

            // 複製したHTML要素をページに挿入
            content_area.after(clone_element);



        }



        */







        
    })
    
    //console.log("A="+A);
    //console.log("document_data"+document_data);
   
  
    
    



/*

    //ソート済みのデータを取得 0番目の要素が最も評価が高い
    doc_data=[
        ["山田太郎","富士通1病院","内科","https://www.yahoo.co.jp/"],
        ["山田次郎","富士通2病院","外科","https://shopping.yahoo.co.jp/?sc_e=ytc"],
        ["山田三郎","富士通3病院","泌尿器科","https://weather.yahoo.co.jp/weather/"],
        ["山田四郎","富士通4病院","精神科","https://transit.yahoo.co.jp/"],
        ["山田五郎","富士通5病院","美容系","https://news.yahoo.co.jp/"],
        ["山田太郎","富士通1病院","内科","https://www.yahoo.co.jp/"],
        ["山田次郎","富士通2病院","外科","https://shopping.yahoo.co.jp/?sc_e=ytc"],
        ["山田三郎","富士通3病院","泌尿器科","https://weather.yahoo.co.jp/weather/"],
        ["山田四郎","富士通4病院","精神科","https://transit.yahoo.co.jp/"],
        ["山田五郎","富士通5病院","美容系","https://news.yahoo.co.jp/"]
        ]


    //最も評価が高いデータを最初に入れる
    target1 = document.getElementById("doc_name");
    target2 = document.getElementById("hos_name");
    target3 = document.getElementById("exp_name");
    target1.innerText=doc_data[0][0];
    target2.innerText=doc_data[0][1];
    target3.innerText=doc_data[0][2];

    for(let i = 10-1; i > 0; i--){
    // 複製するHTML要素を取得
        var content_area = document.getElementById("rslt");

        // 複製
        var clone_element = content_area.cloneNode(true);


        // 複製した要素の属性を編集
        clone_element.id = "content_area";
        clone_element.querySelectorAll("p")[0].innerText=i+1;
        clone_element.querySelectorAll("p")[7].innerText=doc_data[i][0];
        clone_element.querySelectorAll("p")[8].innerText=doc_data[i][1];
        clone_element.querySelectorAll("p")[9].innerText=doc_data[i][2];
        console.log(clone_element.querySelectorAll("p")[7].innerText);
        console.log(clone_element.querySelectorAll("p")[8].innerText);
        console.log(clone_element.querySelectorAll("p")[9].innerText);


        //console.log(clone_element.querySelectorAll("button"));
        clone_element.querySelectorAll("button")[0].value=i;
        clone_element.querySelectorAll("button")[1].value=i;
        clone_element.querySelectorAll("button")[2].value=i;

        // 複製したHTML要素をページに挿入
        content_area.after(clone_element);

    }

    /*

    textList = document.getElementById("content_area"),
    foo03 = textList.querySelector('.doc_name');

    console.log(clone_element.id);
    console.log(foo03);
    // 複製した要素の子孫要素を編集
    var h2_element = clone_element.querySelector("doc_name");
    h2_element.textContent = '複製';

    var h2_element = clone_element.querySelector("hos_name");
    h2_element.textContent = '複製';

    */
    // 複製したHTML要素をページに挿入
    //content_area.after(clone_element);
        
}


function onClick1(val){//診察予約ページに移動
    console.log("val="+val);
    //ソート済みデータを取得
    //var doc_data = getDocData();
    var access = doc_data[val][3];


   
    window.open("evaluation.html", '_blank');
    //window.location.href = access;
}

function onClick2(val){//医者評価ページに移動
    //console.log(val)
    //var all = doc_data[val][0] + ","+ doc_data[val][1];//医者の名前と病院名
    console.log("val="+val);
     // 要素への参照を取得
     var content_area = document.getElementById("content_area"+val);
     var p_element = content_area.querySelectorAll("p");
     // コンソールにテキストを表示
     console.log(p_element);
 
     var doc_name = content_area.querySelectorAll("p")[7].innerText;//医師名
     var hos_name = content_area.querySelectorAll("p")[8].innerText;//病院名
 
     console.log(doc_name);
     console.log(hos_name);

     var all = doc_name + ","+ hos_name;


    //window.open("evaluation.html", '_blank');

    location.href = '/evaluation.html?name=' +  encodeURIComponent(all);
}

function onClick3(val){//医者情報ページに移動
    //var all = doc_data[val][0] + ","+ doc_data[val][1];//医者の名前と病院名

    console.log("val="+val);
    // 要素への参照を取得
    var content_area = document.getElementById("content_area"+val);
    var p_element = content_area.querySelectorAll("p");
    // コンソールにテキストを表示
    console.log(p_element);

    var doc_name = content_area.querySelectorAll("p")[7].innerText;//医師名
    var hos_name = content_area.querySelectorAll("p")[8].innerText;//病院名

    console.log(doc_name);
    console.log(hos_name);

    var all = doc_name + ","+ hos_name;


   //window.open("evaluation.html", '_blank');




    location.href = '/doc_info.html?name=' +  encodeURIComponent(all);
}

function setter(tmp){
    document_data = tmp;


}


