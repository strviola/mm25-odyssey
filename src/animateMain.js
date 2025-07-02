import { Ephem } from 'spacekit.js';

export const animateMain = (_video, player, viz) => {
  // metadata
  const songSpan = document.querySelector('#song span');
  songSpan.textContent = `${player.data.song.name} / ${player.data.song.artist.name}`;

  // 定期的に呼ばれる各単語の "animate" 関数をセットする
  let w = player.video.firstWord;
  let renderingText = '';

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

  while (w) {
    w.animate = (now, unit) => {
      // 単語が発声かつ更新されていたら Simulator に表示する
      let pronouncingText = unit.text;
      if (unit.contains(now) && renderingText !== pronouncingText) {
        const asteroid = viz.createObject('label', {
          ephem: ephem,
          labelText: pronouncingText,
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
    };
    w = w.next;
  }
}
