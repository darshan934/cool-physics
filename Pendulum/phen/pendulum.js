

var colorBackground = "#ffff00";                           
var colorClock1 = "#808080";                               
var colorClock2 = "#000000";                               
var colorClock3 = "#ff0000";                               
var colorElongation = "#ff0000";                           
var colorVelocity = "#ff00ff";                             
var colorAcceleration = "#0000ff";                         
var colorForce = "#008020";                                
var colorBody = "#ffffff";                                 



var DEG = Math.PI/180;                                     
var ax = 120, ay = 30;                                     
var xD = 260;                                              
var yD1 = 180, yD2 = 165;                                  
var FONT1 = "normal normal bold 12px sans-serif";          
var tPix = 20;                                             

// Attribute:

var canvas, ctx;                                           
var width, height;                                         
var bu1, bu2;                                              
var cbSlow;                                                
var ipL, ipG, ipM, ipA;                                    
var rbY, rbV, rbA, rbF, rbE;                               
var on;                                                    
var slow;                                                 
var t0;                                                    
var t;                                                    
var tU;                                                   
var l;                                                     
var lPix;                                                  
var g;                                                     
var m;                                                     
var omega;                                                
var tPer;                                                  
var phi;                                                   
var sinPhi, cosPhi;                                        
var alpha0;                                                
var alpha;                                                 
var sinAlpha, cosAlpha;                                    
var yPix;                                                  
var px, py;                                                
var nrSize;                                                



function getElement (id, text) {
  var e = document.getElementById(id);                     
  if (text) e.innerHTML = text;                            
  return e;                                                
  } 

// Start:

function start () {
  canvas = getElement("cv");                               
  width = canvas.width; height = canvas.height;            
  ctx = canvas.getContext("2d");                           
  bu1 = getElement("bu1",text01);                          
  bu2 = getElement("bu2",text02[0]);                       
  bu2.state = 0;                                           
  cbSlow = getElement("cbSlow");                           
  cbSlow.checked = false;                                  
  getElement("lbSlow",text03);                             
  getElement("ipLa",text04);                               
  ipL = getElement("ipLb");                                
  getElement("ipLc",meter);                                
  var ipgx = getElement("ipGx");                           
  if (ipgx) ipgx.innerHTML = text05x;                      
  getElement("ipGa",text05);                               
  ipG = getElement("ipGb");                                
  getElement("ipGc",meterPerSecond2);                      
  getElement("ipMa",text06);                               
  ipM = getElement("ipMb");                                
  getElement("ipMc",kilogram);                             
  getElement("ipAa",text07);                               
  ipA = getElement("ipAb");                                
  getElement("ipAc",degree);                               
  rbY = getElement("rbY");                                 
  getElement("lbY",text08);                                
  rbY.checked = true;                                      
  rbV = getElement("rbV");                                 
  getElement("lbV",text09);                                
  rbA = getElement("rbA");                                 
  getElement("lbA",text10);                                
  rbF = getElement("rbF");                                 
  getElement("lbF",text11);                                
  rbE = getElement("rbE");                                 
  getElement("lbE",text12);                                
  getElement("author",author);                             

  l = 5;                                                   
  g = 9.81;                                                
  m = 1;                                                   
  alpha0 = 0*DEG;                                         
  updateInput();                                          
  calculation();                                          
    
  on = false;                                             
  slow = false;                                           
  t = 0;                                                  
  t0 = new Date();                                        
  setInterval(paint,40);                                  
  
  bu1.onclick = reactionReset;                            
  bu2.onclick = reactionStart;                            
  cbSlow.onclick = reactionSlow;                          
  ipL.onkeydown = reactionEnter;                          
  ipG.onkeydown = reactionEnter;                           
  ipM.onkeydown = reactionEnter;                           
  ipA.onkeydown = reactionEnter;                           
  rbY.onclick = reactionRadioButton;                       
  rbV.onclick = reactionRadioButton;                       
  rbA.onclick = reactionRadioButton;                       
  rbF.onclick = reactionRadioButton;                       
  rbE.onclick = reactionRadioButton;                       
  nrSize = 0;                                              
    
  } 

  
function setButton2State (st) {
  bu2.state = st;                                          
  bu2.innerHTML = text02[st];                              
  }
  

  
