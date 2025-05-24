import { Player } from "textalive-app-api";

import './App.css'

function App() {
  // 単語が発声されていたら #text に表示する
  const animateWord = function (now, unit) {
    if (unit.contains(now)) {
      document.querySelector("#text").textContent = unit.text;
    }
  };

  // TextAlive Player を作る
  const apiToken = import.meta.env.VITE_TEXTALIVE_API_TOKEN;
  console.log(apiToken);
  const player = new Player({
    app: { token: apiToken },
    mediaElement: document.querySelector('#media')
  });

  // Register event listeners
  player.addListener({
    // onAppReady,
    onVideoReady,
    // onTimerReady,
    // onThrottledTimeUpdate,
    // onPlay,
    // onPause,
    // onStop,
  });

  const artistSpan = document.querySelector('#artist span')
  const songSpan = document.querySelector('#song span')

  // 動画オブジェクトの準備が整ったとき（楽曲に関する情報を読み込み終わったとき）に呼ばれる
  // param v: IVideo
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/ivideo.html
  function onVideoReady(v) {
    // metadata
    artistSpan.textContent = player.data.song.artist.name;
    songSpan.textContent = player.data.song.name;

    // 定期的に呼ばれる各単語の "animate" 関数をセットする
    let w = player.video.firstWord;
    while (w) {
      w.animate = animateWord;
      w = w.next;
    }
  }

  return (
    <>
      <div id="overlay">
        <button className="play" disabled>Play</button>
      </div>
      <div id="container">
        <p id="lyrics">
          <span id="text"></span>
        </p>
      </div>
      <div id="media"></div>
      <div id="header">
        <div id="meta">
          <div id="artist">
            <strong>Artist:</strong> <span>-</span>
          </div>
          <div id="song">
            <strong>Song title:</strong> <span>-</span>
          </div>
        </div>
        <ul>
          <li>発声中の歌詞テキストがあれば表示されます</li>
          <li>TextAlive ホストの有無により再生コントロールの表示状態が切り替わります</li>
        </ul>
      </div>
      <div id="footer">
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
