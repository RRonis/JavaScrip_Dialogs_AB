// https://www.w3schools.com/js/js_object_accessors.asp

const person = {
  firstName: "",
  lastName: "Doe",
  language: "",
  counter: 0,
  get_language: function () {
    return `${this.firstName} knows ${this.language}`;
  },
  set_language: function (firstName, lang) {
    this.firstName = firstName;
    this.language = lang;
  },
  get lang() {
    return `${this.firstName} knows ${this.language}`;
  },
  set lang([firstName, lang]) {
    this.firstName = firstName;
    this.language = lang;
  },
  set multiply(value) {
    //this.counter *= value;
    this.counter = this.counter * value;
  },
};

console.log(person);

// Define setters and getters
Object.defineProperty(person, "reset", {
  get: function () {
    this.counter = 0;
  },
});
Object.defineProperty(person, "increment", {
  get: function () {
    this.counter++;
  },
});
Object.defineProperty(person, "decrement", {
  get: function () {
    this.counter--;
  },
});
Object.defineProperty(person, "add", {
  set: function (value) {
    this.counter += value;
  },
});
Object.defineProperty(person, "subtract", {
  set: function (value) {
    this.counter -= value;
  },
});

Object.defineProperty(person, "test_get_with_parameter", {
  // get: function (value) {
  get: function () {
    //console.log("output from test_get_with_parameter: "+value);
    console.log("output from test_get_with_parameter: " + this.counter);
  },
});

Object.defineProperty(person, "test_set_with_parameters", {
  // set: function (value1,value2) {
    set: function ([value1, value2]) {
    console.log("output from test_set_with_parameters: " + value1);
    console.log("output from test_set_with_parameters: " + value2);
    console.log("output from test_set_with_parameters: " + this.counter);
  },
});

console.log(person);

person.reset;
console.log(person.counter);
person.add = 5;
console.log(person.counter);
person.subtract = 1;
console.log(person.counter);
person.increment;
console.log(person.counter);
person.decrement;
console.log(person.counter);
person.multiply = 4;
console.log(person.counter);

// ===============================================

/*
//Piemērs #2
// Set data from the object using data property:
person.firstName = "Carl";
person.language = "ee";
document.getElementById("demo1").innerHTML = person.lang;

// Set data to the object using method:
person.set_language("Mike","lt");
document.getElementById("demo2").innerHTML = person.lang;

// Set data to the object using a setter:
person.lang = ["Gregory","lv"];
document.getElementById("demo3").innerHTML = person.lang;
*/



/*
//Piemērs 1
// Display data from the object using data property:
document.getElementById("demo1").innerHTML = `${person.firstName} knows ${person.language}`;

// Display data from the object using method:
document.getElementById("demo2").innerHTML = person.get_language();

// Display data from the object using a getter:
document.getElementById("demo3").innerHTML = person.lang;
*/