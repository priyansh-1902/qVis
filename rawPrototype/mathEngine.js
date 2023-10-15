export function linspace(startValue, res, stopValue) {
    var arr = [];
    var step = (stopValue-startValue)/res;
    for (var i=0; i<res; i++){
        arr.push(startValue + (step*i));
    }
    return arr;
}

export function arrPow(arr, power) {
    return arr.map(n => Math.pow(n, power));
}

export function matrixAdd(m1, m2) {
    return 
}