const canvas=document.getElementById("compass");

const ctx=canvas.getContext("2d");


let width;
let height;

let cx;
let cy;


// 手机方向角

let compassAngle=0;



function resize(){


width=window.innerWidth;

height=window.innerHeight;


canvas.width=
width*devicePixelRatio;


canvas.height=
height*devicePixelRatio;



ctx.scale(
devicePixelRatio,
devicePixelRatio
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



//
// 保存状态
//

ctx.save();


// 移动到中心

ctx.translate(
cx,
cy
);


// 旋转罗盘盘面

ctx.rotate(
-compassAngle*Math.PI/180
);



// 以下全部围绕中心绘制


drawCompass();


ctx.restore();





// 指针固定

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
260
);


drawCircle(
0,
0,
230
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



ctx.strokeStyle="#ddd";

ctx.lineWidth=2;


ctx.stroke();


}









function drawTicks(){


let r=245;



for(
let i=0;
i<360;
i++
){



let angle=
(i-90)
*Math.PI/180;



let len=
i%10===0?
20:
10;



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
"#777";



ctx.stroke();



}



}










function drawNumbers(){



ctx.font="18px Arial";

ctx.textAlign="center";

ctx.textBaseline="middle";



for(
let i=0;
i<360;
i+=10
){



let angle=
(i-90)
*Math.PI/180;



let r=205;



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



ctx.font="40px serif";


arr.forEach(item=>{


let angle=
(item[1]-90)
*Math.PI/180;



let r=150;



ctx.fillStyle=
item[1]==0?
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
-120
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



ctx.beginPath();



ctx.moveTo(
0,
120
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



ctx.fillStyle="black";


ctx.fill();





ctx.restore();



}










// 手机方向


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



draw();


}

);






window.addEventListener(
"resize",
resize
);



resize();