function switchButton2 () {
  var st = bu2.state;                                      
  if (st == 0) st = 1;                                     
  else st = 3-st;                                          
  setButton2State(st);                                     
  }
  


function enableInput (p) {
  ipL.readOnly = !p;                                       
  ipG.readOnly = !p;                                       
  ipM.readOnly = !p;                                       
  ipA.readOnly = !p;                                       
  }
  


   
function reactionReset () {
  setButton2State(0);                                      
  enableInput(true);                                       
  t = tU = 0;                                              
  on = false;                                              
  slow = cbSlow.checked;                                   
  reaction();                                              
  paint();                                                 
  }
  



function reactionStart () {
  if (bu2.state != 1) t0 = new Date();                     
  switchButton2();                                         
  enableInput(false);                                      
  on = (bu2.state == 1);                                   
  slow = cbSlow.checked;                                   
  reaction();                                              
  paint();                                                 
  }
  


function reactionSlow () {
  slow = cbSlow.checked;                                   
  }
  


function reaction () {
  input();                                                
  calculation();                                          
  }
  

  
function reactionEnter (e) {
  if (e.key && String(e.key) == "Enter"                    
  || e.keyCode == 13)                                      
    reaction();                                            
  paint();                                                 
  }


function reactionRadioButton () {
  if (rbY.checked) nrSize = 0;                             
  else if (rbV.checked) nrSize = 1;                        
  else if (rbA.checked) nrSize = 2;                        
  else if (rbF.checked) nrSize = 3;                        
  else nrSize = 4;                                         
  }

//-------------------------------------------------------------------------------------------------




function calculation () {
  omega = Math.sqrt(g/l);                                  
  tPer = 2*Math.PI/omega;                                  
  lPix = 25*l;                                             
  }
  





function ToString (n, d, fix) {
  var s = (fix ? n.toFixed(d) : n.toPrecision(d));         
  return s.replace(".",decimalSeparator);                  
  }
  


  
function inputNumber (ef, d, fix, min, max) {
  var s = ef.value;                                       
  s = s.replace(",",".");                                  
  var n = Number(s);                                      
  if (isNaN(n)) n = 0;                                    
  if (n < min) n = min;                                   
  if (n > max) n = max;                                   
  ef.value = ToString(n,d,fix);                           
  return n;                                               
  }
   



function input () {
  l = inputNumber(ipL,3,true,0.5,10);                     
  g = inputNumber(ipG,2,true,1,100);                      
  m = inputNumber(ipM,3,true,1,10);                       
  alpha0 = DEG*inputNumber(ipA,1,true,0,20);              
  }
  


function updateInput () {
  ipL.value = ToString(l,3,true);                          
  ipG.value = ToString(g,2,true);                          
  ipM.value = ToString(m,3,true);                          
  ipA.value = ToString(alpha0/DEG,1,true);                 
  }
   
//-------------------------------------------------------------------------------------------------



function newPath () {
  ctx.beginPath();                                         
  ctx.strokeStyle = "#000000";                             
  ctx.lineWidth = 1;                                       
  }







function rectangle (x, y, w, h, c) {
  if (c) ctx.fillStyle = c;                                
  newPath();                                               
  ctx.fillRect(x,y,w,h);                                   
  ctx.strokeRect(x,y,w,h);                                 
  }
  





function circle (x, y, r, c) {
  if (c) ctx.fillStyle = c;                                
  newPath();                                               
  ctx.arc(x,y,r,0,2*Math.PI,true);                         
  ctx.fill();                                              
  ctx.stroke();                                            
  }
  


function pendulum () {
  alpha = alpha0*cosPhi;                                   
  sinAlpha = Math.sin(alpha);                              
  cosAlpha = Math.cos(alpha);                              
  px = ax+lPix*sinAlpha;                                   
  py = ay+lPix*cosAlpha;                                   
  newPath();                                               
  ctx.moveTo(ax,ay);                                       
  ctx.lineTo(px,py);                                       
  ctx.closePath();                                         
  ctx.stroke();                                            
  circle(px,py,5,colorBody);                               
  }
  


