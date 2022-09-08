// https://www.javascripttutorial.net/javascript-dom/javascript-form/

const form = document.querySelector("#signup");

function showInstruction(element, state) {
  const instruction = element.parentNode.querySelector("small");
  element.className = state ? "success" : "error";
  instruction.innerText = state ? "" : "Please enter " + element.id;
}

function hasValue(element) {
  if (element.value.trim() === "") {
    showInstruction(element, false);
    return false;
  } else {
    showInstruction(element, true);
    if (element.id == "email") {
      if (!validateEmail(email)) {
        email.parentNode.querySelector("small").innerText = EMAIL_INVALID;
        email.className = "error";
      }
    }
    return true;
  }
}

/*
/
 ^(
    (
         [^<>()\[\]\\.,;:\s@"]
     +(
       \.[^<>()\[\]\\.,;:\s@"]
     +)
   *)
     |(".+")
  )
     
     (@
        (\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]) // c.c.c.c līdz ccc.ccc.ccc.ccc
     |
        (([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})
     )$
/;
*/

function validateEmail(element) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(emailRegex.test(element.value));
  return emailRegex.test(element.value);
}

form.addEventListener("submit", function (event) {
  // stop form submission
  event.preventDefault();

  const name = form.elements["name"];
  const email = form.elements["email"];

  const name_state = hasValue(name);
  const email_state = hasValue(email);

  let email_validation = false;
  if (email_state) {
    email_validation = validateEmail(email);
  }

  /*
  if(email_state && !email_validation){
    let instruction = email.parentNode.querySelector("small");
    email.className = "error";
    instruction.innerText = EMAIL_INVALID;
  }
*/

  //if(hasValue(email) && hasValue(name))
  //if(hasValue(name) && hasValue(email))
  if (name_state && email_state && email_validation) {
    //form.submit();
    url = "signup.html?name="+encodeURIComponent(name.value);
    document.location.href = url;
  }
});

/*if(element.id == 'name')
        instruction.innerText = "Please enter name";
        if(element.id == 'email')
        instruction.innerText = "Please enter email";*/
/*switch (element.id) {
      case "name":
        instruction.innerText = "Please enter name";
        break;
      case "email":
        instruction.innerText = "Please enter email";
        break;
    }*/
//instruction.innerText = "Please enter "+ element.id;