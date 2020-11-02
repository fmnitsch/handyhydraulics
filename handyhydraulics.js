// Declaring all the calculators

const elevationPressure = () => {
    let height = document.getElementById('height').value;
    let pressure = height * 0.433
    document.getElementById('calc-screen').innerHTML = `<span>${pressure.toFixed(3)} psi</span>`
}

const orificeDischarge = () => {
    let orifice = document.getElementById('orifice').value;
    let c = document.getElementById('cfact').value;
    let psi = document.getElementById('psi').value;
    let calcDischarge = Math.round(29.83 * c * (orifice * orifice) * Math.sqrt(psi));
    document.getElementById('calc-screen').innerHTML = `<span>${calcDischarge} gpm</span>`
}

const pipeVolume = () => {
    let pvDiam = document.getElementById('PV-diam').value;
    let pvLength = document.getElementById('PV-length').value;
    let calcPipeVol = 0.040799 * Math.pow(pvDiam,2) * pvLength;
    document.getElementById('calc-screen').innerHTML = `<span>${calcPipeVol.toFixed(3)} U.S. Gal</span>`;
} 

const sprinklerDischarge = () => {
    let k = document.getElementById('k').value;
    let pressPSI = document.getElementById('pressure-psi').value;
    let calcSprinkDischarge = Math.sqrt(pressPSI) * k;
    document.getElementById('calc-screen').innerHTML = `<span>${calcSprinkDischarge.toFixed(1)} gpm</span>`;
}

const frictionLoss = () => {
    let pDischarge = document.getElementById('p-discharge').value;
    let qDischarge = document.getElementById('q-discharge').value;
    let plLength = document.getElementById('PL-length').value;
    let plDiam = document.getElementById('PL-diam').value;
    let c = document.getElementById('c').value;
    let calcFrictionLoss = (4.52 * Math.pow(qDischarge, 1.85)) / (Math.pow(c, 1.85) * Math.pow(plDiam, 4.87)) * plLength;
    document.getElementById('calc-screen').innerHTML = `<span>${calcFrictionLoss.toFixed(4)} psi</span>`;
}

const pSuppPsi = () => {
    let pDischarge = document.getElementById('p-discharge').value;
    let qDischarge = document.getElementById('q-discharge').value;
    let plLength = document.getElementById('PL-length').value;
    let plDiam = document.getElementById('PL-diam').value;
    let c = document.getElementById('c').value;
    let calcFrictionLoss = (4.52 * Math.pow(qDischarge, 1.85)) / (Math.pow(c, 1.85) * Math.pow(plDiam, 4.87)) * plLength;
    let elevAdd = document.getElementById('elev-add').value;
    let fixElevAdd = elevAdd * 0.433;
    let calcPSuppPsi = Number(pDischarge) + Number(calcFrictionLoss) + Number(elevAdd) * 0.433;
    document.getElementById('calc-screen2').innerHTML = `<span>${calcPSuppPsi.toFixed(3)} psi</span>`;
    console.log(pDischarge);
    console.log(calcFrictionLoss);
    console.log(fixElevAdd);
    console.log(calcPSuppPsi);
}

// Declaring highlight functions for calc selectors

const resetHighlight = (selectors) => {
    selectors.forEach(element => {
    element.style.backgroundColor = 'revert';
    element.style.padding = 'revert';
    element.style.margin = 'revert';
    })
}

const highlight = (selector) => {
    selector.style.backgroundColor = '#FFFFFF';
    selector.style.padding = '15px 15px';
    selector.style.margin = '-15px';
    selector.style.borderRadius = '10px';
}

const calculator = document.getElementById('calculator');

// Declaring selector operations

const elevPress = document.getElementById('elev-press');
const orifDis = document.getElementById('orif-dis');
const pipeVol = document.getElementById('pipe-vol');
const sprinkDis = document.getElementById('sprink-dis');
const pressLoss = document.getElementById('press-loss');


elevPress.addEventListener('click', function() {highlight(elevPress)});
elevPress.addEventListener('click', function() {resetHighlight([orifDis, pipeVol, sprinkDis, pressLoss])});
elevPress.addEventListener('click', function() {
    calculator.innerHTML = `<h2>Elevation pressure</h2>
    <div class='calc-screen' id='calc-screen'>
        <span>0</span>
    </div>
    <div class='inputs-container'>
        <label for="height">Height (ft):</label>
        <br>
        <input id="height" name="height" class='input'>
        <br>
        <button class='calc-button' id='calc-button'>Calculate!</button>
    </div>`
    const calcButton = document.getElementById('calc-button');
    calcButton.addEventListener('click', elevationPressure);
});

