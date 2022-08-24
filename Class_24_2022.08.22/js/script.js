// argumenti

let OpenType;
let adrese;
var count = 5;
var teksts = document.getElementById('counter');

function AtveramJaunuAdresi() {

  if (confirm("Vai vēlies pāriet uz citu lapu?"))
  {
    // Jā
    adrese = window.prompt('Ievadi lapas adresi uz kurieni iesim', 'https://www.tvnet.lv/');
        
    // Atvēram balstoties uz opcijām
    OpenType = prompt("Vai vēlies to atvērt jaunā logā (L), Jaunā tabā (T), Šajā pašā Tabā (S)", "L vai T, vai S burts");
     switch (OpenType) {
       case "L":
       case "l":
       case null: 
          Countdown();
          if (count ==0) { 
            window.open(adrese, "_blank","width=1000,height=600");
          }
         break;
       case "T":
       case "t":
         window.open(adrese, "_blank");
         break;
       case "S":
       case "s":
          window.open(adrese, "_blank");
         break;
     }      
  } 
  else {
    // nevēlamies nekur pāriet
    window.alert("OK! Paliekam šajā pašā lapā.");
  }
  function Countdown() {  
    count -= 1;
    teksts.innerText = "Lapa atvērsies pēc " + (count) + " sek.";
      if (count == 0) {clearInterval(cancel)};
    }
    var cancel = setInterval(Countdown, 1000); 

} // end AtveramJaunuAdresi






/* 
==========================================================================
Artūra piemērs: 

var text = "Jā",
  links = "https://spoki.lv",
  logatips = "Jā";

text = confirm("Pāriet uz citu lapu?" );
document.getElementById("demo").innerHTML = text;
if (text == true) {
  links = prompt("Kādu interneta adresi?", links);
  document.getElementById("demo2").innerHTML = links;
  logatips = prompt("Atvērt jaunā lapā", logatips);

  var count = 0;
  var el = document.getElementById('demo3');
  
  function timer() {
  count += 1;
  el.innerText = "Palika" + (5 - count) + "sekundes.";
    if (count == 5) {clearInterval(cancel)};
  }
  var cancel = setInterval(timer, 1000);
   
  
  if (logatips == null) {
    setTimeout(() => {
      window.open(links, "_self");
    }, 5000);
    
    } else {
      setTimeout(() => {
      window.open(links, "_blank");
    }, 5000);
  }
}

*/