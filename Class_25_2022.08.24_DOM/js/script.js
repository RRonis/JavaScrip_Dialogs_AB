
const firstChildNode = document.documentElement.firstChild;
if (firstChildNode.nodeType !== Node.COMMENT_NODE) {
    console.warn("You should comment your code!");
    console.log(firstChildNode.nodeType);
    console.log(firstChildNode.nodeName);
    console.log(firstChildNode.nodeValue);
}
else {
    console.log("Good! :-) code is commented/described");
    console.log(firstChildNode.nodeType);
    console.log(firstChildNode.nodeName);
    console.log(firstChildNode.nodeValue);
}
const secondChildNode = firstChildNode.nextSibling;
console.log(secondChildNode.nodeType);
console.log(secondChildNode.nodeName);
console.log(secondChildNode.nodeValue);

const thirdChildNode = secondChildNode.nextSibling;
console.log(thirdChildNode.nodeType);
console.log(thirdChildNode.nodeName);
console.log(thirdChildNode.nodeValue);

const fourthChildNode = thirdChildNode.nextSibling;
console.log(fourthChildNode.nodeType);
console.log(fourthChildNode.nodeName);
console.log(fourthChildNode.nodeValue);

// const fifthChildNode = fourthChildNode.nextSibling;
// console.log(fifthChildNode.nodeType);
// console.log(fifthChildNode.nodeName);
// console.log(fifthChildNode.nodeValue);

const lastChildNode = document.documentElement.lastChild;
console.log("\n");
console.log(lastChildNode.nodeType);
console.log(lastChildNode.nodeName);
console.log(lastChildNode.nodeValue);

console.log("\n");
console.log(document.firstChild.nodeType);
console.log(document.firstChild.nodeName);
console.log(document.firstChild.nodeValue);

console.log("\n");
console.log(document.firstChild.nextSibling.nodeType);
console.log(document.firstChild.nextSibling.nodeName);
console.log(document.firstChild.nextSibling.nodeValue);

const element = document.getElementById("demo");
console.log("\n");
console.log(element);

const element2 = document.getElementById("virsraksts");
console.log("\n");
console.log(element2);

// console.log("\n");
// console.log(document.lastChild.nodeType);
// console.log(document.lastChild.nodeName);
// console.log(document.lastChild.nodeValue);

// https://www.javascripttutorial.net/javascript-dom/javascript-getelementbyid/
const p = document.getElementById('demo1');
console.log(p);
console.log("p.innerHTML: "+p.innerHTML);
p.innerHTML = "1. Paragrāfa teksts (mainīts 1. reizi.)";
console.log("p.innerText: "+p.innerText);
p.innerText = "1. Paragrāfa teksts (mainīts 2. reizi.)";
console.log("p.firstChild.nodeType: "+p.firstChild.nodeType);
console.log("p.firstChild.textContent: "+p.firstChild.textContent);
p.firstChild.textContent = "1. Paragrāfa teksts (mainīts 3. reizi.)";

console.log(document.querySelectorAll('*[id]'));

// https://www.javascripttutorial.net/javascript-dom/javascript-getelementsbyname/

let btn = document.getElementById('btnRate');
let output = document.getElementById('output');

btn.addEventListener('click', () => {
    let rates = document.getElementsByName('rate');
    rates.forEach((rate) => {
        //console.log(rate);
        console.log(rate.value + ' ' + rate.checked);
        if (rate.checked) {
            output.innerText = `You selected: ${rate.value}`;
        }
    alert("Continue!");
    });

});