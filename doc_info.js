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
}