function clock (x, y) {
  rectangle(x-60,y-16,120,32,colorClock1);                 
  rectangle(x-50,y-10,100,20,colorClock2);                 
  ctx.fillStyle = "#ff0000";                               
  ctx.font = "normal normal bold 16px monospace";          
  ctx.textAlign = "center";                                
  var n = Math.floor(t/1000);                              
  var s = (t-n*1000).toFixed(3)+" "+second;                
  s = s.replace(".",decimalSeparator);                     
  while (s.length < 9) s = " "+s;                          
  ctx.fillText(s,x,y+5);                                   
  }
  

function arrow (x1, y1, x2, y2, w) {
  if (!w) w = 1;                                           
  var dx = x2-x1, dy = y2-y1;                              
  var length = Math.sqrt(dx*dx+dy*dy);                     
  if (length == 0) return;                                 
  dx /= length; dy /= length;                              
  var s = 2.5*w+7.5;                                       
  var xSp = x2-s*dx, ySp = y2-s*dy;                        
  var h = 0.5*w+3.5;                                       
  var xSp1 = xSp-h*dy, ySp1 = ySp+h*dx;                    
  var xSp2 = xSp+h*dy, ySp2 = ySp-h*dx;                    
  xSp = x2-0.6*s*dx; ySp = y2-0.6*s*dy;                    
  ctx.beginPath();                                         
  ctx.lineWidth = w;                                       
  ctx.moveTo(x1,y1);                                       
  if (length < 5) ctx.lineTo(x2,y2);                       
  else ctx.lineTo(xSp,ySp);                                
  ctx.stroke();                                            
  if (length < 5) return;                                  
  ctx.beginPath();                                         
  ctx.fillStyle = ctx.strokeStyle;                         
  ctx.moveTo(xSp,ySp);                                     
  ctx.lineTo(xSp1,ySp1);                                   
  ctx.lineTo(x2,y2);                                       
  ctx.lineTo(xSp2,ySp2);                                   
  ctx.closePath();                                         
  ctx.fill();                                             
  }
  

  
function arrowPendulum (r, phi) {
  var x = px+r*Math.cos(phi);                              
  var y = py-r*Math.sin(phi);                              
  arrow(px,py,x,y,3);                                      
  }
  


function alignText (s, t, x, y) {
  ctx.font = FONT1;                                        
  if (t == 0) ctx.textAlign = "left";                      
  else if (t == 1) ctx.textAlign = "center";               
  else ctx.textAlign = "right";                            
  ctx.fillText(s,x,y);                                     
  }
  

  
function horizontalAxis (x, y) {
  ctx.strokeStyle = "#000000";                             
  arrow(x-20,y,x+240,y);                                   
  alignText(symbolTime,1,x+230,y+15);                      
  alignText(text21,1,x+230,y+27);                          
  var t0 = Math.ceil(tU);                                  
  var x0 = Math.round(x+tPix*(t0-tU));                     
  for (i=0; i<=10; i++) {                                  
    var xs = x0+i*tPix;                                    
    ctx.moveTo(xs,y-3); ctx.lineTo(xs,y+3);                
    if (xs >= x+5 && xs <= x+215                           
    && (t0+i <= 100 || (t0+i)%2 == 0))                    
      alignText(""+(t0+i),1,xs,y+13);                      
    }
  ctx.stroke();                                           
  }
    

  
function verticalAxis (x, y, yLow, yHigh, maxSI) {
  var pot10 = Math.pow(10,Math.floor(Math.log(maxSI)/Math.LN10));   
  var q = maxSI/pot10;                                     
  var n;                                                   
  if (q > 5) n = 10; else if (q > 2) n = 5; else n = 2;    
  ctx.strokeStyle = "#000000";                             
  arrow(x,yLow,x,yHigh);                                   
  var n0 = (nrSize<4 ? -n : 0);                            
  ctx.beginPath();                                         
  for (i=n0; i<=n; i++) {                                  
    var ys = y-i*100/n;                                    
    ctx.moveTo(x-3,ys); ctx.lineTo(x+3,ys);                
    var s = Number(i*pot10).toPrecision(1);                
    if (Math.abs(i*pot10) >= 10)                           
      s = ""+Math.round(i*pot10);                          
    s = s.replace(".",decimalSeparator);                   
    if ((n < 10 || i%2 == 0) && i != 0)                    
      alignText(s,2,x-3,ys+4);                             
    }
  ctx.stroke();                                            
  yPix = 100/n/pot10;                                      
  }
      


