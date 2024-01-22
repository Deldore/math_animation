const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("can");
const ctx2 = canvas2.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mode = 0;
// 0 - sin, 1 - cos, 2 - tan
for(let i = 0; i < document.getElementsByClassName('btn').length; i++)
{
    let el = document.getElementsByClassName('btn')[i];
    el.style.left = 40*i+10+'px';
    el.onclick = function() {
        mode = i;
    }
}

 var position = 0, fps = 1500, time = 500;

// setInterval(build, 100);

// ---------- Main function ------------

function build() {
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    
    if(document.getElementById('number').value < 1) document.getElementById('number').value = 1;

    let k = document.getElementById('number').value, step = Math.ceil(5/k), y = window.innerHeight/2-step/2;
    
    ctx.beginPath()
    canvas_arrow(ctx, 0, window.innerHeight/2, window.innerWidth, window.innerHeight/2);
    ctx.stroke();
    ctx.beginPath()
    canvas_arrow(ctx, window.innerWidth/2, window.innerHeight, window.innerWidth/2, 0);
    ctx.stroke();
    
    switch(mode) {
        case 0:
            buildSin();
            break;
        case 1:
            buildCos();
            break;
        case 2:
            buildTan();
            break;
    }

    for(let i = (-1*Math.floor((window.innerWidth/2-(50/k))*k/window.innerWidth)); window.innerWidth/2+window.innerWidth/k*i-(50/k) <= window.innerWidth+(50/k); i++)
    {
        ctx.beginPath()
        ctx.fillStyle = 'black'
        ctx.fillRect(window.innerWidth/2+window.innerWidth/k*i-(25/k), window.innerHeight/2-(25/k), (50/k), (50/k))
        ctx.beginPath()
        ctx.fillStyle = 'red';
        ctx.font = 15+"px serif";
        ctx.fillText(i*2 + "π", window.innerWidth/2+window.innerWidth/k*i-15, window.innerHeight/2+15);
        // ctx.fillRect((window.innerWidth/2+window.innerWidth/k*i)/Math.PI-(25/k), window.innerHeight/2-(25/k), (50/k), (50/k))
    }
}

// ---------- Main Function -----------

function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10;
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }

  function buildSin() {
    let k = document.getElementById('number').value, step = Math.ceil(5/k), y = window.innerHeight/2-step/2, PI2 = Math.PI*2;

    for(let i = 0; i <= window.innerWidth; i+= Math.ceil(step/2))
    {
        ctx.beginPath()
        ctx.fillStyle = 'black'
        // if(y-Math.cos(2*Math.PI*((i-Math.ceil(step/2))-window.innerWidth/2)*k/window.innerWidth)*(window.innerWidth/k)/(2*Math.PI) >= 0)
        ctx.arc(i, y-Math.sin(PI2*(i-window.innerWidth/2)*k/window.innerWidth)*(window.innerWidth/k)/(PI2), step/2, 0, PI2, false);
        ctx.fill();
    }
  }
  function buildCos() {
    let k = document.getElementById('number').value, step = Math.ceil(5/k), y = (window.innerHeight-step)/2, PI2 = Math.PI*2;

    for(let i = 0; i <= window.innerWidth; i += Math.ceil(step/2))
    {
        ctx.beginPath()
        ctx.fillStyle = 'black'
        // if(y-Math.cos(2*Math.PI*((i-Math.ceil(step/2))-window.innerWidth/2)*k/window.innerWidth)*(window.innerWidth/k)/(2*Math.PI) >= 0)
        ctx.arc(i, y-Math.cos(PI2*(i-window.innerWidth/2)*k/window.innerWidth)*(window.innerWidth/k)/(PI2), step/2, 0, PI2, false);
        ctx.fill();
    }
  }
  
//   function buildCos() {
//     let k = document.getElementById('number').value, step = Math.ceil(5/k), y = (window.innerHeight-step)/2, PI2 = Math.PI*2;

