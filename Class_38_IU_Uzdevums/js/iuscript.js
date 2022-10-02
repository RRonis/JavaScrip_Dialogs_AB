const produkti = ["Asorti", "Bekona", "Garneļu tīģeris","Kebaba","Prošuto"];

// Izlasām local storage

// Ierakstam local storage saturu html

// FUNKCIJA pievienot pasūtijumu
btn.addEventListener('click',pievienot); // palaiž f-ciju pievienot
function pievienot() {
    localStorage.setItem("lastname", "Smith");
}


// FUNKCIJA izpidlīt pasūtījumu




window.onload=function(){
  var minusBtn = document.getElementById("minus"),
      plusBtn = document.getElementById("plus"),
      numberPlace = document.getElementById("numberPlace"),
      submitBtn = document.getElementById("submit"),
      number = 1, /// num vērtība
      min = 0, /// min limits
      max = 30; /// max limits

  // Saglabājam pasūtījumu prod+skaits local storage
  function SaveOrderData(productIndex, productPrice) {
      localStorage.setItem('selectedProductIndex', productIndex);
      localStorage.setItem('selectedProductPrice', productPrice);
  }
  const selectedProductIndex = localStorage.getItem('selectedProductIndex');
      
 
    izmest.onclick = function(){
        number = 0; /// nonullējam
        numberPlace.innerText = number ; /// aizsūtam 0 uz html
        alert("Vai vēlies atgriezties pie Piedāvājuma?");
        } 
         
  }
  submitBtn.onclick = function(){
    alert("Izvēlēts " + "Produkta ID " + "k-ktu skaits: " + number);
   }
  