function sinus (x, y, per, ampl, xMin, xMax) {
  var omega = 2*Math.PI/per;                               
  newPath();                                               
  var xx = xMin;                                           
  ctx.moveTo(xx,y-ampl*Math.sin(omega*(xx-x)));            
  while (xx < xMax) {                                      
    xx++;                                                  
    ctx.lineTo(xx,y-ampl*Math.sin(omega*(xx-x)));          
    }
  ctx.stroke();                                            
  }
  


function diagram (type, x, y, yMax) {
  horizontalAxis(x,y);                                     
  verticalAxis(x,y,y+120,y-135,yMax);                      
  sinus(x-type*tPer*5-tU*tPix,y,tPer*tPix,yMax*yPix,x,x+200); 
  }
  

  
function drawMomVal (val, x, y, c) {
  x += (t-tU)*tPix; y -= val*yPix;                         
  circle(x,y,2,c);                                         
  }
  

  
function writeValue (s, v, u, n, x1, x2, y) {
  alignText(s+":",0,x1,y);                                 
  s = v.toPrecision(n);                                    
  s = s.replace(".",decimalSeparator);                     
  alignText(s+" "+u,0,x2,y);                               
  }
  

    
function centerTextIndex (s1, s2, x, y) {
  var w1 = ctx.measureText(s1).width;                      
  var w2 = ctx.measureText(s2).width;                      
  var x0 = x-(w1+w2)/2;                                    
  alignText(s1,0,x0,y);                                    
  alignText(s2,0,x0+w1+1,y+5);                             
  }
  


function drawElongation () {
  var sMax = l*alpha0;                                     
  var s = sMax*cosPhi;                                     
  diagram(1,xD,yD1,sMax);                                  
  alignText(symbolElongation,1,xD-25,yD1-130);             
  alignText(text22,1,xD-25,yD1-118);                       
  ctx.beginPath();                                         
  ctx.lineWidth = 3;                                       
  ctx.strokeStyle = colorElongation;                       
  var pos = (alpha >= 0);                                  
  var w0 = (pos ? Math.PI/2 : Math.PI/2-alpha);            
  var w1 = (pos ? Math.PI/2-alpha : Math.PI/2);            
  ctx.arc(ax,ay,lPix,w0,w1,true);                          
  ctx.stroke();                                            
  drawMomVal(s,xD,yD1,colorElongation);                    
  ctx.fillStyle = colorElongation;                         
  writeValue(text14,s,meterUnicode,3,xD,xD+200,height-50); 
  writeValue("("+text13,sMax,meterUnicode+")",3,xD,xD+200,height-30); 
  }
  


function drawVelocity () {
  var vMax = l*alpha0*omega;                               
  var v = -vMax*sinPhi;                                    
  diagram(2,xD,yD1,vMax);                                  
  alignText(symbolVelocity,1,xD-28,yD1-130);               
  alignText(text23,1,xD-28,yD1-118);                       
  ctx.strokeStyle = colorVelocity;                         
  arrowPendulum(v*yPix,alpha0*cosPhi);                     
  drawMomVal(v,xD,yD1);                                    
  ctx.fillStyle = colorVelocity;                           
  writeValue(text15,v,meterPerSecond,3,xD,xD+200,height-50);    
  writeValue("("+text13,vMax,meterPerSecond+")",3,xD,xD+200,height-30); 
  }
  

function drawAcceleration () {
  var aMax = l*alpha0*omega*omega;                         
  var a = -aMax*cosPhi;                                    
  diagram(3,xD,yD1,aMax);                                  
  centerTextIndex(symbolAcceleration,symbolTangential,xD-30,yD1-130);
  alignText(text24,1,xD-30,yD1-113);                      
  ctx.strokeStyle = colorAcceleration;                    
  arrowPendulum(a*yPix,alpha0*cosPhi);                    
  drawMomVal(a,xD,yD1);                                   
  ctx.fillStyle = colorAcceleration;                      
  var mps2 = meterPerSecond2Unicode;   
  writeValue(text16,a,mps2,3,xD-30,xD+220,height-50);     
  writeValue("("+text13,aMax,mps2+")",3,xD-30,xD+220,height-30);
  }
      


  
