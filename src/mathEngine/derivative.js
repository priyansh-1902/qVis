import { size, subset, index, zeros } from "mathjs";

function derivative(y, x) {
    var dy = zeros(size(x));
    for (var i=1; i<subset(size(x), index(0)); i++) {
        var dydx= (subset(y, index(i)) - subset(y, index(i-1)))/(subset(x, index(i)) - subset(x, index(i-1)));
        dy.subset(index(i), dydx);
    }
    dy.subset(index(0), subset(dy, index(1)));
    return dy;
}

export default derivative