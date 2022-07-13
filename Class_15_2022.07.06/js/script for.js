

const cars = ["BMW", "Volvo", "Mini"];

let text = "";
for (i=0 ; i < cars.length; i++) {
  text += cars[i] + "<br>";
}
document.getElementById("values_of_array_1").innerHTML = text;

text = "";
for (let x of cars) {
  text += x + "<br>";
}
document.getElementById("values_of_array_2").innerHTML = text;

// elegantais veids kā attēlot masīvu:
let stringtext = "Teksts*vertikali";
text = "";
for (let x of stringtext) {
  text += x + "<br>";
}

document.getElementById("text_vert").innerHTML = text;
