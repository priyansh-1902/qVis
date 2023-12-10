import * as d3 from 'd3';
import { range } from 'mathjs';
import stateInputStore from '../redux/store';
import { InlineMath } from 'react-katex'

const GRAPH_SVG_ID = "GRAPH_SVG_ID";

const HEIGHT = 500;
const WIDTH = 800;

const XMIN = -10;
const XMAX = 10;
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

const RESOLUTION = 1000;
var computed_states = {};
var current_plots = {"psi": {display:true, color: "red"},
                     "psi_squared": {display: false, color: "blue"}}

//some globals 
var xScale, yScale;

function GraphInit() {
   
   const svg = d3.select("#GRAPH_SVG")
                  .append('svg');

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

// Legend

   svg.append('svg:image')
      .attr('x', TITLE_COORD[0] + 330)
      .attr('y', TITLE_COORD[1]-30)
      .attr('text-anchor', 'middle')
      .attr('width', 40)
      .attr('height', 48)
      .style('font-family', 'Helvetica')
      .style('font-size', 20)
      .style("cursor", "pointer")
      .attr("xlink:href", require("./psi.png"))
      .on("click", () => {
                           current_plots["psi"]["display"] = !current_plots["psi"]["display"];
                           GraphRender();
                        }
      );


   svg.append('svg:image')
      .attr('x', TITLE_COORD[0] + 330)
      .attr('y', TITLE_COORD[1])
      .attr('width', 60)
      .attr('height', 72)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 20)
      .style("cursor", "pointer")
      .attr("xlink:href", require("./psi_squared.png"))
      .on("click", () => {
                           current_plots["psi_squared"]["display"] = !current_plots["psi_squared"]["display"];
                           GraphRender();
                        }
         );

      

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

function computePlot(coeffs, variable){
   var y = new Array(RESOLUTION).fill(0);

   for (const harmonic in coeffs)
   {
      for (var i = 0; i < y.length-1; i++)
      {
         y[i] += coeffs[harmonic]*computed_states[harmonic][variable][i];
      }
   }

   return [computed_states['x'], y];
}


async function GraphRender(){
   const svg = d3.select("#GRAPH_SVG").select("svg");
   const domain = [XMIN, XMAX];

   const wavefunction = stateInputStore.getState().stateInput.terms

   var coeffs = parseWaveFunction(wavefunction);
   
   for (const harmonic in coeffs)
   {
      if (!(harmonic in computed_states))
      {
         console.log("asking backend for state", harmonic);
         const JSONString = JSON.stringify({harmonic: harmonic, domain: domain, resolution: RESOLUTION});
         const [x, psi, psi_squared] = await fetch("./state", {method:"POST",
                        headers: {
                           "content-type": "application/json"
                        },
                        body: JSONString
                        }).then(response => response.json()).then((res) => {return [JSON.parse(res.x), JSON.parse(res.psi), JSON.parse(res.psi_squared)]});
         
         computed_states[harmonic] = {};
         computed_states[harmonic]["psi"] = psi;
         computed_states[harmonic]["psi_squared"] = psi_squared;
         computed_states['x'] = x;
      }
   }
   for (const variable in current_plots){
      svg.select('#plot' + variable).remove();
      if (current_plots[variable]["display"] == true){
         const [x, y] = computePlot(coeffs, variable);

         var line = d3.line()
            .x(function(d) { return xScale(x[d.value]); }) 
            .y(function(d) { return yScale(y[d.value]); }) 
            .curve(d3.curveMonotoneX)
         
         svg.append("path")
            .attr("id", "plot" + variable)
            .datum(range(0, RESOLUTION, 1)) 
            .attr("class", "line") 
            .attr("transform", "translate(" + XAXIS_COORD[0] + "," + YAXIS_COORD[1] + ")")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", current_plots[variable]['color'])
            .style("stroke-width", "2");
      }
   }

}
export { GraphInit, GraphRender };