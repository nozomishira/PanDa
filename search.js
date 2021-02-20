function onButtonClick() {
    target1 = document.getElementById("output");
    target1.innerText = document.forms.id_form1.id_textBox1.value;
    //target2 = document.getElementById("input_message").value;
    //var input_message = document.forms.id_form2.id_textBox2.value;
    console.log(target1.innerText);
    location.href = `/result.html?name=${encodeURIComponent(document.forms.id_form1.id_textBox1.value)}`;
    //location.href = '/result.html?name=' +  encodeURIComponent('太郎');
    //window.open("../result.html", '_blank');
    //target.innerText = document.id_form1.id_textBox1.value;//これでもOK
  }

  