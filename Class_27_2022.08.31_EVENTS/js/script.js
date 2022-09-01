// https://www.javascripttutorial.net/javascript-dom/javascript-events/

let btn = document.querySelector('#btn');

// variants #1
// function display() {
//     alert('It was clicked!');
// }
// btn.addEventListener('click',display);
//----------------------------------------

// variants #2
// btn.addEventListener('click',function() {
//     alert('It was clicked! ');
// });
// -----------------------------------------

// variants #3
btn.addEventListener('click', (event) => {
  // alert('It was clicked!');
  console.log("Event type: " + event.type);
  console.log("Event bubbles?: " + event.bubbles);
  console.log("Cancelable?: " + event.cancelable);
  console.log("currentTarget?: " + event.currentTarget);
  console.log("       target?: " + event.target);
  // event.currentTarget.innerText = 'Ouch!';
  console.log("defaultPrevented?: " + event.defaultPrevented);
  console.log("More infor about event: " + event.detail);
  console.log("eventPhase: " + event.eventPhase);
  event.preventDefault();
  console.log("default prevented pec 'event.preventDefault()': " + event.defaultPrevented);
  console.log("--------------------------------------------");
});

// ======================= PIEMERS 2 =====================================================
// https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
// piemērs kurā tiek paslēpts elements uz kura tiek uzklikšķināts + arī paslēpjam body (ar laika nobīdi 2 sek):

function hide(e){
  let currentTarget_ = e.currentTarget;
  let target_ = e.target;
  //console.log(currentTarget_.tagName);
  if (currentTarget_.tagName == 'P')
      setTimeout(() => {currentTarget_.style.visibility = 'hidden';}, 1000);
      //setTimeout(() => {target_.style.visibility = 'hidden';}, 1000);
  else
      setTimeout(() => {currentTarget_.style.visibility = 'hidden';}, 2000);
      //setTimeout(() => {target_.style.visibility = 'hidden';}, 2000);
  e.stopPropagation();
  console.log("e.currentTarget: ",e.currentTarget);
  console.log("e.target: ",e.target);
  // When this function is used as an event handler: this === e.currentTarget
}

const ps = document.getElementsByTagName('p');

// izveidojam tik EventListenerus cik ir paragrāfu:
for (let i = 0; i < ps.length; i++){
  // console: print the clicked <p> element
  ps[i].addEventListener('click', hide, false);
}

// Ja aktivizē arī šo tad tiek paslēpti visi 'body' elementi:
document.body.addEventListener('click', hide, false);

// testējam preventDfault (atverot linku)
let link = document.querySelector('a');
link.addEventListener('click',function(event) {
    console.log('clicked');
    event.preventDefault();
    console.log(event.currentTarget.href);
    let jsWindow = window.open(
        event.currentTarget.href,
        //"https://www.w3schools.com/js/js_object_prototypes.asp",
        "test",
        "height=600,width=800"
      );
});

// ==================== PIEMERS 2 BEIGAS =================================

  
  // Click around and make paragraphs disappear


  // When this function is used as an event handler: this === e.currentTarget



// btn.addEventListener('mouseup', (event) => { // mousedown mouseover
//   console.log("Event type: " + event.type);
//   console.log("Event bubbles?: " + event.bubbles);
//   console.log("Cancelable?: " + event.cancelable);
//   console.log("currentTarget?: " + event.currentTarget);
//   // šis zemāk nomaina pogas tekstu
//   event. currentTarget.innerText= event.detail + "-klikskis";
//   console.log("defaultPrevented?: " + event.defaultPrevented);
//   console.log("More infor about event: " + event.detail);
//   console.log("======");
// });