let records=[];

const DB_KEY="compass_records";



const canvas =
document.getElementById("compass");


const ctx =
canvas.getContext("2d");


let tip=
document.getElementById("tip");


tip.innerHTML=
"保存数据成功（第"+records.length+"条）";


setTimeout(()=>{

tip.innerHTML="";

},2000);



let width;
let height;

let cx;
let cy;



let compassAngle=0;

let currentAngle=0;



let records=[];



function resize(){


width=window.innerWidth;

height=window.innerHeight;


const dpr=devicePixelRatio;


canvas.width=
width*dpr;

canvas.height=
height*dpr;


canvas.style.width=
width+"px";

canvas.style.height=
height+"px";


ctx.setTransform(
dpr,
0,
0,
dpr,
0,
0
);



cx=width/2;

cy=height/2;


draw();


}




function draw(){


ctx.clearRect(
0,
0,
width,
height
);



drawBackground();



ctx.save();



ctx.translate(
cx,
cy
);



ctx.rotate(
-compassAngle*Math.PI/180
);



drawCompass();



ctx.restore();



drawPointer();



}






function drawBackground(){

ctx.fillStyle="#111";

ctx.fillRect(
0,
0,
width,
height
);


}






function drawCompass(){



drawCircle(
0,
0,
150
);


drawTicks();


drawNumbers();


drawDirection();


}







function drawCircle(x,y,r){


ctx.beginPath();


ctx.arc(
x,
y,
r,
0,
Math.PI*2
);



ctx.strokeStyle="white";

ctx.lineWidth=2;

ctx.stroke();


}









function drawTicks(){


let r=140;



for(
let i=0;
i<360;
i++
){


let angle=
(i-90)*Math.PI/180;



let len=
i%10===0?
18:
7;



ctx.beginPath();



ctx.moveTo(

Math.cos(angle)*r,

Math.sin(angle)*r

);



ctx.lineTo(

Math.cos(angle)*(r-len),

Math.sin(angle)*(r-len)

);



ctx.strokeStyle=
i%10===0?
"white":
"#666";



ctx.stroke();


}



}









function drawNumbers(){



ctx.font="16px Arial";

ctx.textAlign="center";

ctx.textBaseline="middle";



for(
let i=0;
i<360;
i+=10
){


let angle=
(i-90)*Math.PI/180;


let r=115;



ctx.fillStyle=
i===0?
"red":
"white";



ctx.fillText(

i,

Math.cos(angle)*r,

Math.sin(angle)*r

);


}



}








function drawDirection(){


let arr=[

["北",0],
["东",90],
["南",180],
["西",270]

];



ctx.font="35px serif";



arr.forEach(item=>{


let angle=
(item[1]-90)
*Math.PI/180;



let r=80;



ctx.fillStyle=
item[1]===0?
"red":
"white";



ctx.fillText(

item[0],

Math.cos(angle)*r,

Math.sin(angle)*r

);



});


}









function drawPointer(){


ctx.save();


ctx.translate(
cx,
cy
);



ctx.beginPath();


ctx.moveTo(
0,
-70
);


ctx.lineTo(
-15,
0
);


ctx.lineTo(
15,
0
);


ctx.closePath();



ctx.fillStyle="red";

ctx.fill();




ctx.restore();



}









window.addEventListener(
"deviceorientation",
function(e){



if(e.webkitCompassHeading){


compassAngle=
e.webkitCompassHeading;


}

else{


compassAngle=
360-e.alpha;


}



currentAngle=
compassAngle;



document.getElementById("angle")
.innerHTML=
currentAngle.toFixed(2);



draw();


}

);









document.getElementById("save")
.onclick=function(){


let now=
new Date();



records.push({

time:
now.toLocaleString(),

angle:
Number(
currentAngle.toFixed(2)
)

});


console.log(records);



};









document.getElementById("export")
.onclick=function(){


let data=
JSON.stringify(
records,
null,
2
);



let blob=
new Blob(
[data],
{
type:"application/json"
}
);



let url=
URL.createObjectURL(blob);



let a=
document.createElement("a");



a.href=url;


a.download=
"compass_today.json";


a.click();


};









window.addEventListener(
"resize",
resize
);



resize();