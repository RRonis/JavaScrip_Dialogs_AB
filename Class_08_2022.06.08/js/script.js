
//a = 5;
console.log('sākotnējā a vērtība: ' + a);


function myFunctionPl() {
    a=++a;
    document.getElementById("output").innerHTML = "jaunā a vērtība: "+a;
    console.log('jaunā a vērtība: '+a);
    }
function myFunctionMin() {
    a=--a;
    document.getElementById("output").innerHTML = "jaunā a vērtība: "+a;
    console.log('jaunā a vērtība: '+a);
    }

    
    
//a = 45;
//console.log(a);

let carName = "Volvo";
document.getElementById("demo").innerHTML = carName;

// 'scope' - skripta bloks, nodalāms ar šadām iekāvām - {}
// var atslēgas vārds ļauj nodefinēt globālo mainīgo - pieejams visā koda garumā
var a = 45;
console.log("a vērtība (no 'galvenā zara' pirms scope): "+a);
{
    console.log("a vērtība pirms pārdefinēšanas (no 'scope'): "+a);
    var a = 46;
    console.log("a vērtība pēc pārdefinēšanas (no 'scope'): "+a);
}
console.log("a vērtība (no 'galvenā zara' pēc scope): "+a);

// let atslēgas vārds ļauj nodefinēt lokālo mainīgo - pieejams koda blokā norobežotā ar {} - scope, vērtība var tikt mainīta
let b = 60;
console.log("b vērtība (no 'galvenā zara' pirms scope): "+b);
{
    // console.log("b vērtība pirms pārdefinēšanas (no 'scope'): "+b);
    let b = 61;
    console.log("b vērtība pēc pārdefinēšanas (no 'scope'): "+b);
}
console.log("b vērtība (no 'galvenā zara' pēc scope): "+b);

// const atslēgas vārds ļauj nodefinēt lokālo konstanti - pieejams koda blokā norobežotā ar {} - scope, vērtība nevar tikt mainīta
const c = 100;
console.log("c vērtība (no 'galvenā zara' pirms scope): "+c);
{
    //console.log("c vērtība pirms pārdefinēšanas (no 'scope'): "+c);
    const c = 101;
    console.log("c vērtība pēc pārdefinēšanas (no 'scope'): "+c);
}
console.log("c vērtība (no 'galvenā zara' pēc scope): "+c);



/*
izmēģiniet un attēlojiet 
rezultātus - mainīgo vērtības
pēc veiktām izmaiņām - ar console.log():
a++;
++a;
a = a + a;
var b = 10;
b = 100;
const c = 1000;
c = 0;
let b = 3;
*/

/*
Dabūjiet string tipa mainīgā
vērtību paragrāfā savā HTML
dokumentā
*/

//document.getElementById("demo").innerHTML = 456 || 0;