// https://www.javascripttutorial.net/web-apis/javascript-cookies/

expires = new Date();
//console.log(expires);
expires.setSeconds(expires.getSeconds() + 30); // pēc 30 sek pazūd
//console.log(expires);

var i = 1;
document.cookie = `connection=${i}; path=/; expires=${expires.toGMTString()}`;
console.log(document.cookie);

// '_ga=GA1.1.1119525608.1663167970;
//   _ga_Q3E3XZ7RL7=GS1.1.1663167970.1.1.1663167975.0.0.0;
//   __gads=ID=a6487e8c79a9a1c1:T=1663167976:S=ALNI_Mb3EgK8SYnu51mYrWs2GwBhpSXesA'
class Cookie {
  static get(name) { // returns value of cookie
    const cookieName = `${encodeURIComponent(name)}=`;
    const cookie = document.cookie;
    let value = null;

    const startIndex = cookie.indexOf(cookieName);
    if (startIndex > -1) {
      let endIndex = cookie.indexOf(';', startIndex);
      if (endIndex == -1) {
        endIndex = cookie.length;
      }
      value = decodeURIComponent(
        cookie.substring(startIndex + cookieName.length, endIndex)
      );
    }
    console.log(value);
    return value;
  }

  static set(name, value, expires, path, domain, secure) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toGMTString()}`; // cookieText = cookieText + `; ${expires}`;
    }

    if (path) cookieText += `; path=${path}`;
    if (domain) cookieText += `; domain=${domain}`;
    if (secure) cookieText += `; secure`;

    document.cookie = cookieText;
  }

  static replacevalue(name, value) {
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  }

  static remove(name, path, domain, secure) {
    Cookie.set(name, '', new Date(0), path, domain, secure);
  }
}

console.log("cookie with name connetion (value): " + Cookie.get('connection'));


Cookie.set('connection2','2');
console.log("new cookie with name connetion2 (value): " + Cookie.get('connection2'));

Cookie.remove('connection1','/','http://127.0.0.1:5500/',false);
console.log("new cookie with name connetion1 (value): " + Cookie.get('connection1'));

// Cookie.set("username", "admin", expires, "", "google.lv");
// console.log("cookie with name connetion (value): " + Cookie.get("connection"));

var i = 1;
Cookie.set("connection", i, expires, "/");


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

// readTextFile("file:///C:/Users/Tatjana/Downloads/ccc.txt");

// https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_webstorage_local_clickcount
function clickCounter() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount)+1;
    } else {
      localStorage.clickcount = 1;
    }
    document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
  }
}