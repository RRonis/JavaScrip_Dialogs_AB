console.log("Skripta izpildes sākums:\n" + new Date());
document.getElementById("manual_count").innerHTML = "manual count:<br>1<br>2<br>3<br>4<br>";


let text = "for classic:<br>";
// for ( ; ; ){}
// for ( sā - darbība_s ciklu uzsākot ; n - nosacījums_i cikla turpināšanai ; so - "soļa_u veikšana"){}
// sā -> n (nosacījums ir spēkā) -> {} -> so -> n (-"-) -> {} -> so -> n (nav spēka)
// pārējam pie nākamās darbības aiz cikla
for (let i = 1; i < 5; i++) {
  text = text + i + "<br>";
  if (i == 3) {
    break;
  }
}
document.getElementById("for_automatic_count_classic").innerHTML = text;


text = "for non-classic:<br>";
var i = 1;
for (; i < 5; ) {
  text = text + i + "<br>";
  i++;
}
document.getElementById("for_automatic_count_nonclassic").innerHTML = text;

text = "while:<br>";
var i = 1;
while (i < 5) {
  text = text + i + "<br>";
  i++;
}
document.getElementById("while_automatic_count").innerHTML = text;

text = "do while:<br>";
var i = 1;
do {
  text = text + i + "<br>";
  i++;
} while (i < 5 && i == 2 );
document.getElementById("do_while_automatic_count").innerHTML = text;

/*
a = Number(prompt("Cienījamais lietotāj, lūdzu, ievadi skitli: "));
switch (a)
{
    case (a % 2 == 0):
        console.log(a + " - dalās ar 2");
        break;
    default:
        console.log("default teksts");
}
*/

text = "";
var dalit = [2, 3, 4, 6, 8];

for (let dalam = 1; dalam < 26; dalam++) {
  let flag = 1;
  text = text + dalam;
  for (let k = 0; k < dalit.length; k++) {
    if (dalam % dalit[k] == 0) {
      if (flag == 1) {
        text = text + " dalās ar skaitli ";
        flag = 0;
      }
      text = text + dalit[k] + ",";
    }
  }

  if (flag == 0) {
    // ( flag != 1 )
    text = text.slice(0, text.length - 1);
  }

  if (dalam % 2 == 0) {
    text = text + " pāra skaitlis ";
  } else {
    text = text + " nepāra skaitlis ";
  }

  text = text + "<BR>";
}

document.getElementById(
  "for_automatic_count_until_25_denumerator_check"
).innerHTML = text;

/*
text += cars[0] + "<br>";
text = text + cars[0] + "<br>";
*/

/*
1
3
5
7
9
*/

/*
2
4
6
8
10
*/

/*
1 - nepāra skaitlis
2 - pāra skaitlis
3 - nepāra skaitlis
4 - pāra skaitlis
...
10 - pāra skaitlis
*/

/* dalīt ar (1), 2, 3, 5, 7
1
2 - dalās ar 2
3 - dalās ar 3
4 - dalās ar 2
5 - dalās ar 5
6 - dalās ar 2 3
7 - dalās ar 7
8 - dalās ar 2
9 - ...
...
15 - dalās ar 3 5
...
25 - dalās ar 5
*/
// 1. skaitīt no 1 līdz 25
// 2. pārbaudīt vai dalās ar 2 (3, 5, 7)
// => ņemt kārtējo skaitli un secīgi dalīt ar 2, 3, 5, 7