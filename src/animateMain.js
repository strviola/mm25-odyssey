export const animateMain = (_video, player) => {
  // metadata
  const artistSpan = document.querySelector('#artist span');
  const songSpan = document.querySelector('#song span');
  artistSpan.textContent = player.data.song.artist.name;
  songSpan.textContent = player.data.song.name;

  // 定期的に呼ばれる各単語の "animate" 関数をセットする
  let w = player.video.firstWord;
  const textContainer = document.querySelector('#text');
  while (w) {
    w.animate = (now, unit) => {
      // 単語が発声されていたら #text に表示する
      if (unit.contains(now)) {
        const textElement = document.createElement('span');
        const text = document.createTextNode(unit.text);
        textElement.appendChild(text);
        console.log(textElement);
        textContainer.appendChild(textElement);
      }
    };
    w = w.next;
  }
}
