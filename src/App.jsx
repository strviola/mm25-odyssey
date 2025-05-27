import { Player } from "textalive-app-api";

import { animateWord } from './animateWord'
import './App.css'

function App() {
  // TextAlive Player を作る
  const apiToken = import.meta.env.VITE_TEXTALIVE_API_TOKEN;
  console.log(apiToken);
  const player = new Player({
    app: { token: apiToken },
    mediaElement: document.querySelector('#media')
  });

  // Register event listeners
  player.addListener({
    onAppReady,
    onVideoReady,
    onTimerReady,
    onThrottledTimeUpdate,
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

      // "TextAlive ホストの有無" にリンクを設定
      const url = 'https://developer.textalive.jp/app/run/?ta_app_url=https%3A%2F%2Ftextalivejp.github.io%2Ftextalive-app-basic%2F&ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DygY2qObZv24';
      document.querySelector('#header a').setAttribute('href', url);
    } else {
      const url = 'https://textalivejp.github.io/textalive-app-basic/';
      document.querySelector('#header a').setAttribute('href', url);
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
  }

  // 動画オブジェクトの準備が整ったとき（楽曲に関する情報を読み込み終わったとき）に呼ばれる
  // param v: IVideo
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/ivideo.html
  function onVideoReady(v) {
    // metadata
    const artistSpan = document.querySelector('#artist span');
    const songSpan = document.querySelector('#song span');
    artistSpan.textContent = player.data.song.artist.name;
    songSpan.textContent = player.data.song.name;

    // 定期的に呼ばれる各単語の "animate" 関数をセットする
    let w = player.video.firstWord;
    while (w) {
      w.animate = animateWord;
      w = w.next;
    }
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

  function onThrottledTimeUpdate(position) {
    document.querySelector('#position strong')
      .textContent = String(Math.floor(position));
  }

  function onPlay() {
    document.querySelector('#overlay').style.display = 'none';
  }

  function onPause() {
    document.querySelector('#text').textContent = '-';
  }

  function onStop() {
    document.querySelector('text').textContent = '-'
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
          <li><a target="_blank">TextAlive ホストの有無</a>により再生コントロールの表示状態が切り替わります</li>
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
