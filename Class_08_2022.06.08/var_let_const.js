// scope skripta bloks, nodalams ar šadäm iekävam {}

// var atslégas vards ļauj nodefinet globalo mainīgo - pieejams visa koda garumã
var a = 45;
console.log("a vertiba (no 'galvenà zara' pirms scope): "+a);
{
    console.log("a vêrtiba pirms pardefinēšanas (no 'scope'):" +a);
    var a = 46;
    console.log("a vērtiba pèc pardefinéšanas (no 'scope'): "+a);
}
console.log("a vertiba (no 'galvenà zara' pèc scope): "+a);

// let atslégas vards lauj nodefinet lokalo mainigo - pieejams koda blokà norobezotà a {} - scope, vértiba var tikt main;ita
let b = 60;
console.log("b vertiba (no 'galvenà zara' pirms scope): "+b);
{
    console.log("b vertiba pirms pardefinesanas (no 'scope'): "+b);
    let b = 61;
    console.log("b vertiba pèc pardefinesanas (no 'scope'): " +b);
}
console.log("b vertiba (no 'galvenà zara' pèc scope): "+b);

// const atslégas vards lauj nodefinet lokalo konstanti - pieejams koda blokà norobezotà ar {} - scope, vertiba nevar tikt main;iti
const C = 100;
console.log("c vertiba (no 'galvenà zara' pirms scope): " +C);
{
    console.log("c vertiba pirms pardefinésanas (no 'scope') : "+C);
    const C = 101;
    console.log("c vertiba pèc pardefinejanas (no 'scope'): "+C);
}
console.log("c vértiba (no 'galvená zara' péc scope') :"+C);

