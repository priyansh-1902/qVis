import { range, zeros, ones, add, dotMultiply, size } from 'mathjs';
import derivative from "./derivative"

function hermitePolynomial(coeffs, domain, resolution) {
    var x = range(domain[0], domain[1], (domain[1]-domain[0])/resolution);
    var y = zeros(resolution);
    for (var [n, coeff] of Object.entries(coeffs)){
        y = add(y, dotMultiply(coeff, H(n, x)));
    }
    return [x, y]
}

function H(n, x) {
    if (n==0) {
        var y = ones(size(x));
    }
    else if (n==1) {
        var y = x;
    }
    else {
        var firstTerm = dotMultiply(dotMultiply(2, x),H(n-1, x));
        var secondTerm = dotMultiply(-1, derivative(H(n-1, x), x));
        var y = add(firstTerm, secondTerm);
    }

    return y;
}

export default hermitePolynomial