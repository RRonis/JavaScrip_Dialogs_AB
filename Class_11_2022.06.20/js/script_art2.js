var x=[1,4,2];
temp = null;

console.log("Pirms X masīvs: " + x[0]+" "+ x[1]+" "+ x[2]);

if (x[1]>x[0])
   {
    [x[0],x[1]] = [x[1],x[0]];
   }
if (x[2]>x[0])
   {
    x[0] = x[0] + x[2];
    x[2] = x[0] - x[2];
    x[0] = x[0] - x[2];
    }
if (x[2]>x[1])
    {
     x[1] = x[1] ^ x[2];
     x[2] = x[1] ^ x[2];
     x[1] = x[0] ^ x[2];
     }
     console.log("X masīvs pēc: " + x[0]+" "+ x[1]+" "+ x[2]);

// ar indeksu masīvu:

var y=[5,4,9,22,1,8];
const ind=[];
var i = 0;
var id = 0;
var sk = 0;
var parejie_id = 0;
var t;
len_y = y.length;

// nonullējam indeksu masīvu:
// for (i=0; i < len_y; i++) {
//    ind[i]=0;
//  }

console.log("Y masīvs: " + y);
console.log("Y masīva garums: " + len_y);
document.getElementById("y_masivs").innerHTML = "Masīva sākotnējās vērtības: " + y;

for (id = 0; id < len_y; id++) 
   {
      sk = 0; //skaitītājs,kas tiek +1 ja konkrētā y masīva vērtību ir > par citām y mas.vērtībām 
      parejie_id = 0; // vienmēr sākam salīdzināšanu ar 0 masīva vērtību
      for (; parejie_id < len_y ; parejie_id++)
      {
         if (y[id]>y[parejie_id]) 
         {
            sk=sk+1;
         }         
      }
      ind[id] = sk;
      // console.log("sk" + id + " " + sk);
   }
   console.log("Indeksu masīvs: " + ind);
   document.getElementById("ind_masivs").innerHTML = "Masīva vērtību indeksi: " + ind;

   console.log("Y masīvs augošā secībā: "); 
         for (i=0 ; i<len_y ; i++)
         {
            parejie_id=0;            
            for (;parejie_id < len_y ; parejie_id++)
               {
                  if (i==ind[parejie_id])
                     { 
                        t=y[parejie_id];
                        console.log(t);
                     }
                  else { t=88; }
               }
               
         } 