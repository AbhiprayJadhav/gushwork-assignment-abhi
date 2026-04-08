(function () {
  "use strict";
  var imgs = [
    "assets/images/alyona-chipchikova-PhFkcNN5x2w-unsplash.jpg",
    "assets/images/arnaud-padalle-PO1Z_h-rWBY-unsplash.jpg",
    "assets/images/julian-hochgesang-3-y9vq8uoxk-unsplash.jpg",
    "assets/images/peter-herrmann-rcx1j8bi2yM-unsplash.jpg",
    "assets/images/simon-kadula-8gr6bObQLOI-unsplash.jpg"
  ];

  var sh = document.getElementById("stickyHead");
  var nav = document.getElementById("mainNav");
  function onScroll() {
    if (!sh || !nav) return;
    var show = window.scrollY > window.innerHeight * 0.85;
    sh.classList.toggle("on", show);
    nav.classList.toggle("down", show);
  }
  if (sh && nav) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  var img = document.getElementById("galleryMain");
  var frame = document.getElementById("galleryFrame");
  var lens = document.getElementById("galleryLens");
  var pv = document.getElementById("galleryPreview");
  var prev = document.getElementById("galleryPrev");
  var next = document.getElementById("galleryNext");
  var list = document.getElementById("galleryThumbs");
  if (!img || !frame || !lens || !pv || !prev || !next || !list) return;

  var i = 0;
  var thumbs = [];
  var z = 2.5;

  function canZoom() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches && pv.offsetParent !== null;
  }

  function go(n) {
    i = (n + imgs.length) % imgs.length;
    img.src = imgs[i];
    img.alt = "Image " + (i + 1);
    pv.style.backgroundImage = 'url("' + imgs[i] + '")';
    for (var t = 0; t < thumbs.length; t++) thumbs[t].classList.toggle("on", t === i);
  }

  function build() {
    for (var k = 0; k < imgs.length; k++) {
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button";
      var im = document.createElement("img");
      im.src = imgs[k];
      im.alt = "";
      b.appendChild(im);
      (function (x) { b.onclick = function () { go(x); }; })(k);
      li.appendChild(b);
      list.appendChild(li);
      thumbs.push(b);
    }
  }

  function move(e) {
    if (!canZoom()) return;
    var r = frame.getBoundingClientRect();
    var x = e.clientX - r.left;
    var y = e.clientY - r.top;
    var dw = r.width, dh = r.height;
    var nw = img.naturalWidth, nh = img.naturalHeight;
    if (!nw || !dw) return;
    var lw = lens.offsetWidth, lh = lens.offsetHeight;
    var left = Math.max(0, Math.min(x - lw / 2, dw - lw));
    var top = Math.max(0, Math.min(y - lh / 2, dh - lh));
    lens.style.left = left + "px";
    lens.style.top = top + "px";
    var cx = left + lw / 2, cy = top + lh / 2;
    var pw = pv.offsetWidth, ph = pv.offsetHeight;
    pv.style.backgroundSize = nw * z + "px " + nh * z + "px";
    pv.style.backgroundPosition = -(cx * (nw / dw) * z - pw / 2) + "px " + (-(cy * (nh / dh) * z - ph / 2)) + "px";
  }

  function on() {
    if (!canZoom()) return;
    lens.hidden = false;
    lens.classList.add("on");
    pv.classList.add("on");
  }
  function off() {
    lens.hidden = true;
    lens.classList.remove("on");
    pv.classList.remove("on");
  }

  function wire() {
    frame.onmousemove = move;
    frame.onmouseenter = function (e) { on(); move(e); };
    frame.onmouseleave = off;
    if (!canZoom()) off();
  }

  build();
  go(0);
  wire();
  prev.onclick = function () { go(i - 1); };
  next.onclick = function () { go(i + 1); };
  img.onload = function () { pv.style.backgroundImage = 'url("' + img.src + '")'; };
  window.onresize = function () { wire(); pv.style.backgroundImage = 'url("' + imgs[i] + '")'; };
})();
