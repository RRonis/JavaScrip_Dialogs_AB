// https://www.javascripttutorial.net/javascript-dom/javascript-form/

const form = document.querySelector("#signup");

function showInstruction(element, state) {
  const instruction = element.parentNode.querySelector("small");
  element.className = state ? "success" : "error";
  instruction.innerText =  state ? "" : "Please enter " + element.id
}

function hasValue(element) {
  if (element.value.trim() === "") {
    showInstruction(element, false);
    return false;
  } else {
    showInstruction(element, true);
    return true;
  }
}

form.addEventListener("submit", function (event) {
  // stop form submission
  event.preventDefault();

  const name = form.elements["name"];
  const email = form.elements["email"];

  const name_state = hasValue(name);
  const email_state = hasValue(email);
  const email_validation = false; // pēc noklusējuma lauciņa saturs nav OK
  
//   ja ir e-mail vērtība tad pārbaudām validity
    if (email_state){
        email_validation = validateEmail(email);
    }


  //if(hasValue(email) && hasValue(name))
  //if(hasValue(name) && hasValue(email))
  if(name_state && email_state)
    form.submit();
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


// Oriģināls:
/*
// show a message with a type of the input
function showMessage(input, message, type) {
	// get the small element and set the message
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;
	// update the class for the input
	input.className = type ? "success" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate email format (regulārās izteiksmes paraugs)
	const emailRegex =
		/ ^ 
            ( 
                (
                       [^<>()\[\]\\.,;:\s@"]
                    +(
                        \.[^<>()\[\]\\.,;:\s@"]
                    +)
                *)
                | (".+")
            )
            @
            (
                (\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]) // domain ar IP adresi [c.c.c.c] līdz [ccc.ccc.ccc.ccc]
                |
                    (([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})   // domain ar adresi 
            )$
        /;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showError(input, invalidMsg);
	}
	return true;
}

const form = document.querySelector("#signup");

const NAME_REQUIRED = "Please enter your name";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";

form.addEventListener("submit", function (event) {
	// stop form submission
	event.preventDefault();

	// validate the form
	let nameValid = hasValue(form.elements["name"], NAME_REQUIRED);
	let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
	// if valid, submit the form.
	if (nameValid && emailValid) {
		alert("Demo only. No form was posted.");
	}
});
*/