//     for(let i = 0; i <= window.innerWidth; i += step)
//     {
//         ctx.beginPath()
//         ctx.fillStyle = 'black'
//         // if(y-Math.cos(2*Math.PI*((i-Math.ceil(step/2))-window.innerWidth/2)*k/window.innerWidth)*(window.innerWidth/k)/(2*Math.PI) >= 0)
//         ctx.arc(i, y-Math.cos(PI2*(i-window.innerWidth/2)*k/window.innerWidth)*(window.innerWidth/k)/(PI2), step, 0, PI2, false);
//         ctx.fill();
//     }
//   }

  function buildTan() {
    let k = document.getElementById('number').value, step = Math.ceil(5/k), y = window.innerHeight/2-step/2;

    for(let i = 0; i <= window.innerWidth; i+= Math.ceil(step/4))
    {
        ctx.beginPath()
        ctx.fillStyle = 'black'
        if(y-Math.tan(2*Math.PI*((i-Math.ceil(step/2))-window.innerWidth/2)*k/window.innerWidth)*(window.innerWidth/k)/(2*Math.PI) >= 0)
        {
            ctx.moveTo((i-Math.ceil(step/4))-step/2, y-Math.tan(2*Math.PI*((i-Math.ceil(step/2))-window.innerWidth/2)*k/window.innerWidth)*(window.innerWidth/k)/(2*Math.PI), step, step);
            ctx.lineTo(i-step/2, y-Math.tan(2*Math.PI*(i-window.innerWidth/2)*k/window.innerWidth)*(window.innerWidth/k)/(2*Math.PI), step, step);
        }
        ctx.stroke();
    }
  }

  function animation() {    
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let k = document.getElementById('number').value, step = Math.ceil(5/k), y = window.innerHeight/2-step/2, size = 75/k;

    let dx = (window.innerWidth+size*2)/(time/1000*fps), dy = 0;
    ctx.beginPath();
    // if (position%3 == 0) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    build();
    ctx.beginPath();
    let i = dx*position-size;
    if(i > window.innerWidth + size)
    {
        i = 0 - size;
        position = 0;
    }
    ctx.arc(dx*position - size, y-Math.cos(2*Math.PI*(i-window.innerWidth/2)*k/window.innerWidth)*(window.innerWidth/k)/(2*Math.PI), size, 0, 2*Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();

    // i = dx*(position-1)-100/k;
    // if(i > window.innerWidth + 100/k)
    // {
    //     i = 0 - 100/k;
    // }
    // ctx.beginPath()
    // ctx.arc((dx*(position-1)) - 100/k, y-Math.cos(2*Math.PI*(i-window.innerWidth/2)*k/window.innerWidth)*(window.innerWidth/k)/(2*Math.PI), 100/k, 0, 2*Math.PI, false);
    // ctx.fillStyle = 'yellow';
    // ctx.fill();
    
    position++;
}


function animation2() {    
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let k = document.getElementById('number').value, size = 30;

    for(let j = 0; j < k; j++) {
        let dx = 2*Math.PI/(time/1000*fps), dy = 0, radius = 120;
        ctx.beginPath();
        let i = dx*position + 2*Math.PI/k*j;
        ctx.arc(Math.cos(i)*radius+innerWidth/2, Math.sin(i)*radius+innerHeight/2, size, 0, 2*Math.PI, false);
        ctx.fillStyle = '#' + Number(Math.round(191/k*(j+1)) + 64).toString(16)+'0000';
        ctx.fill();
    }

    // let dx2 = (2*Math.PI)/(time/1000*fps);
    // ctx.beginPath();
    // let i2 = dx2*position + Math.PI*2/3;
    // ctx.arc(Math.cos(i2)*radius/k+innerWidth/2, Math.sin(i2)*radius/k+innerHeight/2, size, 0, 2*Math.PI, false);
    // ctx.fillStyle = 'red';
    // ctx.fill();
    
    // dx2 = (2*Math.PI)/(time/1000*fps);
    // ctx.beginPath();
    // i2 = dx2*position + Math.PI*4/3;
    // ctx.arc(Math.cos(i2)*radius/k+innerWidth/2, Math.sin(i2)*radius/k+innerHeight/2, size, 0, 2*Math.PI, false);
    // ctx.fillStyle = 'red';
    // ctx.fill();
    
    position++;
    // console.log(position + ' ' + dx*position);
}

function animation3() {    
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let k = document.getElementById('number').value, k2 = document.getElementById('number2').value, size = 30, radius = 80;
    let step = Math.ceil(5/k);
    let dx2 = (window.innerWidth+radius*2)/(time/1000*fps), dy = 0;

    let i2 = dx2*position-size;
    if(i2 > window.innerWidth + radius)
    {
        i2 = 0 - radius;
        position = 0;
    }

    let x = dx2*position - radius, y = (window.innerHeight/2-step/2)-Math.cos(2*Math.PI*(i2-window.innerWidth/2)*k/window.innerWidth)*(window.innerWidth/k)/(2*Math.PI);

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2*Math.PI, true);
    ctx.stroke();
    for(let j = 0; j < k2; j++) {
        let dx = 2*Math.PI/(time/1000*fps), dy = 0;
        ctx.beginPath();
        let i = dx*position + 2*Math.PI/k2*j;
        ctx.arc(Math.cos(i)*radius+x, Math.sin(i)*radius+y, size, 0, 2*Math.PI, false);
        ctx.fillStyle = '#' + Number(Math.round(191/k2*(j+1)) + 64).toString(16)+'0000';
        ctx.fill();
    }

    // let dx2 = (2*Math.PI)/(time/1000*fps);
    // ctx.beginPath();
    // let i2 = dx2*position + Math.PI*2/3;
    // ctx.arc(Math.cos(i2)*radius/k+innerWidth/2, Math.sin(i2)*radius/k+innerHeight/2, size, 0, 2*Math.PI, false);
    // ctx.fillStyle = 'red';
    // ctx.fill();
    
    // dx2 = (2*Math.PI)/(time/1000*fps);
    // ctx.beginPath();
    // i2 = dx2*position + Math.PI*4/3;
    // ctx.arc(Math.cos(i2)*radius/k+innerWidth/2, Math.sin(i2)*radius/k+innerHeight/2, size, 0, 2*Math.PI, false);
    // ctx.fillStyle = 'red';
    // ctx.fill();
    
    position++;
    // console.log(position + ' ' + dx*position);
}

canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

var deg1 = [], deg2 = [];

function animation4() {    

    let dx = 2*Math.PI/(time/1000*fps), radius = 150;
    ctx.beginPath();
    // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    deg1[position] = (dx+0.005)*position*Math.E;
    
    deg2[position] = (dx+0.005)*position*v*Math.E;
    position++;
    if(position == 3600000*fps) clearInterval(timer);
}

const radius = 167, radius2 = 250, v = 1, vk = Math.PI;

var x_old = innerWidth/2 + radius + radius2, y_old = innerHeight/2;
var shot = 1;
function compile() {
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let i = deg1[shot];
    ctx.strokeStyle = '#' + Number(Math.round(191*((position%300)/300)) + 64).toString(16)+'0000';
    ctx.moveTo(innerWidth/2, innerHeight/2);
    ctx.lineTo(Math.cos(i)*radius+innerWidth/2, Math.sin(i)*radius+innerHeight/2);
    ctx.stroke();
    // ctx.strokeStyle = '#00' + Number(Math.round(191*(i/Math.PI2)) + 64).toString(16)+'00';
    ctx.beginPath();
    ctx.strokeStyle = '#00' + Number(Math.round(191*((position%400)/400)) + 64).toString(16) +'00';
    i = deg2[shot]; 
    ctx.moveTo(Math.cos(i/v)*radius+innerWidth/2, Math.sin(i/v)*radius+innerHeight/2);
    ctx.lineTo(Math.cos(i*vk)*radius2+Math.cos(i/v)*radius+innerWidth/2, Math.sin(i*vk)*radius2+Math.sin(i/v)*radius+innerHeight/2);
    ctx.arc(Math.cos(i*vk)*radius2+Math.cos(i/v)*radius+innerWidth/2, Math.sin(i*vk)*radius2+Math.sin(i/v)*radius+innerHeight/2, 2, 0, Math.PI*2, 1);
    
    ctx.stroke();

    ctx2.beginPath()
    ctx2.strokeStyle = '#00' + Number(Math.round(191*((position%400)/400)) + 64).toString(16) +'00'
    ctx2.moveTo(x_old, y_old);
    ctx2.lineTo(Math.cos(i*vk)*radius2+Math.cos(i/v)*radius+innerWidth/2, Math.sin(i*vk)*radius2+Math.sin(i/v)*radius+innerHeight/2);
    
    ctx2.stroke();
    x_old = Math.cos(i*vk)*radius2+Math.cos(i/v)*radius+innerWidth/2;
    y_old = Math.sin(i*vk)*radius2+Math.sin(i/v)*radius+innerHeight/2;
    shot++;
    window.requestAnimationFrame(compile);
}
var timer;
window.onload = function() {
    timer = setInterval(animation4, 1);
    window.requestAnimationFrame(compile);
    // timer = setInterval(animation, 1000/fps); //set animation or animation2, animation3
}