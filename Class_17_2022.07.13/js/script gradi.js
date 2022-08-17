

function convertDDToDMS(deg, lng){
  var d = parseInt(deg);
  var minfloat  = Math.abs((deg-d) * 60); 
  var m = Math.floor(minfloat);
  var secfloat = (minfloat-m)*60;
  var s = Math.round(secfloat); 
  d = Math.abs(d);

  if (s==60) {
      m++;
      s=0;
  }
  if (m==60) {
      d++;
      m=0;
  }

  return {
      dir : deg<0?lng?'W':'S':lng?'E':'N',
      deg : d,
      min : m,
      sec : s
  };
}

function coordToStrWithDecimals(coord)
{   
  let centiSecs = Math.round(Math.abs(coord) * 360000)
  let frac = Math.floor(centiSecs % 100)
  let seconds = Math.floor(centiSecs / 100)
  let sec = Math.floor(seconds % 60)
  let minutes = Math.floor(seconds / 60)
  let min = minutes % 60
  let deg = Math.floor(minutes / 60)
  return deg + "°" + ((min < 10) ? "0" : "") + min + "'" + ((sec < 10) ? "0" : "") + sec + "." + ((frac < 10) ? "0" : "") + frac + '"'
}