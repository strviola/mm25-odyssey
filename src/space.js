import { Simulation, SpaceObjectPresets, Ephem } from 'spacekit.js';

const viz = new Simulation(document.getElementById('spacekit-container'), {
    basePath: './node_modules/spacekit.js/src',
});

// Create a background using Yale Bright Star Catalog data.
viz.createStars();

// Create our first object - the sun - using a preset space object.
viz.createObject('sun', SpaceObjectPresets.SUN);

// Then add some planets
viz.createObject('mercury', SpaceObjectPresets.MERCURY);
viz.createObject('venus', SpaceObjectPresets.VENUS);
viz.createObject('earth', SpaceObjectPresets.EARTH);
viz.createObject('mars', SpaceObjectPresets.MARS);
viz.createObject('jupiter', SpaceObjectPresets.JUPITER);
viz.createObject('saturn', SpaceObjectPresets.SATURN);
viz.createObject('uranus', SpaceObjectPresets.URANUS);
viz.createObject('neptune', SpaceObjectPresets.NEPTUNE);

// generate asteroid
const asteroid = new Ephem({
  a: 7.55,
  e: 0.8726,
  i: 110.55 * Math.PI / 180,
  om: 134.9919 * Math.PI / 180,
  w: 152.76 * Math.PI / 180,
  ma: 0,
  epoch: Math.random() * 2500000,
});

viz.createObject('asteroid_1', {
  hideOrbit: false,
  particleSize: 10,
  labelText: 'Asteroid',
  textureUrl: '{{assets}}/sprites/fuzzyparticle.png',
  ephem: asteroid,
});
