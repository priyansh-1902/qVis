from flask import Flask, request
import json

from qho import WaveFunction

app = Flask(__name__)

@app.route("/state", methods=['POST'])
def getState():
    body = json.loads(request.data.decode('utf-8'))
    print("sending wf for state", body["harmonic"])
    wf = WaveFunction(coeff={body['harmonic']: 1}, x_max=body['domain'][1], x_min=body['domain'][0], resolution=body['resolution'])
    return {"y": str(list(wf.psi)), "x":str(list(wf.x))}


if __name__ == '__main__':
    app.run(debug=True)