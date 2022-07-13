// function dialogs() {
//   let teksts = prompt ("Ievadiet tekstu: ");
//   document.getElementById("ievad_teksts").innerHTML = teksts ;
// }

var teksts = prompt ("Ievadiet tekstu: ");
// teksts = "baigi interesantas nodarbības !";
var burtu_skaititajs = 0;
var simb_skait_teikuma = 0;
var derigo_vardu_skaits = 0;

var vardu_skaititajs = 1;
let N = 3;
  document.getElementById("ievad_teksts").innerHTML = teksts ;

  for (let x of teksts) {
    simb_skait_teikuma++; //skaita kuru simbolu naalizējam priekš pēdējā vārda
    if (x == " ") { 
      //console.log ( "ir atstarpe");
      //console.log ( "Iepriekšejā vārdā bija " + burtu_skaititajs + " burti");
      if (burtu_skaititajs >= N){
        derigo_vardu_skaits++;
        //console.log("+iepriekšējā vārdā bija vairāk nekā " + N + " burti");
      }
      // vardu_skaititajs++; 
      burtu_skaititajs = 0;
    }
    else {
      burtu_skaititajs++;
      // console.log(x + " tas ir " + burtu_skaititajs + ". simbols vārdā");
      if (simb_skait_teikuma == teksts.length) {
        // console.log ( "Iepriekšejā vārdā bija " + burtu_skaititajs + " burti");
        if (burtu_skaititajs >= N){
          derigo_vardu_skaits++;
          // console.log("+iepriekšējā vārdā bija vairāk nekā " + N + " burti");
          // console.log("Šis bija pēdējais vārds teikumā");
        }
      }
     }
  }

  document.getElementById("derigie_vardi").innerHTML = "Šajā teikumā ir " + derigo_vardu_skaits + " vārdi, kuru garums ir lielāls par " + N + " simboliem";

// dialogs();