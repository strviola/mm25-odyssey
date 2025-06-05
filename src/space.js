import { Simulation, SpaceObjectPresets, Ephem } from 'spacekit.js';

const viz = new Simulation(document.getElementById('spacekit-container'), {
    basePath: 'https://typpo.github.io/spacekit/src',
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
