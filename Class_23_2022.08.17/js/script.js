// prompt
let adrese = window.prompt('Ievadi adresi', 'www.tvnet.lv');
// append adresi:
// location.href = adrese;
// location.replace(adrese); nestrādā jo tvnet.lv ir cits serveris!!!

//===========================================================================================

/* Window.Navigator
Avots: https://developer.mozilla.org/en-US/docs/Web/API/Navigator
The Navigator interface represents the state and the identity of the user agent. 
It allows scripts to query it and to register themselves to carry on some activities.
*/

// Mani 4 piemēri:

// 1. https://developer.mozilla.org/en-US/docs/Web/API/Navigator/product
// depreceted 'Gecko'
console.log(Navigator.product);

// 2. https://developer.mozilla.org/en-US/docs/Web/API/Navigator/productSub
console.log(Navigator.productSub);

// 3. https://developer.mozilla.org/en-US/docs/Web/API/Navigator/registerProtocolHandler
console.log(Navigator.registerProtocolHandler());

// 4. https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMediaKeySystemAccess
console.log(Navigator.RequestMediaKeySystemAccess());






//===========================================================================================

//Zemāk Piemērs ar mob ierīču os testēšanu lai ielādētu pareizo AppStore
/*
const apps = {
    Android: 'https://play.google.com/',
    iOS: 'https://www.apple.com/store',
  };
  
  const platform = () => {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) return 'Windows Phone';
    if (/android/i.test(userAgent)) return 'Android';
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 'iOS';
    return null;
  };
  
  const redirect = () => {
    let os = platform();
    if (os in apps) {
      location.replace(apps[os]);
    } else {
      const message = document.querySelector('.message');
      message.innerText = 'Your OS is not supported';
    }
  };
  
  redirect();

  */