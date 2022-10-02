/*
var x1 = 10;
document.getElementById("demo1").innerHTML = `x1=${x1}`;

var x2 = x1;
x2 = 20;
document.getElementById("demo2").innerHTML = "x2="+x2;
document.getElementById("demo3").innerHTML = `and now - x1=${x1}`;
*/

const obj1 = { property1: 10 };
//document.getElementById("demo1").innerHTML = `obj1.property1=${obj1.property1}`;

const obj2 = obj1;
obj2.property1 = 20;
//document.getElementById("demo2").innerHTML = `obj2.property1=${obj2.property1}`;
//document.getElementById("demo3").innerHTML = `and now - obj1.property1=${obj1.property1}`;

Object.defineProperty(obj2, "property2", {
  value: 100,
  enumerable: true,
});

Object.defineProperty(obj2, "property3", {
  value: "Aaaa",
  configurable: false,
});

let txt = "";
for (let current_property in obj1) {
  txt += current_property + ": " + obj1[current_property] + "<br>";
}

for (let current_property in obj1) {
  console.log(current_property);
}

//for (let current_property of obj1) {
//  console.log(current_property);
//}

document.getElementById("demo1").innerHTML = txt;

delete obj2.property3;

/*
setTimeout(() => {
  window.open("http://127.0.0.1:5500/Dialogs_AB/Class_18/", "original");
}, 3000);
*/