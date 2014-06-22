var svg = d3.select("svg"); // create the selector for this visualization, like $window ALWAYS

// make all your variables
var color = d3.scale.category20(); // this randomizes the color of the circles
var h = 505; // sets h to the height of the svg element
var w = screen.width; // width of the svg element
var padding = 80;

var dataset = [ // median household income, density, population
	[95313,10970,20624],[88976,5903,2058],[84710,22681,22903],[80959,1613,1453],[76044,13071,27897],[75727,22377,30574],
	[73571,954,2228],[66627,16630,42958],[63983,27861,38738],[61776,14397,42473],[61609,22073,38939],[61362,7126,17368],
	[60733,17435,55492],[57629,22097,73104],[56569,7017,3335],[55000,6473,26291],[54879,29462,33115],[54342,13071,40134],
	[53795,31344,74633],[43444,46521,56322],[40990,40118,26827],[37146,6631,33170],[31542,53134,13716],
	[31131,17140,23016],[22351,44719,28991],[14609,4598,374]
]

// add tooltip labels to the data points
var tooltip = d3.select("body")
	.append("div") // made a new div
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility","hidden") // hide it until called
	.text(d3.select("svg").data(dataset), function(d) {return d[1] + ", " + d[2]; }) // second and third elements
		.attr("class","text"); // add style

// var allData = d3.tsv("sfPopData.tsv", function(error, data) {
// 	
// });

// join data to svg DOM element
var circle = svg.selectAll("circle")
	.data(dataset);

// add svg elements with all the data to the DOM
circle.enter().append("circle") // add attributes radius and location on page
	.attr("cx", function(d) {return d[1]/(d3.max(dataset,function(d) {return d[1]; })/1000) + padding; })
	.attr("cy", function(d,i) {return d[2]/(d3.max(dataset,function(d) {return d[2]; })/300) + padding; })
	.attr("r", function(d) {return Math.sqrt(0.05*d[0]); })
	.attr("fill", function(d,i) {return color(i); }) // randomized color
	// tooltips
	.on("mouseover", function() {return tooltip.style("visibility", "visible"); }) // on mouseover call the tooltip
	.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
	.on("mouseout", function() {return tooltip.style("visibility", "hidden"); }); // on mouseout, hide the tooltip again

circle.exit() // if there isn't data for it, it fades away
	.transition()
	.duration(750)
	.attr("r", 0)
	.remove();

// let's add some axes
var axisScale = d3.scale.linear() // create the axis scale
	.domain([0, d3.max(dataset,function(d) {return d[1]; })]) // return second of pair
	.range([0,1000]); // width of svg element

var yAxisScale = d3.scale.linear() // create y axis scale
	.domain([0, d3.max(dataset,function(d) {return d[2]; })]) // return first of pair
	.range([505,0]); // height of svg viewport

var xAxis = d3.svg.axis() // create the x axis
	.scale(axisScale) // and add the scale to it
	.orient("bottom")
	.ticks(3);

var yAxis = d3.svg.axis() // create y axis
	.scale(yAxisScale) // add dat y scale
	.orient("left")
	.ticks(3);

var xAxisGroup = svg.append("g") // create a group for the x Axis and call it in DOM
	.attr("class", "axis") // css style to apply to axis
	.attr("transform", "translate("+ padding + ","+ h + ")") // move it to the bottom with a transformation (h is screen height)
	.call(xAxis);

var yAxisGroup = svg.append("g") // create y axis group
	.attr("class","axis")
	.attr("transform", "translate(" + padding +")")
	.call(yAxis);