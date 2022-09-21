// https://codepen.io/baselakasha/pen/RZybYe

window.onload=function(){
  var minusBtn = document.getElementById("minus"),
      plusBtn = document.getElementById("plus"),
      numberPlace = document.getElementById("numberPlace"),
      submitBtn = document.getElementById("submit"),
      number = 1, /// num vērtība
      min = 0, /// min limits
      max = 30; /// max limits

  // Saglabājam izvēlēto k-ktu un daudzumu local storage
  function SaveOrderData(productIndex, productPrice) {
      localStorage.setItem('selectedProductIndex', productIndex);
      localStorage.setItem('selectedProductPrice', productPrice);
  }
  const selectedProductIndex = localStorage.getItem('selectedProductIndex');
      
  minusBtn.onclick = function(){
      if (number>min){
         number = number-1; /// Minus 1 of the number
         numberPlace.innerText = number ; /// Display the value in place of the number
         
      }
      if(number == min) {        
          numberPlace.style.color= "red";
          setTimeout(function(){numberPlace.style.color= "black"},800)
      }
      else {
        numberPlace.style.color="black";            
         }
              
  }
  plusBtn.onclick = function(){
      if(number<max){
         number = number+1;
         numberPlace.innerText = number ; 
      }     
      if(number == max){
             numberPlace.style.color= "red";
             setTimeout(function(){numberPlace.style.color= "black"},800)
      }
         
      else {
             numberPlace.style.color= "black";
             
      }
    izmest.onclick = function(){
        number = 0; /// nonullējam
        numberPlace.innerText = number ; /// aizsūtam 0 uz html
        alert("Vai vēlies atgriezties pie Piedāvājuma?");
        } 
         
  }
  submitBtn.onclick = function(){
    alert("Izvēlēts " + "Produkta ID " + "k-ktu skaits: " + number);
   }
  
}