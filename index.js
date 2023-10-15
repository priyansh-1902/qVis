const stateInput = document.getElementById("state");
const stateLatex = document.getElementById("render");
stateInput.addEventListener("input", updateValue);

function updateValue(e) {
    stateLatex.textContent = parseStateInputToRenderLatex(e.target.value);
    //adding in queue 
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "render"]);
    parseStateInputToRenderPlot(e.target.value);
}

// function parseStateInputToRenderLatex(i) {
//     console.log("parsing input to render latex - " + i)
//     if (!i){
//         return "";
//     }
//     i = i.replaceAll(">", "\\rangle");
//     i = i.replaceAll("<", "\\langle");
//     i = "$" + i + "$";
//     return i
// }


function parseStateInputToRenderPlot(i) {
    if (!i){
        return;
    }

    var numberStates = [];
    var coeffs = [];

    var j = 0;
    while(j<i.length){
        if (i[j]=='|'){
            var k = j+1;
            while((i[k]!='>') & (k<i.length)){k++;}
            if (k<i.length) {console.log("state added - " + i.slice(j+1,k)); numberStates.push(parseInt(i.slice(j+1,k)))}
            j = k;
        }
        j++;
    }
    console.log(numberStates, coeffs);

}