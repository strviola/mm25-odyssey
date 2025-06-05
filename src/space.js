import {
  Simulation,
  SpaceObjectPresets,
  Ephem,
} from 'spacekit.js';

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
const ephem = new Ephem({
  a: 7.55,
  e: 0.8726,
  i: 110.55 * Math.PI / 180,
  om: 134.9919 * Math.PI / 180,
  w: 152.76 * Math.PI / 180,
  ma: 0,
  epoch: Math.random() * 2500000,
});

const asteroid = viz.createShape('asteroid', {
  ephem: ephem,
  shape: {
    shapeUrl: '../tmp/A1046.M1863.obj',
  },
  rotation: {
    lambdaDeg: 251,
    betaDeg: -63,
    period: 3.755067,
    yorp: 1.9e-8,
    phi0: 0,
    jd0: 2443568.0,
  },
});

asteroid.initRotation();
asteroid.startRotation();
viz.createLight([0, 0, 0]);
viz.createAmbientLight();
viz.getViewer().followObject(asteroid, [-0.01, -0.01, 0.01]);
