//with enter send message

if (typeof document !== "undefined") {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
}

//remove everything other than words
function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(utterances, answers, text)) {
    // Search for exact match in triggers
    product = compare(utterances, answers, text);
  } else {
    product = alternatives[Math.floor(Math.random() * alternatives.length)];
  }

  addChatEntry(input, product);
}

const utterances = [
  ["hi", "hey", "hello", "good morning", "good afternoon","labdien"],
  ["help me", "can you help me", "i need help"],
  ["how to buy on this website"],
  ["what currency do you accept"],
  ["is the refund possible"],
  ["thank you"],
  ["bye", "good bye", "goodbye", "see you later"],
  [""],
];

// Possible responses corresponding to triggers

const answers = [
  ["Hello, my name is chatBot. Im all ears"],
  ["sure! how can i help you"],
  ["just go on the main menu and click on one of the gallerys"],
  ["all kind, including crypto"],
  ["sure, just follow link in the e-mail with your order information"],
  ["you are welcome"],
  ["Bye", "Goodbye", "See you later"],
];

// Random for any other user input

const alternatives = ["Go on...", "Try again"];

function compare(utterancesArray, answersArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let replies = answersArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}

function addChatEntry(input, product) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 2000);
}

//module.exports.compare = compare;
//module.exports.utterances = utterances;
//module.exports.answers = answers;
module.exports = {compare, utterances, answers};