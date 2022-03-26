var color="#000000";
var canvas;
var contexto;

var puntos = []; //arreglo de puntos para guardar las coordenadas de los puntos
var nuevos = []; //arrego para guardar los puntos del traslado



//la recta se define por dos puntos, el punto inicial de la recta
//ser� la posici�n donde se haga clic por primera vez y el punto
//final estara definido por la ubicaci�n del segundo clic
var primerPunto=true;  //bandera para controlar los clics

function ponerPixel(contexto, x,y, color){
    contexto.fillStyle = color;
    contexto.fillRect(x, y, 1, 1);
} 


function dibujar(event){  //Esta funci�n se ejecuta cada que se hace clic sobre el lienzo

  canvas = document.getElementById("lienzo"); //accedemos al lienzo de dibujo
  contexto = canvas.getContext("2d"); //obtenemos el contexto 2d del lienzo

  if(primerPunto){  //Si es el primer clic, se lee el primer punto de la l�nea
    puntos.push({x:event.offsetX, y:event.offsetY});
    ponerPixel(contexto, puntos[puntos.length-1].x, puntos[puntos.length-1].y, color);
    primerPunto = false;
  }
  else{  //pintar l�nea
    lineaBresenham(puntos[puntos.length-1].x, puntos[puntos.length-1].y, event.offsetX, event.offsetY, contexto, color);
    puntos.push({x:event.offsetX, y:event.offsetY});
  }
  
}

//Implementaci�n del algoritmo de Bresenham para l�neas
function lineaBresenham(x0, y0, x1, y1, contexto, color){
   var dx = Math.abs(x1-x0);
   var dy = Math.abs(y1-y0);
   var sx = (x0 < x1) ? 1 : -1;
   var sy = (y0 < y1) ? 1 : -1;
   var err = dx-dy;

   //contexto.fillText( "(" + x1 + "," + y1 + ")", x1+4, y1);

   while(x0!=x1 || y0!=y1){
     ponerPixel(contexto, x0, y0, color);
     var e2 = 2*err;
     if (e2 >-dy){ err -= dy; x0  += sx; }
     if (e2 < dx){ err += dx; y0  += sy; }
   }
}


function repintar(){
  contexto.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 1; i < puntos.length; i++) {
    lineaBresenham(puntos[i-1].x, puntos[i-1].y, puntos[i].x, puntos[i].y, contexto, color);
    lineaBresenham(nuevospuntos[i-1].x, nuevospuntos[i-1].y, nuevospuntos[i].x, nuevospuntos[i].y, contexto, color);
  }
  
}

function cambiarColor(){ 
  color = document.getElementById("color").value; //obtenemos el color para pintar
  repintar();
}

function reiniciar(){ 
  puntos = [];
  repintar();
  nuevos = []; 
  primerPunto=true;
}

function verArreglo(){
  var info = "";
  for(var i = 0; i < puntos.length; i++) 
    info  += "punto "+i+": ("+puntos[i].x+","+puntos[i].y+")"+"\n";
  alert(info); 
}

function verArreglo2(){
  var info = "";
  for(var i = 0; i < nuevos.length; i++) 
    info  += "punto "+i+": ("+nuevos[i].x+","+nuevos[i].y+","+nuevos[i].n+")"+"\n";
  console.log(info); 
}

function Traslado(){
  dx = document.getElementById('dx').value; 
  dy = document.getElementById('dy').value; 
  for(var i = 0; i < puntos.length; i++) {
    var _x =   dx*1 + puntos[i].x*1; 
    var _y =   dy*1 + puntos[i].y*1; 
    var _n =   1;
    nuevos.push({x:_x, y:_y, n:_n});  
  }
  primerPunto = true; 
  dibujo(); 
}

function Escalado(){
  sx = document.getElementById('sx').value;  
  sy = document.getElementById('sy').value; 
  for(var i = 0; i < puntos.length; i++) {
    var _x =   sx * puntos[i].x; 
    var _y =   sy * puntos[i].y; 
    var _n =   1;
    nuevos.push({x:_x, y:_y, n:_n});  
  } 
  primerPunto = true; 
  dibujo();
}

function Rotado(){
  var angulo = document.getElementById('angulo').value;  
  var seno = (Math.sin(angulo * (Math.PI / 180))) ; 
  var coseno = (Math.cos(angulo * (Math.PI / 180))); 
  coseno = coseno.toFixed(2);
  seno = seno.toFixed(2);
  for(var i = 0; i < puntos.length; i++) {
    var _x =   (coseno * puntos[i].x) + (seno * -1 * puntos[i].y); 
    var _y =   (seno * puntos[i].x) + (coseno * puntos[i].y); 
    var _n =   1;
    _x =   _x.toFixed(2);
    _y =   _y.toFixed(2);
    _x =   Math.round(_x);
    _y =   Math.round(_y);
    _n =   1;
    nuevos.push({x:_x, y:_y, n:_n});  
  } 
  verArreglo(); 
  verArreglo2();
  primerPunto = true; 
  dibujo();
}

function dibujo(){
  canvas = document.getElementById("lienzo"); //accedemos al lienzo de dibujo
  contexto = canvas.getContext("2d"); //obtenemos el contexto 2d del lienzo
  for (var index = 0; index < nuevos.length; index++) {
    if(primerPunto){  //Si es el primer clic, se lee el primer punto de la l�nea
      ponerPixel(contexto, nuevos[index].x, nuevos[index].y, color);
      primerPunto = false;
    }
    else{  //pintar l�nea
      lineaBresenham(nuevos[index-1].x, nuevos[index-1].y, nuevos[index].x, nuevos[index].y, contexto, color);
    }
  }
  primerPunto = true;
  nuevos = []; 
}






