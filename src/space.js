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

const asteroid = viz.createObject('label', {
  ephem: ephem,
  labelText: 'A1046',
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

// テキストのスタイル設定
const updateLabelStyles = () => {
  const labels = document.querySelectorAll('.spacekit__object-label');
  labels.forEach(label => {
    // フォントとサイズ
    label.style.fontFamily = 'Arial, sans-serif';
    label.style.fontSize = '14px';
    label.style.fontWeight = 'bold';

    // 色と背景
    label.style.color = '#ffffff';
    label.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
    label.style.border = 'none';

    // テキストの影
    label.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';

    // アニメーション
    label.style.transition = 'all 0.3s ease';
  });
};

// 初期スタイル適用
updateLabelStyles();

// ラベル要素が動的に追加される可能性があるため、定期的にスタイルを更新
setInterval(updateLabelStyles, 1000);
