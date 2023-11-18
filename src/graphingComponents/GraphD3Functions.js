import * as d3 from 'd3';
import polynomial from '../mathEngine/polynomial';
import hermitePolynomial from '../mathEngine/hermitePolynomial';
import { range, subset, index } from 'mathjs';

const GRAPH_SVG_ID = "GRAPH_SVG_ID";

const HEIGHT = 500;
const WIDTH = 800;

const XMIN = -2;
const XMAX = 2;
const YMIN = -30;
const YMAX = 30;

const XAXIS_DOMAIN = [XMIN, XMAX];
const YAXIS_DOMAIN = [YMIN, YMAX];

const XAXIS_RANGE = [0, WIDTH-100];
const YAXIS_RANGE = [HEIGHT-100, 0];

const TITLE_COORD = [WIDTH/2, 25];
const ORIGIN_COORD = [WIDTH/2, HEIGHT/2]
const YAXIS_COORD = [ORIGIN_COORD[0], ORIGIN_COORD[1]-(YAXIS_RANGE[0]-YAXIS_RANGE[1])/2];
const XAXIS_COORD = [ORIGIN_COORD[0]-(XAXIS_RANGE[1]-XAXIS_RANGE[0])/2, ORIGIN_COORD[1]];

const RESOLUTION = 10000;

//some globals 
var xScale, yScale;

function GraphInit() {
   
   const svg = d3.select("#GRAPH_SVG").append('svg');
   svg.classed("mx-auto", true)
      .attr("height", HEIGHT)
      .attr("width", WIDTH);

   svg.append("rect")
      .attr("height", HEIGHT)
      .attr("width", WIDTH)
      .attr("fill", "Aliceblue");

   xScale = d3.scaleLinear().domain(XAXIS_DOMAIN).range(XAXIS_RANGE);
   yScale = d3.scaleLinear().domain(YAXIS_DOMAIN).range(YAXIS_RANGE);

// Title
   svg.append('text')
      .attr('x', TITLE_COORD[0])
      .attr('y', TITLE_COORD[1])
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 20)
      .text('Wavefunction');

   // X AXIS
   svg.append("g")
      .attr("transform", "translate( "+ XAXIS_COORD[0] + ", " + XAXIS_COORD[1] + ")")
      .call(d3.axisBottom(xScale));
      
   // Y AXIS
   svg.append("g")
      .attr("transform", "translate( "+ YAXIS_COORD[0] + ", " + YAXIS_COORD[1] + ")")
      .call(d3.axisLeft(yScale));

   console.log("Initialized Graphing Window");
}

function parseWaveFunction(wavefunction) {
   var harmonic, coeff;
   var coeffs = {};
   for (const term in wavefunction) {
      var harmonic = parseInt(wavefunction[term]['harmonic']);
      var coeff = parseFloat(wavefunction[term]['coeff']);
      
      if ((harmonic) && (coeff)) {
         if (!(harmonic in coeffs)) {
            coeffs[harmonic] = coeff;
         }
         else {
            coeffs[harmonic] += coeff;
         }
      }
   }
   return coeffs
}

function GraphRender(wavefunction){
   const svg = d3.select("#GRAPH_SVG").select("svg");
   const domain = [XMIN, XMAX];

   var coeffs = parseWaveFunction(wavefunction);
   var [x, y] = hermitePolynomial(coeffs,domain, RESOLUTION);

   var line = d3.line()
      .x(function(d) { return xScale(subset(x, index(d.value))); }) 
      .y(function(d) { return yScale(subset(y, index(d.value))); }) 
      .curve(d3.curveMonotoneX)

   svg.select('#plot').remove();
   
   svg.append("path")
      .attr("id", "plot")
      .datum(range(0, RESOLUTION, 1)) 
      .attr("class", "line") 
      .attr("transform", "translate(" + XAXIS_COORD[0] + "," + YAXIS_COORD[1] + ")")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "#CC0000")
      .style("stroke-width", "2");

}
export { GraphInit, GraphRender };