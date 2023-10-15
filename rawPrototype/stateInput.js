const stateInputDiv = document.getElementById("stateInput");
const addNumberedStateButton = document.getElementById("addNumberedStateButton");
const stateLatex = document.getElementById("render");

addNumberedStateButton.addEventListener("click", addNumberedState);

var numStates = 0;
let states = {};

class State {
    constructor (number, coeff) {
        this.number = number;
        this.coeff = coeff;
    }
}

function stateSliderInputListener() {
    const stateNumber = this.id.slice("stateSlider".length, this.id.length);
    const stateCoeff = document.getElementById("stateCoeff" + stateNumber);
    stateCoeff.textContent = "" + this.value/1000000;
    states[stateNumber].coeff = this.value/1000000;
    setTimeout(updateLatexFormula(), 1000);
}

function stateValueInputListener() {
    const stateNumber = this.id.slice("stateCoeff".length, this.id.length);
    const stateSlider = document.getElementById("stateSlider" + stateNumber);
    stateSlider.value = parseFloat(this.value)*1000000;
    states[stateNumber].coeff = parseFloat(this.value);
    updateLatexFormula();
}

function stateNumberInputListener() {
    const stateNumber = this.id.slice("stateSlider".length, this.id.length);
    states[stateNumber].number = parseInt(this.value);
    updateLatexFormula();
}

function parseStateInputToLatex(){
    //at any given point the states dict contains all info regarding the input
    var latexString = "";
    var statesArray = Object.values(states).filter(function filterNaN(item) {
                                                    return !(isNaN(item.number)) && !(isNaN(item.coeff));});
    console.log(states);
    console.log(statesArray);
    if (statesArray.length > 0){
            latexString += (statesArray[0].coeff == 1 ? "":statesArray[0].coeff) + "|" + statesArray[0].number + "\\rangle";
        for (let i=1; i<statesArray.length; i++){
            if (statesArray[i] != 0){
                latexString += " + " + ((statesArray[i].coeff == 1)? "":statesArray[i].coeff) + "|" + statesArray[i].number + "\\rangle";
            }
        }
    }
    return latexString;
}

function updateLatexFormula () {
    var latexFormula = parseStateInputToLatex();
    if (latexFormula){
        latexFormula = "$" + latexFormula + "$"
    }
    stateLatex.textContent = latexFormula;
    //adding in queue 
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "stateLatex"]);
}

function addNumberedState(){
    numStates++;
    states[numStates] = new State(NaN, NaN);
    console.log("adding a numbered state. Total number of states = " + numStates);

    const newStateDiv = document.createElement("div");
    newStateDiv.id = "stateDiv" + numStates;
    
    const newStateNumber = document.createElement("input");
    const newStateCoeff = document.createElement("textarea");
    const newStateSlider = document.createElement("input");
    const removeStateButton = document.createElement("button");
    const breakElement = document.createElement("br");

    newStateNumber.id = "stateNumber" + numStates;
    newStateCoeff.id = "stateCoeff" + numStates;
    newStateSlider.id = "stateSlider" + numStates;
    removeStateButton.id = "removeStateButton" + numStates;

    newStateNumber.type="text";
    newStateNumber.addEventListener("input", stateNumberInputListener);

    newStateSlider.type = "range";
    newStateSlider.min = 0; newStateSlider.max = 1000000; newStateSlider.value = 0;
    newStateSlider.addEventListener("change", stateSliderInputListener);

    newStateCoeff.textContent = newStateSlider.value;
    newStateCoeff.addEventListener("input", stateValueInputListener);

    removeStateButton.id = "removeStateButton" + numStates;
    removeStateButton.textContent = "Remove State";
    removeStateButton.addEventListener("click", removeNumberedState);

    stateInputDiv.insertBefore(newStateDiv, addNumberedStateButton);
    
    newStateDiv.append(newStateNumber);
    newStateDiv.append(newStateCoeff);
    newStateDiv.append(breakElement);
    newStateDiv.append(newStateSlider,);
    newStateDiv.append(removeStateButton);
    newStateDiv.append(breakElement);
    console.log(states);
}

function removeNumberedState() {
    const stateNumber = this.id.slice("removeStateButton".length, this.id.length);  
    const stateDiv = document.getElementById("stateDiv" + stateNumber);
    delete states[stateNumber];
    stateDiv.remove();
    numStates--;
    console.log("State " + stateNumber + " removed");
    updateLatexFormula();
}