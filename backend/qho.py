import numpy as np
from scipy.special import hermite

def qho_n(n, x, m, h_bar, omega):
    xi = np.sqrt(m*omega/h_bar)*x
    A_n = np.math.pow((m*omega)/(np.pi*h_bar), 0.25)/np.sqrt(np.math.factorial(n)*(2**n))
    psi_n = A_n*hermite(n)(xi)*np.exp(-np.square(xi)/2)
    return psi_n

class WaveFunction:

    def __init__(self, coeff, 
                 x_min=-100, 
                 x_max=100, 
                 resolution=10000,
                 m=1,
                 omega=1,
                 h_bar=1):
        
        _coeffs = {}
        for term in coeff:
            _coeffs[int(term)] = coeff[term]
        self.coeffs = self.normalize(_coeffs)
        self.x_max, self.x_min, self.resolution = x_max, x_min, resolution
        self.x = np.linspace(x_min, x_max, resolution)
        self.psi= np.zeros(resolution)

        for i in _coeffs:
            self.psi+= _coeffs[i]*qho_n(i, self.x, m, h_bar, omega)

        self.psi_squared = np.square(self.psi)

    def normalize(self, coeffs):
        if isinstance(coeffs, list):
            s = np.sum(np.square(np.array(coeffs)))

        if isinstance(coeffs, dict):
            print(coeffs)
            _temp = np.zeros(max(coeffs.keys())+1)
            for i in coeffs:
                _temp[i] = coeffs[i]
            coeffs = _temp
            s = np.sum(np.square(np.array(coeffs)))
            
        if s==1:
            return np.array(coeffs)
        else:
            return np.array(coeffs)/s
        
    
    def is_normalized(self):
        return np.isclose(np.sum((self.psi**2)*(self.x_max-self.x_min)/self.resolution), 1)