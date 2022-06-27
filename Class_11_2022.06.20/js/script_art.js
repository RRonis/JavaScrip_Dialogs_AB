var f=2,
   d=3,
   e=1;

if (f>d && f>e)
   {
    console.log("Vislielākais ir f=" +f )
    if (d>e)
        {
          console.log("Nākamais ir d=" +d )
          console.log("Mazākais ir e=" +e )
        }
        else
        {
            console.log("Nākamais ir e=" +e )
            console.log("Mazākais ir d=" +d )
        }
    
   }
else if (d>e && d>e)
   {
    console.log("Vislielākais ir d=" +d )
    if (f>e)
        {
          console.log("Nākamais ir f=" +f )
          console.log("Mazākais ir e=" +e )
        }
        else 
        {
          console.log("Nākamais ir e=" +e )
          console.log("Mazākais ir f=" +f )
        }
   }
   else
   {
    console.log("Vislielākais ir e=" +e )
    if (d>f)
        {
          console.log("Nākamais ir d=" +d )
          console.log("Mazākais ir f=" +f )
        }
        else
        { 
          console.log("Nākamais ir f=" +f )
          console.log("Mazākais ir d=" +d )
        }
   }

   // 2. variants lai vienmēr skaitļi ir  a, b, c

   var  a = 5;
        b = 3;
        c = 1;
        temp=null;
        console.log(" sākotnējās vērtības a=" + a , "b=" + b, "c=" + c,)

   if (b > a)
        { 
            [a,b]=[b,a];
            // temp = a;
            // a = b;
            // b = temp;
            console.log("a=" + a , "b=" + b)
        }
    if (c > a)
        {

            a = a + c;
            c = a - c;
            a = a - c;
            console.log("a=" + a , "c=" + c)
        }
        if (c>b)
         {
            b=b+c;
            c=b-c;
            b=b-c;
            console.log("b=" + b , "c=" + c)
         }
    
//    }
// else if (d>e && d>e)
//    {
//     console.log("Vislielākais ir d=" +d )
//     if (c>e)
//         {
//           console.log("Nākamais ir c=" +c )
//           console.log("Mazākais ir e=" +e )
//         }
//         else 
//         {
//           console.log("Nākamais ir e=" +e )
//           console.log("Mazākais ir c=" +c )
//         }
//    }
//    else
//    {
//     console.log("Vislielākais ir e=" +e )
//     if (d>c)
//         {
//           console.log("Nākamais ir d=" +d )
//           console.log("Mazākais ir c=" +c )
//         }
//         else
//         { 
//           console.log("Nākamais ir c=" +c )
//           console.log("Mazākais ir d=" +d )
//         }
//    }
