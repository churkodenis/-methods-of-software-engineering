
<<<<<<< HEAD
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
=======
const margin = {top: 20, right: 30, bottom: 40, left: 50};
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3.scaleLinear().domain([0, 1000]).range([0, width]);
const yScale = d3.scaleLinear().domain([0, 600]).range([height, 0]);

function drawAxes() {
    svg.selectAll(".axis").remove();
    svg.selectAll(".grid").remove();

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""));

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""));

    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(yScale));
}

drawAxes(); 

function addTrajectory() {
    const x0 = +document.getElementById('x0').value;
    const y0 = +document.getElementById('y0').value;
    const v0 = +document.getElementById('v0').value;
    const acceleration = +document.getElementById('accel').value;
    const angleRad = (+document.getElementById('angle').value) * Math.PI / 180;
    const color = document.getElementById('color').value;

    const points = [];

    for (let t = 0; t < 20; t += 0.2) {
        let S = v0 * t + 0.5 * acceleration * t * t;
        let px = x0 + S * Math.cos(angleRad);
        let py = y0 + S * Math.sin(angleRad);

        if (px > 1000 || py > 600 || px < 0 || py < 0) break;
        
        points.push({x: px, y: py});
    }

    const lineGenerator = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    svg.append("path")
        .datum(points)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", lineGenerator)
        .attr("stroke-dasharray", function() { return this.getTotalLength(); })
        .attr("stroke-dashoffset", function() { return this.getTotalLength(); })
        .transition() 
        .duration(1000)
        .attr("stroke-dashoffset", 0);

    svg.selectAll(".dot-" + Date.now()) 
        .data(points)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 2)
        .attr("fill", color)
        .style("opacity", 0)
        .transition()
        .delay((d, i) => i * 15)
        .style("opacity", 1);
}

function resetChart() {
    svg.selectAll("path").remove();
    svg.selectAll("circle").remove();
}
>>>>>>> 4bd6e11fc253d9fe05fe4c830c9a0efb27955141
