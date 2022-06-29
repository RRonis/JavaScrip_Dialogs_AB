// var browser = "Chrome";
// vai
// var browser=prompt("Ieraksti kāds browseris");

// console.log("Browseris: "+browser);

// variants ar switch
// switch (browser) {
//     case 'Edge':
//       alert( "You've got the Edge!" );
//       console.log("You've got the Edge!");
//       break;
  
//     case 'Chrome':
//     case 'Firefox':
//     case 'Safari':
//     case 'Opera':
//       alert( 'Okay we support these browsers too' );
//       console.log("Okay we support these browsers too");
//       break;
  
//     default:
//       alert( 'We hope that this page looks ok!' );
//       console.log("We hope that this page looks ok!")
//   }

// variants ar if===============================================================================

  // if (browser=="Edge"){
  //    alert("You have got Edge browser");
  //    if (browser=="Chrome" || browser=="Firefox" || browser=="Safari" || browser=="Opera")
  //    {
  //       alert("Okay we support these browsers too");
  //    }
  //   }
  //   else {
  //     alert("We hope that this page looks ok!")
  //   }

  const datums = new Date();
  console.log("Datums: " + datums);

  const datuma_teksts = datums.toLocaleString ('lv-LV',{timeZone: 'EET'});
  console.log ("Datuma_tests (ar lv-LV formātu): " + datuma_teksts);

  const datuma_teksta_garums = datuma_teksts.length;
  console.log ("Datuma_testa garums: " + datuma_teksta_garums);

  const laiks = datuma_teksts.substring(-8);
  const tikai_datums = datuma_teksts.substring(0,10);

  document.getElementById("CurrentDay").innerHTML = document.getElementById("CurrentDay").innerHTML + tikai_datums;
  document.getElementById("CurrentTime").innerHTML = document.getElementById("CurrentTime").innerHTML + laiks;