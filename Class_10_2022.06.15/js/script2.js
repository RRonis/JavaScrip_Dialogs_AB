
var vards_uzvards = "Jāni Bērziņ,";
var nauda = 15000;
var proc = 0.0001

var pelna_1 = (nauda * proc*1) * 1;
console.log(pelna_1);
var pelna_2 = (nauda * proc*2) * 2;
console.log(pelna_2);
var pelna_3 = (nauda * proc*3) * 3;
console.log(pelna_3);
var pelna_4 = (nauda * proc*4) * 4;
console.log(pelna_4);
var pelna_5 = (nauda * proc*5) * 5;
console.log(pelna_5);

document.getElementById("client").innerHTML = vards_uzvards;
document.getElementById("money").innerHTML = nauda;
document.getElementById("procenti_1").innerHTML = pelna_1;
document.getElementById("procenti_2").innerHTML = pelna_2;
document.getElementById("procenti_3").innerHTML = pelna_3;
document.getElementById("procenti_4").innerHTML = pelna_4;
document.getElementById("procenti_5").innerHTML = pelna_5;

const cars = [["BMW", "Audi"],[["X3","X5"],["01","02"]]];
console.log(cars);
cars.sort();
console.log(cars);
