var svg = d3.select("svg"); // create the selector for this visualization, like $window ALWAYS

// make all your variables
var color = d3.scale.category20(); // this randomizes the color of the circles
var h = screen.height; // sets h to the height of the svg element
var w = screen.width; // width of the svg element
var padding = 60;

var dataset = [ // density, population
	[10970,20624],[5903,2058],[22681,22903],[1613,1453],[13071,27897],[22377,30574],[954,2228],[16630,42958],
	[27861,38738],[14397,42473],[22073,38939],[7126,17368],[17435,55492],[22097,73104],[7017,3335],[6473,26291],
	[29462,33115],[13071,40134],[31344,74633],[46521,56322],[40118,26827],[6631,33170],[53134,13716],
	[17140,23016],[44719,28991],[4598,374]
]

// var allData = d3.tsv("sfPopData.tsv", function(error, data) {
// 	
// });

// Former X domain
// 20624,2058,22903,1453,27897,30574,2228,42958,38738,42473,38939,17368,55492,73104,3335,26291,
//			33115,40134,74633,56322,26827,33170,13716,23016,28991,374]) // SF population of each zip code
// Former Y domain
//10970,5903,22681,1613,13071,22377,954,16630,27861,14397,22073,7126,17435,22097,7017,6473,29462,
//			13071,31344,46521,40118,6631,53134,17140,44719,4598]) // SF population density of each zip code

// join data to svg DOM element
var circle = svg.selectAll("circle")
	.data([[20624,10970,20624],[2058,5903,2058],[22903,22681,22903],[1453,1613,1453],[27897,13071,27897],[30574,22377,30574],
		[2228,954,2228],[42958,16630,42958],[38738,27861,38738],[42473,14397,42473],[38939,22073,38939],[17368,7126,17368],
		[55492,17435,55492],[73104,22097,73104],[3335,7017,3335],[26291,6473,26291],[33115]40134,74633,56322,26827,33170,13716,23016,28991,30574]
		);

// add svg elements with all the data to the DOM
circle.enter().append("circle") // add attributes radius and location on page
	.attr("cx", function(d) {return d[1]; })
	.attr("cy", function(d,i) {return 20*i+1; })
	.attr("r", function(d) {return Math.sqrt((d*0.3); })
	.attr("fill", function(d,i) {return color(i); }); // randomized color

circle.exit() // if there isn't data for it, it fades away
	.transition()
	.duration(750)
	.attr("r", 0)
	.remove();

// let's add some axes
var axisScale = d3.scale.linear() // create the axis scale
	.domain([0, d3.max(dataset,function(d) {return d[1]; })]) // return second of pair
	.range([0,(3/4)*w]); // width of svg element

var yAxisScale = d3.scale.ordinal() // create y axis scale
	.domain([0, d3.max(dataset,function(d) {return d[0]; })]) // return first of pair
	.range([(3/4*h),0]); // height of svg viewport

var xAxis = d3.svg.axis() // create the x axis
	.scale(axisScale) // and add the scale to it
	.orient("bottom")
	.ticks(2);

var yAxis = d3.svg.axis() // create y axis
	.scale(yAxisScale) // add dat y scale
	.orient("left")
	.ticks(5);

var xAxisGroup = svg.append("g") // create a group for the x Axis and call it in DOM
	.attr("class", "axis") // css style to apply to axis
	.attr("transform", "translate("+ (2/3)*padding + ","+ (3/4)*h + ")") // move it to the bottom with a transformation (h is screen height)
	.call(xAxis);

var yAxisGroup = svg.append("g") // create y axis group
	.attr("class","axis")
	.attr("transform", "translate(" + padding + ","+ (1/50)*w +")")
	.call(yAxis);
