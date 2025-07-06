import { Player } from "textalive-app-api";
import { TextView } from "./components/TextView";
import { animateMain } from "./animateMain";
import {
  Simulation,
  SpaceObjectPresets,
  // Ephem,
} from 'spacekit.js';
import { TechCredits } from "./components/TechCredits";

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

  let c;

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
          if (player.video && !player.isPlaying) {
            player.requestPlay();
          }
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
          // 小惑星ラベルを全て削除
          document.querySelectorAll('.spacekit__object-label').forEach((label) => {
            label.remove();
          });
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
    // set music info metadata
    const songSpan = document.querySelector('#song span');
    songSpan.textContent = `${player.data.song.name} / ${player.data.song.artist.name}`;
    c = null;
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

    // 巻き戻っていたら歌詞表示をリセットする
    if (c && c.startTime > position + 1000) {
      c = null;
      while (textContainer.firstChild) {
        textContainer.removeChild(textContainer.firstChild);
      }
    }

    // 500ms先に発声される文字を取得
    let current = c === null ? player.video.firstChar : c;
    while (current && current.startTime < position + 500) {
      // 新しい文字が発声されようとしている
      if (c !== current) {
        c = current;
        animateMain(current, viz);
      }
      current = current.next;
    }
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
          {/* TODO: 再生時間表示。完成間際に消す */}
          <span id="position">
            <strong>-</strong> [ms]
          </span>
        </p>
        <div id="control" style={{display: "none"}}>
          <button className="play" disabled>Play</button>
          <button id="jump" disabled>Jump to lyric</button>
          <button id="pause" disabled>Pause</button>
          <button id="rewind" disabled>Rewind</button>
        </div>
        <TechCredits />
      </div>
    </>
  )
}

export default App