orifDis.addEventListener('click', function() {highlight(orifDis)});
orifDis.addEventListener('click', function() {resetHighlight([elevPress, pipeVol, sprinkDis, pressLoss])});
orifDis.addEventListener('click', function() {
    calculator.innerHTML = `
    <h2>Orifice Discharge</h2>
    <div class='calc-screen' id='calc-screen'>
        <span>0</span>
    </div>
    <div class='inputs-container'>
        <label for="orifice">Orifice (in):</label>
        <br>
        <input id="orifice" name="orifice" class='input'>
        <br>
        <label for="cfact">C-fact.:</label>
        <br>
        <input id="cfact" name="cfact" class='input'>
        <br>
        <label for="psi">PSI:</label>
        <br>
        <input id="psi" name="psi" class='input'>
        <br>
        <button class='calc-button' id='calc-button'>Calculate!</button>
    </div>`
    const calcButton = document.getElementById('calc-button');
    calcButton.addEventListener('click', orificeDischarge);
})

pipeVol.addEventListener('click', function() {highlight(pipeVol)});
pipeVol.addEventListener('click', function() {resetHighlight([elevPress, orifDis, sprinkDis, pressLoss])});
pipeVol.addEventListener('click', function() {
    calculator.innerHTML = `
    <h2>Pipe Volume</h2>
    <div class='calc-screen' id='calc-screen'>
        <span>0</span>
    </div>
    <div class='inputs-container'>
        <label for="PV-diam">Diameter (in):</label>
        <br>
        <input id="PV-diam" name="PV-diam" class='input'>
        <br>
        <label for="PV-length">Length (ft):</label>
        <br>
        <input id="PV-length" name="PV-length" class='input'>
        <br>
        <button class='calc-button' id='calc-button'>Calculate!</button>
    </div>`
    const calcButton = document.getElementById('calc-button');
    calcButton.addEventListener('click', pipeVolume);
})

sprinkDis.addEventListener('click', function() {highlight(sprinkDis)});
sprinkDis.addEventListener('click', function() {resetHighlight([elevPress, orifDis, pipeVol, pressLoss])});
sprinkDis.addEventListener('click', function() {
    calculator.innerHTML = `
    <h2>Sprinkler Discharge</h2>
    <div class='calc-screen' id='calc-screen'>
        <span>0</span>
    </div>
    <div class='inputs-container'>
        <label for="k">K:</label>
        <br>
        <input id="k" name="k" class='input'>
        <br>
        <label for="pressure-psi">Pressure (psi):</label>
        <br>
        <input id="pressure-psi" name="pressure-psi" class='input'>
        <br>
        <button class='calc-button' id='calc-button'>Calculate!</button>
    </div>`
    const calcButton = document.getElementById('calc-button');
    calcButton.addEventListener('click', sprinklerDischarge);
})

pressLoss.addEventListener('click', function() {highlight(pressLoss)});
pressLoss.addEventListener('click', function() {resetHighlight([elevPress, orifDis, pipeVol, sprinkDis])});
pressLoss.addEventListener('click', function() {
    calculator.innerHTML = ` <h2>Pressure loss</h2>
    <hr>
    <div id='double-calc-container'>
    <div id='fric-loss-calc'>
        <h2>Friction loss</h2>
        <div class='calc-screen' id='calc-screen'>
            <span>0</span>
        </div>
        <div class=inputs-container>
            <table>
                <tr>
                    <td><label for="q-discharge">Q-discharge (psi):</label></td>
                    <td><input id="q-discharge" name="q-discharge" class='input'></td>
                </tr>
                <tr>
                    <td><label for="PL-length">Length (ft):</label></td>
                    <td><input id="PL-length" name="PL-length" class='input'></td>
                </tr>
                <tr>
                    <td><label for="PL-diam">Diameter (in):</label></td>
                    <td><input id="PL-diam" name="PL-diam" class='input'></td>
                </tr>
                <tr>
                    <td><label for="c">C:</label></td>
                    <td><input id="c" name="c" class='input'></td>
                </tr>
            </table>
            <button type='button' class='calc-button' id='calc-friction-loss'>Calculate!</button>
        </div>
    </div>
    <div class='vl'></div>
    <div id='p-supp-calc'>
        <h2>P-supp</h2>
        <div class='calc-screen' id='calc-screen2'>
            <span>0</span>
        </div>
        <div class='inputs-container'>
            <label for="p-discharge">P-discharge (psi):</label>
            <input id="p-discharge" name="p-discharge" class='input'>
            <br>
            <label for="elev-add">Elevation add (ft):</label>
            <input id="elev-add" name="elev-add" class='input'>
            <br>
            <button type='button' class='calc-button' id='calc-pSupp-psi'>Calculate!</button>
        </div>
    </div>
    </div>`
        const calcButton = document.getElementById('calc-friction-loss');
        calcButton.addEventListener('click', frictionLoss);
        const calcButton1 = document.getElementById('calc-pSupp-psi');
        calcButton1.addEventListener('click', pSuppPsi);
})    

highlight(elevPress);
resetHighlight([orifDis, pipeVol, sprinkDis, pressLoss])
calculator.innerHTML = `<h2>Elevation pressure</h2>
    <div class='calc-screen' id='calc-screen'>
        <span>0</span>
    </div>
    <div class='inputs-container'>
        <label for="height">Height (ft):</label>
        <br>
        <input id="height" name="height" class='input'>
        <br>
        <button class='calc-button' id='calc-button'>Calculate!</button>
    </div>`
    const calcButton = document.getElementById('calc-button');
    calcButton.addEventListener('click', elevationPressure);



