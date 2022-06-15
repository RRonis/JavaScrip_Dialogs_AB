var x = 3;
console.log('Dec sākotnējā vērtība: ' + x);
document.getElementById("dec").innerHTML = "decimālā vērtība: " + x;

console.log('Dec BIN vērtība ar JS pamatfunkciju : ' + x);
document.getElementById("check").innerHTML = "bin skaitlis ar JS funkciju toString(2): " + x.toString(2);

bits = x % 2;
bitstring = 'rez: ' + bits;
console.log('rezultāta bits: ' + bits);
console.log(bitstring);
x = Math.round(x / 2 - 0.5);
console.log('dalījuma rezultāts x=' + x);

bits = x % 2;
bitstring = bitstring+bits;
console.log('rezultāta bits: ' + bits);
console.log(bitstring);
x = Math.round(x / 2 - 0.5);
console.log('dalījuma rezultāts x=' + x);

bits = x % 2;
bitstring = bits + bitstring;
console.log('rezultāta bits: ' + bits);
console.log(bitstring);
x = Math.round(x / 2 - 0.5);
console.log('dalījuma rezultāts x=' + x);

bits = x % 2;
bitstring = bitstring+bits;
console.log('rezultāta bits: ' + bits);
console.log(bitstring);
x = Math.round(x / 2 - 0.5);
console.log('dalījuma rezultāts x=' + x);

bits = x % 2;
bitstring = bitstring+bits;
console.log('rezultāta bits: ' + bits);
console.log(bitstring);
x = Math.round(x / 2 - 0.5);
console.log('dalījuma rezultāts x=' + x);

bits = x % 2;
bitstring = bitstring+bits;
console.log('rezultāta bits: ' + bits);
console.log(bitstring);
x = Math.round(x / 2 - 0.5);
console.log('dalījuma rezultāts x=' + x);


console.log('x bin vērtība izmantojot "atlikums no dalījuma uz HTML": ' + bitstring);
document.getElementById("bin").innerHTML = bitstring ;




