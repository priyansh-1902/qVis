var dataset1 = [
    [1,1], [12,20], [24,36],
    [32, 50], [40, 70], [50, 100],
    [55, 106], [65, 123], [73, 130],
    [78, 134], [83, 136], [89, 138],
    [100, 140]
];

const HEIGHT = 500;
const WIDTH = 800;

const XMIN = -20;
const XMAX = 20;
const YMIN = -1;
const YMAX = 1;

const XAXIS_DOMAIN = [XMIN, XMAX];
const YAXIS_DOMAIN = [YMIN, YMAX];

const XAXIS_RANGE = [0, WIDTH-100];
const YAXIS_RANGE = [HEIGHT-100, 0];

const TITLE_COORD = [WIDTH/2, 25];
const ORIGIN_COORD = [WIDTH/2, HEIGHT/2]
const YAXIS_COORD = [ORIGIN_COORD[0], ORIGIN_COORD[1]-(YAXIS_RANGE[0]-YAXIS_RANGE[1])/2];
const XAXIS_COORD = [ORIGIN_COORD[0]-(XAXIS_RANGE[1]-XAXIS_RANGE[0])/2, ORIGIN_COORD[1]];

var svg = d3.select("#graphSection")
                .append("svg")
                .attr("height", HEIGHT)
                .attr("width", WIDTH)
                // .call(d3.zoom().on("zoom", function () {svg.attr("transform", d3.event.transform)}))
                .append("g");


svg.append("rect")
    .attr("height", HEIGHT)
    .attr("width", WIDTH)
    .attr("fill", "Aliceblue");


var xScale = d3.scaleLinear().domain(XAXIS_DOMAIN).range(XAXIS_RANGE),
    yScale = d3.scaleLinear().domain(YAXIS_DOMAIN).range(YAXIS_RANGE);

// Title
svg.append('text')
    .attr('x', TITLE_COORD[0])
    .attr('y', TITLE_COORD[1])
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Wavefunction');

svg.append("g")
        .attr("transform", "translate( "+ XAXIS_COORD[0] + ", " + XAXIS_COORD[1] + ")")
        .call(d3.axisBottom(xScale));
        
svg.append("g")
        .attr("transform", "translate( "+ YAXIS_COORD[0] + ", " + YAXIS_COORD[1] + ")")
        .call(d3.axisLeft(yScale));


// svg.append('g')
//          .selectAll("dot")
//          .data(dataset1)
//          .enter()
//          .append("circle")
//          .attr("cx", function (d) { return xScale(d[0]); } )
//          .attr("cy", function (d) { return yScale(d[1]); } )
//          .attr("r", 2)
//          .attr("transform", "translate(" + 100 + "," + 100 + ")")
//          .style("fill", "#CC0000");