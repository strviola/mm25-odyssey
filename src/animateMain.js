import { Ephem } from 'spacekit.js';

export const animateMain = (word, viz) => {
  // generate asteroid with random orbital variation
  const ephem = new Ephem({
    a: 7.55 + (Math.random() - 0.5) * 3.0,  // 軌道サイズ: 6.05 - 9.05 AU
    e: 0.8726 + (Math.random() - 0.5) * 0.2,  // 離心率: 0.77 - 0.97
    i: (110.55 + (Math.random() - 0.5) * 40) * Math.PI / 180,  // 軌道傾斜: 90-130度
    om: (134.9919 + (Math.random() - 0.5) * 60) * Math.PI / 180,  // 昇交点: 105-165度
    w: (152.76 + (Math.random() - 0.5) * 80) * Math.PI / 180,  // 近点引数: 112-192度
    ma: Math.random() * 2 * Math.PI,  // 平均近点角: 0-360度
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
