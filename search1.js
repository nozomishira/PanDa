function onButtonClick() {
    //target1 = document.getElementById("output");
    //target1.innerText = document.forms.id_form1.id_textBox1.value;
    //target2 = document.getElementById("input_message").value;
    //var input_message = document.forms.id_form2.id_textBox2.value;
    //console.log(target1.innerText);
    //location.href = `/result.html?name=${encodeURIComponent(document.forms.id_form1.id_textBox1.value)}`;


    //各入力値を取得
    var val1 = document.forms.form1.doc_name.value;
    var val2 = document.forms.form1.hos_name.value;
    var val3 = document.getElementById("gender").value;
    var val4 = document.getElementById("age").value;
    var val5 = document.getElementById("experience").value;
    var val6 = document.getElementById("expert").value;
    var val7 = document.getElementById("pref").value;
    var val8 = document.forms.form1.comment.value;
    var val9 = document.forms.form1.hashtag.value;
    var val10 = document.getElementById("essential").value;

    /*
    //テキスト入力が無かったら0を代入 = 0が入ってる要素は検索しない
    if(val1==""){
      val1 = null;
    }
    if(val2==""){
      val2 = "0";
    }
    if(val8==""){
      val8 = "0";
    }
    if(val9==""){
      val9 = "0";
    }
    */

    var all = val1 + ","+ val2 + ","+ val3 + ","+ val4 + ","+ val5 
              + ","+ val6 + ","+ val7 + ","+val8 + ","+ val9 + ","+ val10 ;

    console.log(all);
    console.log(val1);
    console.log(val2);
    console.log(val3);
    console.log(val4);
    console.log(val5);
    console.log(val6);
    console.log(val7);
    console.log(val8);
    console.log(val9);
    console.log(val10);

    location.href = '/result.html?name=' +  encodeURIComponent(all);


    //location.href = `/result.html?name=${encodeURIComponent("福間,愛富,太郎,次郎,三郎")}`;
    //window.open("../result.html", '_blank');
    //target.innerText = document.id_form1.id_textBox1.value;//これでもOK
  }

  