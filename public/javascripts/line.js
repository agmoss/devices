var lineData = [];

// Get the active items (sample)
output.forEach(element => {
    if( "Active" in element['status']){
        lineData.push({date:new Date(element['date']),nps:element['status']['Active']})
    }
});

lineData.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
});

var height  = 800;
var width   = 2000;
var hEach   = 100;

var margin = {top: 20, right: 15, bottom: 25, left: 25};

width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;

var svg = d3.select('body').append("svg")
  .attr("width",  width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// set the ranges
var x = d3.scaleTime().range([0, width]);
  
x.domain(d3.extent(lineData, function(d) { return d.date; }));

var y = d3.scaleLinear().range([height, 0]);

// Y axis range
y.domain([d3.min(lineData, function(d) { return d.nps; }) - 5, d3.max(lineData, function(d) { return d.nps; })+5]);

var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.nps);  })
        .curve(d3.curveMonotoneX);

svg.append("path")
    .data([lineData]) 
    .attr("class", "line")  
    .attr("d", valueline); 

var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
//var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));

svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis_woy);

//  Add the Y Axis
svg.append("g").call(d3.axisLeft(y));

svg.selectAll(".dot")
    .data(lineData)
    .enter()
    .append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d) { return x(d.date) })
    .attr("cy", function(d) { return y(d.nps) })
    .attr("r", 5);  


svg.selectAll(".text")
    .data(lineData)
    .enter()
    .append("text") // Uses the enter().append() method
    .attr("class", "label") // Assign a class for styling
    .attr("x", function(d, i) { return x(d.date) })
    .attr("y", function(d) { return y(d.nps) })
    .attr("dy", "-5")
    .text(function(d) {return d.nps; });

svg.append('text')                                     
      .attr('x', 10)              
      .attr('y', -5)             
      .text('Sample'); 
