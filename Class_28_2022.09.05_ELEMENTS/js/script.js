// https://www.javascripttutorial.net/javascript-dom/javascript-get-parent-element-parentnode/
let note = document.querySelector('.note');
console.log("...parentNode: ",note.parentNode);

// https://www.javascripttutorial.net/javascript-dom/javascript-get-child-element/
let content = document.getElementById('menu');
let firstChild = content.firstChild;
console.log("...firstChild: ",firstChild);
console.log("...firstChild.nodeType: ",firstChild.nodeType);
console.log("...firstChild.nodeName: ",firstChild.nodeName);

// https://www.javascripttutorial.net/javascript-dom/javascript-siblings/
let getSiblings = function (e) {
    // for collecting siblings
    let siblings = []; 
    // if no parent, return no sibling
    if(!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling  = e.parentNode.firstChild;
    
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

let siblings = getSiblings(document.querySelector('.current'));
siblingText = siblings.map(e => e.innerHTML);
console.log("siblings: ",siblings);
console.log("children of parent: ",document.querySelector('.current').parentElement.children);
console.log("siblings texts: ",siblingText);

// https://www.javascripttutorial.net/javascript-dom/javascript-createelement/
let div = document.createElement('div');
div.id = 'content';
div.className = 'note';
// div.innerHTML = '<p>CreateElement example (inside p tag)</p>';
// let text = document.createTextNode('CreateElement example (outside <p>)');
// div.appendChild(text);
let p = document.createElement('p');
p.textContent = 'CreateElement example (inside <p>)';
div.appendChild(p);
document.body.appendChild(div);


// select the ul menu element
const menu = document.querySelector('#menu');

let li = document.createElement('li');
li.textContent = 'Products 1';
menu.appendChild(li);
console.log(menu.children);

li = document.createElement('li');
li.textContent = 'About Us 1';
menu.appendChild(li);
console.log(menu.children);

let main = document.getElementById('main');
console.log(main.textContent);
console.log(main.innerText);

// document.body.innerHTML = '';