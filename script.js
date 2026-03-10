
const canvas = document.getElementById('plotCanvas');
const ctx = canvas.getContext('2d');


drawGrid();



function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

   
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
 
    ctx.beginPath(); 
    ctx.moveTo(0, canvas.height - 20); 
    ctx.lineTo(canvas.width, canvas.height - 20); 
    ctx.stroke();
  
    ctx.beginPath(); 
    ctx.moveTo(20, 0); 
    ctx.lineTo(20, canvas.height); 
    ctx.stroke();
}


 
function drawTrajectory() {
   
    const x0 = parseFloat(document.getElementById('x0').value) || 0;
    const y0 = parseFloat(document.getElementById('y0').value) || 0;
    const angleDeg = parseFloat(document.getElementById('angle').value) || 0;
    const v0 = parseFloat(document.getElementById('v0').value) || 0;
    const acceleration = parseFloat(document.getElementById('accel').value) || 0;
    const color = document.getElementById('color').value;

    
    const angleRad = angleDeg * Math.PI / 180;

   
    const startX = x0 + 20;
    const startY = (canvas.height - 20) - y0;

    ctx.fillStyle = color;


    for (let t = 0; t < 100; t += 0.2) {
        let distance = v0 * t + 0.5 * acceleration * t * t;

        
        let currentX = startX + distance * Math.cos(angleRad);
        let currentY = startY - distance * Math.sin(angleRad); 

        
        if (currentX > canvas.width || currentX < 0 || currentY > canvas.height || currentY < 0) {
            break; 
        }

        
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
}     