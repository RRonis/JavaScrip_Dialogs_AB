window.name = 'original';

// atveram jaunu logu
let jsWindow = window.open(
  "http://127.0.0.1:5500/Class_20_2022.07.25/",
  "about",
  "height=600,width=800"
);

// atveram citu saiti
setTimeout(() => {
  window.open("http://127.0.0.1:5500/Class_18_2022.07.18/", "about");
}, 3000);

// nomainām window izmēru
setTimeout(() => {
  jsWindow.resizeTo(600, 300);
}, 6000);

// aizveram logu

/*
setTimeout(() => {
    jsWindow.close();
  }, 9000);
*/
/*
// atver jaunu Tab 
  setTimeout(() => {
    window.open("http://127.0.0.1:5500/Class_18_2022.07.18/", "_blank");
  }, 12000);
  */

  window.alert("Tas ir brīdinājums!!")