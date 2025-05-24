// not referenced now
function DFuwafuwaText() {
  this.name = "フワフワテキスト";
  this.type = PUBLIC | PHRASE;

  this.headTime = 600;

  this.tailTime = 3000;

  // @ui Color()
  // @title 文字色
  this.color = new Color("#FFFFFF");

  // @ui Slider(8, 48)
  // @title 最小文字サイズ
  this.fontSizeMin = 12;

  // @ui Slider(8, 48)
  // @title 最大文字サイズ
  this.fontSizeMax = 18;

  // @ui Slider(3, 16)
  // @title 一行の最大文字数
  this.maxOneLine = 8;

  // @ui Slider(0, 300)
  // @title 左右余白
  this.margin = 120;

  // @ui Color()
  // @title 背景色１
  this.bgColor1 = new Color("#FF0000");

  // @ui Color()
  // @title 背景色２
  this.bgColor2 = new Color("#00FF00");

  // @ui Color()
  // @title 背景色３
  this.bgColor3 = new Color("#0000FF");

  // @ui Slider(1, 3)
  // @title 使用する背景色数
  this.bgColorNum = 3;

  // @ui Slider(0, 5000)
  // @title 乱数シード
  this.seed = 0;

  var DUtil = require("DUtil@1247");
  var util = DUtil ? new DUtil() : null;

  this.animate = function (now) {
    var p = this.getAssignedUnit();

    p.color = this.color;

    var cc = p.charCount;
    var wc = p.wordCount;

    var c = 0;

    util.seed = p.duration * 123 + 123 + this.seed;

    var margin = this.margin;
    var nw = this.maxOneLine;
    var dw = (width - margin * 2) / (nw - 1);

    var cols = [this.bgColor1, this.bgColor2, this.bgColor3];

    for (var i = 0; i < wc; i++) {
      var word = p.children[i];

      for (var j = 0; j < word.charCount; j++) {
        var char = word.children[j];

        var dt = (now - char.startTime) / 1000;

        var min = Math.min(this.fontSizeMin, this.fontSizeMax);
        var max = Math.max(this.fontSizeMin, this.fontSizeMax);
        var sc = util.rand(min, max) / 10;

        var prog0 =
          1 - util.normalize(now - (char.startTime - this.headTime), 0, 600); /// 1 -> 0
        var prog1 = util.normalize(now - char.endTime - 1300, 0, 750); /// 0 -> 1

        var proga = util.normalize(now - char.endTime - 600, 0, 200);
        char.rendering.alpha = 1 - proga * 0.5;

        var px =
          margin +
          dw * (c % nw) +
          util.rand(-dw, dw) * 0.2 -
          char.advance * sc * 0.5;
        var py = util.rand(height * 0.5, height * 0.8);

        var dy0 = height - py + char.height * sc;
        var dy1 = py + char.height * sc;

        var sy = util.rand(80, 150) * dt;

        /// 左右ゆらゆら
        var dx = Math.sin((now * util.rand(0.5, 2.0)) / 1000) * dw * 0.1;

        char.rendering.tx.translate(
          px + dx,
          py + dy0 * cubicIn(prog0) - dy1 * cubicIn(prog1) - sy
        );

        var g = char.graphics;
        g.beginFill(cols[util.randInt(0, this.bgColorNum - 1)]);

        var r = char.height * util.rand(0.75, 1.0);
        var a0 = util.rand(1.0, 5.0) / 1000;
        var a1 = util.rand(1.0, 5.0) / 1000;
        var a2 = util.rand(1.0, 5.0) / 1000;
        var a3 = util.rand(1.0, 5.0) / 1000;

        var r0 = (util.normalize(Math.sin(now * a0), -1, 1) * 0.3 + 0.7) * r;
        var r1 = (util.normalize(Math.sin(now * a1), -1, 1) * 0.3 + 0.7) * r;
        var r2 = (util.normalize(Math.sin(now * a2), -1, 1) * 0.3 + 0.7) * r;
        var r3 = (util.normalize(Math.sin(now * a3), -1, 1) * 0.3 + 0.7) * r;

        var x =
          char.advance *
          (0.5 + 0.06 * Math.sin((now * util.rand(1.0, 5.0)) / 1000));
        var y =
          char.height *
          (0.5 + 0.06 * Math.sin((now * util.rand(1.0, 5.0)) / 1000));

        g.drawRoundRectComplex(x - r, y - r, r * 2, r * 2, r0, r1, r2, r3);
        char.rendering.tx.scale(sc, sc);

        c++;
      }
    }

    var startTime = p.startTime - this.headTime;
    var endTime = p.endTime + this.tailTime;
    p.rendering.visible = startTime <= now && now < endTime;
  };
}
