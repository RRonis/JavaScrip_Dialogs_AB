// Piemēra - https://www.javascripttutorial.net/javascript-dom/javascript-getelementsbyclassname/ - HTML dokumenta analīze:

let btn = document.getElementById("btnRate");

btn.addEventListener("click", () => {
  let btn_group1 = document.getElementById("btn-group1");
  let btns1 = btn_group1.getElementsByClassName("rate1");

/*  let data = [];
  for (let i = 0; i < btns1.length; i++) {
    console.log([btns1[i].value, btns1[i].checked]);
    data.push([btns1[i].value, btns1[i].checked]);
    //console.log(data);
  }*/

/*  let data = [];
  for (let btn of btns1) {
    console.log([btn.value, btn.checked]);
    data.push([btn.value, btn.checked]);
  }*/

  let data = [].map.call(btns1, btn => [btn.value, btn.checked]);

  console.log(data);
  /*    
    let btn_group2 = document.getElementById('btn-group2');
    let btns2 = btn_group2.getElementsByClassName('rate2');
    
    data = [].map.call(btns2, btn => [btn.value, btn.checked]);
    console.log(data);
    */
});