// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 2000 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#viz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// In correct order
data.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
});

// List of groups (here I have one group per column)
var allGroup = ["Active","Engaged","Override","Load","Unplug"]

// add the options to the button
d3.select("#selectStatus")
    .selectAll('myOptions')
    .data(allGroup)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button


// A color scale: one color for each group
var myColor = d3.scaleOrdinal()
    .domain(allGroup)
    .range(d3.schemeSet2);

// Add X axis --> it is a date format
var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) {return d.date;}))
    .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
    .domain( [d3.min(data, function(d) { return d.status['Active']; }) - 5, d3.max(data, function(d) { return d.status['Active']; })+5])
    .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

// Initialize line with group a
var line = svg
    .append('g')
    .append("path")
    .datum(data)
    .attr("d", d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.status['Active']);})
    )
    .attr("stroke", function(d){ return myColor("Active")})
    .style("stroke-width", 4)
    .style("fill", "none");
    

// A function that update the chart
function update(selectedGroup) {

    var dataFilter = [];
    data.forEach(element => {
        if( selectedGroup in element['status']){
            dataFilter.push({date:element.date, value : element["status"][selectedGroup]})
        }
    });

    // Give these new data to update line
    line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
        .x(function(d) { return x(+d.date)})
        .y(function(d) { return y(+d.value)})
        )
        .attr("stroke", function(d){ return myColor(selectedGroup)})

}

// Listner
// When the ddl is changed, run the updateChart function
d3.select("#selectStatus").on("change", function(d) {

    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")
    // run the updateChart function with this selected option
    update(selectedOption)
})
