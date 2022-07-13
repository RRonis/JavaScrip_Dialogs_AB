
var visi_sk="";
var para_sk="";
var nepara_sk="";
var text = "";



text = "";
var i = 1;
while ( i<6 ) {
  text = text + i + "<br>";
  i++;
}
document.getElementById("for_automatic_count_classic").innerHTML=text


console.log("Skripta izpildes sākums:\n"+ new Date());
document.getElementById("manual_count").innerHTML="1<br>2<br>3<br>4<br>";


var nep_par = "nepārā skaitlis ";
for (let i = 1 ; i < 11 ; i=i+2 ) {
  text = text + nep_par + i + "<br>"; 
}
document.getElementById("nepara_sk").innerHTML= text;

text = "";
nep_par = "pārā skaitlis ";
for (let i = 2 ; i < 11 ; i=i+2 ) {
  text = text + nep_par + i + "<br>"; 
}
document.getElementById("para_sk").innerHTML= text;

// text = "";
// for (let i = 1 ; i < 11 ; i=i++) {
//   if (i%2 == 0)
//     {text = text + i + " pāra skaitlis<BR>"}
//   else
//     {text = text + i + " nepāra skaitlis<BR>"}  
// }
// document.getElementById("visi_sk").innerHTML= text;




/*
text += cars[0] + "<br>";
text = text + cars[0] + "<br>";
*/