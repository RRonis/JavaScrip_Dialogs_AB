
a = 5;
console.log('sākotnējā a vērtība: ' + a);
document.getElementById("output").innerHTML = "sākotnējā a vērtība: "+a;

function myFunctionPl() {
    a=++a;
    document.getElementById("output").innerHTML = "jaunā a vērtība: "+a;
    console.log('jaunā a vērtība: '+a);
    }
function myFunctionMin() {
    a=--a;
    document.getElementById("output").innerHTML = "jaunā a vērtība: "+a;
    console.log('jaunā a vērtība: '+a);
    }

    
    


//console.log(435||0)
//document.getElementById("demo").innerHTML = 435||0 ;
   
    // function myFunction() {
    //     document.getElementById("demo").innerHTML = "Paragraph changed.";
    //     }