function drawForce () {
  var fMax = m*l*alpha0*omega*omega;                       
  var f = -fMax*cosPhi;                                    
  diagram(3,xD,yD1,fMax);                                  
  centerTextIndex(symbolForce,symbolTangential,xD-30,yD1-130);
  alignText(text25,1,xD-30,yD1-113);                    
  ctx.strokeStyle = colorForce;                            
  arrowPendulum(f*yPix,alpha0*cosPhi);                   
  drawMomVal(f,xD,yD1);                                  
  ctx.fillStyle = colorForce;                              
  writeValue(text17,f,newton,3,xD-30,xD+220,height-50);    
  writeValue("("+text13,fMax,newton+")",3,xD-30,xD+220,height-30);   
  }
      


function diagramEnergy (x, y, e) {
  horizontalAxis(x,y);                                    
  verticalAxis(x,y,y+20,y-125,e);                          
  var x1 = x+200;                                         
  var y1 = y-e*yPix;                                       
  ctx.beginPath();                                        
  ctx.moveTo(x,y1); ctx.lineTo(x1,y1);                     
  ctx.stroke();                                            
  var xx = x-tU*tPix;                                      
  var per = tPer*10;                                       
  var ampl = e*yPix/2;                                     
  sinus(xx-tPer*2.5,y-ampl,per,ampl,x,x+200);              
  sinus(xx-tPer*7.5,y-ampl,per,ampl,x,x+200);              
  }
      

function drawEnergy () {
  var e = l*alpha0*omega; e = m*e*e/2;                     
  var part = cosPhi*cosPhi;                                
  var eP = e*part, eK = e-eP;                              
  diagramEnergy(xD,yD2,e);                                 
  centerTextIndex(symbolEnergy,symbolPotential,xD-30,yD2-125);
  alignText(text26,1,xD-30,yD2-108);                       
  centerTextIndex(symbolEnergy,symbolKinetic,xD+30,yD2-125);    
  alignText(text26,1,xD+30,yD2-108);                       
  ctx.fillStyle = colorElongation;                         
  writeValue(text18,eP,joule,3,xD,xD+200,height-70);       
  ctx.fillStyle = colorVelocity;                           
  writeValue(text19,eK,joule,3,xD,xD+200,height-50);       
  ctx.fillStyle = "#000000";                               
  writeValue(text20,e,joule,3,xD,xD+200,height-30);        
  var dy = part*100;                                       
  rectangle(300,205,50,dy,colorElongation);                
  if (part > 0.001 || on)                                  
    alignText(text18,0,360,220);                           
  rectangle(300,205+dy,50,100-dy,colorVelocity);           
  if (part < 0.999 || on)                                  
    alignText(text19,0,360,300);                           
  drawMomVal(eP,xD,yD2,colorElongation);                   
  drawMomVal(eK,xD,yD2,colorVelocity);                     
  }


  
function paint () {
  ctx.fillStyle = colorBackground;                         
  ctx.fillRect(0,0,width,height);                          
  rectangle(ax-50,ay-5,100,5,"#000000");                   
  if (on) {                                                
    var t1 = new Date();                                   
    var dt = (t1-t0)/1000;                                 
    if (slow) dt /= 10;                                    
    t += dt;                                               
    t0 = t1;                                               
    }
  tU = (t<5 ? 0 : t-5);                                    
  phi = omega*t;                                           
  sinPhi = Math.sin(phi); cosPhi = Math.cos(phi);          
  pendulum();                                              
  clock(ax,340);                                           
  switch (nrSize) {                                        
    case 0: drawElongation(); break;                       
    case 1: drawVelocity(); break;                         
    case 2: drawAcceleration(); break;                     
    case 3: drawForce(); break;                            
    case 4: drawEnergy(); break;                           
    }
  var s = text27+":  "+tPer.toPrecision(3)+" "+second;     
  s = s.replace(".",decimalSeparator);                     
  ctx.fillStyle = "#000000";                               
  alignText(s,1,ax,height-30);                             
  }
  
document.addEventListener("DOMContentLoaded",start,false); 

