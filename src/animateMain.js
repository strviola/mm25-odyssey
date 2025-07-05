import { Ephem } from 'spacekit.js';

export const animateMain = (word, viz) => {
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

  // 一意のIDを生成
  const objectId = `word-${word.startTime}-${Math.random().toString(36).substr(2, 9)}`;

  // .spacekit__object-label
  const asteroid = viz.createObject(objectId, {
    ephem: ephem,
    labelText: word.text,
    particleSize: 0.001,
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
}
