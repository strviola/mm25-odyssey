import { Player } from "textalive-app-api";
import { TextView } from "./components/TextView";
import './App.css'
import { animateMain } from "./animateMain";
import {
  Simulation,
  SpaceObjectPresets,
  // Ephem,
} from 'spacekit.js';

function App() {
  // TextAlive Player を作る
  const apiToken = import.meta.env.VITE_TEXTALIVE_API_TOKEN;
  console.log(apiToken);
  const player = new Player({
    app: { token: apiToken }
  });
  // setup spacekit    
  const viz = new Simulation(document.getElementById('spacekit-container'), {
    basePath: './node_modules/spacekit.js/src',
  });
  
  // Register event listeners
  player.addListener({
    onAppReady,
    onVideoReady,
    onTimerReady,
    onTimeUpdate,
    onPlay,
    onPause,
    onStop,
  });

  // TextAlive App が初期化された時に呼ばれる
  function onAppReady(app) {
    if (!app.managed) {
      document.querySelector('#control').style.display = 'block';

      // 再生ボタン
      document.querySelectorAll('.play').forEach((playButton) => {
        playButton.addEventListener('click', () => {
          player.video && player.requestPlay();
        })
      });

      // 歌詞頭出しボタン
      document.querySelector('#jump')
        .addEventListener('click', () => {
          player.video &&
          player.requestMediaSeek(player.video.firstChar.startTime);
        });

      // 一時停止ボタン
      document.querySelector('#pause')
        .addEventListener('click', () => {
          player.video && player.requestPause();
        });

      // 巻き戻しボタン
      document.querySelector('#rewind')
        .addEventListener('click', () => {
          player.video && player.requestMediaSeek(0);
        });
    }

    // 音楽データを読み込む
    if (!app.songUrl) {
      // ロンリーラン / 海風太陽
      player.createFromSongUrl("https://piapro.jp/t/CyPO/20250128183915", {
        video: {
          // 音楽地図訂正履歴
          beatId: 4_694_280,
          chordId: 2_830_735,
          repetitiveSegmentId: 2_946_483,
    
          // 歌詞URL: https://piapro.jp/t/jn89
          // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FCyPO%2F20250128183915
          lyricId: 67_815,
          lyricDiffId: 20_659
        },
      });
    }
    
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
  }

  // 動画オブジェクトの準備が整ったとき（楽曲に関する情報を読み込み終わったとき）に呼ばれる
  // param v: IVideo
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/ivideo.html
  function onVideoReady(v) {
    animateMain(v, player, viz);
  }

  function onTimerReady(_timer) {
    if (!player.managed) {
      // ボタンを有効化する
      document.querySelectorAll('button')
        .forEach((button) => {
          button.disabled = false
        });
    }

    // 歌詞が無ければ歌詞頭出しボタンを無効にする
    document.querySelector('#jump').disabled = !player.video.firstChar;
  }

  function onTimeUpdate(position) {
    document.querySelector('#position strong')
      .textContent = String(Math.floor(position));
  }

  function onPlay() {
    // オーバーレイが削除されたので何もしない
  }

  function onPause() {
    // テキスト表示が削除されたので何もしない
  }

  function onStop() {
    // テキスト表示が削除されたので何もしない
  }

  return (
    <>
      <TextView />
      <div id="meta">
        <div id="song">
          <strong>Music: </strong> <span>-</span>
        </div>
        <p>
          <span id="position">
            <strong>-</strong> [ms]
          </span>
        </p>
        <div id="control" style={{display: "none"}}>
          <button className="play" disabled>再生</button>
          <button id="jump" disabled>歌詞頭出し</button>
          <button id="pause" disabled>一時停止</button>
          <button id="rewind" disabled>巻き戻し</button>
        </div>
      </div>
    </>
  )
}

export default App
