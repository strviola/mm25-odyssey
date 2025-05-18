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
  const player = new Player({ app: { token: apiToken } });
  player.addListener({
    // 動画オブジェクトの準備が整ったとき（楽曲に関する情報を読み込み終わったとき）に呼ばれる
    onVideoReady: (v) => {
      // 定期的に呼ばれる各単語の "animate" 関数をセットする
      let w = player.video.firstWord;
      while (w) {
        w.animate = animateWord;
        w = w.next;
      }
    },
  });

  return (
    <>
      <span id="text">TextAlive references here.</span>
    </>
  )
}

export default App
