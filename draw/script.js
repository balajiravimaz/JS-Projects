const canva = document.getElementById("canva");
const ctx = canva.getContext('2d');

const dec = document.getElementById("dec");
const inc = document.getElementById("inc");
const sizeVal = document.getElementById("size");

const colorVal = document.getElementById("color");

const clear =document.getElementById("clear");

let size = 20;
let isPressed = false;
let color = 'black';

 let x
 let y

colorVal.addEventListener("change", (e) => {
    color = e.target.value;
})

dec.addEventListener("click", ()=>{
    if(size <= 5){
        size +=5;
    }
    size -=5;
    sizeVal.innerText = size;
})

clear.addEventListener("click", ()=>{
    ctx.clearRect(0,0,canva.width,canva.height);
})

inc.addEventListener("click", ()=> {
    if(size >= 40){
        size=0;
    }
    size +=5;
    sizeVal.innerText = size;
})

canva.addEventListener("touchstart", (e)=>{
    console.log("Touch Started");
    x =e.offsetX;
    y =e.offsetY;
});
canva.addEventListener("touchmove", (e)=>{
    let rect = canva.getBoundingClientRect();

    const x2 = e.touches[0].clientX - rect.left;    
    const y2 = e.touches[0].clientY - rect.top;        
    
    const canvasRelativeX = x2 * canva.width / rect.width;
    const canvasRelativeY = y2 * canva.height / rect.height;

    drawCircle(canvasRelativeX, canvasRelativeY);
    line(x,y,canvasRelativeX,canvasRelativeY);

    x = canvasRelativeX
    y = canvasRelativeY

});


canva.addEventListener("mousedown", (e) => {
    isPressed = true;
    x =e.offsetX;
    y =e.offsetY;
});
canva.addEventListener("mouseup", (e) => {
    isPressed = false;
    x = undefined;
    y = undefined;
});
canva.addEventListener("mousemove", (e) => {
    let rect = canva.getBoundingClientRect();
    if (isPressed) {
        const x2 = e.clientX - rect.left;
        const y2 = e.clientY - rect.top;
        const canvasRelativeX = x2 * canva.width / rect.width;
        const canvasRelativeY = y2 * canva.height / rect.height;

        drawCircle(canvasRelativeX, canvasRelativeY);
        line(x,y,canvasRelativeX, canvasRelativeY);

        x = canvasRelativeX;
        y = canvasRelativeY;
        
    }
})

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}


function line(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);

    ctx.strokeStyle = color;
    ctx.lineWidth = size *2;
    ctx.stroke();
}