// https://www.javascripttutorial.net/web-apis/javascript-cookies/

expires = new Date('2022-09-12T21:00:00.000');

const str = document.cookie;
if(str==''){
  console.log('No cookie');
  i = 1;
  document.cookie = `connection=${i}; path=/; expires=${expires.toGMTString()}`;
  document.cookie = `cookie_name=cookie_value;`;
}
else{
  console.log("cookies: ",str);
  console.log("cookies (after split by connection=): ",str.split('connection='));
  //console.log("cookies (after split by connection=): ",str.split('connection=')[1]);
  i = (Number(str.split('connection=')[1]) ? Number(str.split('connection=')[1]) : 1) + 1;
  document.cookie = `connection=${i}; path=/; expires=${expires.toGMTString()}`;
  //console.log("cookies (after split by ;): ",str.split('connection=')[0].split(';'));
  //console.log(str.split('connection=')[0].split(';')[0]);
}

// document.cookie = `username=admin; path=/; expires=${expires.toGMTString()}`;
// let intervalID = setInterval(check_cookie, 1000);
function check_cookie(){
  var current = new Date();
  console.log(current);
  const str = document.cookie;
  console.log(str);
  if(str==''){
    clearInterval(intervalID);
  }
}