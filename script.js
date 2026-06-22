/* =========================================
TRANSPORT
========================================= */

let playing=false;
let recording=false;
let seconds=0;

const playBtn=document.getElementById("play");
const stopBtn=document.getElementById("stop");
const pauseBtn=document.getElementById("pause");
const recordBtn=document.getElementById("record");

const counter=document.getElementById("mainCounter");

function updateCounter(){

let h=Math.floor(seconds/3600);

let m=Math.floor((seconds%3600)/60);

let s=seconds%60;

counter.innerHTML=

String(h).padStart(2,"0")+":"+

String(m).padStart(2,"0")+":"+

String(s).padStart(2,"0")+":00";

}


/* PLAY */

playBtn.onclick=()=>{

playing=true;

};


/* PAUSE */

pauseBtn.onclick=()=>{

playing=false;

};


/* STOP */

stopBtn.onclick=()=>{

playing=false;

seconds=0;

playheadPos=0;

playhead.style.left="0px";

updateCounter();

};


/* RECORD */

recordBtn.onclick=()=>{

recording=!recording;

if(recording){

recordBtn.style.background="#aa0000";

recordBtn.style.color="white";

}else{

recordBtn.style.background="";

recordBtn.style.color="";

}

};


/* CLOCK */

setInterval(()=>{

if(playing){

seconds++;

updateCounter();

}

},1000);



/* =========================================
CPU + DISK METERS
========================================= */

const cpuFill=document.querySelector(".cpuFill");

const diskFill=document.querySelector(".diskFill");

function animateSystemMeters(){

cpuFill.style.height=

Math.random()*100+"%";

diskFill.style.height=

Math.random()*100+"%";

requestAnimationFrame(

animateSystemMeters

);

}

animateSystemMeters();



/* =========================================
MASTER METERS
========================================= */

const masterFillL=

document.querySelector(

".masterFillL"

);

const masterFillR=

document.querySelector(

".masterFillR"

);

function animateMaster(){

masterFillL.style.height=

Math.random()*100+"%";

masterFillR.style.height=

Math.random()*100+"%";

requestAnimationFrame(

animateMaster

);

}

animateMaster();



/* =========================================
CHANNEL VU METERS
========================================= */

function animateVU(){

document

.querySelectorAll(

".fillL"

)

.forEach(v=>{

v.style.height=

Math.random()*100+"%";

});


document

.querySelectorAll(

".fillR"

)

.forEach(v=>{

v.style.height=

Math.random()*100+"%";

});


requestAnimationFrame(

animateVU

);

}

animateVU();



/* =========================================
MAIN COUNTER INIT
========================================= */

updateCounter();



console.log(

"Transport Ready"

);
/* =========================================
WAVEFORMS
========================================= */

const canvas1=document.getElementById("wave1");
const canvas2=document.getElementById("wave2");

const ctx1=canvas1.getContext("2d");
const ctx2=canvas2.getContext("2d");

function resizeCanvas(){

canvas1.width=canvas1.offsetWidth;
canvas1.height=canvas1.offsetHeight;

canvas2.width=canvas2.offsetWidth;
canvas2.height=canvas2.offsetHeight;

}

resizeCanvas();

window.addEventListener(
"resize",
resizeCanvas
);


function drawWave(ctx,color){

ctx.clearRect(
0,
0,
ctx.canvas.width,
ctx.canvas.height
);

ctx.strokeStyle=color;
ctx.lineWidth=1.5;

let center=
ctx.canvas.height/2;

ctx.beginPath();

for(let x=0;
x<ctx.canvas.width;
x++){

let y=

center+

Math.sin(x*0.04)*25+

Math.sin(x*0.12)*12+

(Math.random()-0.5)*7;

ctx.lineTo(x,y);

}

ctx.stroke();

}


function animateWaveforms(){

drawWave(
ctx1,
"#00ff66"
);

drawWave(
ctx2,
"#44b8ff"
);

requestAnimationFrame(
animateWaveforms
);

}

