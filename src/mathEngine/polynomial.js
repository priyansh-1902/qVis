import { range, dotPow, zeros, add, dotMultiply, subset, index } from 'mathjs';

function polynomial(coeffs, domain, resolution) {
    var x = range(domain[0], domain[1], (domain[1]-domain[0])/resolution);
    var y = zeros(resolution);
    for (var [exp, coeff] of Object.entries(coeffs)){
        y = add(y, dotMultiply(coeff, dotPow(x, exp)));
    }
    // return x.subset(index(range(0, resolution), 1), y)
    return [x, y]
}

export default polynomial