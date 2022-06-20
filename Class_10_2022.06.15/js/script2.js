
var vards_uzvards = "Jāni Bērziņ,";
var nauda = 15000;
var proc = 0.0001
var proc_uzkr = 0;
var izmaksa_ikgadu = 1; 
// 0 ja izmaksājam 1 ja neaizmaksājam 

var pelna_1 = ((nauda + proc_uzkr * izmaksa_ikgadu) * proc * 1) * 1;
var pelna_1_str = pelna_1.toFixed(2);
var pelna_1_2dec = Number(pelna_1_str);
proc_uzkr = pelna_1_2dec;
console.log(proc_uzkr, pelna_1_2dec);

var pelna_2 = ((nauda + proc_uzkr * izmaksa_ikgadu) * proc * 2) * 2;
var pelna_2_str = pelna_2.toFixed(2);
var pelna_2_2dec = Number(pelna_2.toFixed(2));
proc_uzkr = pelna_2_2dec;
console.log(pelna_2_2dec, proc_uzkr);

var pelna_3 = ((nauda + proc_uzkr * izmaksa_ikgadu) * proc * 3) * 3;
var pelna_3_str = pelna_3.toFixed(2);
var pelna_3_2dec = Number(pelna_3.toFixed(2));
proc_uzkr = pelna_3_2dec;
console.log(pelna_3_2dec, proc_uzkr);

var pelna_4 = ((nauda + proc_uzkr * izmaksa_ikgadu) * proc * 4) * 4;
var pelna_4_str = pelna_4.toFixed(2);
var pelna_4_2dec = Number(pelna_4.toFixed(2));
proc_uzkr = pelna_4_2dec;
console.log(pelna_4_2dec, proc_uzkr);

var pelna_5 = ((nauda + proc_uzkr * izmaksa_ikgadu) * proc * 5) * 5;
var pelna_5_str = pelna_5.toFixed(2);
var pelna_5_2dec = Number(pelna_5.toFixed(2));
proc_uzkr = pelna_5_2dec;
console.log(pelna_5_2dec, proc_uzkr);

document.getElementById("client").innerHTML = vards_uzvards;
document.getElementById("money").innerHTML = nauda;
document.getElementById("procenti_1").innerHTML = pelna_1_str;
document.getElementById("procenti_2").innerHTML = pelna_2_str;
document.getElementById("procenti_3").innerHTML = pelna_3_str;
document.getElementById("procenti_4").innerHTML = pelna_4_str;
document.getElementById("procenti_5").innerHTML = pelna_5_str;

const cars = [["BMW", "Audi"],[["X3","X5"],["01","02"]]];
console.log(cars);
cars.sort();
console.log(cars);


// var pelna_1 = ((nauda + proc_uzkr) * proc * 1) * 1;
// var pelna_1_2dec = pelna_1.toFixed(2);
// console.log(pelna_1_2dec);
