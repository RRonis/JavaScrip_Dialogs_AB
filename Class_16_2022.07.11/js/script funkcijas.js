// hoisted

// funkcijas definēšana ar apgalvojuma palīdzību

function square_statement (number) {
  return number * number ;
}
const x = square_statement(4);
console.log("x kvadrata ir: " + x);

// funkcijas definēšana ar izteiksmes palīdzību

const square_exp = function (number) {
  return number * number;
}
const y = square_exp(4);
console.log("y kvadrata ir: " + y);

// rekursīvā f-jas (izsauc sevi iekš pašas f-cijas) "faktoriālie parēķini"

const factorial = function fact(n) {
  return n < 2 ? 1 : n * fact(n - 1);
}
console.log(factorial(4));

// funkciju izsaukšana ar citu funkciju
// funkcija kuras (viens no) argumentiem arī ir f-ja

function map(f, a) {
  const result = [];
  // i = 0;
  for (const v of a) {
    //  result[i] = f(v);
    //  i++;
    result.push (f(v));
  }
  return result;
}

const square_for_every_array_element = function (x) {
  return x * x;
}

const cube_for_every_array_element = function (x) {
  return x * x * x;
}

const numbers = [0, 1, 2, 5, 10];

const squares = map(cube_for_every_array_element, numbers);
console.log( "squares: " + squares);
const cubes = map(cube_for_every_array_element, numbers);
console.log("cubes: "+cubes);

// patstāvīgais darbs - savas funkcijas izveide
// f-ja, kas saksaita masīva elementus kas atbilst noteiktiem parametriem 

const tabula = [0, 1, 1, 0, 3];

function mekletajs (kur,ko){
  var i = 0;
  var meklejamo_skaits = 0;
  for (let i = 0; i < kur.length; i++ ) {
    kur[i] = ko ? meklejamo_skaits++ :  ;  
}

// TVNet RSS feed izgūšana
// https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/



