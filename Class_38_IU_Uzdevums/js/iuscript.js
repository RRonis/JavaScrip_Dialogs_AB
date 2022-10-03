
//   https://dev.to/michaelburrows/how-to-save-data-in-localstorage-using-javascript-994

// Produktu katalogs (kods, apraksts)
const produkti = new Array("Asorti", "Bekona", "Garneļu tīģeris", "Kebaba", "Prošuto");

    const pr0 = produkti[0];
    document.getElementById("pr0").innerHTML = pr0;
    const pr1 = produkti[1];
    document.getElementById("pr1").innerHTML = pr1;
    const pr2 = produkti[2];
    document.getElementById("pr2").innerHTML = pr2;
    const pr3 = produkti[3];
    document.getElementById("pr3").innerHTML = pr3;
    const pr4 = produkti[4];
    document.getElementById("pr4").innerHTML = pr4;

// html elementi ar kurem strādāsim 

const noteForm = document.getElementById("pas-forma");
const noteInput = document.getElementById("produkts");
const noteSubmit = document.getElementById("ord-submit");
const notes = document.getElementById("notes");

// ielādējam esošos pasūtījumus no localStorage

let notesStorage = localStorage.getItem("notes")
  ? JSON.parse(localStorage.getItem("notes")) : [];
    
  var count = {}; 
    notesStorage.forEach(element => {
        count[element] = (count[element] || 0) + 1;
    });

// funkcija, kas saglabā jauno pasūtījumu pēc formas aizpildīšanas un submit   

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  notesStorage.push(noteInput.value);
  localStorage.setItem("notes", JSON.stringify(notesStorage));
  listBuilder(noteInput.value);
  noteInput.value = "";
});

// ar listbuilderi izveidojam sarakstu ar pasūtītājiem produktiem 
// no localStorage un nosūtām uz html

const listBuilder = (text) => {
  const note = document.createElement("li");
  note.innerHTML = text + '   <button onclick="deleteNote(this)">Pasūtījums Izpildīts</button>';
  notes.appendChild(note);
};

const getNotes = JSON.parse(localStorage.getItem("notes"));
getNotes.forEach((note) => {
  listBuilder(note);
});

// izvēlētajam list elementam caur btn tiek nodots indekss pēc kura tad arī 
// izdzēš konkrēto localStorage ierakstu

const deleteNote = (btn) => {
  let el = btn.parentNode;
  const index = [...el.parentElement.children].indexOf(el);
  notesStorage.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesStorage));
  el.remove();
};