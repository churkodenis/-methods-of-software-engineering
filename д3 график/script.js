
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