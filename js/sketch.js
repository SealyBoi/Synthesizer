let slider;

const metal = new Tone.MetalSynth({
  "frequency": 45,
  "envelope": {
    "attack": 0.001,
    "decay": 0.4,
    "release": 0.2
  },
  "harmonicity": 8.5,
  "modulationIndex": 40,
  "resonance": 300,
  "octaves": 1.5
});
const reverb = new Tone.JCReverb(0.4);
metal.connect(reverb);

const osc = new Tone.OmniOscillator("C#4", "pwm");

const ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.5,
  decay: 0.6,
  sustain: 0.3,
  release: 0.2
})

let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() {
  createCanvas(400, 400);

  slider = new Nexus.Slider("#slider");
  reverb.toDestination();

  metal.release = 2;
  metal.resonance = 0.98;

  slider.on('change', (v) => {
    reverb.roomSize.value = v;
  });

  osc.connect(ampEnv);
  ampEnv.connect(reverb);
}

function draw() {
  background(220);
}

function keyPressed() {
  osc.start();
  let toPlay = notes[key];
  console.log(toPlay);

  osc.frequency.value = toPlay;
  ampEnv.triggerAttackRelease('8n');
}
