export const animateMain = (_video, player) => {
  // metadata
  const artistSpan = document.querySelector('#artist span');
  const songSpan = document.querySelector('#song span');
  artistSpan.textContent = player.data.song.artist.name;
  songSpan.textContent = player.data.song.name;

  // 定期的に呼ばれる各単語の "animate" 関数をセットする
  let w = player.video.firstWord;
  let renderingText = '';
  const textContainer = document.querySelector('#text');
  while (w) {
    w.animate = (now, unit) => {
      // 単語が発声かつ更新されていたら #text に表示する
      let pronouncingText = unit.text;
      if (unit.contains(now) && renderingText !== pronouncingText) {
        debugger;
        renderingText = pronouncingText;
        const textElement = document.createElement('span');
        const text = document.createTextNode(pronouncingText);
        textElement.appendChild(text);
        textContainer.appendChild(textElement);
      }
    };
    w = w.next;
  }
}
