  // 単語が発声されていたら #text に表示する
export const animateWord = function (now, unit) {
  if (unit.contains(now)) {
    const textElement = document.querySelector('#text');
    if (textElement) {
      textElement.textContent = unit.text;
    }
  }
}
