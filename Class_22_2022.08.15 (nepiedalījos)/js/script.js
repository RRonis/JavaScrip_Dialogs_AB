// location
console.log(window.location);
console.log(document.location);
console.log(location);

// URL ("pilnā" adrese)
console.log(location.href);

// protokols (http un https - datu plūsmai caur tīklu, bet var būt arī lokālo aplikāciju darbināšana)
console.log(location.protocol);

// host (IP vai "vārdiskā" IP adrese)
// ~ mājas darbs - palasīt par DNS
console.log(location.host);

// port
// ~ mājas darbs - palasīt par portiem un to pielietošanu (portu numuru diapazoni)
console.log(location.port);

// web-servisa "ceļš"
// pirmā "/" aiz host'a - web-servisa "ceļu sakne"
console.log(location.pathname);

// meklēšanas kritēriji
// aiz "?" zīmes, tie var būt vairāki - savā starpā atdalīti ar "&" zīmi
console.log(location.search);

// HTML dokumenta apakšsadaļas nosaukums
console.log(location.hash);

// lietotāja vārds un parole
// pirms hostname pirms "@" zīmes
// https://developer.mozilla.org/en-US/docs/Web/API/URL/username
// https://developer.mozilla.org/en-US/docs/Web/API/URL/password
// const url = new URL('https://anonymous:flabada@developer.mozilla.org/en-US/docs/Web/API/URL/username');
// console.log(url.username) // Logs "anonymous"
// console.log(url.password) // Logs "flabada"

alert('Tulīt ielādēsies cita lapa');

// assign(), replace(), reload()
// svarīgi vai ir vai nav ieraksts iekš History - attiecīgi iespēja pārviettotes ar Back/Next pogām
//         vai notiek lapas satura izgūšana no servera vai no pārluka Cache
location.replace('http://127.0.0.1:5500/Dialogs_AB/Class_21/index.html?q1=1&q2=a');