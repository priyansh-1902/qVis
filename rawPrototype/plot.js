import { linspace } from "./mathEngine";

RESOLUTION = 100000;
const X = linspace(XMIN, RESOLUTION, XMAX);

function getPlotCoords() {
    var y = [0]*RESOLUTION;
    var statesArray = Object.values(states).filter(function filterNaN(item) {
        return !(isNaN(item.number)) && !(isNaN(item.coeff));});
    for (var i=0; i<statesArray.length; i++) {
        matrixAdd(matrixMult(statesArray[i].coeff, arrPow(X, statesArray[i].number), y));
    }
    return y;
}



export function updatePlot(){
    getPlotCoords();
}