animateWaveforms();



/* =========================================
PLAYHEAD
========================================= */

const playhead=
document.getElementById(
"playhead"
);

let playheadPos=0;

function movePlayhead(){

if(playing){

playheadPos+=0.8;

playhead.style.left=
playheadPos+"px";

}

requestAnimationFrame(
movePlayhead
);

}

movePlayhead();



/* =========================================
ZOOM
========================================= */

const zoom=
document.getElementById(
"zoom"
);

zoom.addEventListener(
"input",
()=>{

let scale=
zoom.value;

document
.querySelectorAll(".clip")
.forEach(clip=>{

clip.style.width=
(1400*scale)+"px";

});

});
/* =========================================
DRAG CLIPS
========================================= */

document.querySelectorAll(".draggable")

.forEach(clip=>{

let dragging=false;
let offsetX=0;

clip.addEventListener(

"mousedown",

e=>{

dragging=true;

offsetX=e.offsetX;

}

);


document.addEventListener(

"mousemove",

e=>{

if(!dragging)return;

clip.style.left=

(e.pageX-offsetX)+"px";

}

);


document.addEventListener(

"mouseup",

()=>{

dragging=false;

}

);

});


/* =========================================
KNOBS
========================================= */

document

.querySelectorAll(".ssl-knob")

.forEach(knob=>{

let angle=-135;

knob.addEventListener(

"wheel",

e=>{

e.preventDefault();

if(e.deltaY<0){

angle+=5;

}else{

angle-=5;

}

angle=Math.max(
-135,
Math.min(
135,
angle
)
);

knob.querySelector(

".indicator"

).style.transform=

`translateX(-50%)
rotate(${angle}deg)`;

}

);

});


/* =========================================
BUTTONS
========================================= */

document

.querySelectorAll(

".solo-btn"

)

.forEach(btn=>{

btn.onclick=()=>{

btn.classList.toggle(

"active"

);

if(

btn.classList.contains(

"active"

)

){

btn.style.background=

"#ffd500";

btn.style.color=

"black";

}else{

btn.style.background=

"";

btn.style.color=

"";

}

};

});


document

.querySelectorAll(

".mute-btn"

)

.forEach(btn=>{

btn.onclick=()=>{

btn.classList.toggle(

"active"

);

if(

btn.classList.contains(

"active"

)

){

btn.style.background=

"#888";

}else{

btn.style.background=

"";

}

};

});


document

.querySelectorAll(

".rec-btn"

)

.forEach(btn=>{

btn.onclick=()=>{

btn.classList.toggle(

"active"

);

if(

btn.classList.contains(

"active"

)

){

btn.style.background=

"#ff0000";

}else{

btn.style.background=

"";

}

};

});
/* =========================================
REW + FF
========================================= */

document.getElementById(

"rewBtn"

).onclick=()=>{

seconds=Math.max(
0,
seconds-5
);

updateCounter();

};


document.getElementById(

"ffBtn"

).onclick=()=>{

seconds+=5;

updateCounter();

};


/* =========================================
SPACEBAR
========================================= */

window.addEventListener(

"keydown",

e=>{

if(

e.code==="Space"

){

e.preventDefault();

playing=!playing;

}

});


/* =========================================
LOOP REGION
========================================= */

const loopRegion=

document.getElementById(

"loop-region"

);

let loopStart=500;
let loopEnd=800;

function loopPlayback(){

if(

playheadPos>loopEnd

){

playheadPos=loopStart;

}

requestAnimationFrame(

loopPlayback

);

}

loopPlayback();


/* =========================================
BPM
========================================= */

let bpm=120;


/* =========================================
SESSION INFO
========================================= */

console.log(

"2 Track DAW Loaded"

);


/* =========================================
READY
========================================= */

console.log(

"Transport Ready"

);

console.log(

"Mixer Ready"

);

console.log(

"Waveforms Ready"

);

console.log(

"Meters Ready"

);
