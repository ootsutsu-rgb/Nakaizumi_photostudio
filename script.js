(function () {
  "use strict";
  document.querySelectorAll("[data-current-year]").forEach(function (node) { node.textContent = new Date().getFullYear(); });

  var gallery = [
    { src: "assets/gallery-01-retouched.png", alt: "家族で楽しむ七五三の記念写真", label: "家族で楽しむ七五三の記念写真" },
    { src: "assets/gallery-02.jpg", alt: "両手を広げた羽織袴姿の七五三記念写真", label: "両手を広げた羽織袴姿の七五三記念写真" },
    { src: "assets/gallery-03.jpg", alt: "和傘を持った橙色の着物の七五三記念写真", label: "和傘を持った橙色の着物の七五三記念写真" },
    { src: "assets/gallery-04.jpg", alt: "千歳飴を持って微笑む七五三の記念写真", label: "千歳飴を持って微笑む七五三の記念写真" },
    { src: "assets/gallery-05.jpg", alt: "赤い着物と和傘の七五三記念写真", label: "赤い着物と和傘の七五三記念写真" },
    { src: "assets/gallery-06.jpg", alt: "着物とスーツ姿の家族記念写真", label: "着物とスーツ姿の家族記念写真" },
    { src: "assets/gallery-07.jpg", alt: "紫色のニット姿で微笑む女性のポートレート", label: "紫色のニット姿で微笑む女性のポートレート" },
    { src: "assets/gallery-08.jpg", alt: "寄り添う兄弟の記念写真", label: "寄り添う兄弟の記念写真" },
    { src: "assets/gallery-09.jpg", alt: "家族6人の記念写真", label: "家族6人の記念写真" },
    { src: "assets/gallery-10.jpg", alt: "白い服で椅子に座り微笑む女性のポートレート", label: "女性のポートレート" }
  ];
  var galleryIndex = 0;
  var featureImage = document.getElementById("feature-image");
  var galleryCurrent = document.getElementById("gallery-current");
  var galleryStatus = document.getElementById("gallery-status");
  var previousButton = document.getElementById("gallery-prev");
  var nextButton = document.getElementById("gallery-next");

  function showGalleryImage(nextIndex) {
    if (!featureImage) return;
    galleryIndex = (nextIndex + gallery.length) % gallery.length;
    featureImage.classList.add("is-changing");
    window.setTimeout(function () {
      var item = gallery[galleryIndex];
      featureImage.src = item.src;
      featureImage.alt = item.alt;
      if (galleryCurrent) galleryCurrent.textContent = String(galleryIndex + 1).padStart(2, "0");
      if (galleryStatus) galleryStatus.textContent = item.label + "、" + (galleryIndex + 1) + "枚目 / " + gallery.length + "枚中";
      featureImage.classList.remove("is-changing");
    }, 180);
  }

  if (previousButton) previousButton.addEventListener("click", function () { showGalleryImage(galleryIndex - 1); });
  if (nextButton) nextButton.addEventListener("click", function () { showGalleryImage(galleryIndex + 1); });

  var reservationForm = document.getElementById("reservation-form");
  var formStatus = document.getElementById("form-status");
  if (reservationForm) {
    reservationForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!reservationForm.reportValidity()) return;
      var formData = new FormData(reservationForm);
      var subject = "【撮影相談】" + formData.get("plan") + " / " + formData.get("name") + "様";
      var body = [
        "中和泉写真スタジオ御中", "", "以下の内容で撮影を相談します。", "",
        "お名前: " + formData.get("name"), "ふりがな: " + (formData.get("kana") || "未入力"),
        "メール: " + formData.get("email"), "電話番号: " + (formData.get("phone") || "未入力"),
        "撮影内容: " + formData.get("plan"), "撮影希望日: " + (formData.get("preferredDate") || "未定"),
        "", "ご相談内容:", formData.get("message")
      ].join("\n");
      formStatus.textContent = "メールアプリを開いています。";
      window.location.href = "mailto:ootsutsu@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
})();



document.querySelectorAll("[data-plan]").forEach(function (link) {
  link.addEventListener("click", function () {
    var select = document.querySelector('select[name="plan"]');
    if (select) select.value = link.getAttribute("data-plan");
  });
});

