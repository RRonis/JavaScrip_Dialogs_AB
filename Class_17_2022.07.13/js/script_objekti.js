// objekta definēšana ar EN : 'literal' = LV : 'literāli'(rakstzīmju virkni)
// labā prakse ir objektu definēt ar 'const' tipu

const car = {type:"Fiat", model:"500", color:"white"};

// objekta īpašības (property) izgūšana 2 veidi:
// veids nr1
console.log ( car.type );
 // veids nr2
// console.log ( car.["type"]);

// "this." keyworda/darbības piemērs no 3wschools
const person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};

const DU = {
  nr       : "223344",
  apraksts : "xx darbi uz jumta ",
  vieta    : "jumts",
  du_teksts : function() {
    let x = prompt("Ievadi darba Nr: ");
    // return `Veikt${this.apraksts} darbu. Adese: ${this.vieta}`;
    return "Veikt darbu Nr: " + x + this.apraksts + " darbu. Adese: " + this.vieta;
  }
};

// piemērs ar jocīgo nesecīgo izpildes secību (nokomentētā daļa nestrādā!)

let prompt_value = prompt("Enter country name:");

function EU_country_find(value, index, array) {
  console.log(prompt_value);
  console.log(value);
  return value == prompt_value;}

const EU = {
  countries: ["Latvija", "Lietuva", "Cehija"],
  // prompt_value: prompt("Enter country name:"),
/*  EU_country_find: function (value, index, array) {
    // console.log(this.prompt_value);
    console.log(prompt_value);
    console.log(value);
    // return value == this.prompt_value;},
    return value == prompt_value;},*/
  EU_classification: function () {
    // return this.countries.find(this.EU_country_find) == undefined ? "Not EU" : "EU";
    return this.countries.find(EU_country_find) == undefined ? "Not EU" : "EU";
  },
};