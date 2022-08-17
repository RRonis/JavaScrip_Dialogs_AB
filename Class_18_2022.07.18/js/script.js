let grades = [91, 66, 77, 84, 66];
let search = 66;

function searchGrade (grades,search) {
  // 1.variants
  for (var i=0; i < grades.length ; i++) {
    if (grades[i] == search) {
      console.log (`The grade ${search} exists`);
      break;
    }
  }

  //2.variants
  // for (currentGrade of grades){
  //     if (currentGrade == search){
  //       console.log(`The grade ${search} exists`);
  //     }
  // }
}
searchGrade (grades,search);


// Testējam 'Bind' un 'Call' metodes
// With the bind() method, an object can borrow a method from another object.
// With the call() method, you can write a method that can be used on different objects.

// https://betterprogramming.pub/when-to-use-bind-call-and-apply-in-javascript-1ae9d7fa66d5

// *call() gets invoked immediately whereas bind() returns a function that we can invoke later.
// *call() takes additional arguments but bind() does not.
// *call() doesn't make a copy of the function unlike bind().



const person1 = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
}

const person2 = {
  firstName: "Jānis",
  lastName: "Dimants",
}

// Return "John Doe":
console.log ( person1.fullName.call(person2) );

// ----------------------------------