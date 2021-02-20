function proc(){ //画面遷移と同時に開始
    var query = location.search;
    var value = query.split('=');
    var value1 = decodeURIComponent(value[1]);
    console.log(value[1]);

    //検索画面から来た値を切り分ける
    var comma = ",";
    var val = value1.split(comma);

    //検索画面から来た値一覧
    console.log("医者の名前："+ val[0]);
    console.log("病院名："+ val[1]);}
//     $(document).ready(function () {
//         $("#button1").on("click", () => {
//           let database=[];
//           const Name = $("#Name").val();
//           const atmosphere = Number($("#atmosphere").val());
//           const corresponds = Number($("#corresponds").val());
//           const comprehensibility = Number($("#comprehensibility").val());
//           const effect = Number($("#effect").val());
//           db.collection("doctor").get().then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 const data =doc.data();
//                 //if(data.Name==Name){database.push([data.Name,data.Sex,data.Age,data.expert,data.Place,data.Hospital]);} 
//               if(data.name==Name){database.push[data.Name,data.Sex,data.Age,data.expert,data.Place,data.Hospital,data.Email,data.Doctor_Age,data.illness,data.Web,data.other]}
//             });
                
//             if(database.length==0){window.alert("医者が見つかりませんでした");}else{
//             db.collection("evaluation").add({
//                   Name: database[0][0],
//                   Sex: database[0][1],
//                   Age: database[0][2],
//                   expert: database[0][3],
//                   Place: database[0][4],
//                   Hospital: database[0][5],
//                   Hospital: database[0][5],
//                   Email: database[0][6],
//                   Doctor_Age: database[0][7],
//                   illness: database[0][8],
//                   web: database[0][9],
//                   other: database[0][10],
//                   atmosphere: atmosphere,
//                   corresponds: corresponds,
//                   comprehensibility: comprehensibility,
//                   effect: effect,
//               })
//               .then(function(docRef) {
//                   console.log("Document written with ID: ", docRef.id);
//                   location.reload();
//               })
//               .catch(function(error) {
//                   console.error("Error adding document: ", error);
//               });	}
//         });	
            
//           });
//           db.collection("evaluation")
//           .get()
//           .then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//               const data = doc.data();
//               console.log(data);
//             });
//           });
//       });
// }